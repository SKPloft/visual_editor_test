/**
 * Public contract models for Nook prefab packages.
 *
 * These are the inspector's own types. No parser library type appears here, so
 * swapping the ZIP or glTF implementation cannot change the contract surface.
 *
 * Every extensible level carries an `unknown` bag holding the fields this
 * version of the contract does not recognize, and every parsed manifest keeps
 * `raw` verbatim. Round-trip preservation and canonical identity both depend
 * on that: reserialization emits the original JSON value, so unrecognized data
 * survives and continues to participate in the manifest digest.
 */

import type { Diagnostic } from "./diagnostics.ts";

export type JsonValue = null | boolean | number | string | JsonValue[] | JsonObject;
export interface JsonObject {
  [key: string]: JsonValue | undefined;
}

/** Fields present in the source document that this contract version does not define. */
export type UnknownFields = Readonly<Record<string, JsonValue>>;

// ---------------------------------------------------------------------------
// References
// ---------------------------------------------------------------------------

/**
 * The unified reference envelope shared by dependencies, nested instances,
 * reference-typed parameter values, and world instance records.
 */
export interface PackageReference {
  kind: string;
  id: string;
  version: string;
  digest: string;
  unknown: UnknownFields;
}

/** `kind:id@version` — the stable sort and identity key for a reference. */
export function referenceKey(ref: PackageReference): string {
  return `${ref.kind}:${ref.id}@${ref.version}`;
}

/** Full identity including digest, used where two same-tuple references must be distinguished. */
export function referenceIdentity(ref: PackageReference): string {
  return `${referenceKey(ref)}#${ref.digest}`;
}

// ---------------------------------------------------------------------------
// Manifest
// ---------------------------------------------------------------------------

export interface PayloadDescriptor {
  /** Slot name, e.g. `proxy`, `full`, or an unknown future slot. */
  role: string;
  digest: string;
  size: number;
  mediaType: string;
  /** True when the role is not defined by this contract version and is preserved unread. */
  known: boolean;
  unknown: UnknownFields;
}

export interface ManifestMeta {
  name: string;
  author?: string;
  category?: string;
  tags: readonly string[];
  unknown: UnknownFields;
}

export interface ParameterBinding {
  representation: string;
  nodeId: string;
  propertyPath: string;
  required: boolean;
  unknown: UnknownFields;
}

export interface ParameterDeclaration {
  paramId: string;
  displayName?: string;
  description?: string;
  /** Declared type name. May be a reserved or unregistered name; validation decides. */
  type: string;
  constraints: JsonObject;
  default: JsonValue;
  bindings: readonly ParameterBinding[];
  unknown: UnknownFields;
}

export interface MigrationHints {
  /** Obsolete `paramId` → replacement `paramId`. Exceptional channel only. */
  parameterReplacements: Readonly<Record<string, string>>;
  unknown: UnknownFields;
}

export interface PrefabManifest {
  /** Raw `spec` string, e.g. `nook.prefab/1`. */
  spec: string;
  specName: string;
  specMajor: number;
  id: string;
  version: string;
  meta: ManifestMeta;
  requires: readonly string[];
  parameters: readonly ParameterDeclaration[];
  dependencies: readonly PackageReference[];
  /** Keyed by role. Unknown roles are preserved with `known: false`. */
  payloads: Readonly<Record<string, PayloadDescriptor>>;
  migrationHints?: MigrationHints;
  unknown: UnknownFields;
  /** Verbatim source object. The canonical digest is computed over this. */
  raw: JsonObject;
}

// ---------------------------------------------------------------------------
// Capabilities
// ---------------------------------------------------------------------------

/** A parsed `namespace[/name]@version` capability identifier. */
export interface CapabilityId {
  raw: string;
  namespace: string;
  name?: string;
  version: number;
  /** True for the reserved `x.*` experimental prefix. */
  experimental: boolean;
}

// ---------------------------------------------------------------------------
// Payload inspection
// ---------------------------------------------------------------------------

/** One node of a payload, flattened from the glTF node array. */
export interface PayloadNode {
  /** Index into the glTF `nodes` array. */
  index: number;
  name?: string;
  /** `extras.nook.nodeId`, when declared. */
  nodeId?: string;
  parent: number | null;
  children: readonly number[];
  isPackageRoot: boolean;
  /** TRS or matrix, normalized to a column-major 4×4 matrix. */
  localMatrix: Mat4;
  mesh?: number;
  /** Registered Nook components declared at `extras.nook.components`. */
  components: readonly PayloadComponent[];
  /** Nested prefab instance declared at `extras.nook.prefabInstance`. */
  prefabInstance?: NestedPrefabInstance;
}

export interface PayloadComponent {
  name: string;
  /** Capability this component maps to, e.g. `nook.component/collider@1`. */
  capability: string;
  fields: JsonObject;
  known: boolean;
}

export interface NestedPrefabInstance {
  reference: PackageReference;
  params: Readonly<Record<string, JsonValue>>;
  unknown: UnknownFields;
}

/** A parsed, profile-checked payload representation. */
export interface PayloadRepresentation {
  role: string;
  digest: string;
  byteLength: number;
  /** False when the GLB could not be parsed; the remaining fields are then empty. */
  parsed: boolean;
  nodes: readonly PayloadNode[];
  /** Package root node index, or null when absent or ambiguous. */
  rootIndex: number | null;
  /** Stored package-root local transform, identity when the root is unresolved. */
  storedRootMatrix: Mat4;
  materialNames: readonly (string | undefined)[];
  counts: PayloadCounts;
  extensionsUsed: readonly string[];
  extensionsRequired: readonly string[];
  /** Verbatim glTF JSON chunk, retained for round-trip and targeted inspection. */
  json: JsonObject | null;
}

export interface PayloadCounts {
  nodes: number;
  meshes: number;
  primitives: number;
  materials: number;
  textures: number;
  images: number;
  maxDepth: number;
}

// ---------------------------------------------------------------------------
// Transforms
// ---------------------------------------------------------------------------

/** Column-major 4×4 matrix, glTF convention. */
export type Mat4 = readonly number[];

// ---------------------------------------------------------------------------
// Policy
// ---------------------------------------------------------------------------

export interface ArchiveLimits {
  maxArchiveBytes: number;
  maxEntries: number;
  maxEntryExpandedBytes: number;
  maxTotalExpandedBytes: number;
  /** Rejects entries whose declared expansion exceeds this multiple of their compressed size. */
  maxCompressionRatio: number;
  maxManifestBytes: number;
  maxPathLength: number;
}

export interface PayloadLimits {
  maxBlobBytes: number;
  maxJsonBytes: number;
  maxNodes: number;
  maxPrimitives: number;
  maxMaterials: number;
  maxTextures: number;
  maxImages: number;
  maxNodeDepth: number;
}

export interface PathLimits {
  maxPathLength: number;
  maxSegments: number;
}

/**
 * Consumer role. Roles differ in what they may do with a package, not in what
 * the contract considers valid.
 */
export type ConsumerRole =
  | "import"
  | "publish"
  | "bake"
  /** Force-open an unsupported package for reading only. Cannot configure or republish. */
  | "inspect-only"
  /** Render the proxy of an unsupported package. Cannot configure or republish. */
  | "proxy-render-only";

export interface InspectionPolicy {
  archive: ArchiveLimits;
  payload: PayloadLimits;
  path: PathLimits;
  role: ConsumerRole;
  /** Capability identifiers this consumer supports, e.g. `nook.parameter/color@1`. */
  supportedCapabilities: readonly string[];
  /** Highest supported `nook.prefab` major. */
  supportedSpecMajor: number;
  /** Applies marketplace publication policy, notably rejecting `x.*` capabilities. */
  marketplace: boolean;
  /** Severity for a declared dependency the package does not use. */
  unusedDependencySeverity: "ERROR" | "WARNING" | "INFO";
  /** Severity for a dependency the injected resolver cannot supply. */
  unresolvedDependencySeverity: "ERROR" | "WARNING" | "INFO";
}

// ---------------------------------------------------------------------------
// Dependency resolution
// ---------------------------------------------------------------------------

/**
 * Injected local dependency context. The inspector never fetches: a resolver
 * returning `null` means "not available locally", which is reported distinctly
 * from an inconsistent declaration.
 */
export interface DependencyResolver {
  resolve(reference: PackageReference): PrefabManifest | null;
}

export interface DiscoveredReference {
  reference: PackageReference;
  /** Where the reference was found. */
  origin: "nested-instance" | "parameter-default" | "parameter-value";
  /** Package-relative or semantic location of the origin. */
  location: string;
  representation?: string;
  nodeId?: string;
  paramId?: string;
}

export interface DependencyReport {
  declared: readonly PackageReference[];
  discovered: readonly DiscoveredReference[];
  /** Discovered references with no matching declaration. */
  undeclared: readonly DiscoveredReference[];
  /** Discovered references whose `kind:id@version` is declared with a different digest. */
  mismatched: readonly DiscoveredReference[];
  /** Declared references the package does not use. */
  unused: readonly PackageReference[];
  /** Declared references the injected resolver could not supply. */
  unresolved: readonly PackageReference[];
  /** Cycles as ordered `kind:id@version` chains, first element repeated at the end. */
  cycles: readonly (readonly string[])[];
}

// ---------------------------------------------------------------------------
// Inspection result
// ---------------------------------------------------------------------------

export type SupportState =
  /** Every required capability and the manifest major are supported. */
  | "supported"
  /** Manifest major exceeds this consumer's support. Nothing semantic is trusted. */
  | "unsupported-spec"
  /** A required capability is unrecognized. Data is preserved but not configurable. */
  | "unsupported-capability";

export interface PayloadInventoryEntry {
  role: string;
  digest: string;
  declaredSize: number;
  /** Actual byte length when the blob was available, otherwise null. */
  actualSize: number | null;
  present: boolean;
  digestVerified: boolean;
  known: boolean;
}

export interface InspectionResult {
  /** False whenever any `ERROR` diagnostic exists. Independent of diagnostic count. */
  valid: boolean;
  supportState: SupportState;
  /** May be configured/republished by this consumer. False in any degraded state. */
  configurable: boolean;
  /** Null when the manifest could not be parsed at all. */
  manifest: PrefabManifest | null;
  /** `sha256:<hex>` over RFC 8785 JCS bytes of the manifest, when parseable. */
  manifestDigest: string | null;
  payloads: readonly PayloadInventoryEntry[];
  representations: readonly PayloadRepresentation[];
  /** Capabilities derived from actual usage, sorted and deduplicated. */
  discoveredCapabilities: readonly string[];
  /** Exact references discovered inside the package. */
  discoveredReferences: readonly DiscoveredReference[];
  dependencyReport: DependencyReport | null;
  diagnostics: readonly Diagnostic[];
}

// ---------------------------------------------------------------------------
// World instance boundary (minimum record only)
// ---------------------------------------------------------------------------

/**
 * The minimum world instance record. The world/scene format itself is out of
 * scope; this exists so the package contract can state what a world must be
 * able to express without redesigning the world format.
 */
export interface PrefabInstanceRecord {
  prefabRef: PackageReference;
  /** Builder-editable placement, column-major 4×4. */
  transform: Mat4;
  /** Values keyed by declared `paramId`. Freeform overrides are not representable. */
  params: Readonly<Record<string, JsonValue>>;
}
