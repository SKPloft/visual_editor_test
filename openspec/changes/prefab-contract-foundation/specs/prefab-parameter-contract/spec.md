## ADDED Requirements

### Requirement: Declared parameters are the only configurable prefab properties
A prefab instance SHALL permit builder modification only of its placement transform and values for parameters declared by the pinned prefab version. It SHALL NOT support arbitrary node, component, material, or engine-property overrides.

#### Scenario: Builder assigns declared parameter
- **WHEN** an instance assigns a valid value to a `paramId` declared by its pinned package
- **THEN** the assignment is accepted and applied through that parameter's bindings

#### Scenario: Builder targets arbitrary property
- **WHEN** an instance attempts to write a property not exposed by a declared parameter
- **THEN** the assignment is rejected as outside the prefab contract

### Requirement: Stable parameter identity
Each parameter SHALL have a non-empty `paramId` unique within the manifest and stable across versions while it represents the same configurable concept. `displayName` and description SHALL be presentation metadata and MAY change without changing `paramId` or creating migration data.

#### Scenario: Display name changes
- **WHEN** a later prefab version changes only a parameter's `displayName`
- **THEN** existing instance values continue to match by the unchanged `paramId`

#### Scenario: Duplicate parameter identity
- **WHEN** a manifest declares the same `paramId` more than once
- **THEN** package validation rejects the manifest

### Requirement: Supported and reserved parameter types
`nook.prefab/1` SHALL support `int`, `float`, `bool`, `string`, `enum`, `color`, `vec2`, `vec3`, and `prefabRef` through independently versioned parameter capabilities. `textureRef` and `materialRef` names SHALL be reserved but unsupported in this implementation slice. `curve` and `gradient` SHALL NOT be treated as registered v1 types.

#### Scenario: Supported color capability
- **WHEN** a package declares and requires a valid v1 color parameter
- **THEN** a consumer supporting `nook.parameter/color@1` validates its default, assignments, and bindings

#### Scenario: Reserved material reference
- **WHEN** a package attempts to use `materialRef` before a supported capability is defined
- **THEN** validation reports unsupported capability rather than guessing material semantics

### Requirement: Defaults and constraints
Each parameter SHALL declare a default value valid for its type and constraints. Numeric constraints SHALL use compatible min/max/step values; string constraints SHALL bound supported length when present; enum defaults SHALL match one declared option; vector constraints SHALL be type-compatible. Every instance value SHALL be validated against the declaration of its pinned version.

#### Scenario: Default satisfies constraints
- **WHEN** a numeric parameter default lies within its valid range and conforms to its type
- **THEN** default validation succeeds

#### Scenario: Invalid enum assignment
- **WHEN** an instance assigns an enum value not present in the pinned version's options
- **THEN** the assignment is rejected with a parameter-value diagnostic

### Requirement: Representation-scoped bindings
Each parameter SHALL declare one or more bindings, each identifying `representation`, `nodeId`, `propertyPath`, and `required`. Full bindings required by the declaration SHALL resolve and be type-compatible. A missing optional proxy binding or a parameter with no proxy binding SHALL leave that parameter without preview effect and SHALL produce the specified information/warning diagnostic rather than invalidate valid full behavior.

#### Scenario: Required full binding resolves
- **WHEN** a full binding resolves to a writable property compatible with the parameter type
- **THEN** binding validation succeeds for full

#### Scenario: Required full binding is missing
- **WHEN** a required full binding cannot resolve its node or property
- **THEN** package validation reports an error and the package cannot be published or baked

#### Scenario: Proxy has no corresponding target
- **WHEN** full semantics are valid but a manual proxy omits an optional proxy target
- **THEN** the package remains valid with a stable degraded-preview diagnostic

### Requirement: Whitelisted nook.path/1 language
Binding `propertyPath` values SHALL conform to `nook.path/1`, including its escaping rules and registered root namespaces. The language SHALL allow only registered writable semantic targets and SHALL validate each target against a parameter-type compatibility table. Fully arbitrary JSON paths SHALL be forbidden.

#### Scenario: Compatible transform target
- **WHEN** a `vec3` parameter binds to a registered transform translation path on an existing node
- **THEN** path parsing and type-compatibility validation succeed

#### Scenario: Incompatible path type
- **WHEN** a Boolean parameter binds to a color-valued material path
- **THEN** validation rejects the binding with a stable path/type diagnostic

#### Scenario: Unregistered path namespace
- **WHEN** a binding uses a property namespace absent from supported path capabilities
- **THEN** the consumer treats it as an unsupported required capability or invalid path, as declared by the package

### Requirement: Reference-typed values
A supported reference-typed value SHALL use the unified `{ kind, id, version, digest }` envelope. `prefabRef` constraints MAY restrict accepted categories or kinds, and both declaration defaults and instance values SHALL contribute exact references to dependency-closure collection.

#### Scenario: Prefab reference satisfies restriction
- **WHEN** a `prefabRef` value resolves to an exact prefab whose metadata satisfies the declaration's accepted category
- **THEN** reference validation succeeds and the reference enters the dependency closure

#### Scenario: Prefab reference violates restriction
- **WHEN** a `prefabRef` value resolves to a prefab outside its declaration's allowed category
- **THEN** the value is rejected

### Requirement: Exceptional parameter replacement hints
`migrationHints.parameterReplacements` SHALL map an obsolete parameter identity to a replacement identity only for exceptional recovery or semantic replacement. Ordinary display-name changes SHALL NOT create replacement entries. A replacement target SHALL exist in the target manifest; ambiguous replacement graphs SHALL be invalid.

#### Scenario: Lost identity is explicitly replaced
- **WHEN** a creator must replace an accidentally regenerated `paramId` and declares one valid replacement
- **THEN** future upgrade tooling can carry the old value to the replacement subject to target-type compatibility

#### Scenario: Replacement target is absent
- **WHEN** a migration hint points to a `paramId` not declared by the target manifest
- **THEN** validation reports an invalid migration hint
