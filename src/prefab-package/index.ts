/**
 * Nook prefab package contract — local inspection and validation.
 *
 * This subsystem is deliberately isolated: it imports nothing from `src/scene`
 * or `src/export`, holds no editor state, and performs no I/O. Its entire
 * surface is "bytes in, immutable inspection result out". See
 * `docs/PREFAB_PACKAGE_FORMAT.md` for the contract and `DEPENDENCIES.md` for
 * why each parser was chosen.
 */

export {
  DIAGNOSTIC_CATALOG,
  DIAGNOSTIC_CODES,
  PHASES,
  compareDiagnostics,
  sortDiagnostics,
  type Diagnostic,
  type DiagnosticCode,
  type DiagnosticSeverity,
  type ValidationPhase,
} from "./diagnostics.ts";

export {
  DEFAULT_POLICY,
  allowsConfiguration,
  allowsDegradedConsumption,
  resolvePolicy,
  type PolicyOverrides,
} from "./policy.ts";

export {
  blobFileName,
  canonicalJsonBytes,
  canonicalJsonString,
  canonicalStringArray,
  digestOfManifest,
  isCanonicalStringArray,
  isValidDigest,
  manifestDigest,
  sha256Digest,
} from "./canonical.ts";

export {
  isExactSemver,
  isValidIdentifier,
  parseManifest,
  parseManifestBytes,
  parseReference,
} from "./manifest.ts";

export { verifyIntegrity, type BlobEntry, type IntegrityResult } from "./integrity.ts";

export {
  COMPONENT_REGISTRY,
  ENUM_DOMAINS,
  KNOWN_REPRESENTATIONS,
  PATH_CAPABILITY,
  PROFILE_EXTENSIONS,
  REQUIRED_PAYLOAD_ROLES,
  RESERVED_PARAMETER_TYPES,
  RESERVED_ROOT_NODE_ID,
  SPEC_NAME,
  SUPPORTED_PARAMETER_TYPES,
  SUPPORTED_SPEC_MAJOR,
  compatibleValueKinds,
  defaultSupportedCapabilities,
  isSupportedParameterType,
  isTypeCompatible,
  parameterCapability,
  type ValueKind,
} from "./registry.ts";

export type {
  CapabilityId,
  ConsumerRole,
  DependencyReport,
  DependencyResolver,
  DiscoveredReference,
  InspectionPolicy,
  InspectionResult,
  JsonObject,
  JsonValue,
  Mat4,
  ManifestMeta,
  MigrationHints,
  NestedPrefabInstance,
  PackageReference,
  ParameterBinding,
  ParameterDeclaration,
  PayloadComponent,
  PayloadDescriptor,
  PayloadInventoryEntry,
  PayloadNode,
  PayloadRepresentation,
  PrefabInstanceRecord,
  PrefabManifest,
  SupportState,
  UnknownFields,
} from "./types.ts";

export { referenceIdentity, referenceKey } from "./types.ts";
