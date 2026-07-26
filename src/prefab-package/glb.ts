/**
 * GLB container access.
 *
 * The binary surface belongs to `@gltf-transform/core`. This module wraps it so
 * no library type escapes into the contract, and applies the resource limits
 * that must hold before any semantic interpretation happens.
 *
 * `binaryToJSON` is used rather than the `Document` object model on purpose:
 * it yields the glTF JSON chunk verbatim, so `extras`, `extensionsUsed`, and
 * `extensionsRequired` all survive. The object model would resolve unknown
 * extensions away, which is exactly the data profile validation and round-trip
 * preservation need to see.
 */

import { WebIO } from "@gltf-transform/core";
import type { DiagnosticCollector } from "./diagnostics.ts";
import { isJsonObject } from "./manifest.ts";
import type { JsonObject, PayloadCounts, PayloadLimits } from "./types.ts";

export interface PayloadContext {
  /** Payload role, e.g. `proxy`. */
  role: string;
  /** Declared blob digest, for diagnostic context. */
  digest: string;
  /** Package-relative location of the blob. */
  location: string;
}

export interface ParsedGlb {
  json: JsonObject;
  counts: PayloadCounts;
  extensionsUsed: readonly string[];
  extensionsRequired: readonly string[];
}

const io = new WebIO();

/**
 * Parses and resource-bounds a GLB payload.
 *
 * Returns null when the bytes are unusable or exceed a limit. Depth is not
 * checked here — it needs the node graph, so `profile.ts` checks it while
 * building one, using the same limit and the same diagnostic code.
 */
export async function parseGlbPayload(
  bytes: Uint8Array,
  context: PayloadContext,
  limits: PayloadLimits,
  diagnostics: DiagnosticCollector,
): Promise<ParsedGlb | null> {
  const diagnosticContext = { representation: context.role, blobDigest: context.digest };

  if (bytes.byteLength > limits.maxBlobBytes) {
    diagnostics.add(
      "NOOK-GLB-LIMIT-EXCEEDED",
      context.location,
      `Payload is ${bytes.byteLength} bytes, over the ${limits.maxBlobBytes}-byte limit. ` +
        "It is not parsed.",
      diagnosticContext,
    );
    return null;
  }

  let json: unknown;
  let resources: Record<string, Uint8Array> = {};
  try {
    const document = await io.binaryToJSON(bytes);
    json = document.json;
    resources = document.resources as Record<string, Uint8Array>;
  } catch (error) {
    const message = (error as Error).message;
    // The parser refuses to resolve resources a GLB does not carry, which is
    // exactly the v1 self-containment rule. Recognising it here reports the
    // real defect instead of a generic "malformed". If the wording ever
    // changes the case degrades to NOOK-GLB-MALFORMED — still an ERROR, still
    // rejected, only less specific.
    if (/Cannot resolve external (buffers|images)/.test(message)) {
      diagnostics.add(
        "NOOK-GLB-EXTERNAL-URI",
        context.location,
        `Payload depends on resources it does not embed: ${message} Portable Prefab Profile v1 ` +
          "payloads must be independently parseable from their own bytes.",
        diagnosticContext,
      );
      return null;
    }
    diagnostics.add(
      "NOOK-GLB-MALFORMED",
      context.location,
      `Payload is not a readable GLB: ${message}`,
      diagnosticContext,
    );
    return null;
  }

  if (!isJsonObject(json)) {
    diagnostics.add(
      "NOOK-GLB-MALFORMED",
      context.location,
      "Payload JSON chunk is not an object.",
      diagnosticContext,
    );
    return null;
  }

  const jsonBytes = new TextEncoder().encode(JSON.stringify(json)).byteLength;
  if (jsonBytes > limits.maxJsonBytes) {
    diagnostics.add(
      "NOOK-GLB-LIMIT-EXCEEDED",
      `${context.location}#/`,
      `Payload JSON chunk is ${jsonBytes} bytes, over the ${limits.maxJsonBytes}-byte limit.`,
      diagnosticContext,
    );
    return null;
  }

  const asset = json.asset;
  if (!isJsonObject(asset) || typeof asset.version !== "string") {
    diagnostics.add(
      "NOOK-GLB-MALFORMED",
      `${context.location}#/asset`,
      "Payload declares no glTF asset version.",
      diagnosticContext,
    );
    return null;
  }

  const counts = countResources(json);
  const overLimit: Array<[keyof PayloadCounts, number]> = [
    ["nodes", limits.maxNodes],
    ["primitives", limits.maxPrimitives],
    ["materials", limits.maxMaterials],
    ["textures", limits.maxTextures],
    ["images", limits.maxImages],
  ];
  let exceeded = false;
  for (const [key, limit] of overLimit) {
    if (counts[key] > limit) {
      exceeded = true;
      diagnostics.add(
        "NOOK-GLB-LIMIT-EXCEEDED",
        `${context.location}#/${key}`,
        `Payload contains ${counts[key]} ${key}, over the limit of ${limit}. No runtime graph is ` +
          "constructed for it.",
        diagnosticContext,
      );
    }
  }
  if (exceeded) return null;

  checkSelfContained(json, resources, context, diagnostics);

  return {
    json,
    counts,
    extensionsUsed: stringArray(json.extensionsUsed),
    extensionsRequired: stringArray(json.extensionsRequired),
  };
}

function countResources(json: JsonObject): PayloadCounts {
  const nodes = arrayOf(json.nodes);
  const meshes = arrayOf(json.meshes);
  let primitives = 0;
  for (const mesh of meshes) {
    if (isJsonObject(mesh)) primitives += arrayOf(mesh.primitives).length;
  }
  return {
    nodes: nodes.length,
    meshes: meshes.length,
    primitives,
    materials: arrayOf(json.materials).length,
    textures: arrayOf(json.textures).length,
    images: arrayOf(json.images).length,
    // Filled in by profile.ts once the hierarchy is built.
    maxDepth: 0,
  };
}

/**
 * Defence in depth for v1 self-containment.
 *
 * The parser already refuses external buffers and images, and inlines `data:`
 * URIs into the resource map under generated names. So by this point every
 * remaining `uri` must name a bundled resource; one that does not means the
 * payload depends on bytes the package does not carry, whatever the parser
 * concluded.
 */
function checkSelfContained(
  json: JsonObject,
  resources: Readonly<Record<string, Uint8Array>>,
  context: PayloadContext,
  diagnostics: DiagnosticCollector,
): void {
  const diagnosticContext = { representation: context.role, blobDigest: context.digest };
  for (const collection of ["buffers", "images"] as const) {
    arrayOf(json[collection]).forEach((entry, index) => {
      if (!isJsonObject(entry)) return;
      const uri = entry.uri;
      if (typeof uri !== "string") return; // stored in the GLB binary chunk
      if (Object.prototype.hasOwnProperty.call(resources, uri)) return; // embedded
      diagnostics.add(
        "NOOK-GLB-EXTERNAL-URI",
        `${context.location}#/${collection}/${index}/uri`,
        `Payload references external resource ${JSON.stringify(uri)}. Portable Prefab Profile v1 ` +
          "payloads must embed every buffer and image they need.",
        diagnosticContext,
      );
    });
  }
}

export function arrayOf(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function stringArray(value: unknown): string[] {
  return arrayOf(value).filter((entry): entry is string => typeof entry === "string");
}
