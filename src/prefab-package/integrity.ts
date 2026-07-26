/**
 * Canonical identity and blob integrity.
 *
 * Blob identity is the bytes, never the filename. A `.nookpkg` names blobs
 * after their digest purely for human and tooling convenience, so this phase
 * hashes every blob it was given and matches on the result. A file named after
 * the expected digest but holding different bytes is a substitution, and is
 * reported as a digest mismatch rather than resolving by name.
 */

import type { DiagnosticCollector } from "./diagnostics.ts";
import { blobFileName, manifestDigest, sha256Digest } from "./canonical.ts";
import type { PayloadDescriptor, PayloadInventoryEntry, PrefabManifest } from "./types.ts";

/** A blob as it was found, with its package-relative path retained for diagnostics. */
export interface BlobEntry {
  /** Package-relative path, e.g. `blobs/sha256_….glb`. Informational only. */
  path: string;
  bytes: Uint8Array;
}

export interface IntegrityResult {
  inventory: readonly PayloadInventoryEntry[];
  /** Verified bytes keyed by payload role. A role is absent when it failed verification. */
  verified: ReadonlyMap<string, Uint8Array>;
  /** `sha256:<hex>` of the manifest under RFC 8785 JCS. */
  manifestDigest: string;
}

export interface IntegrityOptions {
  /**
   * Digest the caller expects this manifest to have, e.g. from a registry
   * binding or a package reference. Omitted when the package is inspected
   * standalone and there is nothing to disagree with.
   */
  expectedManifestDigest?: string;
  /**
   * Payload roles the caller deliberately obtained and expects to verify.
   * Omitted means every declared role, the strict archive/publication default.
   */
  expectedRoles?: readonly string[];
  /**
   * Blobs present in the archive that no payload declares. `.nookpkg` is a
   * single-package archive, so extras are a defect rather than a dependency
   * bundle.
   */
  rejectExtraBlobs?: boolean;
}

export async function verifyIntegrity(
  manifest: PrefabManifest,
  blobs: readonly BlobEntry[],
  diagnostics: DiagnosticCollector,
  options: IntegrityOptions = {},
): Promise<IntegrityResult> {
  const digest = await manifestDigest(manifest.raw);

  if (options.expectedManifestDigest && options.expectedManifestDigest !== digest) {
    diagnostics.add(
      "NOOK-MANIFEST-DIGEST-MISMATCH",
      "manifest.json",
      `Manifest canonicalizes to ${digest} but ${options.expectedManifestDigest} was expected. ` +
        "The manifest content does not match the identity it is being resolved under.",
      { packageRef: `${manifest.id}@${manifest.version}` },
    );
  }

  // Hash every blob once; identity is the result, not the filename.
  const byDigest = new Map<string, BlobEntry>();
  const byPath = new Map<string, BlobEntry>();
  const actualDigests = new Map<BlobEntry, string>();
  for (const blob of blobs) {
    const blobDigest = await sha256Digest(blob.bytes);
    actualDigests.set(blob, blobDigest);
    byPath.set(blob.path, blob);
    if (!byDigest.has(blobDigest)) byDigest.set(blobDigest, blob);
  }

  const inventory: PayloadInventoryEntry[] = [];
  const verified = new Map<string, Uint8Array>();
  const claimed = new Set<BlobEntry>();
  // Strict archive/publication inspection expects every declared role. A caller
  // that deliberately fetched only a preview proxy opts into a narrower set;
  // absent roles are then an explicit incomplete-inspection fact, not a broken
  // package. `expectedRoles` is a caller decision because role-to-payload maps
  // vary by consumer and do not belong in this generic policy mechanism.
  const expectedRoles = new Set(options.expectedRoles ?? Object.keys(manifest.payloads));

  for (const role of Object.keys(manifest.payloads).sort()) {
    const descriptor = manifest.payloads[role];
    const entry = resolveBlob(descriptor, byDigest, byPath);

    if (!entry) {
      const expectedPath = descriptor.digest ? blobFileName(descriptor.digest) : `blobs/${role}`;
      const expected = expectedRoles.has(role);
      diagnostics.add(
        expected ? "NOOK-BLOB-MISSING" : "NOOK-BLOB-NOT-INSPECTED",
        expectedPath,
        expected
          ? `Payload role ${role} declares ${descriptor.digest} but no blob with those bytes is available.`
          : `Payload role ${role} was not provided for this inspection, so its integrity was not verified. ` +
            "Fetch it before consuming a workflow that requires this role.",
        { representation: role, blobDigest: descriptor.digest || undefined },
      );
      inventory.push({
        role,
        digest: descriptor.digest,
        declaredSize: descriptor.size,
        actualSize: null,
        present: false,
        digestVerified: false,
        known: descriptor.known,
      });
      continue;
    }

    claimed.add(entry);
    const actual = actualDigests.get(entry)!;
    const digestMatches = actual === descriptor.digest;
    const sizeMatches = entry.bytes.byteLength === descriptor.size;

    if (!digestMatches) {
      diagnostics.add(
        "NOOK-BLOB-DIGEST-MISMATCH",
        entry.path,
        `Blob for role ${role} hashes to ${actual} but the descriptor declares ${descriptor.digest}. ` +
          "The bytes were substituted; they are not parsed as a trusted payload.",
        { representation: role, blobDigest: descriptor.digest || undefined },
      );
    }
    if (!sizeMatches) {
      diagnostics.add(
        "NOOK-BLOB-SIZE-MISMATCH",
        entry.path,
        `Blob for role ${role} is ${entry.bytes.byteLength} bytes but the descriptor declares ` +
          `${descriptor.size}.`,
        { representation: role, blobDigest: descriptor.digest || undefined },
      );
    }

    inventory.push({
      role,
      digest: descriptor.digest,
      declaredSize: descriptor.size,
      actualSize: entry.bytes.byteLength,
      present: true,
      digestVerified: digestMatches && sizeMatches,
      known: descriptor.known,
    });

    // Both checks must pass before any semantic parser sees these bytes.
    if (digestMatches && sizeMatches) verified.set(role, entry.bytes);
  }

  if (options.rejectExtraBlobs !== false) {
    for (const blob of blobs) {
      if (claimed.has(blob)) continue;
      diagnostics.add(
        "NOOK-BLOB-EXTRA",
        blob.path,
        "The archive contains a blob no payload descriptor declares. A .nookpkg carries exactly " +
          "one manifest and that package's own payloads.",
        { blobDigest: actualDigests.get(blob) },
      );
    }
  }

  return { inventory, verified, manifestDigest: digest };
}

/**
 * Finds the blob a descriptor refers to.
 *
 * Bytes win: a content match is authoritative. Falling back to the derived
 * filename exists only so a substituted blob can be reported as a mismatch at
 * its real location instead of vanishing into a generic "missing".
 */
function resolveBlob(
  descriptor: PayloadDescriptor,
  byDigest: ReadonlyMap<string, BlobEntry>,
  byPath: ReadonlyMap<string, BlobEntry>,
): BlobEntry | undefined {
  if (descriptor.digest) {
    const exact = byDigest.get(descriptor.digest);
    if (exact) return exact;
    return byPath.get(blobFileName(descriptor.digest));
  }
  return undefined;
}
