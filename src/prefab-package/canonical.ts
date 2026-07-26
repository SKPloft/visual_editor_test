/**
 * Canonical serialization and content identity.
 *
 * A version's machine identity is `sha256(JCS(manifest))`. Two independently
 * written implementations must agree on those bytes exactly, so everything
 * here is deliberately mechanical.
 */

import canonicalize from "canonicalize";
import type { JsonObject, JsonValue, PrefabManifest } from "./types.ts";

const DIGEST_PATTERN = /^sha256:[0-9a-f]{64}$/;

export function isValidDigest(value: unknown): value is string {
  return typeof value === "string" && DIGEST_PATTERN.test(value);
}

/** RFC 8785 JSON Canonicalization Scheme bytes for a JSON value. */
export function canonicalJsonString(value: JsonValue): string {
  const canonical = canonicalize(value);
  if (typeof canonical !== "string") {
    throw new TypeError("value is not canonicalizable JSON");
  }
  return canonical;
}

export function canonicalJsonBytes(value: JsonValue): Uint8Array {
  return new TextEncoder().encode(canonicalJsonString(value));
}

/** `sha256:<lowercase hex>` over raw bytes. Blob identity uses this directly. */
export async function sha256Digest(bytes: Uint8Array): Promise<string> {
  const source = bytes.byteOffset === 0 && bytes.byteLength === bytes.buffer.byteLength
    ? bytes.buffer
    : bytes.slice().buffer;
  const hash = await crypto.subtle.digest("SHA-256", source as ArrayBuffer);
  const hex = Array.from(new Uint8Array(hash), (b) => b.toString(16).padStart(2, "0")).join("");
  return `sha256:${hex}`;
}

/**
 * The manifest's own version identity.
 *
 * Computed over the verbatim source object, so unknown optional fields
 * preserved through a read-modify-write continue to participate in identity
 * exactly as the contract requires. The manifest must not contain its own
 * digest; `manifest.ts` rejects one before this is reached.
 */
export async function manifestDigest(raw: JsonObject): Promise<string> {
  return sha256Digest(canonicalJsonBytes(raw));
}

/** Convenience wrapper for a parsed manifest. */
export async function digestOfManifest(manifest: PrefabManifest): Promise<string> {
  return manifestDigest(manifest.raw);
}

/**
 * Deterministic blob filename inside a `.nookpkg`: `blobs/sha256_<hex><ext>`.
 *
 * Filenames are a convenience for humans and archive tools. They are never a
 * substitute for verifying bytes, and the archive reader treats a name/digest
 * disagreement as bytes-win.
 */
export function blobFileName(digest: string, extension = ".glb"): string {
  const [algorithm, hex] = digest.split(":", 2);
  return `blobs/${algorithm}_${hex}${extension}`;
}

/**
 * Whether an array is sorted ascending and free of duplicates, which the
 * contract requires of `requires` and `dependencies` before hashing.
 */
export function isCanonicalStringArray(values: readonly string[]): boolean {
  for (let i = 1; i < values.length; i += 1) {
    if (values[i - 1] >= values[i]) return false;
  }
  return true;
}

export function canonicalStringArray(values: readonly string[]): string[] {
  return [...new Set(values)].sort();
}
