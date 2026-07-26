/**
 * Portable Prefab Profile v1 checks over a parsed GLB payload.
 *
 * This module reads. It never instantiates, evaluates, or executes package
 * content: `extras.nook` records are decoded into plain data and validated
 * against the registry, and nothing in a package can cause code to run.
 *
 * Out-of-profile content is always reported. Silently ignoring an engine
 * feature the package carries would let a creator believe it survived export.
 */

import type { DiagnosticCollector } from "./diagnostics.ts";
import { arrayOf, type ParsedGlb, type PayloadContext } from "./glb.ts";
import { isJsonObject, parseReference } from "./manifest.ts";
import {
  COMPONENT_REGISTRY,
  ENUM_DOMAINS,
  OUT_OF_PROFILE_GLTF_PROPERTIES,
  RESERVED_ROOT_NODE_ID,
  isProfileExtension,
} from "./registry.ts";
import { IDENTITY_MATRIX, fromTRS } from "./transform.ts";
import type {
  JsonObject,
  JsonValue,
  Mat4,
  NestedPrefabInstance,
  PayloadComponent,
  PayloadLimits,
  PayloadNode,
  PayloadRepresentation,
} from "./types.ts";

export interface ProfileResult {
  representation: PayloadRepresentation;
  /** Capabilities the payload actually uses, e.g. registered components. */
  usedCapabilities: readonly string[];
}

export function inspectProfile(
  parsed: ParsedGlb,
  context: PayloadContext,
  limits: PayloadLimits,
  diagnostics: DiagnosticCollector,
): ProfileResult {
  const json = parsed.json;
  const at = (suffix: string) => `${context.location}#${suffix}`;
  const diagnosticContext = { representation: context.role, blobDigest: context.digest };
  const usedCapabilities = new Set<string>();

  checkExtensions(parsed, context, diagnostics);
  checkOutOfProfileProperties(json, context, diagnostics);

  const rawNodes = arrayOf(json.nodes);
  const parents = new Array<number | null>(rawNodes.length).fill(null);
  const nodes: PayloadNode[] = [];

  rawNodes.forEach((raw, index) => {
    const node = isJsonObject(raw) ? raw : {};
    const children = arrayOf(node.children)
      .filter((child): child is number => Number.isInteger(child))
      .filter((child) => child >= 0 && child < rawNodes.length);
    for (const child of children) parents[child] = index;

    const nook = readNookExtras(node);
    nodes.push({
      index,
      name: typeof node.name === "string" ? node.name : undefined,
      nodeId: typeof nook?.nodeId === "string" ? nook.nodeId : undefined,
      parent: null,
      children,
      isPackageRoot: nook?.packageRoot === true,
      localMatrix: readLocalMatrix(node),
      mesh: Number.isInteger(node.mesh) ? (node.mesh as number) : undefined,
      components: readComponents(nook, index, at, diagnosticContext, usedCapabilities, diagnostics),
      prefabInstance: readPrefabInstance(nook, index, at, diagnosticContext, diagnostics),
    });
  });

  for (const node of nodes) {
    (node as { parent: number | null }).parent = parents[node.index];
  }

  const maxDepth = measureDepth(nodes, parents);
  if (maxDepth > limits.maxNodeDepth) {
    diagnostics.add(
      "NOOK-GLB-LIMIT-EXCEEDED",
      at("/nodes"),
      `Payload node hierarchy is ${maxDepth} deep, over the limit of ${limits.maxNodeDepth}.`,
      diagnosticContext,
    );
  }

  checkNodeIdUniqueness(nodes, at, diagnosticContext, diagnostics);
  const rootIndex = resolveLogicalRoot(nodes, parents, at, diagnosticContext, diagnostics);

  const representation: PayloadRepresentation = {
    role: context.role,
    digest: context.digest,
    byteLength: 0,
    parsed: true,
    nodes,
    rootIndex,
    storedRootMatrix: rootIndex === null ? IDENTITY_MATRIX : nodes[rootIndex].localMatrix,
    materialNames: arrayOf(json.materials).map((material) =>
      isJsonObject(material) && typeof material.name === "string" ? material.name : undefined,
    ),
    counts: { ...parsed.counts, maxDepth },
    extensionsUsed: parsed.extensionsUsed,
    extensionsRequired: parsed.extensionsRequired,
    json,
  };

  return { representation, usedCapabilities: [...usedCapabilities].sort() };
}

/** An unparseable payload still occupies its role, so the inventory stays complete. */
export function unparsedRepresentation(role: string, digest: string): PayloadRepresentation {
  return {
    role,
    digest,
    byteLength: 0,
    parsed: false,
    nodes: [],
    rootIndex: null,
    storedRootMatrix: IDENTITY_MATRIX,
    materialNames: [],
    counts: {
      nodes: 0,
      meshes: 0,
      primitives: 0,
      materials: 0,
      textures: 0,
      images: 0,
      maxDepth: 0,
    },
    extensionsUsed: [],
    extensionsRequired: [],
    json: null,
  };
}

// ---------------------------------------------------------------------------
// Extensions and out-of-profile content
// ---------------------------------------------------------------------------

function checkExtensions(
  parsed: ParsedGlb,
  context: PayloadContext,
  diagnostics: DiagnosticCollector,
): void {
  const diagnosticContext = { representation: context.role, blobDigest: context.digest };
  const required = new Set(parsed.extensionsRequired);

  for (const name of parsed.extensionsRequired) {
    if (isProfileExtension(name)) continue;
    diagnostics.add(
      "NOOK-GLB-UNSUPPORTED-EXTENSION",
      `${context.location}#/extensionsRequired`,
      `Payload requires glTF extension ${name}, which Portable Prefab Profile v1 does not ` +
        "support. The representation cannot be consumed as declared.",
      diagnosticContext,
    );
  }

  for (const name of parsed.extensionsUsed) {
    if (isProfileExtension(name) || required.has(name)) continue;
    diagnostics.add(
      "NOOK-PROFILE-UNSUPPORTED-FEATURE",
      `${context.location}#/extensionsUsed`,
      `Payload uses glTF extension ${name}, which is outside Portable Prefab Profile v1. It is ` +
        "reported rather than silently ignored.",
      diagnosticContext,
    );
  }
}

function checkOutOfProfileProperties(
  json: JsonObject,
  context: PayloadContext,
  diagnostics: DiagnosticCollector,
): void {
  const diagnosticContext = { representation: context.role, blobDigest: context.digest };
  for (const property of OUT_OF_PROFILE_GLTF_PROPERTIES) {
    const entries = arrayOf(json[property]);
    if (entries.length === 0) continue;
    diagnostics.add(
      "NOOK-PROFILE-UNSUPPORTED-FEATURE",
      `${context.location}#/${property}`,
      `Payload carries ${entries.length} ${property}, which Portable Prefab Profile v1 does not ` +
        "define. Export must report this content rather than drop it.",
      diagnosticContext,
    );
  }
}

// ---------------------------------------------------------------------------
// Nodes
// ---------------------------------------------------------------------------

function readNookExtras(node: JsonObject): JsonObject | null {
  const extras = node.extras;
  if (!isJsonObject(extras)) return null;
  const nook = extras.nook;
  return isJsonObject(nook) ? nook : null;
}

function readLocalMatrix(node: JsonObject): Mat4 {
  const matrix = node.matrix;
  if (Array.isArray(matrix) && matrix.length === 16 && matrix.every((n) => typeof n === "number")) {
    return matrix as number[];
  }
  return fromTRS(
    numberTuple(node.translation, 3, [0, 0, 0]),
    numberTuple(node.rotation, 4, [0, 0, 0, 1]),
    numberTuple(node.scale, 3, [1, 1, 1]),
  );
}

function numberTuple(value: unknown, length: number, fallback: number[]): number[] {
  if (Array.isArray(value) && value.length === length && value.every((n) => typeof n === "number")) {
    return value as number[];
  }
  return fallback;
}

function measureDepth(nodes: readonly PayloadNode[], parents: readonly (number | null)[]): number {
  let deepest = 0;
  for (const node of nodes) {
    let depth = 1;
    let current = parents[node.index];
    // Bounded by node count, so a malformed parent cycle cannot spin here.
    while (current !== null && depth <= nodes.length) {
      depth += 1;
      current = parents[current];
    }
    deepest = Math.max(deepest, depth);
  }
  return deepest;
}

function checkNodeIdUniqueness(
  nodes: readonly PayloadNode[],
  at: (suffix: string) => string,
  diagnosticContext: { representation: string; blobDigest: string },
  diagnostics: DiagnosticCollector,
): void {
  const seen = new Map<string, number>();
  for (const node of nodes) {
    if (!node.nodeId) continue;
    const first = seen.get(node.nodeId);
    if (first !== undefined) {
      diagnostics.add(
        "NOOK-NODE-DUPLICATE-ID",
        at(`/nodes/${node.index}/extras/nook/nodeId`),
        `Node id ${JSON.stringify(node.nodeId)} is also declared by node ${first}. Parameter ` +
          "bindings address nodes by this id, so it must be unique within a representation.",
        { ...diagnosticContext, nodeId: node.nodeId },
      );
      continue;
    }
    seen.set(node.nodeId, node.index);
  }
}

/**
 * Resolves the single logical package root.
 *
 * Three separate rules meet here: exactly one node carries the marker, that
 * node holds the reserved identity, and no other node claims it. A multi-root
 * source is expected to have received a synthesized identity wrapper at export,
 * so leftover top-level siblings mean the wrapper is missing.
 */
function resolveLogicalRoot(
  nodes: readonly PayloadNode[],
  parents: readonly (number | null)[],
  at: (suffix: string) => string,
  diagnosticContext: { representation: string; blobDigest: string },
  diagnostics: DiagnosticCollector,
): number | null {
  const marked = nodes.filter((node) => node.isPackageRoot);

  for (const node of nodes) {
    if (node.nodeId === RESERVED_ROOT_NODE_ID && !node.isPackageRoot) {
      diagnostics.add(
        "NOOK-ROOT-RESERVED-ID-MISUSE",
        at(`/nodes/${node.index}/extras/nook/nodeId`),
        `Node ${node.index} claims the reserved identity ${RESERVED_ROOT_NODE_ID} without being ` +
          "the logical package root.",
        { ...diagnosticContext, nodeId: node.nodeId },
      );
    }
  }

  if (marked.length === 0) {
    diagnostics.add(
      "NOOK-ROOT-MISSING",
      at("/nodes"),
      "No node is marked extras.nook.packageRoot = true. Every representation must expose exactly " +
        "one addressable logical root.",
      diagnosticContext,
    );
    return null;
  }

  if (marked.length > 1) {
    diagnostics.add(
      "NOOK-ROOT-DUPLICATE",
      at("/nodes"),
      `Nodes ${marked.map((n) => n.index).join(", ")} are all marked as the package root. Exactly ` +
        "one logical root may exist per representation.",
      diagnosticContext,
    );
    return null;
  }

  const root = marked[0];
  if (root.nodeId !== RESERVED_ROOT_NODE_ID) {
    diagnostics.add(
      "NOOK-ROOT-RESERVED-ID-MISUSE",
      at(`/nodes/${root.index}/extras/nook/nodeId`),
      `The logical package root must declare the reserved identity ${RESERVED_ROOT_NODE_ID}; ` +
        `found ${JSON.stringify(root.nodeId ?? null)}.`,
      { ...diagnosticContext, nodeId: root.nodeId },
    );
  }

  if (parents[root.index] !== null) {
    diagnostics.add(
      "NOOK-ROOT-NOT-TOP-LEVEL",
      at(`/nodes/${root.index}`),
      `The logical package root is parented to node ${parents[root.index]}. It must be the unique ` +
        "top-level node of the representation.",
      { ...diagnosticContext, nodeId: root.nodeId },
    );
    return root.index;
  }

  const otherTopLevel = nodes.filter((n) => parents[n.index] === null && n.index !== root.index);
  if (otherTopLevel.length > 0) {
    diagnostics.add(
      "NOOK-ROOT-NOT-TOP-LEVEL",
      at("/nodes"),
      `Nodes ${otherTopLevel.map((n) => n.index).join(", ")} sit beside the logical package root ` +
        "at the top level. An export with multiple source roots must wrap them in one identity " +
        "root carrying the package-root markers.",
      { ...diagnosticContext, nodeId: root.nodeId },
    );
  }

  return root.index;
}

// ---------------------------------------------------------------------------
// extras.nook records
// ---------------------------------------------------------------------------

function readComponents(
  nook: JsonObject | null,
  nodeIndex: number,
  at: (suffix: string) => string,
  diagnosticContext: { representation: string; blobDigest: string },
  usedCapabilities: Set<string>,
  diagnostics: DiagnosticCollector,
): PayloadComponent[] {
  if (!nook || nook.components === undefined) return [];

  const location = at(`/nodes/${nodeIndex}/extras/nook/components`);
  if (!isJsonObject(nook.components)) {
    diagnostics.add(
      "NOOK-COMPONENT-INVALID",
      location,
      "extras.nook.components must be an object keyed by registered component name.",
      diagnosticContext,
    );
    return [];
  }

  const components: PayloadComponent[] = [];
  for (const name of Object.keys(nook.components).sort()) {
    const value = nook.components[name];
    const schema = COMPONENT_REGISTRY[name];
    const componentLocation = `${location}/${name}`;

    if (!schema) {
      diagnostics.add(
        "NOOK-COMPONENT-UNREGISTERED",
        componentLocation,
        `Component ${JSON.stringify(name)} is not in the Nook component registry. Unregistered ` +
          "semantic components cannot be validated or mapped by any consumer.",
        diagnosticContext,
      );
      components.push({ name, capability: "", fields: {}, known: false });
      continue;
    }

    usedCapabilities.add(schema.capability);

    if (!isJsonObject(value)) {
      diagnostics.add(
        "NOOK-COMPONENT-INVALID",
        componentLocation,
        `Component ${name} must be an object.`,
        { ...diagnosticContext, capability: schema.capability },
      );
      components.push({ name, capability: schema.capability, fields: {}, known: true });
      continue;
    }

    for (const [field, fieldSchema] of Object.entries(schema.fields)) {
      const fieldValue = value[field];
      if (fieldValue === undefined) {
        if (fieldSchema.required) {
          diagnostics.add(
            "NOOK-COMPONENT-INVALID",
            `${componentLocation}/${field}`,
            `Component ${name} requires field ${field}.`,
            { ...diagnosticContext, capability: schema.capability },
          );
        }
        continue;
      }
      const problem = describeFieldMismatch(fieldSchema.kind, fieldValue);
      if (problem) {
        diagnostics.add(
          "NOOK-COMPONENT-INVALID",
          `${componentLocation}/${field}`,
          `Component ${name} field ${field} ${problem}`,
          { ...diagnosticContext, capability: schema.capability },
        );
      }
    }

    for (const field of Object.keys(value)) {
      if (field in schema.fields) continue;
      diagnostics.add(
        "NOOK-COMPONENT-INVALID",
        `${componentLocation}/${field}`,
        `Component ${name} declares field ${field}, which ${schema.capability} does not define.`,
        { ...diagnosticContext, capability: schema.capability },
      );
    }

    components.push({ name, capability: schema.capability, fields: value, known: true });
  }

  return components;
}

function describeFieldMismatch(kind: string, value: JsonValue): string | null {
  if (kind.startsWith("enum:")) {
    const domain = ENUM_DOMAINS[kind.slice(5)] ?? [];
    if (typeof value !== "string" || !domain.includes(value)) {
      return `must be one of ${domain.join(", ")}; found ${JSON.stringify(value)}.`;
    }
    return null;
  }
  switch (kind) {
    case "bool":
      return typeof value === "boolean" ? null : `must be a boolean; found ${JSON.stringify(value)}.`;
    case "float":
    case "int":
      return typeof value === "number" ? null : `must be a number; found ${JSON.stringify(value)}.`;
    case "string":
      return typeof value === "string" ? null : `must be a string; found ${JSON.stringify(value)}.`;
    default:
      return null;
  }
}

function readPrefabInstance(
  nook: JsonObject | null,
  nodeIndex: number,
  at: (suffix: string) => string,
  diagnosticContext: { representation: string; blobDigest: string },
  diagnostics: DiagnosticCollector,
): NestedPrefabInstance | undefined {
  if (!nook || nook.prefabInstance === undefined) return undefined;

  const location = at(`/nodes/${nodeIndex}/extras/nook/prefabInstance`);
  const record = nook.prefabInstance;
  if (!isJsonObject(record)) {
    diagnostics.add(
      "NOOK-NESTED-INSTANCE-INVALID",
      location,
      "extras.nook.prefabInstance must be an object carrying an exact prefab reference.",
      diagnosticContext,
    );
    return undefined;
  }

  const reference = parseReference(
    { kind: record.kind, id: record.id, version: record.version, digest: record.digest },
    location,
    diagnostics,
  );
  if (!reference) return undefined;

  if (reference.kind !== "prefab") {
    diagnostics.add(
      "NOOK-NESTED-INSTANCE-INVALID",
      `${location}/kind`,
      `A nested instance must reference kind "prefab"; found ${JSON.stringify(reference.kind)}.`,
      diagnosticContext,
    );
  }

  let params: Record<string, JsonValue> = {};
  if (record.params !== undefined) {
    if (!isJsonObject(record.params)) {
      diagnostics.add(
        "NOOK-NESTED-INSTANCE-INVALID",
        `${location}/params`,
        "Nested instance params must be an object keyed by the nested package's paramId values.",
        diagnosticContext,
      );
    } else {
      params = record.params as Record<string, JsonValue>;
    }
  }

  const known = new Set(["kind", "id", "version", "digest", "params"]);
  const unknown: Record<string, JsonValue> = {};
  for (const [key, value] of Object.entries(record)) {
    if (!known.has(key) && value !== undefined) unknown[key] = value;
  }

  return { reference, params: Object.freeze(params), unknown: Object.freeze(unknown) };
}
