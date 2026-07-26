## ADDED Requirements

### Requirement: Parameter semantic consistency
For a parameter value, every consumer supporting a representation's declared bindings SHALL apply that value with the same contract-defined type, constraints, path semantics, and effect within that representation's binding scope. Different proxy and full paths or structures SHALL NOT alter the parameter's declared meaning.

#### Scenario: Color uses different representation paths
- **WHEN** proxy and full bind one color parameter to different compatible material paths
- **THEN** each supporting consumer applies the same validated color value to its own declared target

#### Scenario: Parameter has no proxy binding
- **WHEN** a parameter has valid full bindings but no proxy binding
- **THEN** preview consumers report no preview effect without changing the full parameter semantics

### Requirement: Transform-composition consistency
Every consumer resolving a top-level or nested prefab instance SHALL use the ordered transform rule `worldAncestors × instancePlacement × storedPackageRoot`, with the coordinate/handedness conversion boundary applied consistently outside that semantic order.

#### Scenario: Fixture transform is evaluated by two consumers
- **WHEN** two implementations evaluate the same ancestor, placement, and stored-root fixture transforms
- **THEN** their contract-space effective matrices are equivalent within the specified numeric tolerance

### Requirement: Identity and version consistency
Every consumer SHALL interpret `{kind, id, version, digest}` as one exact immutable package version. It SHALL NOT silently substitute a newer version, another digest, or a mutable latest alias. Multiple versions of one `id` SHALL remain distinguishable.

#### Scenario: New version exists
- **WHEN** an instance pins version `1.2.0` and version `1.3.0` is available
- **THEN** every consumer continues resolving `1.2.0` at the pinned digest until an explicit future upgrade operation changes the instance

#### Scenario: Digest disagrees with registry tuple
- **WHEN** a reference's `id` and `version` resolve to a digest different from the pinned digest
- **THEN** consumers report identity inconsistency rather than selecting either artifact silently

### Requirement: Diagnostic semantic consistency
Independent conforming validators SHALL assign the same stable diagnostic code and severity to the same contract violation under the same validation role and policy. Locations and involved identities SHALL refer to the same semantic target even if message wording differs.

#### Scenario: Invalid required full binding fixture
- **WHEN** independent validators inspect the normative fixture with a missing required full binding
- **THEN** both emit the contract-defined error code and identify the same representation, parameter, node, and path

### Requirement: Consistency is observable without pixel equivalence
Semantic-consistency conformance SHALL be testable through package/manifest identities, resolved paths, typed values, transforms, component fields, dependency graphs, support states, and diagnostics. It SHALL NOT require equal polygon counts, hierarchy layouts across roles, rendered pixels, internal data structures, or use of the same implementation library.

#### Scenario: Generated proxy has lower fidelity
- **WHEN** proxy and full differ in mesh topology and rendered detail but satisfy roots, declared bindings, identities, and component semantics
- **THEN** semantic-consistency validation succeeds without image comparison

### Requirement: Normative cross-consumer fixtures
The contract SHALL maintain versioned fixtures covering valid and invalid manifests, roots, bindings, dependencies, capability states, transforms, and diagnostics. Fixture expectations SHALL identify contract-space observable results so SDK, editor, backend, and validator implementations can reuse them.

#### Scenario: Consumer claims nook.prefab/1 conformance
- **WHEN** an implementation claims support for a contract capability exercised by the normative fixture suite
- **THEN** it passes the corresponding observable fixture expectations or documents the role-scoped unsupported state
