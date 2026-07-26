## Context

The repository currently implements a browser-local prototype in which `SceneFile.assetLibrary.prefabs` embeds canonical node trees, the Three.js loader traverses those trees, and the generated Unity importer reconstructs them. That path proved basic editing/export concepts but conflicts with the approved Nook product model: creators author in Unity/Unreal, SDKs export immutable portable packages, the browser consumes a lightweight proxy, and a backend later consumes full payloads.

The approved package draft and R8 decision log separate three concerns:

1. **Interchange:** a manifest and content-addressed GLB payloads.
2. **Semantics:** identity, placement/root composition, declared parameters, dependencies, capabilities, diagnostics, and migration anchors.
3. **Consumer memory/runtime:** deliberately unconstrained by the serialized package.

This change is the first progressive engineering slice. It formalizes the interchange and semantic contracts and builds a local validator/inspector PoC. It does not connect the format to the existing browser editor or implement any networked stage of the end-to-end pipeline.

Stakeholders are creator-SDK implementers, browser/editor engineers, marketplace/backend engineers, bake/export engineers, and contract/fixture maintainers. They need one deterministic contract before parallel implementations begin.

## Goals / Non-Goals

**Goals:**

- Promote the approved v0.1 package decisions into stable, testable repository contracts.
- Define one canonical manifest model and two equivalent physical forms: registry/CAS wire objects and a single-package `.nookpkg` archive.
- Define Portable Prefab Profile v1 and the GLB conventions needed for roots, Nook components, nested instances, and parameter targets.
- Define declared parameters, representation-scoped bindings, `nook.path/1`, capability governance, and reference/dependency semantics.
- Produce a local, side-effect-free inspection API/CLI capable of securely reading packages and returning structured metadata plus stable diagnostics.
- Establish fixtures that independent future consumers can reuse for semantic consistency.
- Reconcile contract drift by freezing and documenting the legacy embedded-prefab path without expanding the first implementation slice.

**Non-Goals:**

- Creator SDK authoring/export UI or native engine integration.
- Cloud APIs, registry, marketplace, object storage, production CAS, authentication, licensing, or entitlement enforcement.
- Browser-editor package installation, placement, parameter inspector, or persistence.
- Full world/scene format, dependency lockfiles for worlds, or loose-content policy.
- Production baking, Unity/VRChat export, upgrade/migration UI, or runtime-dynamic parameters.
- Custom shaders, scripting/programmability policy, material/texture reference implementation, or other explicitly deferred draft items.
- Modifying the current Three.js embedded-prefab loader or generated Unity importer to consume `.nookpkg`.

## Decisions

### 1. Treat package contracts as a new bounded subsystem

New package modules SHALL be isolated from `src/scene` and the current Unity package generator. Their conceptual boundaries are:

```text
raw bytes
  -> secure archive/blob access
  -> manifest syntax/schema
  -> content integrity
  -> GLB/profile inspection
  -> semantic/dependency validation
  -> inspection result + diagnostics
```

The public PoC boundary accepts a manifest with blob access or `.nookpkg` bytes and returns an immutable inspection result. It performs no editor mutation, network access, or publication.

**Why:** isolation keeps the first slice reviewable and prevents the old embedded scene model from becoming an accidental package implementation.

**Alternative rejected:** extending `PrefabAsset.rootNode` with package fields. This duplicates GLB structure, couples interchange to editor memory, and preserves the architecture being superseded.

### 2. Use manifest plus content-addressed blobs

The package manifest carries identity, semantic metadata, requirements, parameters, dependencies, payload descriptors, and migration hints. GLB payloads own node structure and render data. Machine version identity is `sha256(JCS(manifest))`; blob identities are SHA-256 over raw bytes.

The archive form contains exactly one manifest and that package's own declared blobs. It is not a transitive dependency bundle.

**Why:** this gives deterministic identity, integrity, deduplication, and future wire/archive equivalence without requiring cloud infrastructure now.

**Alternative rejected:** storing the hierarchy in both manifest and GLB. Two structural authorities would drift and require reconciliation.

### 3. Represent proxy and full as independent roles

`proxy` and `full` are separately addressed, self-contained GLBs with different consumers. The proxy is lightweight editor/marketplace content; full is future bake input. Pixel equality is not required.

Bindings are representation-scoped because manually selected proxy objects and generated LODs can have different nodes or material layouts. Required full bindings must resolve. Missing optional proxy bindings produce degradation diagnostics rather than invalidating otherwise valid full semantics.

**Why:** manual proxy authoring is a first-class product decision and invalidates any assumption that one property path works in both files.

**Alternative rejected:** one shared binding target for both representations.

### 4. Require one addressable logical root and compositional placement

Each representation has exactly one logical root identified as `extras.nook.packageRoot = true` with reserved `nodeId = "nook.root"`. A source with multiple roots receives a synthetic identity wrapper at SDK export. Consumers compute:

```text
effectiveRoot = worldAncestors × instancePlacement × storedPackageRoot
```

The validator checks structure and markers; it does not rewrite malformed packages.

**Why:** this preserves creator root data and makes transform semantics portable and testable.

**Alternative rejected:** ignoring or overriding the stored root, which recreates current prototype data loss and engine-specific behavior.

### 5. Use declared parameters and a whitelisted semantic path language

Instances store only placement plus values keyed by stable `paramId`; arbitrary component/property overrides are forbidden. `nook.path/1` exposes an allowlisted, typed set of transform, material, and Nook-component targets. Each binding specifies representation, node, path, and requiredness.

Supported PoC types are `int`, `float`, `bool`, `string`, `enum`, `color`, `vec2`, `vec3`, and `prefabRef`. `materialRef` and `textureRef` names are reserved but unsupported. Capability entries version parameter/path behavior independently from the manifest structure.

**Why:** a whitelist permits cross-engine mapping, type validation, UI generation, and safe untrusted-package handling.

**Alternative rejected:** arbitrary JSON/property paths, which are fragile, engine-specific, and unsafe.

### 6. Encode nested dynamic links at nodes and summarize resolution in dependencies

A GLB node's `extras.nook.prefabInstance` records the exact reference, placement (the node transform), and parameter values. `manifest.dependencies` records every exact package reference needed to resolve the package. Validation derives references from nested instances and supported reference defaults, checks that dependencies cover usage, and detects cycles when dependency manifests are available.

The PoC supports dependency-manifest injection/resolution from local fixtures; it does not fetch dependencies.

**Why:** location and package closure are different concerns and belong in different representations.

**Alternative rejected:** manifest dependencies alone, which cannot say where or how many times a nested prefab is instantiated.

### 7. Make compatibility explicit through capabilities and preservation

The SDK-generated `requires` list declares independently versioned capabilities actually used. Validation rejects under-reporting and unsupported required capabilities by default. A consumer role may explicitly request inspect-only or proxy-render-only degradation, but unsupported packages cannot be configured or republished.

Unknown optional metadata and payload slots are preserved and ignored. Parsed models retain unknown fields/values so reserialization does not silently erase data.

**Why:** staged consumer rollouts must fail predictably without corrupting packages.

**Alternative rejected:** globally ignoring unknown semantic types, which can make parameters or components silently ineffective.

### 8. Validate in deterministic phases with stable diagnostics

Validation phases are ordered to avoid unsafe/deceptive downstream work:

1. archive envelope and resource limits;
2. manifest parse and structural schema;
3. canonical identity, blob inventory, size, and digest integrity;
4. GLB parse and Portable Profile checks;
5. parameter/path/binding semantics;
6. nested dependency coverage and graph checks;
7. capability and semantic-consistency fixture checks.

Diagnostics have stable codes, severity, package-relative location/path, representation/blob context where applicable, involved identities, and human-readable detail. Ordering is deterministic (phase, location, code) so implementations and snapshots agree.

All errors are accumulated when safe; fatal envelope errors may stop deeper parsing. Inspection never partially installs or mutates a package.

**Why:** diagnostics are an interoperability surface, not incidental log strings.

### 9. Use maintained parsers for dangerous binary/serialization surfaces

The PoC may add:

- an RFC 8785-compatible JCS implementation;
- a maintained ZIP reader with bounded extraction/streaming support;
- a maintained GLB/glTF parser or validator.

Selection criteria include browser/Bun compatibility, active maintenance, size/resource controls, no execution of embedded code, and preservation/access to extras and extensions. Wrapper interfaces prevent library-specific types from becoming contract types.

**Why:** ZIP and GLB are untrusted binary surfaces; home-grown parsers would add avoidable security and correctness risk.

### 10. Freeze, do not retrofit, the legacy prefab path

The current `PrefabAsset.rootNode`, browser prefab resolver, scene JSON exporter, and generated Unity importer remain implemented prototype behavior. This change updates documentation/ADR status to make clear that:

- no package-format requirements are implemented by that path;
- no new prefab functionality should target it;
- later changes will replace or adapt editor/world/export boundaries after their own product and contract decisions;
- existing demo behavior is not removed in this foundation slice.

**Why:** immediate replacement would combine package design, editor migration, world-format design, and export redesign into an unreasonable first change.

## Risks / Trade-offs

- **[Risk] The formal contract is broad even though the PoC is local.** → Keep tasks centered on validation and fixtures; represent future stages only as schemas/semantics, not service implementations.
- **[Risk] GLB library limitations may not expose every required extension or byte-level detail.** → Perform a dependency spike first, wrap the chosen implementation, and retain official glTF validation fixtures where possible.
- **[Risk] ZIP resource limits differ between browser and backend environments.** → Define policy inputs/defaults separately from archive mechanics and test deterministic limit diagnostics.
- **[Risk] `nook.path/1` can become an oversized subproject.** → Implement only the v1 whitelist required by supported types/profile components; additions use capability versions later.
- **[Risk] Dependency cycle validation needs manifests beyond one archive.** → Make dependency resolution an injected local interface; report unresolved external dependencies distinctly and test cycles with fixture registries.
- **[Risk] Round-trip preservation conflicts with strongly typed models.** → Store unknown property bags at every extensible level and add byte/semantic round-trip fixtures; do not expose library ASTs as public contract models.
- **[Risk] Stable diagnostic codes are costly to change.** → Namespace and document them early, snapshot fixtures, and allow message wording to evolve independently.
- **[Trade-off] Full and proxy semantic consistency is not fully provable without rendering.** → Validate bindings, roots, identities, and observable fixture properties; explicitly exclude pixel equivalence.
- **[Trade-off] Freezing legacy code leaves temporary contract/code divergence.** → Document it explicitly and prohibit extension; splitting integration into later changes keeps this slice safe and comprehensible.

## Migration Plan

1. Correct and approve this OpenSpec change against draft v0.1/R8.
2. Promote the package-format decisions into stable contract documentation and add an ADR; mark draft/rationale status appropriately.
3. Annotate current canonical/Unity prefab documentation as legacy implemented behavior that is superseded for future prefab evolution.
4. Add isolated package models, inspector, validator, policies, and fixture corpus without wiring them to the editor.
5. Verify all normative fixtures and stable diagnostics locally.
6. Use later OpenSpec changes for creator export, registry/CAS, browser consumption, world instances, upgrades, and baking in that dependency order.

Rollback is straightforward before publication: remove the isolated PoC modules and contract promotion while retaining the untouched legacy editor. After external SDKs consume a published contract, incompatible changes require normal manifest/capability version evolution rather than repository rollback.

## Open Questions

The following are intentionally deferred and do not block this change: custom shader/runtime programmability positioning; runtime parameter mutability; full parameter UI rules; material/texture reference implementation; complete world format; delisting policy; SDK local simulator; marketplace-reference mapping workflow; final paramId encoding; reconciliation heuristics; Unreal carrier details; standalone texture blobs; `.nookbundle`; default-value omission in world instances; and paid/licensed assets.

Implementation-local questions to resolve during the dependency spike are limited to the maintained JCS, ZIP, and GLB libraries and concrete default resource-limit values. These choices must not alter the normative package semantics.
