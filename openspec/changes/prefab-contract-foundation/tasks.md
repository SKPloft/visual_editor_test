## 1. Contract Promotion and Legacy Boundary

- [x] 1.1 Promote the approved prefab package v0.1 decisions into a stable English contract document, retaining the discussion log as non-normative rationale.
- [x] 1.2 Add an ADR for interchange-first packaging, GLB structural ownership, manifest-plus-CAS identity, root composition, declared parameters, capability governance, and staged legacy migration.
- [x] 1.3 Update `docs/CANONICAL_FORMAT.md` to mark its embedded `PrefabAsset.rootNode` model as legacy prototype behavior superseded for future prefab development, without redesigning the remaining world format.
- [x] 1.4 Update `docs/UNITY_EXPORT.md` to mark current embedded-prefab generation as frozen implemented behavior and identify later package/bake integration as a separate change.

## 2. Dependency and Module Foundation

- [x] 2.1 Evaluate maintained browser/Bun-compatible JCS, bounded ZIP, and GLB/glTF libraries against the design criteria; document selected dependencies and rejected alternatives.
- [x] 2.2 Add only the selected package-inspection dependencies and create isolated prefab-package modules that do not import or mutate current editor scene state.
- [x] 2.3 Define public TypeScript models for manifest data, unified references, payload descriptors, parameters, bindings, capabilities, diagnostics, inspection policy, dependency resolution, and inspection results, with explicit unknown-field preservation.

## 3. Canonical Manifest and Integrity

- [x] 3.1 Implement `nook.prefab/1` manifest parsing and structural validation, including identifiers, semantic versions, exact references, unique parameter IDs, canonical arrays, payload roles, and extensible unknown fields.
- [x] 3.2 Implement RFC 8785 JCS serialization and `sha256:<lowercase hex>` manifest identity calculation, excluding any self-digest and enforcing sorted/deduplicated contract arrays.
- [x] 3.3 Implement raw blob digest and size verification plus deterministic payload inventory checks for required `proxy`/`full`, missing blobs, extra blobs, and unknown optional slots.
- [ ] 3.4 Add unit tests and independent digest fixtures proving equivalent manifests produce identical identity and changed semantics/payload references change identity.

## 4. Secure Archive Inspection

- [x] 4.1 Implement bounded `.nookpkg` inspection for one root `manifest.json` and package-owned `blobs/` without extracting untrusted paths to the filesystem.
- [x] 4.2 Enforce archive policies for path traversal, absolute/duplicate normalized paths, links/encryption, entry count, compressed/archive bytes, per-entry and total expanded bytes, compression ratio, and manifest limits.
- [ ] 4.3 Add adversarial archive tests for traversal, duplicate paths, missing/extra blobs, substituted bytes, malformed archives, and decompression-limit failures.

## 5. Portable GLB Profile

- [ ] 5.1 Wrap the selected maintained GLB parser/validator behind package-owned interfaces and enforce byte/node/primitive/material/texture/image limits plus v1's no-external-URI rule.
- [ ] 5.2 Implement Portable Prefab Profile checks for permitted geometry/PBR/lights, registered Nook components, unsupported native/extension features, and capability usage discovery.
- [ ] 5.3 Validate exactly one marked logical root per representation, reserved `nook.root` identity, and the single-root versus synthetic-wrapper rules.
- [ ] 5.4 Parse and validate `extras.nook.prefabInstance` records and registered `extras.nook.components` without executing or instantiating package content.
- [ ] 5.5 Add proxy/full GLB fixtures covering single and multiple source roots, non-identity root transforms, manual structural divergence, unsupported features, external URIs, malformed GLBs, and resource caps.

## 6. Parameters, Paths, and Capabilities

- [ ] 6.1 Implement v1 parameter declaration/value validation for supported scalar, enum, color, vector, and `prefabRef` types, including defaults and constraints; reject reserved unsupported `materialRef`/`textureRef` use.
- [ ] 6.2 Implement the bounded `nook.path/1` parser, escaping, by-index/by-name segments needed by v1, writable-target whitelist, and parameter-type compatibility table.
- [ ] 6.3 Implement representation-scoped binding validation so required full targets error and absent optional proxy targets produce stable degraded-preview diagnostics.
- [ ] 6.4 Implement unified reference-envelope validation, `prefabRef` category restrictions, and exceptional `parameterReplacements` validation.
- [ ] 6.5 Implement `requires` usage derivation, sorted/deduplicated superset checks, independent capability-version support, unsupported-capability states, inspect-only degradation, and marketplace rejection of `x.*` capabilities.
- [ ] 6.6 Add parameter/path/capability fixtures for valid mappings, type mismatches, missing nodes, fragile/invalid paths, unsupported types, under-reported requirements, and unknown required capabilities.

## 7. Dependencies and Semantic Consistency

- [ ] 7.1 Collect exact dependency references from nested instances and supported reference-typed defaults, compare them with `manifest.dependencies`, and report missing, mismatched, duplicate, and unused declarations deterministically.
- [ ] 7.2 Add an injected local dependency-manifest resolver and cycle detection without network access, distinguishing unavailable external context from an inconsistent package.
- [ ] 7.3 Implement contract-space transform composition utilities/tests for `ancestors × placement × storedPackageRoot`, including nested cases and declared numeric tolerance.
- [ ] 7.4 Add normative cross-representation fixtures asserting parameter semantic consistency, exact identity/version behavior, transform composition, and diagnostic-code consistency without pixel comparison.

## 8. Inspector API and Diagnostics

- [ ] 8.1 Implement the staged, side-effect-free inspection entry points for `.nookpkg` bytes and manifest-plus-blob access, returning safe partial metadata, support state, validity, discovered capabilities/references, and deterministic diagnostics.
- [ ] 8.2 Define and document the stable diagnostic-code catalog with severities, semantic locations, representation/blob context, involved identities, and remediation-oriented detail.
- [ ] 8.3 Ensure fatal envelope failures stop unsafe parsing while all other safely discoverable diagnostics are accumulated and ordered by phase, location, and code.
- [ ] 8.4 Add round-trip tests proving unknown optional metadata, payload slots, and safely retained unsupported values survive read-modify-write and continue participating in canonical identity.

## 9. Verification and Progressive Handoff

- [ ] 9.1 Run type checking, unit tests, fixture conformance tests, archive-security tests, and the production build; resolve all failures attributable to this change.
- [ ] 9.2 Exercise the inspector end to end on at least one valid `.nookpkg` fixture and representative invalid packages, verifying metadata, support/validity states, integrity results, and exact diagnostic codes.
- [ ] 9.3 Confirm through diff review that current browser prefab placement/rendering and generated Unity importer implementation were not coupled to or expanded by the PoC.
- [ ] 9.4 Document follow-on OpenSpec boundaries and dependency order for creator SDK export, registry/CAS, browser package consumption, world instances, version upgrades, and bake/export integration.
