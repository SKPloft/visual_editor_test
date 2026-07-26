# prefab-package-contract

## Purpose

Define the canonical Nook prefab package format, identity, payload, reference, archive, instance, and preservation contract.

## Requirements

### Requirement: Canonical prefab manifest
A Nook prefab package SHALL contain one manifest whose `spec`, `id`, `version`, `meta`, `requires`, `parameters`, `dependencies`, and `payloads` fields conform to `nook.prefab/1`. The manifest SHALL contain package semantics and references only; it SHALL NOT duplicate the node hierarchy owned by payload GLBs.

#### Scenario: Valid manifest is recognized
- **WHEN** a consumer reads a manifest containing the required `nook.prefab/1` fields with valid values
- **THEN** it recognizes one prefab package without requiring node structure in the manifest

#### Scenario: Unsupported manifest major
- **WHEN** a consumer reads a manifest whose `spec` major is greater than the highest supported `nook.prefab` major
- **THEN** it rejects semantic consumption with the stable unsupported-spec diagnostic

### Requirement: Stable package and version identity
A prefab `id` SHALL remain stable across versions of the same creator asset, each published `(id, version)` tuple SHALL be immutable, and a version's machine identity SHALL be `sha256:<lowercase hex>` over RFC 8785 JCS bytes of its manifest. The manifest SHALL NOT contain its own digest. Arrays whose order is defined as canonical by this contract, including `requires`, SHALL be sorted and deduplicated before hashing.

#### Scenario: Independent digest calculation
- **WHEN** two conforming implementations canonicalize semantically identical manifests
- **THEN** they produce identical JCS bytes and the same version digest

#### Scenario: Republish changed content under an existing version
- **WHEN** a registry already binds `(id, version)` to one digest and a publisher presents another digest for the same tuple
- **THEN** publication is rejected without changing the existing binding

### Requirement: Content-addressed payload descriptors
Each payload descriptor SHALL declare a role, raw-byte SHA-256 digest, non-negative byte size, and media type. Consumers SHALL resolve payload bytes by digest and SHALL verify both size and digest before semantic use. `proxy` and `full` SHALL be required roles for `nook.prefab/1`; unknown optional roles SHALL be preserved.

#### Scenario: Payload bytes match descriptor
- **WHEN** payload bytes have the declared size and digest
- **THEN** the payload is available for role-specific validation

#### Scenario: Payload bytes fail integrity
- **WHEN** payload bytes differ in size or digest from their descriptor
- **THEN** the package is invalid and the consumer does not parse those bytes as a trusted payload

### Requirement: Exact unified references
Package dependencies, nested prefab instances, supported reference-typed parameter values, and minimum world prefab references SHALL use the envelope `{ kind, id, version, digest }`. Published dependencies SHALL use exact versions and digests; version ranges SHALL NOT appear in a published manifest.

#### Scenario: Exact dependency pin
- **WHEN** a published manifest references a nested prefab
- **THEN** its dependency entry identifies the exact prefab `id`, exact version, and exact manifest digest

#### Scenario: Version range in published package
- **WHEN** a published manifest contains a dependency version range
- **THEN** validation rejects the manifest as non-reproducible

### Requirement: Dependency declaration completeness
`manifest.dependencies` SHALL be sorted, deduplicated, and SHALL cover every external package reference discovered in nested-instance records and supported reference-typed parameter defaults. A dependency entry not used by the package SHALL be reported as an unused declaration according to validation policy.

#### Scenario: Nested reference is declared
- **WHEN** a payload contains a nested instance with an exact reference also present in `manifest.dependencies`
- **THEN** dependency coverage validation succeeds for that reference

#### Scenario: Nested reference is omitted
- **WHEN** a payload contains a nested instance whose exact reference is absent from `manifest.dependencies`
- **THEN** package validation produces an error identifying the unresolved declaration gap

### Requirement: Single-package archive form
A `.nookpkg` SHALL be a secure ZIP archive containing exactly one root `manifest.json` and the current package's declared payload blobs under `blobs/`. It SHALL NOT claim to contain the transitive dependency closure. Blob filenames SHALL be deterministically derived from their digests and SHALL NOT be used as a substitute for verifying bytes.

#### Scenario: Complete single package archive
- **WHEN** an archive contains one valid manifest and every blob declared by that manifest
- **THEN** it can be losslessly converted to the equivalent manifest-plus-CAS wire form

#### Scenario: Dependency blob is not bundled
- **WHEN** a package declares a dependency but contains only its own payload blobs
- **THEN** the archive remains structurally complete as a `.nookpkg` and dependency resolution remains an external concern

### Requirement: Minimal world instance boundary
The package contract SHALL define a minimum world instance record containing an exact prefab reference, builder-editable placement transform, and parameter assignments keyed by `paramId`. The instance SHALL NOT permit freeform node or component overrides. The complete world/scene format SHALL remain outside this capability.

#### Scenario: Two versions coexist
- **WHEN** a world contains two minimum instance records for different versions of the same prefab `id`
- **THEN** each record resolves independently by its pinned version and digest

#### Scenario: Freeform override is supplied
- **WHEN** an instance record contains an arbitrary component or property override outside placement and declared parameters
- **THEN** that override is not accepted as part of the minimum prefab instance contract

### Requirement: Round-trip preservation
A conforming read-modify-write consumer SHALL preserve unknown optional manifest fields, unknown optional payload descriptors, and unknown-typed values that it can safely retain, unless the user explicitly requests their removal. Preserved unknown data SHALL participate in canonical hashing after reserialization.

#### Scenario: Inspector encounters optional future metadata
- **WHEN** an inspection-capable consumer reads and reserializes a package containing an unknown optional metadata field
- **THEN** the field and its value are preserved verbatim in the semantic result

#### Scenario: Unsupported semantics are preserved
- **WHEN** a consumer cannot configure a required capability but can safely inspect the package
- **THEN** it preserves the unsupported fields and values without claiming support or silently deleting them
