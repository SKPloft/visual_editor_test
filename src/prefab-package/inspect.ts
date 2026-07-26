/**
 * Staged, side-effect-free package inspection.
 *
 * Bytes in, immutable result out. Nothing here writes a file, opens a socket,
 * mutates editor state, or partially installs anything — inspecting a hostile
 * package and inspecting a valid one differ only in what the result says.
 *
 * Phases run in the contract's order so that no phase interprets data an
 * earlier phase has not established. A fatal envelope defect stops deeper
 * parsing, because continuing would mean parsing untrusted binary content whose
 * framing is already known to be wrong. Every other defect is accumulated, so
 * one inspection reports every safely discoverable problem rather than making
 * a creator fix them one round-trip at a time.
 */

import { DiagnosticCollector } from "./diagnostics.ts";
import { readNookPackage } from "./archive.ts";
import { verifyIntegrity, type BlobEntry } from "./integrity.ts";
import { parseManifestBytes } from "./manifest.ts";
import { parseGlbPayload } from "./glb.ts";
import { inspectProfile, unparsedRepresentation } from "./profile.ts";
import { validateParameters } from "./parameters.ts";
import { assessCapabilities } from "./capabilities.ts";
import { validateDependencies } from "./dependencies.ts";
import { resolvePolicy, type PolicyOverrides } from "./policy.ts";
import { REQUIRED_PAYLOAD_ROLES } from "./registry.ts";
import type {
  DependencyResolver,
  DiscoveredReference,
  InspectionPolicy,
  InspectionResult,
  PayloadRepresentation,
  PrefabManifest,
} from "./types.ts";

export interface InspectOptions {
  /** Limit and role overrides merged onto the defaults. */
  policy?: PolicyOverrides;
  /** Injected local dependency context. Omit when none is available. */
  resolver?: DependencyResolver | null;
  /** Digest the caller expects this manifest to have, e.g. from a pinned reference. */
  expectedManifestDigest?: string;
}

/** Inspects `.nookpkg` bytes. */
export async function inspectPackageArchive(
  bytes: Uint8Array,
  options: InspectOptions = {},
): Promise<InspectionResult> {
  const policy = resolvePolicy(options.policy);
  const diagnostics = new DiagnosticCollector();

  const archive = readNookPackage(bytes, policy.archive, diagnostics);
  if (!archive) return emptyResult(diagnostics);

  return runSemanticPhases(archive.manifest, archive.blobs, policy, diagnostics, options);
}

/**
 * Inspects a manifest with direct blob access — the wire form, where blobs are
 * fetched by digest from a CAS rather than unpacked from an archive.
 */
export async function inspectPackage(
  manifestBytes: Uint8Array,
  blobs: readonly BlobEntry[],
  options: InspectOptions = {},
): Promise<InspectionResult> {
  const policy = resolvePolicy(options.policy);
  const diagnostics = new DiagnosticCollector();
  return runSemanticPhases(manifestBytes, blobs, policy, diagnostics, options);
}

async function runSemanticPhases(
  manifestBytes: Uint8Array,
  blobs: readonly BlobEntry[],
  policy: InspectionPolicy,
  diagnostics: DiagnosticCollector,
  options: InspectOptions,
): Promise<InspectionResult> {
  // --- phase 2: manifest structure -----------------------------------------
  const { manifest, specSupported } = parseManifestBytes(
    manifestBytes,
    "manifest.json",
    policy,
    diagnostics,
  );
  if (!manifest) return emptyResult(diagnostics);

  // --- phase 3: canonical identity and blob integrity ----------------------
  const integrity = await verifyIntegrity(manifest, blobs, diagnostics, {
    expectedManifestDigest: options.expectedManifestDigest,
  });

  // An unsupported major means this consumer cannot interpret the manifest's
  // semantics at all. Metadata and integrity are still reported, because they
  // are what a creator or operator needs to identify the package; guessing at
  // parameters or profile rules under an unknown major would be invention.
  if (!specSupported) {
    return {
      valid: false,
      supportState: "unsupported-spec",
      configurable: false,
      manifest,
      manifestDigest: integrity.manifestDigest,
      payloads: integrity.inventory,
      representations: [],
      discoveredCapabilities: [],
      discoveredReferences: [],
      dependencyReport: null,
      diagnostics: diagnostics.drainSorted(),
    };
  }

  // --- phase 4: GLB parse and portable profile -----------------------------
  const usedCapabilities = new Set<string>();
  const representations: PayloadRepresentation[] = [];

  for (const role of Object.keys(manifest.payloads).sort()) {
    const descriptor = manifest.payloads[role];
    if (!descriptor.known) continue; // unknown slots are preserved and ignored

    const bytes = integrity.verified.get(role);
    if (!bytes) {
      // Integrity already reported why. Recording the role keeps the
      // representation list complete for callers that iterate it.
      representations.push(unparsedRepresentation(role, descriptor.digest));
      continue;
    }

    const context = {
      role,
      digest: descriptor.digest,
      location: blobPath(blobs, descriptor.digest, role),
    };
    const parsed = await parseGlbPayload(bytes, context, policy.payload, diagnostics);
    if (!parsed) {
      representations.push(unparsedRepresentation(role, descriptor.digest));
      continue;
    }

    const profile = inspectProfile(parsed, context, policy.payload, diagnostics);
    for (const capability of profile.usedCapabilities) usedCapabilities.add(capability);
    representations.push({ ...profile.representation, byteLength: bytes.byteLength });
  }

  const byRole = new Map(representations.map((representation) => [representation.role, representation]));

  // --- phase 5: parameters, paths, bindings --------------------------------
  const parameters = validateParameters(manifest, byRole, policy, diagnostics);
  for (const capability of parameters.usedCapabilities) usedCapabilities.add(capability);

  // --- phase 6: dependency coverage and graph ------------------------------
  const dependencyReport = validateDependencies(
    manifest,
    representations,
    parameters.discoveredReferences,
    options.resolver ?? null,
    policy,
    diagnostics,
  );

  // --- phase 7: capability governance --------------------------------------
  const assessment = assessCapabilities(manifest, [...usedCapabilities].sort(), policy, diagnostics);

  return {
    valid: !diagnostics.hasErrors(),
    supportState: assessment.supportState,
    configurable: assessment.configurable && !diagnostics.hasErrors(),
    manifest,
    manifestDigest: integrity.manifestDigest,
    payloads: integrity.inventory,
    representations,
    discoveredCapabilities: [...usedCapabilities].sort(),
    discoveredReferences: dependencyReport.discovered as readonly DiscoveredReference[],
    dependencyReport,
    diagnostics: diagnostics.drainSorted(),
  };
}

/**
 * Locates a blob for diagnostic reporting.
 *
 * Falls back to the role name when no blob is present, so a diagnostic about a
 * missing payload still points somewhere meaningful.
 */
function blobPath(blobs: readonly BlobEntry[], digest: string, role: string): string {
  const match = blobs.find((blob) => blob.path.includes(digest.replace(":", "_")));
  return match ? match.path : `payloads/${role}`;
}

function emptyResult(diagnostics: DiagnosticCollector): InspectionResult {
  return {
    valid: false,
    supportState: "unsupported-spec",
    configurable: false,
    manifest: null,
    manifestDigest: null,
    payloads: [],
    representations: [],
    discoveredCapabilities: [],
    discoveredReferences: [],
    dependencyReport: null,
    diagnostics: diagnostics.drainSorted(),
  };
}

/** Roles a valid `nook.prefab/1` package must carry. Re-exported for callers building fixtures. */
export const REQUIRED_ROLES = REQUIRED_PAYLOAD_ROLES;

export type { PrefabManifest };
