/**
 * `nook.path/1` — the whitelisted semantic path language for binding targets.
 *
 * Arbitrary JSON paths are forbidden by the contract, so this is not a generic
 * accessor: parsing produces a target drawn from a closed registry, and a path
 * that does not match one of those shapes is invalid regardless of whether the
 * underlying glTF happens to contain something at that location. That is what
 * makes cross-engine mapping, type checking, UI generation, and untrusted-input
 * handling all tractable from one artifact.
 *
 * Syntax:
 *
 *     transform.translation
 *     transform.translation[1]
 *     mesh.primitives[2].material.pbrMetallicRoughness.baseColorFactor
 *     mesh.material.named("BulbGlass").emissiveFactor[0]
 *     nook.components.collider.isTrigger
 *     nook.prefabInstance.reference
 *
 * Inside `named("…")`, `\\` escapes a backslash and `\"` escapes a quote. No
 * other escape is defined in v1.
 */

import { arrayOf } from "./glb.ts";
import { isJsonObject } from "./manifest.ts";
import {
  COMPONENT_REGISTRY,
  PATH_CAPABILITY,
  type ValueKind,
} from "./registry.ts";
import type { JsonObject, PathLimits, PayloadNode, PayloadRepresentation } from "./types.ts";

export type MaterialSelector =
  | { by: "primitiveIndex"; index: number }
  | { by: "materialName"; name: string };

export type PathTarget =
  | { kind: "transform"; property: "translation" | "rotation" | "scale"; component?: number }
  | { kind: "material"; selector: MaterialSelector; property: string; component?: number }
  | { kind: "component"; component: string; field: string }
  | { kind: "prefabInstanceReference" };

export interface ResolvedPath {
  /** Normalized textual form. Two paths addressing the same target share it. */
  canonical: string;
  valueKind: ValueKind;
  /**
   * True when the path selects by index. Index-based selection breaks when
   * primitives or materials are reordered, so it is reported for creator
   * attention while remaining valid.
   */
  fragile: boolean;
  /** Capabilities the path itself requires. */
  capabilities: readonly string[];
  target: PathTarget;
}

export interface PathError {
  code: "NOOK-PATH-SYNTAX-INVALID" | "NOOK-PATH-UNREGISTERED-TARGET";
  detail: string;
}

export type PathParse = { ok: true; path: ResolvedPath } | { ok: false; error: PathError };

// ---------------------------------------------------------------------------
// Registered targets
// ---------------------------------------------------------------------------

const TRANSFORM_PROPERTIES: Record<string, { whole: ValueKind; components: number }> = {
  // `rotation` is registered because the contract names it, but v1 declares no
  // four-component parameter type. Binding to it whole is therefore a type
  // mismatch rather than a silent success; a future quaternion capability
  // closes that gap without touching the path language.
  rotation: { whole: "quat", components: 4 },
  scale: { whole: "vec3", components: 3 },
  translation: { whole: "vec3", components: 3 },
};

/**
 * `requiresTexture` marks properties that only exist when the material
 * declares a base-colour texture. They are the v1 home for `vec2` parameters,
 * and they are semantic names: `…baseColorTexture.transform.offset` addresses
 * the whitelisted `KHR_texture_transform` extension without exposing its glTF
 * encoding to creators or to other engines.
 */
const MATERIAL_PROPERTIES: Record<
  string,
  { whole: ValueKind; components: number; requiresTexture?: true }
> = {
  alphaCutoff: { whole: "float", components: 0 },
  doubleSided: { whole: "bool", components: 0 },
  emissiveFactor: { whole: "color3", components: 3 },
  "pbrMetallicRoughness.baseColorFactor": { whole: "color4", components: 4 },
  "pbrMetallicRoughness.baseColorTexture.transform.offset": {
    whole: "vec2",
    components: 2,
    requiresTexture: true,
  },
  "pbrMetallicRoughness.baseColorTexture.transform.rotation": {
    whole: "float",
    components: 0,
    requiresTexture: true,
  },
  "pbrMetallicRoughness.baseColorTexture.transform.scale": {
    whole: "vec2",
    components: 2,
    requiresTexture: true,
  },
  "pbrMetallicRoughness.metallicFactor": { whole: "float", components: 0 },
  "pbrMetallicRoughness.roughnessFactor": { whole: "float", components: 0 },
};

/** Every writable target, for UI generation and for documenting the whitelist. */
export function registeredTargets(): string[] {
  const targets: string[] = [];
  for (const property of Object.keys(TRANSFORM_PROPERTIES).sort()) {
    targets.push(`transform.${property}`);
  }
  for (const property of Object.keys(MATERIAL_PROPERTIES).sort()) {
    targets.push(`mesh.primitives[<i>].material.${property}`);
    targets.push(`mesh.material.named("<name>").${property}`);
  }
  for (const schema of Object.values(COMPONENT_REGISTRY)) {
    for (const field of Object.keys(schema.fields).sort()) {
      targets.push(`nook.components.${schema.name}.${field}`);
    }
  }
  targets.push("nook.prefabInstance.reference");
  return targets;
}

// ---------------------------------------------------------------------------
// Tokenizer
// ---------------------------------------------------------------------------

type Segment =
  | { t: "prop"; name: string }
  | { t: "index"; value: number }
  | { t: "call"; name: string; arg: string };

const IDENT_START = /[A-Za-z_]/;
const IDENT_PART = /[A-Za-z0-9_]/;

function tokenize(text: string, limits: PathLimits): Segment[] | PathError {
  const segments: Segment[] = [];
  let i = 0;

  const fail = (detail: string): PathError => ({ code: "NOOK-PATH-SYNTAX-INVALID", detail });

  while (i < text.length) {
    if (segments.length > 0) {
      if (text[i] === ".") {
        i += 1;
      } else if (text[i] !== "[") {
        return fail(`Unexpected ${JSON.stringify(text[i])} at offset ${i}.`);
      }
    }

    if (text[i] === "[") {
      i += 1;
      const start = i;
      while (i < text.length && text[i] >= "0" && text[i] <= "9") i += 1;
      if (i === start) return fail(`Expected an array index at offset ${start}.`);
      if (text[i] !== "]") return fail(`Unterminated array index at offset ${start}.`);
      const value = Number.parseInt(text.slice(start, i), 10);
      i += 1;
      segments.push({ t: "index", value });
    } else {
      if (i >= text.length || !IDENT_START.test(text[i])) {
        return fail(`Expected a property name at offset ${i}.`);
      }
      const start = i;
      while (i < text.length && IDENT_PART.test(text[i])) i += 1;
      const name = text.slice(start, i);

      if (text[i] === "(") {
        i += 1;
        if (text[i] !== '"') return fail(`Expected a quoted argument at offset ${i}.`);
        i += 1;
        let arg = "";
        let closed = false;
        while (i < text.length) {
          const ch = text[i];
          if (ch === "\\") {
            const next = text[i + 1];
            if (next !== "\\" && next !== '"') {
              return fail(`Unsupported escape \\${next ?? ""} at offset ${i}.`);
            }
            arg += next;
            i += 2;
            continue;
          }
          if (ch === '"') {
            closed = true;
            i += 1;
            break;
          }
          arg += ch;
          i += 1;
        }
        if (!closed) return fail("Unterminated quoted argument.");
        if (text[i] !== ")") return fail(`Expected ")" at offset ${i}.`);
        i += 1;
        segments.push({ t: "call", name, arg });
      } else {
        segments.push({ t: "prop", name });
      }
    }

    if (segments.length > limits.maxSegments) {
      return fail(`Path has more than ${limits.maxSegments} segments.`);
    }
  }

  if (segments.length === 0) return fail("Path is empty.");
  return segments;
}

// ---------------------------------------------------------------------------
// Parsing
// ---------------------------------------------------------------------------

export function parsePath(text: string, limits: PathLimits): PathParse {
  if (text.length > limits.maxPathLength) {
    return {
      ok: false,
      error: {
        code: "NOOK-PATH-SYNTAX-INVALID",
        detail: `Path is ${text.length} characters, over the ${limits.maxPathLength}-character limit.`,
      },
    };
  }

  const tokens = tokenize(text, limits);
  if (!Array.isArray(tokens)) return { ok: false, error: tokens };

  const head = tokens[0];
  if (head.t !== "prop") {
    return {
      ok: false,
      error: { code: "NOOK-PATH-SYNTAX-INVALID", detail: "A path must start with a namespace." },
    };
  }

  switch (head.name) {
    case "transform":
      return parseTransformPath(tokens);
    case "mesh":
      return parseMeshPath(tokens);
    case "nook":
      return parseNookPath(tokens);
    default:
      return unregistered(
        `Namespace ${JSON.stringify(head.name)} is not registered by ${PATH_CAPABILITY}. ` +
          "Registered namespaces are transform, mesh, and nook.",
      );
  }
}

function unregistered(detail: string): PathParse {
  return { ok: false, error: { code: "NOOK-PATH-UNREGISTERED-TARGET", detail } };
}

function syntax(detail: string): PathParse {
  return { ok: false, error: { code: "NOOK-PATH-SYNTAX-INVALID", detail } };
}

function parseTransformPath(tokens: readonly Segment[]): PathParse {
  const property = tokens[1];
  if (!property || property.t !== "prop" || !(property.name in TRANSFORM_PROPERTIES)) {
    return unregistered(
      `transform exposes only ${Object.keys(TRANSFORM_PROPERTIES).sort().join(", ")}.`,
    );
  }

  const spec = TRANSFORM_PROPERTIES[property.name];
  const component = tokens[2];
  if (component === undefined) {
    return {
      ok: true,
      path: {
        canonical: `transform.${property.name}`,
        valueKind: spec.whole,
        fragile: false,
        capabilities: [PATH_CAPABILITY],
        target: { kind: "transform", property: property.name as "translation" },
      },
    };
  }

  if (component.t !== "index" || tokens.length > 3) {
    return syntax(`transform.${property.name} accepts at most one component index.`);
  }
  if (component.value >= spec.components) {
    return unregistered(
      `transform.${property.name} has ${spec.components} components; index ${component.value} is out of range.`,
    );
  }

  return {
    ok: true,
    path: {
      canonical: `transform.${property.name}[${component.value}]`,
      valueKind: "float",
      fragile: false,
      capabilities: [PATH_CAPABILITY],
      target: {
        kind: "transform",
        property: property.name as "translation",
        component: component.value,
      },
    },
  };
}

function parseMeshPath(tokens: readonly Segment[]): PathParse {
  let selector: MaterialSelector;
  let prefix: string;
  let rest: readonly Segment[];
  let fragile: boolean;

  const second = tokens[1];
  if (second?.t === "prop" && second.name === "primitives") {
    const index = tokens[2];
    const material = tokens[3];
    if (index?.t !== "index") return syntax("mesh.primitives requires an index, e.g. primitives[0].");
    if (material?.t !== "prop" || material.name !== "material") {
      return unregistered("mesh.primitives[i] exposes only .material.");
    }
    selector = { by: "primitiveIndex", index: index.value };
    prefix = `mesh.primitives[${index.value}].material`;
    rest = tokens.slice(4);
    fragile = true;
  } else if (second?.t === "prop" && second.name === "material") {
    const named = tokens[2];
    if (named?.t !== "call" || named.name !== "named") {
      return unregistered('mesh.material must be selected by name, e.g. material.named("Glass").');
    }
    if (named.arg === "") return syntax("mesh.material.named() requires a non-empty name.");
    selector = { by: "materialName", name: named.arg };
    prefix = `mesh.material.named(${JSON.stringify(named.arg)})`;
    rest = tokens.slice(3);
    fragile = false;
  } else {
    return unregistered("mesh exposes only primitives[i].material and material.named(\"…\").");
  }

  // Trailing numeric index addresses one component of a vector-valued property.
  let component: number | undefined;
  let propertySegments = rest;
  const last = rest[rest.length - 1];
  if (last?.t === "index") {
    component = last.value;
    propertySegments = rest.slice(0, -1);
  }

  if (propertySegments.length === 0 || !propertySegments.every((s) => s.t === "prop")) {
    return syntax(`${prefix} requires a registered material property.`);
  }
  const property = propertySegments.map((s) => (s as { name: string }).name).join(".");
  const spec = MATERIAL_PROPERTIES[property];
  if (!spec) {
    return unregistered(
      `Material property ${JSON.stringify(property)} is not registered by ${PATH_CAPABILITY}. ` +
        `Registered properties are ${Object.keys(MATERIAL_PROPERTIES).sort().join(", ")}.`,
    );
  }

  if (component === undefined) {
    return {
      ok: true,
      path: {
        canonical: `${prefix}.${property}`,
        valueKind: spec.whole,
        fragile,
        capabilities: [PATH_CAPABILITY],
        target: { kind: "material", selector, property },
      },
    };
  }

  if (spec.components === 0) {
    return unregistered(`Material property ${property} is scalar and has no component index.`);
  }
  if (component >= spec.components) {
    return unregistered(
      `Material property ${property} has ${spec.components} components; index ${component} is out of range.`,
    );
  }

  return {
    ok: true,
    path: {
      canonical: `${prefix}.${property}[${component}]`,
      valueKind: "float",
      fragile,
      capabilities: [PATH_CAPABILITY],
      target: { kind: "material", selector, property, component },
    },
  };
}

function parseNookPath(tokens: readonly Segment[]): PathParse {
  const second = tokens[1];

  if (second?.t === "prop" && second.name === "components") {
    const componentSegment = tokens[2];
    const fieldSegment = tokens[3];
    if (componentSegment?.t !== "prop" || fieldSegment?.t !== "prop" || tokens.length > 4) {
      return syntax("nook.components paths have the form nook.components.<component>.<field>.");
    }
    const schema = COMPONENT_REGISTRY[componentSegment.name];
    if (!schema) {
      return unregistered(
        `Component ${JSON.stringify(componentSegment.name)} is not in the Nook component registry.`,
      );
    }
    const field = schema.fields[fieldSegment.name];
    if (!field) {
      return unregistered(
        `Component ${schema.name} has no field ${JSON.stringify(fieldSegment.name)}; ` +
          `${schema.capability} defines ${Object.keys(schema.fields).sort().join(", ")}.`,
      );
    }
    return {
      ok: true,
      path: {
        canonical: `nook.components.${schema.name}.${fieldSegment.name}`,
        valueKind: field.kind,
        fragile: false,
        capabilities: [PATH_CAPABILITY, schema.capability],
        target: { kind: "component", component: schema.name, field: fieldSegment.name },
      },
    };
  }

  if (second?.t === "prop" && second.name === "prefabInstance") {
    const property = tokens[2];
    if (property?.t !== "prop" || property.name !== "reference" || tokens.length > 3) {
      return unregistered("nook.prefabInstance exposes only .reference.");
    }
    return {
      ok: true,
      path: {
        canonical: "nook.prefabInstance.reference",
        valueKind: "prefabRef",
        fragile: false,
        capabilities: [PATH_CAPABILITY],
        target: { kind: "prefabInstanceReference" },
      },
    };
  }

  return unregistered("nook exposes only components.<component>.<field> and prefabInstance.reference.");
}

// ---------------------------------------------------------------------------
// Resolution against a payload
// ---------------------------------------------------------------------------

export type TargetResolution = { ok: true } | { ok: false; detail: string };

/**
 * Whether a parsed path addresses something that actually exists on a node.
 *
 * Syntactic validity and resolvability are separate failures on purpose: a
 * well-formed path pointing at a primitive the proxy does not have is a
 * different problem for a creator than a misspelled property.
 */
export function resolveTargetOnNode(
  path: ResolvedPath,
  node: PayloadNode,
  representation: PayloadRepresentation,
): TargetResolution {
  switch (path.target.kind) {
    case "transform":
      return { ok: true };

    case "component": {
      const wanted = path.target.component;
      return node.components.some((component) => component.name === wanted)
        ? { ok: true }
        : { ok: false, detail: `Node declares no ${wanted} component.` };
    }

    case "prefabInstanceReference":
      return node.prefabInstance
        ? { ok: true }
        : { ok: false, detail: "Node carries no extras.nook.prefabInstance record." };

    case "material":
      return resolveMaterialTarget(path.target, node, representation);
  }
}

function resolveMaterialTarget(
  target: Extract<PathTarget, { kind: "material" }>,
  node: PayloadNode,
  representation: PayloadRepresentation,
): TargetResolution {
  if (node.mesh === undefined) {
    return { ok: false, detail: "Node has no mesh, so it exposes no material properties." };
  }
  const json = representation.json;
  if (!json) return { ok: false, detail: "Representation payload was not parsed." };

  const mesh = arrayOf(json.meshes)[node.mesh];
  if (!isJsonObject(mesh)) {
    return { ok: false, detail: `Node references mesh ${node.mesh}, which does not exist.` };
  }
  const primitives = arrayOf(mesh.primitives);

  let materialIndex: number;

  if (target.selector.by === "primitiveIndex") {
    const primitive = primitives[target.selector.index];
    if (!isJsonObject(primitive)) {
      return {
        ok: false,
        detail: `Mesh has ${primitives.length} primitives; index ${target.selector.index} does not exist.`,
      };
    }
    if (!Number.isInteger(primitive.material)) {
      return {
        ok: false,
        detail: `Primitive ${target.selector.index} has no material assigned.`,
      };
    }
    materialIndex = primitive.material as number;
  } else {
    const wanted = target.selector.name;
    const matching = primitives.filter((primitive) => {
      if (!isJsonObject(primitive) || !Number.isInteger(primitive.material)) return false;
      return representation.materialNames[primitive.material as number] === wanted;
    });
    if (matching.length === 0) {
      return {
        ok: false,
        detail: `No primitive on this node uses a material named ${JSON.stringify(wanted)}.`,
      };
    }
    if (matching.length > 1) {
      return {
        ok: false,
        detail: `${matching.length} primitives on this node use a material named ${JSON.stringify(wanted)}; the selection is ambiguous.`,
      };
    }
    materialIndex = (matching[0] as JsonObject).material as number;
  }

  if (MATERIAL_PROPERTIES[target.property]?.requiresTexture) {
    const material = arrayOf(json.materials)[materialIndex];
    const pbr = isJsonObject(material) ? material.pbrMetallicRoughness : undefined;
    const texture = isJsonObject(pbr) ? pbr.baseColorTexture : undefined;
    if (!isJsonObject(texture)) {
      return {
        ok: false,
        detail: `Material ${materialIndex} declares no base-colour texture, so ${target.property} has nothing to address.`,
      };
    }
  }

  return { ok: true };
}
