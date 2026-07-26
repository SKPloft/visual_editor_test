## ADDED Requirements

### Requirement: GLB is the structural authority
For `nook.prefab/1`, each `proxy` and `full` payload SHALL be a GLB whose node hierarchy is the sole structural authority for that representation. The manifest SHALL NOT contain a second node tree. Nook semantics embedded in GLB SHALL use defined glTF extensions or `extras.nook` fields, and ordinary glTF consumers SHALL be able to ignore them.

#### Scenario: Consumer loads package structure
- **WHEN** a consumer needs the hierarchy of a valid prefab representation
- **THEN** it obtains the hierarchy from that representation's GLB rather than reconstructing it from the manifest

### Requirement: Portable Prefab Profile v1
A v1 payload SHALL use only profile-supported geometry, glTF metallic-roughness PBR material features and whitelisted official extensions, `KHR_lights_punctual`, transforms, registered Nook semantic components, nested prefab records, and whitelisted parameter targets. An SDK SHALL NOT silently discard native-engine content outside this profile.

#### Scenario: Profile-supported source exports
- **WHEN** creator content uses only Portable Prefab Profile v1 features
- **THEN** export preserves those features in the package without engine-specific runtime types

#### Scenario: Unsupported engine behavior is encountered
- **WHEN** source content contains an arbitrary script, unsupported custom shader, engine event, or other out-of-profile behavior
- **THEN** export produces an explicit warning or error identifying the unsupported content rather than silently dropping it

### Requirement: Self-contained GLB payloads
The `proxy` and `full` GLBs SHALL be self-contained in v1 and SHALL NOT depend on external buffer or image URIs. Each payload SHALL be independently parseable once its blob bytes are available.

#### Scenario: External texture URI
- **WHEN** a payload references a texture through an external URI
- **THEN** Portable Profile validation rejects the payload for v1

#### Scenario: Embedded resources
- **WHEN** all buffers and images required by a payload are embedded in its GLB
- **THEN** self-containment validation succeeds

### Requirement: Distinct proxy and full roles
The proxy SHALL serve lightweight marketplace/editor preview and the full payload SHALL serve future bake processing. A browser/editor consumer SHALL be able to operate from manifest plus proxy without downloading full. The profile SHALL NOT require identical hierarchy, primitive layout, material indices, polygon count, or pixels between the two roles.

#### Scenario: Manual proxy differs structurally
- **WHEN** a creator supplies a valid manual proxy whose hierarchy differs from full
- **THEN** the package may remain valid provided role-scoped roots, bindings, and semantics validate

#### Scenario: Preview consumer resolves package
- **WHEN** a preview consumer has the manifest and proxy blob but not full
- **THEN** it can inspect and render supported preview semantics without requiring full

### Requirement: Exactly one logical package root
Each proxy and full representation SHALL contain exactly one logical package root. A single source root SHALL be marked with `extras.nook.packageRoot = true` and reserved `extras.nook.nodeId = "nook.root"`; an SDK exporting multiple source roots SHALL synthesize an identity wrapper carrying those markers. No other node in that representation SHALL claim the reserved root identity.

#### Scenario: Single authored root
- **WHEN** a payload has one source root
- **THEN** that root is marked as the unique logical package root and remains addressable as `nook.root`

#### Scenario: Multiple authored roots
- **WHEN** an SDK exports content with multiple top-level roots
- **THEN** it wraps them in one identity root marked as the unique logical package root

#### Scenario: Duplicate package-root markers
- **WHEN** a payload contains two nodes marked as package roots
- **THEN** profile validation rejects the representation

### Requirement: Root transform composition
Every consumer that places a prefab SHALL calculate its effective logical-root transform as `worldAncestors × instancePlacement × storedPackageRoot`, preserving the stored package-root transform. Consumers SHALL NOT silently discard or replace the stored root transform.

#### Scenario: Non-identity creator root
- **WHEN** an instance with a placement transform resolves a package whose logical root has a non-identity transform
- **THEN** the resulting transform is the ordered composition of ancestors, placement, and stored root

### Requirement: Nook semantic components
Registered Nook components SHALL be encoded under the node's `extras.nook.components` using capability-versioned schemas. A component used by a package SHALL be represented in `requires`, and unsupported required components SHALL follow unsupported-capability behavior rather than being treated as successfully understood.

#### Scenario: Collider component is used
- **WHEN** a payload node contains a registered collider component
- **THEN** the package declares the corresponding component capability and a supporting consumer can validate its fields

### Requirement: Nested prefab instances
A dynamically linked nested prefab SHALL be encoded at a GLB node under `extras.nook.prefabInstance`. The node transform SHALL be the nested instance placement; the nested record SHALL carry an exact unified prefab reference and parameter assignments. Static/flattened content SHALL remain ordinary GLB content and SHALL NOT create a package dependency.

#### Scenario: Dynamic nested prefab
- **WHEN** a creator chooses dynamic linking for a nested Nook prefab
- **THEN** the exported node records its exact prefab reference and params, and the manifest declares that dependency

#### Scenario: Flattened nested content
- **WHEN** a creator chooses to integrate nested content into the parent package
- **THEN** the exported nodes become ordinary parent payload structure without a dynamic dependency for that source prefab
