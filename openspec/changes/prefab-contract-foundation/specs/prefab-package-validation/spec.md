## ADDED Requirements

### Requirement: Packages are validated as untrusted artifacts
The local inspector SHALL treat manifests, archives, and GLBs as untrusted input. It SHALL perform no network access, execute no embedded content, write no package files outside controlled temporary/storage boundaries, and make no partial installation or editor-state mutation. It SHALL use maintained ZIP and GLB parsers rather than custom binary parsers.

#### Scenario: Malicious package is inspected
- **WHEN** an untrusted package contains malformed binary content or executable-looking payload data
- **THEN** inspection returns diagnostics without executing the content or mutating the editor

### Requirement: Deterministic staged validation
Validation SHALL proceed through archive/resource safety, manifest structure, canonical identity and blob integrity, GLB/profile checks, parameter/binding checks, dependency checks, and capability/semantic checks. A fatal safety or envelope error MAY stop unsafe deeper parsing; otherwise the validator SHALL collect all safely discoverable diagnostics. Identical input, policy, capabilities, and dependency context SHALL produce deterministically ordered diagnostics.

#### Scenario: Multiple independent defects
- **WHEN** a safely readable package contains multiple manifest and semantic defects
- **THEN** inspection returns all safely discoverable defects ordered by phase, location, and code

#### Scenario: Fatal archive envelope defect
- **WHEN** archive safety cannot be established without exceeding configured limits
- **THEN** inspection stops deeper archive processing and reports the fatal envelope diagnostic

### Requirement: Stable structured diagnostics
Every diagnostic SHALL include a stable machine-readable code, `ERROR`, `WARNING`, or `INFO` severity, a package-relative location or semantic path, and human-readable detail. Blob role/digest and involved package/node/parameter identities SHALL be included when applicable. Message wording MAY evolve without changing the code's meaning.

#### Scenario: Required binding is absent
- **WHEN** a required full binding target is missing
- **THEN** the result includes the contract-defined code, `ERROR` severity, representation, `paramId`, node/path location, and explanatory detail

### Requirement: Severity controls consumability
Any `ERROR` SHALL make a package ineligible for import, publication, or bake consumption. A package with only `WARNING` or `INFO` diagnostics MAY remain valid, subject to role capabilities. Inspection results SHALL expose validity separately from diagnostic count.

#### Scenario: Only degraded proxy warning exists
- **WHEN** a package has valid full semantics and only an optional proxy-binding warning
- **THEN** the inspection result is valid and records degraded preview behavior

#### Scenario: Integrity error exists
- **WHEN** a declared blob digest does not match its bytes
- **THEN** the inspection result is invalid for every semantic consumer role

### Requirement: Secure archive policy and limits
Archive inspection SHALL reject path traversal, absolute paths, duplicate normalized paths, unexpected manifest locations, missing/extra declared blobs according to policy, unsafe links, encrypted entries, unsupported compression behavior, and decompression bombs. Configurable limits SHALL cover archive bytes, entry count, per-entry and total decompressed bytes, compression ratio, manifest bytes, and processing depth/time where supported.

#### Scenario: ZIP path traversal
- **WHEN** an archive entry normalizes outside the package root
- **THEN** inspection rejects the archive without writing that entry

#### Scenario: Decompression limit exceeded
- **WHEN** expanding entries would exceed a configured total-uncompressed-byte limit
- **THEN** inspection stops expansion and reports a resource-limit error

### Requirement: Manifest and blob integrity validation
The validator SHALL verify manifest schema/version, JCS-derived manifest digest when an expected digest is supplied, payload inventory, raw blob digest, declared blob size, legal identifiers and semantic versions, sorted/deduplicated canonical arrays, unique parameter IDs, and exact dependency references before trusting payload semantics.

#### Scenario: Blob content is substituted
- **WHEN** an archive contains the expected blob filename but different raw bytes
- **THEN** digest verification fails and semantic parsing of that blob is not trusted

#### Scenario: Requires list is noncanonical
- **WHEN** `requires` contains duplicates or is not sorted according to the contract
- **THEN** validation reports a canonical-manifest error because ordering affects deterministic identity

### Requirement: Capability usage and unsupported behavior
The validator SHALL derive capabilities used by manifest fields and payload semantics and require `manifest.requires` to be a sorted, deduplicated superset of actual usage. Unknown required capabilities SHALL reject normal consumption with `NOOK-UNSUPPORTED-CAPABILITY`. Explicit inspect-only or proxy-render-only degradation MAY preserve/show data, but SHALL prohibit configuration and republication.

#### Scenario: Package under-reports a used component
- **WHEN** a payload uses a registered Nook component absent from `requires`
- **THEN** validation reports an error for capability under-reporting

#### Scenario: Inspector lacks a required future capability
- **WHEN** an inspector reads a package requiring an unrecognized capability in force-inspect mode
- **THEN** it preserves and exposes the package data with an unsupported status but does not claim it is configurable or republishable

#### Scenario: Experimental capability targets marketplace
- **WHEN** a package intended for marketplace publication requires an `x.*` capability
- **THEN** publication-policy validation rejects it

### Requirement: GLB and profile safety validation
The inspector SHALL bound GLB bytes, nodes, primitives, materials, textures/images, and relevant extension data; reject malformed GLB structure and forbidden external URIs; identify unsupported required glTF/Nook extensions; validate unique package root semantics; and safely inspect registered `extras.nook` records.

#### Scenario: GLB node cap exceeded
- **WHEN** a payload contains more nodes than the active validation policy permits
- **THEN** inspection reports a resource-limit error without constructing an unbounded runtime graph

#### Scenario: Unsupported required GLTF extension
- **WHEN** a payload requires an extension unavailable to the consumer
- **THEN** the representation is rejected or role-degraded according to declared capability semantics

### Requirement: Dependency validation without implicit fetching
The local PoC SHALL derive exact package references, compare them with declared dependencies, and use only an injected local dependency resolver/context. It SHALL perform no implicit network fetch. When all dependency manifests are provided, it SHALL detect direct and transitive cycles. Missing external context SHALL be distinguished from an internally inconsistent declaration.

#### Scenario: Fixture dependency cycle
- **WHEN** injected manifests form `A -> B -> A`
- **THEN** validation reports a dependency-cycle error identifying the cycle

#### Scenario: External dependency is unavailable locally
- **WHEN** a package consistently declares an exact dependency but the local resolver has no matching manifest
- **THEN** inspection reports unresolved external context rather than inventing a version or fetching the network

### Requirement: Round-trip and inspection output
The PoC SHALL return structured manifest metadata, payload inventory, discovered references/capabilities, validity and support state, and diagnostics while retaining unknown extensible data needed for round-trip preservation. Inspecting invalid content SHALL still return safely parsed information where available.

#### Scenario: Valid package inspection
- **WHEN** a valid fixture package is inspected
- **THEN** the result exposes its exact identity, version, payload roles, parameters, dependencies, capabilities, and an empty error set

#### Scenario: Partially readable invalid package
- **WHEN** a manifest is structurally readable but one payload is invalid
- **THEN** the result retains safe manifest metadata and reports payload invalidity without presenting the package as valid
