/**
 * Deterministic fixture construction for the prefab package contract.
 *
 * Fixtures are built rather than committed as opaque binaries so that a reader
 * can see exactly which contract rule each one exercises, and so an adversarial
 * case can be expressed as a one-line deviation from the valid one. Output is
 * byte-deterministic, so the same artifacts can be written to disk unchanged
 * for consumers outside this repository.
 *
 * GLB and ZIP bytes are assembled here by hand on purpose: fixture *authoring*
 * must be able to produce malformed input, which is precisely what the
 * maintained parsers used by `src/prefab-package` refuse to do.
 */

import { zipSync } from "fflate";
import { sha256Digest } from "../../../src/prefab-package/canonical.ts";
import { blobFileName } from "../../../src/prefab-package/canonical.ts";
import type { JsonObject } from "../../../src/prefab-package/types.ts";

/** Fixed timestamp so archive bytes are byte-identical across runs and machines. */
export const FIXTURE_MTIME = Date.UTC(2026, 6, 26);

const GLB_MAGIC = 0x46546c67;
const CHUNK_JSON = 0x4e4f534a;
const CHUNK_BIN = 0x004e4942;

const encoder = new TextEncoder();

// ---------------------------------------------------------------------------
// GLB
// ---------------------------------------------------------------------------

export interface GlbOptions {
  /** Overrides the container version written to the header. */
  version?: number;
  /** Overrides the declared total length, for malformed-container fixtures. */
  declaredLength?: number;
}

/** Assembles a GLB container from a glTF JSON chunk and an optional BIN chunk. */
export function buildGlb(json: JsonObject, bin?: Uint8Array, options: GlbOptions = {}): Uint8Array {
  const jsonChunk = padTo4(encoder.encode(JSON.stringify(json)), 0x20);
  const binChunk = bin ? padTo4(bin, 0x00) : null;

  const total = 12 + 8 + jsonChunk.length + (binChunk ? 8 + binChunk.length : 0);
  const out = new Uint8Array(total);
  const view = new DataView(out.buffer);

  view.setUint32(0, GLB_MAGIC, true);
  view.setUint32(4, options.version ?? 2, true);
  view.setUint32(8, options.declaredLength ?? total, true);

  view.setUint32(12, jsonChunk.length, true);
  view.setUint32(16, CHUNK_JSON, true);
  out.set(jsonChunk, 20);

  if (binChunk) {
    const offset = 20 + jsonChunk.length;
    view.setUint32(offset, binChunk.length, true);
    view.setUint32(offset + 4, CHUNK_BIN, true);
    out.set(binChunk, offset + 8);
  }

  return out;
}

function padTo4(bytes: Uint8Array, fill: number): Uint8Array {
  const padding = (4 - (bytes.length % 4)) % 4;
  if (padding === 0) return bytes;
  const out = new Uint8Array(bytes.length + padding);
  out.set(bytes);
  out.fill(fill, bytes.length);
  return out;
}

// ---------------------------------------------------------------------------
// glTF scene helpers
// ---------------------------------------------------------------------------

export interface NodeSpec {
  name?: string;
  nodeId?: string;
  packageRoot?: boolean;
  translation?: [number, number, number];
  rotation?: [number, number, number, number];
  scale?: [number, number, number];
  mesh?: number;
  children?: number[];
  components?: JsonObject;
  prefabInstance?: JsonObject;
  /** Extra `extras.nook` fields, for round-trip preservation fixtures. */
  nookExtras?: JsonObject;
}

export function node(spec: NodeSpec): JsonObject {
  const nook: JsonObject = { ...spec.nookExtras };
  if (spec.nodeId !== undefined) nook.nodeId = spec.nodeId;
  if (spec.packageRoot !== undefined) nook.packageRoot = spec.packageRoot;
  if (spec.components !== undefined) nook.components = spec.components;
  if (spec.prefabInstance !== undefined) nook.prefabInstance = spec.prefabInstance;

  const out: JsonObject = {};
  if (spec.name !== undefined) out.name = spec.name;
  if (spec.translation) out.translation = spec.translation;
  if (spec.rotation) out.rotation = spec.rotation;
  if (spec.scale) out.scale = spec.scale;
  if (spec.mesh !== undefined) out.mesh = spec.mesh;
  if (spec.children) out.children = spec.children;
  if (Object.keys(nook).length > 0) out.extras = { nook };
  return out;
}

export interface SceneSpec {
  nodes: JsonObject[];
  /** Top-level scene node indices. Defaults to every node without a parent. */
  roots?: number[];
  materials?: JsonObject[];
  meshes?: JsonObject[];
  /** Adds a self-contained texture/image/sampler set that materials can reference. */
  textured?: boolean;
  extensionsUsed?: string[];
  extensionsRequired?: string[];
  /** Merged into the document root, for out-of-profile and external-URI fixtures. */
  extra?: JsonObject;
}

/** Builds a minimal but well-formed glTF document around the given nodes. */
export function scene(spec: SceneSpec): JsonObject {
  const parented = new Set<number>();
  for (const entry of spec.nodes) {
    for (const child of (entry.children as number[] | undefined) ?? []) parented.add(child);
  }
  const roots = spec.roots ?? spec.nodes.map((_, index) => index).filter((i) => !parented.has(i));

  const document: JsonObject = {
    asset: { version: "2.0", generator: "nook-fixture" },
    scene: 0,
    scenes: [{ nodes: roots }],
    nodes: spec.nodes,
  };

  if (spec.meshes) {
    document.meshes = spec.meshes;
    document.accessors = [
      { componentType: 5126, count: 3, type: "VEC3", max: [1, 1, 1], min: [0, 0, 0] },
    ];
    document.bufferViews = [{ buffer: 0, byteOffset: 0, byteLength: 36 }];
    document.buffers = [{ byteLength: 36 }];
  }
  if (spec.materials) document.materials = spec.materials;

  if (spec.textured) {
    // The image lives in the GLB binary chunk, so the payload stays
    // self-contained with no URI of any kind.
    document.images = [{ bufferView: 0, mimeType: "image/png" }];
    document.samplers = [{}];
    document.textures = [{ sampler: 0, source: 0 }];
  }

  if (spec.extensionsUsed) document.extensionsUsed = spec.extensionsUsed;
  if (spec.extensionsRequired) document.extensionsRequired = spec.extensionsRequired;

  return { ...document, ...spec.extra };
}

/** BIN chunk matching the buffer declared by `scene` when meshes are present. */
export const SCENE_BIN = new Uint8Array(36);

export function mesh(primitives: JsonObject[]): JsonObject {
  return { primitives };
}

export function primitive(material?: number): JsonObject {
  const out: JsonObject = { attributes: { POSITION: 0 } };
  if (material !== undefined) out.material = material;
  return out;
}

export function material(
  name: string,
  baseColor = [1, 1, 1, 1],
  options: { texture?: number } = {},
): JsonObject {
  const pbr: JsonObject = {
    baseColorFactor: baseColor,
    metallicFactor: 0,
    roughnessFactor: 0.5,
  };
  if (options.texture !== undefined) {
    pbr.baseColorTexture = {
      index: options.texture,
      extensions: { KHR_texture_transform: { offset: [0, 0], scale: [1, 1] } },
    };
  }
  return { name, pbrMetallicRoughness: pbr, emissiveFactor: [0, 0, 0] };
}

// ---------------------------------------------------------------------------
// Package assembly
// ---------------------------------------------------------------------------

export interface PayloadSpec {
  bytes: Uint8Array;
  mediaType?: string;
  /** Overrides the declared size, for integrity fixtures. */
  declaredSize?: number;
  /** Overrides the declared digest, for integrity fixtures. */
  declaredDigest?: string;
  /** Omits the blob from the archive while keeping its descriptor. */
  omitBlob?: boolean;
  /** Replaces the archived bytes without changing the descriptor. */
  substituteBytes?: Uint8Array;
}

export interface PackageSpec {
  /** Payload roles and their bytes. */
  payloads: Record<string, PayloadSpec>;
  /** Receives the computed payload descriptors and returns the manifest. */
  manifest: (payloads: Record<string, JsonObject>) => JsonObject;
  /** Additional archive entries, e.g. unexpected files or traversal paths. */
  extraEntries?: Record<string, Uint8Array>;
  /** Replaces the manifest entry name, e.g. to misplace it. */
  manifestEntryName?: string;
}

export interface BuiltPackage {
  archive: Uint8Array;
  manifest: JsonObject;
  manifestBytes: Uint8Array;
  /** Blob entries as the inspector receives them in wire form. */
  blobs: { path: string; bytes: Uint8Array }[];
  /** Payload digests keyed by role. */
  digests: Record<string, string>;
}

export async function buildPackage(spec: PackageSpec): Promise<BuiltPackage> {
  const descriptors: Record<string, JsonObject> = {};
  const digests: Record<string, string> = {};
  const files: Record<string, Uint8Array> = {};
  const blobs: { path: string; bytes: Uint8Array }[] = [];

  for (const role of Object.keys(spec.payloads).sort()) {
    const payload = spec.payloads[role];
    const digest = await sha256Digest(payload.bytes);
    digests[role] = digest;

    const declaredDigest = payload.declaredDigest ?? digest;
    descriptors[role] = {
      digest: declaredDigest,
      size: payload.declaredSize ?? payload.bytes.byteLength,
      mediaType: payload.mediaType ?? "model/gltf-binary",
    };

    if (payload.omitBlob) continue;
    const path = blobFileName(declaredDigest);
    const bytes = payload.substituteBytes ?? payload.bytes;
    // Two roles with identical content address the same blob, so the archive
    // and the wire-form blob list must both carry it once.
    if (path in files) continue;
    files[path] = bytes;
    blobs.push({ path, bytes });
  }

  const manifest = spec.manifest(descriptors);
  const manifestBytes = encoder.encode(JSON.stringify(manifest, null, 2));
  files[spec.manifestEntryName ?? "manifest.json"] = manifestBytes;

  for (const [path, bytes] of Object.entries(spec.extraEntries ?? {})) files[path] = bytes;

  const archive = zipSync(files, { mtime: FIXTURE_MTIME, level: 6 });
  return { archive, manifest, manifestBytes, blobs, digests };
}

/** Builds a raw ZIP from explicit entries, for adversarial archive fixtures. */
export function buildRawArchive(entries: Record<string, Uint8Array>): Uint8Array {
  return zipSync(entries, { mtime: FIXTURE_MTIME, level: 6 });
}

export function utf8(text: string): Uint8Array {
  return encoder.encode(text);
}
