/**
 * Bounded, in-memory `.nookpkg` inspection.
 *
 * Two properties matter more than anything else here:
 *
 * 1. **Nothing is written anywhere.** Entries are decompressed into memory and
 *    returned. No untrusted path ever reaches a filesystem, so path traversal
 *    is a validation concern rather than an exploit surface.
 * 2. **Limits are checked before the work they bound.** The archive policy is
 *    evaluated entirely against central-directory metadata, and only entries
 *    that pass are handed to the decompressor. A decompression bomb is
 *    rejected from its declared size and never expanded.
 *
 * `fflate` is the parser of record: it performs all enumeration and all
 * decompression. `readCentralDirectory` below is a metadata supplement, not a
 * second parser — it decompresses nothing and reads only the documented
 * integer fields that `fflate`'s filter API does not surface (general-purpose
 * flags for encryption, external attributes for links). When it cannot make
 * sense of the bytes it yields to fflate rather than reporting a defect.
 */

import { unzipSync } from "fflate";
import type { DiagnosticCollector } from "./diagnostics.ts";
import type { ArchiveLimits } from "./types.ts";
import type { BlobEntry } from "./integrity.ts";

export const MANIFEST_ENTRY_NAME = "manifest.json";
export const BLOB_DIRECTORY = "blobs/";

/** ZIP compression methods this reader accepts. */
const STORED = 0;
const DEFLATED = 8;

/** General-purpose bit flags that make an entry unsafe to read. */
const FLAG_ENCRYPTED = 0x0001;
const FLAG_STRONG_ENCRYPTION = 0x0040;

const SIGNATURE_EOCD = 0x06054b50;
const SIGNATURE_CENTRAL = 0x02014b50;
const HOST_UNIX = 3;
const UNIX_FILE_TYPE_MASK = 0xf000;
const UNIX_SYMLINK = 0xa000;

export interface ArchiveContents {
  manifest: Uint8Array;
  blobs: readonly BlobEntry[];
}

interface CentralEntry {
  name: string;
  flags: number;
  method: number;
  compressedSize: number;
  uncompressedSize: number;
  versionMadeBy: number;
  externalAttributes: number;
}

/**
 * Reads a `.nookpkg`.
 *
 * Returns `null` when the envelope could not be established safely. Callers
 * must stop rather than fall back: every deeper phase parses untrusted binary
 * content, and none of it is safe once the envelope is in doubt.
 */
export function readNookPackage(
  bytes: Uint8Array,
  limits: ArchiveLimits,
  diagnostics: DiagnosticCollector,
): ArchiveContents | null {
  if (bytes.byteLength > limits.maxArchiveBytes) {
    diagnostics.add(
      "NOOK-ARCHIVE-TOO-LARGE",
      "<archive>",
      `Archive is ${bytes.byteLength} bytes, over the ${limits.maxArchiveBytes}-byte limit.`,
    );
    return null;
  }

  const central = readCentralDirectory(bytes);
  if (!central) {
    diagnostics.add(
      "NOOK-ARCHIVE-UNREADABLE",
      "<archive>",
      "Archive has no readable ZIP central directory.",
    );
    return null;
  }

  if (central.length > limits.maxEntries) {
    diagnostics.add(
      "NOOK-ARCHIVE-TOO-MANY-ENTRIES",
      "<archive>",
      `Archive declares ${central.length} entries, over the ${limits.maxEntries}-entry limit.`,
    );
    return null;
  }

  // --- policy over declared metadata; nothing is expanded yet ---------------
  const accepted = new Map<string, CentralEntry>();
  const normalizedSeen = new Set<string>();
  let totalExpanded = 0;
  let manifestName: string | null = null;

  for (const entry of central) {
    const raw = entry.name;

    if (raw.endsWith("/")) continue; // directory marker, carries no content

    if (raw.length > limits.maxPathLength) {
      diagnostics.add(
        "NOOK-ARCHIVE-PATH-TOO-LONG",
        truncatePath(raw),
        `Entry path is ${raw.length} characters, over the ${limits.maxPathLength}-character limit.`,
      );
      return null;
    }
    if (isAbsolutePath(raw)) {
      diagnostics.add(
        "NOOK-ARCHIVE-ABSOLUTE-PATH",
        raw,
        "Entry path is absolute. Package entries must be relative to the package root.",
      );
      return null;
    }

    const normalized = normalizePath(raw);
    if (normalized === null) {
      diagnostics.add(
        "NOOK-ARCHIVE-PATH-TRAVERSAL",
        raw,
        "Entry path normalizes outside the package root. The entry is not read or written.",
      );
      return null;
    }
    if (normalizedSeen.has(normalized)) {
      diagnostics.add(
        "NOOK-ARCHIVE-DUPLICATE-PATH",
        normalized,
        "Two archive entries normalize to the same package path; which bytes a consumer would " +
          "read is ambiguous.",
      );
      return null;
    }
    normalizedSeen.add(normalized);

    if ((entry.flags & (FLAG_ENCRYPTED | FLAG_STRONG_ENCRYPTION)) !== 0) {
      diagnostics.add(
        "NOOK-ARCHIVE-UNSAFE-ENTRY",
        normalized,
        "Entry is encrypted. Package archives must be readable without a key.",
      );
      return null;
    }
    if (isSymlink(entry)) {
      diagnostics.add(
        "NOOK-ARCHIVE-UNSAFE-ENTRY",
        normalized,
        "Entry is a symbolic link. Links can redirect reads outside the package and are rejected.",
      );
      return null;
    }
    if (entry.method !== STORED && entry.method !== DEFLATED) {
      diagnostics.add(
        "NOOK-ARCHIVE-UNSAFE-ENTRY",
        normalized,
        `Entry uses unsupported compression method ${entry.method}; only store and deflate are read.`,
      );
      return null;
    }

    if (entry.uncompressedSize > limits.maxEntryExpandedBytes) {
      diagnostics.add(
        "NOOK-ARCHIVE-ENTRY-TOO-LARGE",
        normalized,
        `Entry expands to ${entry.uncompressedSize} bytes, over the per-entry limit of ` +
          `${limits.maxEntryExpandedBytes}. It is not expanded.`,
      );
      return null;
    }
    if (
      entry.compressedSize > 0 &&
      entry.uncompressedSize / entry.compressedSize > limits.maxCompressionRatio
    ) {
      diagnostics.add(
        "NOOK-ARCHIVE-COMPRESSION-RATIO",
        normalized,
        `Entry expands ${(entry.uncompressedSize / entry.compressedSize).toFixed(1)}×, over the ` +
          `ratio limit of ${limits.maxCompressionRatio}. It is not expanded.`,
      );
      return null;
    }

    totalExpanded += entry.uncompressedSize;
    if (totalExpanded > limits.maxTotalExpandedBytes) {
      diagnostics.add(
        "NOOK-ARCHIVE-EXPANSION-LIMIT",
        normalized,
        `Expanding archive entries would exceed the total limit of ` +
          `${limits.maxTotalExpandedBytes} bytes. Expansion stopped.`,
      );
      return null;
    }

    if (normalized === MANIFEST_ENTRY_NAME) {
      if (entry.uncompressedSize > limits.maxManifestBytes) {
        diagnostics.add(
          "NOOK-ARCHIVE-MANIFEST-TOO-LARGE",
          normalized,
          `Manifest expands to ${entry.uncompressedSize} bytes, over the ` +
            `${limits.maxManifestBytes}-byte limit.`,
        );
        return null;
      }
      manifestName = raw;
    } else if (normalized.endsWith(`/${MANIFEST_ENTRY_NAME}`)) {
      diagnostics.add(
        "NOOK-ARCHIVE-MANIFEST-MISPLACED",
        normalized,
        `A .nookpkg holds exactly one manifest at the archive root; found ${normalized}.`,
      );
      return null;
    } else if (!normalized.startsWith(BLOB_DIRECTORY)) {
      diagnostics.add(
        "NOOK-ARCHIVE-UNEXPECTED-ENTRY",
        normalized,
        `Entry is outside ${MANIFEST_ENTRY_NAME} and ${BLOB_DIRECTORY}; it is preserved by the ` +
          "archive but not read.",
      );
      continue;
    }

    accepted.set(raw, { ...entry, name: normalized });
  }

  if (manifestName === null) {
    diagnostics.add(
      "NOOK-ARCHIVE-MANIFEST-MISSING",
      MANIFEST_ENTRY_NAME,
      `A .nookpkg must contain exactly one ${MANIFEST_ENTRY_NAME} at the archive root.`,
    );
    return null;
  }

  // --- expand only what survived policy ------------------------------------
  let extracted: Record<string, Uint8Array>;
  try {
    extracted = unzipSync(bytes, { filter: (file) => accepted.has(file.name) });
  } catch (error) {
    diagnostics.add(
      "NOOK-ARCHIVE-UNREADABLE",
      "<archive>",
      `Archive could not be expanded: ${(error as Error).message}`,
    );
    return null;
  }

  let manifest: Uint8Array | null = null;
  const blobs: BlobEntry[] = [];

  for (const [rawName, entry] of accepted) {
    const data = extracted[rawName];
    if (!data) {
      diagnostics.add(
        "NOOK-ARCHIVE-UNREADABLE",
        entry.name,
        "Entry is listed in the central directory but its content could not be read.",
      );
      return null;
    }
    // Declared and actual expansion must agree, or the metadata the limits were
    // checked against was not describing these bytes.
    if (data.byteLength !== entry.uncompressedSize) {
      diagnostics.add(
        "NOOK-ARCHIVE-UNSAFE-ENTRY",
        entry.name,
        `Entry expanded to ${data.byteLength} bytes but declared ${entry.uncompressedSize}. ` +
          "Resource limits were evaluated against a size the archive did not honor.",
      );
      return null;
    }

    if (entry.name === MANIFEST_ENTRY_NAME) manifest = data;
    else blobs.push({ path: entry.name, bytes: data });
  }

  if (!manifest) {
    diagnostics.add(
      "NOOK-ARCHIVE-MANIFEST-MISSING",
      MANIFEST_ENTRY_NAME,
      `A .nookpkg must contain exactly one ${MANIFEST_ENTRY_NAME} at the archive root.`,
    );
    return null;
  }

  blobs.sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
  return { manifest, blobs };
}

// ---------------------------------------------------------------------------
// Path safety
// ---------------------------------------------------------------------------

function isAbsolutePath(path: string): boolean {
  return path.startsWith("/") || path.startsWith("\\") || /^[A-Za-z]:[\\/]/.test(path);
}

/**
 * Normalizes a package-relative path, or returns null when it escapes the root.
 *
 * Backslashes are rejected outright rather than translated: the ZIP format
 * specifies `/`, so a backslash is either a literal filename character or an
 * attempt to be read differently on Windows than here.
 */
export function normalizePath(path: string): string | null {
  if (path.includes("\\")) return null;
  if (path.includes("\0")) return null;

  const out: string[] = [];
  for (const segment of path.split("/")) {
    if (segment === "" || segment === ".") continue;
    if (segment === "..") return null;
    out.push(segment);
  }
  if (out.length === 0) return null;
  return out.join("/");
}

function truncatePath(path: string): string {
  return path.length <= 120 ? path : `${path.slice(0, 117)}...`;
}

function isSymlink(entry: CentralEntry): boolean {
  if (entry.versionMadeBy >> 8 !== HOST_UNIX) return false;
  const mode = (entry.externalAttributes >>> 16) & 0xffff;
  return (mode & UNIX_FILE_TYPE_MASK) === UNIX_SYMLINK;
}

// ---------------------------------------------------------------------------
// Central-directory metadata
// ---------------------------------------------------------------------------

/**
 * Reads central-directory records for policy metadata.
 *
 * Returns null when the structure cannot be walked, in which case the caller
 * reports an unreadable archive. This never decompresses and never allocates
 * based on a declared size.
 */
function readCentralDirectory(bytes: Uint8Array): CentralEntry[] | null {
  if (bytes.byteLength < 22) return null;
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);

  // End-of-central-directory, scanning back across a possible trailing comment.
  let eocd = -1;
  const earliest = Math.max(0, bytes.byteLength - 22 - 0xffff);
  for (let offset = bytes.byteLength - 22; offset >= earliest; offset -= 1) {
    if (view.getUint32(offset, true) === SIGNATURE_EOCD) {
      eocd = offset;
      break;
    }
  }
  if (eocd < 0) return null;

  const count = view.getUint16(eocd + 10, true);
  let offset = view.getUint32(eocd + 16, true);
  const decoder = new TextDecoder("utf-8");
  const entries: CentralEntry[] = [];

  for (let i = 0; i < count; i += 1) {
    if (offset + 46 > bytes.byteLength) return null;
    if (view.getUint32(offset, true) !== SIGNATURE_CENTRAL) return null;

    const nameLength = view.getUint16(offset + 28, true);
    const extraLength = view.getUint16(offset + 30, true);
    const commentLength = view.getUint16(offset + 32, true);
    const nameStart = offset + 46;
    if (nameStart + nameLength > bytes.byteLength) return null;

    entries.push({
      name: decoder.decode(bytes.subarray(nameStart, nameStart + nameLength)),
      versionMadeBy: view.getUint16(offset + 4, true),
      flags: view.getUint16(offset + 8, true),
      method: view.getUint16(offset + 10, true),
      compressedSize: view.getUint32(offset + 20, true),
      uncompressedSize: view.getUint32(offset + 24, true),
      externalAttributes: view.getUint32(offset + 38, true),
    });

    offset = nameStart + nameLength + extraLength + commentLength;
  }

  return entries;
}
