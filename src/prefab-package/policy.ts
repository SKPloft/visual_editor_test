/**
 * Default inspection policy.
 *
 * Limit *values* are environment policy, not contract semantics: a browser and
 * a backend may legitimately choose different ceilings for the same package.
 * What the contract fixes is that a limit exists, that it is checked before the
 * work it bounds, and which diagnostic code reports it. Callers override any
 * subset through `resolvePolicy`.
 */

import type { ConsumerRole, InspectionPolicy } from "./types.ts";
import { SUPPORTED_SPEC_MAJOR, defaultSupportedCapabilities } from "./registry.ts";

const MIB = 1024 * 1024;

export const DEFAULT_POLICY: InspectionPolicy = {
  archive: {
    maxArchiveBytes: 512 * MIB,
    maxEntries: 64,
    maxEntryExpandedBytes: 256 * MIB,
    maxTotalExpandedBytes: 1024 * MIB,
    maxCompressionRatio: 200,
    maxManifestBytes: 4 * MIB,
    maxPathLength: 512,
  },
  payload: {
    maxBlobBytes: 256 * MIB,
    maxJsonBytes: 32 * MIB,
    maxNodes: 100_000,
    maxPrimitives: 200_000,
    maxMaterials: 10_000,
    maxTextures: 10_000,
    maxImages: 10_000,
    maxNodeDepth: 256,
  },
  path: {
    maxPathLength: 512,
    maxSegments: 32,
  },
  role: "import",
  supportedCapabilities: defaultSupportedCapabilities(),
  supportedSpecMajor: SUPPORTED_SPEC_MAJOR,
  marketplace: false,
  unusedDependencySeverity: "WARNING",
  unresolvedDependencySeverity: "INFO",
};

export interface PolicyOverrides extends Partial<Omit<InspectionPolicy, "archive" | "payload" | "path">> {
  archive?: Partial<InspectionPolicy["archive"]>;
  payload?: Partial<InspectionPolicy["payload"]>;
  path?: Partial<InspectionPolicy["path"]>;
}

/** Merges overrides onto the defaults one nested group at a time. */
export function resolvePolicy(overrides: PolicyOverrides = {}): InspectionPolicy {
  return {
    ...DEFAULT_POLICY,
    ...overrides,
    archive: { ...DEFAULT_POLICY.archive, ...overrides.archive },
    payload: { ...DEFAULT_POLICY.payload, ...overrides.payload },
    path: { ...DEFAULT_POLICY.path, ...overrides.path },
    supportedCapabilities: overrides.supportedCapabilities
      ? [...overrides.supportedCapabilities].sort()
      : DEFAULT_POLICY.supportedCapabilities,
  };
}

/**
 * Roles that explicitly accept degraded consumption of a package whose
 * required capabilities they do not support. Any other role rejects it.
 */
const DEGRADED_ROLES: readonly ConsumerRole[] = ["inspect-only", "proxy-render-only"];

export function allowsDegradedConsumption(role: ConsumerRole): boolean {
  return DEGRADED_ROLES.includes(role);
}

/**
 * Whether a role may configure instances or republish. Degraded roles never
 * may — that prohibition is what makes "unsupported but readable" safe.
 */
export function allowsConfiguration(role: ConsumerRole): boolean {
  return !DEGRADED_ROLES.includes(role);
}
