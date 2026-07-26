# Nook Prefab Package Format

**Status: stable contract.** Promoted from `drafts/prefab-package-format-v0.en.md` v0.1 by OpenSpec change `prefab-contract-foundation`.

This document is the normative interchange contract for Nook prefab packages. It is engine-agnostic: Unity/Unreal creator SDKs, the marketplace registry, the browser editor, and the bake backend all implement against this document rather than against each other.

Rationale, rejected options, and the decision history behind these rules are non-normative and live in [`drafts/prefab-format-discussion-log.en.md`](drafts/prefab-format-discussion-log.en.md) and [`drafts/prefab-package-format-v0.en.md`](drafts/prefab-package-format-v0.en.md). Where a draft and this document disagree, this document wins.

Scope note: this contract covers the **prefab package**. The world/scene file format is referenced only through the minimum instance record in §9. The legacy embedded-prefab model in [`CANONICAL_FORMAT.md`](CANONICAL_FORMAT.md) is superseded for prefab evolution; see §16.

Key words `MUST`, `MUST NOT`, `SHALL`, `SHOULD`, and `MAY` are used in the RFC 2119 sense.

## 1. Pipeline and roles

```
Creator (Unity/Unreal + Nook SDK) ──export──▶ Prefab package ──upload──▶ Registry + CAS
                                                                             │
       ┌──────────────────────────┬─────────────────────────────────────────┤
       ▼                          ▼                                         ▼
  Marketplace preview (proxy)  Browser editor (proxy live preview)   Bake backend (full)
```

The package is an **interchange format**. It is produced by the SDK and consumed by services, the editor, and the bake backend. It is not intended to be hand-written. A consumer's in-memory representation is unconstrained; only serialized bytes follow this contract.

## 2. Package logical model

A prefab package is **one manifest plus a set of content-addressed payload blobs**.

The manifest carries semantics and references. It MUST NOT carry a node hierarchy — structure is owned by the payload GLBs (§6).

```jsonc
// manifest.json
{
  "spec": "nook.prefab/1",
  "id": "p_01J9Z...",
  "version": "1.2.0",
  "meta": {
    "name": "Vintage Wall Lamp",
    "author": "...",
    "category": "furniture/light",
    "tags": []
  },
  "requires": [
    "nook.component/collider@1",
    "nook.parameter/color@1"
  ],
  "parameters": [ /* ParamDecl[], §7 */ ],
  "dependencies": [
    { "kind": "prefab", "id": "p_01K4...", "version": "2.0.1", "digest": "sha256:6f1c..." }
  ],
  "payloads": {
    "proxy": { "digest": "sha256:a1...", "size": 812344,  "mediaType": "model/gltf-binary" },
    "full":  { "digest": "sha256:b2...", "size": 52428800, "mediaType": "model/gltf-binary" }
  },
  "migrationHints": {
    "parameterReplacements": { "oldParamId": "replacementParamId" }
  }
}
```

### 2.1 Field requirements

| Field | Required | Rule |
| --- | --- | --- |
| `spec` | yes | `nook.prefab/<major>`. A consumer MUST reject semantic consumption of a major greater than its highest supported major. |
| `id` | yes | Stable prefab identity, stable across every version of the same creator asset. |
| `version` | yes | Semantic version (`MAJOR.MINOR.PATCH`, optional prerelease/build). Creator-facing. |
| `meta` | yes | Presentation metadata: `name` required; `author`, `category`, `tags` optional. |
| `requires` | yes | Capability list, sorted and deduplicated (§13). MAY be empty. |
| `parameters` | yes | `ParamDecl[]` (§7). MAY be empty. `paramId` values MUST be unique. |
| `dependencies` | yes | Sorted, deduplicated exact references (§5). MAY be empty. |
| `payloads` | yes | Typed slot map. `proxy` and `full` are required for `nook.prefab/1`. |
| `migrationHints` | no | Exceptional migration channel (§10). |

Unknown optional fields at every extensible level MUST be preserved verbatim (§13).

## 3. Identity and hashing

- A version's machine identity is `digest = sha256(JCS(manifest))`, where JCS is RFC 8785 JSON Canonicalization.
- Digest encoding is `sha256:<lowercase hex>` (OCI style).
- The manifest MUST NOT contain its own digest.
- Arrays whose order this contract declares canonical — currently `requires` and `dependencies` — MUST be sorted and deduplicated before hashing. JCS does not sort arrays, so this is part of canonicalization.
- Blob digests are computed over **raw bytes**; no canonicalization applies.

### 3.1 Registry invariants

- Each `(id, version)` tuple MAY be published only once.
- Republishing the same tuple with a different digest MUST be rejected without changing the existing binding.
- Dependency digests participate in the manifest hash, producing a recursive fingerprint.
- A dependency resolver SHALL attest the manifest digest it computed from the bytes it actually retrieved (`sha256(JCS(manifest))`). A consumer MUST compare that attested digest with the pinned reference before using the resolved manifest for graph traversal or parameter validation. A mismatch is `NOOK-MANIFEST-DIGEST-MISMATCH` and is always an `ERROR`; it indicates substitution, corruption, or a registry/cache fault.
- Blob digest and declared size MUST both be verified before a blob is parsed as a trusted payload.

### 3.2 Identity allocation

| Identity | Strategy | Stability requirement | Carrier |
| --- | --- | --- | --- |
| blob | content hash (derived) | content is identity | CAS storage key |
| `id` (prefabId) | component-embedded persistence | stable forever across versions and exports | SDK authoring component on the root |
| `paramId` | component-embedded persistence | stable across versions (migration anchor) | SDK authoring component, assigned at declaration |
| `nodeId` | hybrid | only required for binding-target nodes | binding table in the authoring component, re-resolved at export |

Most nodes need no cross-version identity; they are serialized wholesale with each version's GLB structure. These identities are authoring/export/registry concerns only; runtimes resolve direct references at load.

## 4. Nook Portable Prefab Profile v1

Only a whitelisted subset of a native engine prefab may enter a package. "Lossless" holds relative to this subset, not to the engine's full feature set.

Profile v1 permits:

- geometry (meshes and primitives);
- glTF metallic-roughness PBR materials and whitelisted official material extensions;
- lights via `KHR_lights_punctual`;
- registered Nook semantic components (§6.4);
- transforms;
- whitelisted parameter-target properties (§7.3).

Out-of-profile content — arbitrary scripts, custom shaders, engine-specific components, animation controllers, engine events, engine physics configuration, editor-only behavior, arbitrary serialized objects — MUST produce an explicit `WARNING` or `ERROR` diagnostic at export. Silent dropping is forbidden.

Profile content evolves through the capability registry (§13) without a manifest major bump.

## 5. References and dependencies

All package references share one envelope:

```jsonc
{ "kind": "prefab", "id": "p_...", "version": "1.2.0", "digest": "sha256:..." }
```

`kind` is drawn from a registry; `prefab` is the only kind supported for dependency resolution in v1.

- A published manifest MUST use exact versions and exact digests. Version ranges MUST NOT appear in a published manifest. Ranges are a creator-workspace concept resolved by the SDK at publish time.
- `manifest.dependencies` MUST be sorted, deduplicated, and MUST cover every external package reference discovered inside the package.
- In-package dependency sources are: nested-instance records (§6.3) and reference-typed parameter default values (§7.4).
- A declared dependency that the package does not use is reported as an unused declaration, per validation policy.
- Dependency-cycle detection is required at publish time.

`manifest.dependencies` answers *what must resolve, at which pinned version, with which digest*. Nested-instance records answer *where it is instantiated, how it is placed, and with what parameter values*. These are different concerns and MUST remain in different representations.

## 6. Payloads and structural ownership

Structural information lives only in the GLB. The manifest holds only semantics. There is exactly one structural authority per representation.

### 6.1 Roles

| Role | Required | Consumer | Rules |
| --- | --- | --- | --- |
| `proxy` | yes | marketplace preview, browser editor live preview | lightweight; self-contained; the editor never downloads `full` |
| `full` | yes | bake backend | high-fidelity bake input |

Each payload descriptor MUST declare `digest`, non-negative `size`, and `mediaType`. Unknown optional payload slots MUST be preserved and ignored.

`proxy` and `full` are independent GLBs. The profile MUST NOT require identical hierarchy, primitive layout, material indices, polygon count, or pixels between them.

Both GLBs MUST be self-contained in v1: external buffer or image URIs are forbidden.

### 6.1.1 Role-scoped retrieval and inspection

`proxy` and `full` are required **package roles**, but a consumer need not retrieve every role to perform its own role-scoped work. Inspection policy MAY declare `expectedRoles`:

- When omitted, every declared role is expected. This is the strict default for `.nookpkg` archive inspection, registry acceptance, and publication validation. An absent expected role emits `NOOK-BLOB-MISSING` (`ERROR`).
- A preview/editor consumer that has deliberately fetched only proxy declares `expectedRoles: ["proxy"]`. An absent `full` then emits `NOOK-BLOB-NOT-INSPECTED` (`INFO`): the payload is known to exist in the manifest, but its integrity and semantics were not verified in this inspection. The package MAY be valid for the preview consumer if no `ERROR` applies to proxy-relevant semantics.
- A bake consumer declares at least `expectedRoles: ["full"]`; absence of full remains `NOOK-BLOB-MISSING` (`ERROR`).

Role mappings are caller policy, not a package rule. `NOOK-BLOB-NOT-INSPECTED` never claims the skipped payload is valid; it preserves the trail a downstream consumer needs to decide whether more bytes must be fetched.

### 6.2 Logical root and transform composition

Every representation MUST contain **exactly one** logical package root, marked with:

```jsonc
{ "extras": { "nook": { "packageRoot": true, "nodeId": "nook.root" } } }
```

- A single-root source is marked directly.
- A multi-root source MUST receive an SDK-synthesized identity wrapper carrying these markers.
- No other node in that representation may claim the reserved `nook.root` identity.

Every consumer that places a prefab MUST compute:

```
effectiveRoot = worldAncestors × instancePlacement × storedPackageRoot
```

The stored package-root transform MUST NOT be silently discarded or replaced. The coordinate/handedness conversion boundary is applied consistently outside this semantic order.

### 6.3 Nested prefab instances

A dynamically linked nested prefab is encoded at a GLB node:

```jsonc
{ "extras": { "nook": { "prefabInstance": {
    "kind": "prefab", "id": "p_01K4...", "version": "2.0.1",
    "digest": "sha256:...", "params": { "shadeColor": "#AA8844" }
} } } }
```

The node's own transform is the nested placement, recursively consistent with top-level instance semantics. Static/flattened content remains ordinary GLB structure and MUST NOT create a package dependency.

### 6.4 Nook semantic components

Registered components live under `extras.nook.components` using capability-versioned schemas. Standard glTF consumers ignore them. Every component a package uses MUST be represented in `requires`. Lights use official `KHR_lights_punctual` rather than a Nook component.

## 7. Parameter system (v1)

A prefab instance MAY modify only its placement transform and values for parameters declared by its pinned version. Arbitrary node, component, material, or engine-property overrides are forbidden.

```jsonc
// ParamDecl
{
  "paramId": "...",
  "displayName": "Primary color",
  "type": "color",
  "constraints": {},
  "default": "#FFD700",
  "bindings": [
    { "representation": "full",
      "nodeId": "n_bulb",
      "propertyPath": "mesh.primitives[2].material.pbrMetallicRoughness.baseColorFactor",
      "required": true },
    { "representation": "proxy",
      "nodeId": "n_bulb_proxy",
      "propertyPath": "mesh.primitives[0].material.pbrMetallicRoughness.baseColorFactor",
      "required": false }
  ]
}
```

`paramId` is the migration anchor: non-empty, unique within the manifest, and stable across versions while it represents the same configurable concept. `displayName` and description are presentation metadata and MAY change freely without producing migration data.

### 7.1 Type table

| Type | Status | Constraints | Notes |
| --- | --- | --- | --- |
| `int` / `float` | v1 | `min` / `max` / `step` | |
| `bool` | v1 | — | |
| `string` | v1 | `maxLength` | |
| `enum` | v1 | `options: [{value, label}]` | default MUST match an option |
| `color` | v1 | — | `#RRGGBB` or `#RRGGBBAA` |
| `vec2` / `vec3` | v1 | per-component `min` / `max` | |
| `prefabRef` | v1 | accepted categories/kinds | reference type; enters the dependency closure |
| `textureRef` | reserved | — | name registered, unsupported in v1 |
| `materialRef` | reserved | — | name registered, unsupported in v1 |
| `curve` / `gradient` | not registered | — | not v1 types |

Each type is governed by an independently versioned capability `nook.parameter/<type>@<v>`.

Every declaration MUST supply a `default` valid for its type and constraints. Every instance value MUST validate against the declaration of its pinned version.

### 7.2 Representation-scoped bindings

Each parameter declares one or more bindings identifying `representation`, `nodeId`, `propertyPath`, and `required`.

- A `full` binding declared as required MUST resolve to an existing node and a writable, type-compatible target; otherwise the package is invalid (`ERROR`).
- A `proxy` binding MAY be absent or optional-and-unresolved. That leaves the parameter without preview effect and produces a stable degraded-preview diagnostic (`INFO`/`WARNING`). It MUST NOT invalidate otherwise valid `full` semantics.
- The `representation` enum is extensible.

Because a manually authored proxy may differ completely in hierarchy, material slots, and merging, the same path is not guaranteed to address the same semantic property in both payloads. Bindings are therefore always representation-scoped.

### 7.3 Path language `nook.path/1`

`propertyPath` values MUST conform to `nook.path/1`. Fully arbitrary JSON paths are forbidden.

- Root namespaces: `transform`, `mesh`, `nook`.
- Segments are dot-separated with `[i]` array indices and `named("...")` by-name segments. By-name segments are the robust alternative where indices are fragile.
- Only registered writable semantic targets are allowed. Each target has an expected value type; the writable-target whitelist and the parameter-type compatibility table are one artifact serving both validation and UI generation.
- Escaping: inside `named("...")`, `\\` escapes a backslash and `\"` escapes a quote. No other escapes are defined in v1.
- New paths are registered through the capability registry (§13) under `nook.path@<v>`.

Registered v1 targets:

| Target | Value | Notes |
| --- | --- | --- |
| `transform.translation`, `transform.scale` | `vec3` | `[i]` addresses one component as `float` |
| `transform.rotation` | quaternion | Registered because the contract names it, but v1 declares no four-component parameter type, so binding to it whole is a type mismatch until a quaternion capability exists. |
| `mesh.primitives[<i>].material.<property>` | see below | Index selection. Reordering primitives silently changes what it addresses, so it is reported as fragile. |
| `mesh.material.named("<name>").<property>` | see below | Name selection. Stable across re-export; must match exactly one primitive on the node. |
| `nook.components.<component>.<field>` | the field's registered type | |
| `nook.prefabInstance.reference` | `prefabRef` | |

Material `<property>` values:

| Property | Value |
| --- | --- |
| `pbrMetallicRoughness.baseColorFactor` | `color` (RGBA); `[i]` gives `float` |
| `pbrMetallicRoughness.metallicFactor`, `pbrMetallicRoughness.roughnessFactor` | `float` |
| `pbrMetallicRoughness.baseColorTexture.transform.offset`, `.scale` | `vec2` |
| `pbrMetallicRoughness.baseColorTexture.transform.rotation` | `float` |
| `emissiveFactor` | `color` (RGB); `[i]` gives `float` |
| `alphaCutoff` | `float` |
| `doubleSided` | `bool` |

The `baseColorTexture.transform.*` targets are the semantic form of the whitelisted `KHR_texture_transform` extension. They resolve only when the material declares a base-colour texture, and they are where `vec2` parameters bind in v1.

### 7.4 Reference-typed values

A reference-typed value uses the §5 envelope. `prefabRef` constraints MAY restrict accepted categories or kinds. Both declaration defaults and instance values contribute exact references to dependency-closure collection.

## 8. Serialization

The canonical model is manifest plus CAS blobs, with two losslessly interconvertible physical forms.

### 8.1 Wire form

The manifest is an API object; blobs are independently addressable by digest.

```
Editor install / preview:  GET manifest → payloads.proxy.digest → GET blob (cached forever by digest)
Bake backend:              GET manifest → full blob → recursively resolve the dependency closure
Upgrade:                   GET new manifest → diff digests → download only changed blobs
```

### 8.2 Archive form `.nookpkg`

A `.nookpkg` is a ZIP archive containing exactly one root `manifest.json` and that package's own declared payload blobs under `blobs/`.

```
wall-lamp_1.2.0.nookpkg
├── manifest.json
└── blobs/
    ├── sha256_a1....glb   (proxy)
    └── sha256_b2....glb   (full)
```

- Blob filenames are deterministically derived from their digests: `blobs/<algorithm>_<hex><extension>`. Filenames MUST NOT be used as a substitute for verifying bytes.
- A `.nookpkg` is **not** dependency-closure self-contained. A package that declares a dependency but bundles only its own blobs is structurally complete.
- A `.nookbundle` (root package plus transitive closure) is a registered distinction only; its format is undefined.

## 9. Minimum world instance record

The world/scene format is out of scope. This contract defines only the minimum record a world must be able to express:

```jsonc
{
  "prefabRef": { "kind": "prefab", "id": "p_01J9Z...", "version": "1.2.0", "digest": "sha256:..." },
  "transform": { /* placement, builder-editable */ },
  "params": { "paramId": "value" }
}
```

- Freeform node/component/property overrides are not part of this contract.
- Multiple versions of the same `id` MAY coexist in one world; each record resolves independently by its pinned version and digest.
- Nested in-definition instances (§6.3) share this shape recursively.

## 10. Versions and migration

Published versions are immutable. Instances pin versions. Upgrading is an explicit builder action with a user-intervenable migration process: automatic `paramId` matching → diff review → atomic switch on confirmation → download of changed blobs only.

| Change between versions | Handling of existing instance values |
| --- | --- |
| `displayName` / description changed | safe, carried directly |
| constraints narrowed | carried and clamped, flagged for review |
| enum options added | safe |
| enum options removed/changed | automatic with a creator-supplied mapping, otherwise prompted |
| `int` ↔ `float` | automatic conversion |
| other type changes | manual, with the new default when left empty |
| parameter removed | warning |
| parameter identity replaced | `migrationHints.parameterReplacements`, carried automatically |
| parameter added | creator default applied, listed for review |

`migrationHints.parameterReplacements` maps an obsolete parameter identity to a replacement identity **only** for exceptional recovery or semantic replacement — accidentally regenerated IDs, replace/merge/split, or recovery from lost authoring metadata. Ordinary display-name changes MUST NOT create replacement entries. A replacement target MUST exist in the target manifest; ambiguous replacement graphs are invalid.

## 11. Representation-semantic consistency

Consumers read different representations (proxy, full, baked output) whose render results are deliberately not identical. The invariants that MUST hold are:

1. **Parameter semantics** — the same value produces the same contract-defined effect within each representation's declared binding scope.
2. **Composition math** — `ancestors × placement × storedPackageRoot` yields the same contract-space transform in every consumer, within a declared numeric tolerance.
3. **Identity/version semantics** — `{kind, id, version, digest}` denotes one exact immutable version everywhere; no silent substitution of a newer version, another digest, or a mutable latest alias.
4. **Diagnostic semantics** — the same invalid document produces the same stable diagnostic codes and severities across implementations under the same role and policy.

Explicitly **not** required: pixel or render equivalence, identical internal data structures, equal polygon counts, matching hierarchy across roles, or use of the same implementation library. Conformance is testable through identities, resolved paths, typed values, transforms, component fields, dependency graphs, support states, and diagnostics.

## 12. Validation, diagnostics, and security

Packages are untrusted interchange artifacts. Validators MUST use maintained ZIP and glTF parsing libraries rather than home-grown binary parsers, MUST NOT execute embedded content, MUST NOT perform implicit network access, and MUST NOT partially install or mutate consumer state during inspection.

### 12.1 Validation phases

Validation proceeds in this order so that unsafe or deceptive downstream work is avoided:

1. archive envelope and resource limits;
2. manifest parse and structural schema;
3. canonical identity, blob inventory, size, and digest integrity;
4. GLB parse and Portable Profile checks;
5. parameter, path, and binding semantics;
6. nested dependency coverage and graph checks;
7. capability and semantic-consistency checks.

A fatal safety or envelope error MAY stop deeper parsing. Otherwise all safely discoverable diagnostics are collected. Diagnostic ordering is deterministic by phase, then location, then code.

### 12.2 Checks

**Manifest** — supported `spec` major; legal `id` and semantic `version`; dependencies pinned with no duplicate tuples; resolver-attested digest equality before resolved content is trusted; no dependency cycles; unique `paramId` values; defaults satisfy constraints; bindings type-compatible; `requires ⊇ actual usage`, sorted and deduplicated.

**Archive and blob** — digest/size mismatch; missing expected blobs; deliberately un-fetched non-expected blobs; extra blobs; path traversal; absolute paths; duplicate normalized paths; unexpected manifest location; unsafe links; encrypted entries; decompression bombs; entry-count, archive-byte, per-entry and total-expanded-byte, compression-ratio, and manifest-byte limits.

**GLB and profile** — malformed GLB structure; external URIs (forbidden in v1); node, primitive, material, texture, and image caps; unsupported required glTF or Nook extensions including `KHR_texture_transform` support where its registered parameter targets are used; unique package root; safe inspection of registered `extras.nook` records.

**Validation subject and priority** — checks apply to the artifact in transit: original archive bytes and original GLB JSON/resources, never a parser-normalized or inlined substitute. When multiple rules match, the validator emits the most specific actionable diagnostic first (for example, an ambiguous parameter-replacement chain rather than a downstream missing-target consequence). Binding validation is semantic: a syntactically registered path also has to address the corresponding material, texture, component, or node in the representation.

### 12.3 Severity policy

| Level | Meaning |
| --- | --- |
| `ERROR` | the package cannot be imported, published, or baked |
| `WARNING` | the package is valid, but preview or migration behavior is degraded |
| `INFO` | compatibility, incomplete-inspection, or optimization information |

Every diagnostic carries a stable machine-readable code, a severity, a package-relative location or semantic path, and human-readable detail. Blob role/digest and involved package/node/parameter identities are included when applicable. Message wording MAY evolve without changing a code's meaning. Validity is exposed separately from diagnostic count.

The diagnostic-code catalog is maintained in [`PREFAB_PACKAGE_DIAGNOSTICS.md`](PREFAB_PACKAGE_DIAGNOSTICS.md).

## 13. Forward compatibility

Three tiers of consumer behavior:

1. **Unknown optional metadata and unknown optional payload slots** → preserve and ignore.
2. **An unrecognized entry in `requires`** → reject normal consumption with `NOOK-UNSUPPORTED-CAPABILITY`. Role-scoped degradation is optional: inspection tools MAY force-open and preview MAY render proxy only, but configuring instances and republishing are forbidden in that state.
3. **Round-trip preservation in all cases** → reserialization MUST carry unknown fields and unknown-typed parameter values verbatim, and preserved unknown data participates in canonical hashing.

### 13.1 Capability registry

- Namespaces: `nook.parameter/<type>@<v>`, `nook.component/<name>@<v>`, `nook.path@<v>`. Each capability is versioned independently.
- `requires` is mechanically generated by the SDK from actual usage. Validators enforce `requires ⊇ actual usage`; under-reporting is an `ERROR`.
- The `x.*` prefix is reserved for experimental capabilities. Packages published to the marketplace MUST NOT carry them.
- Capability support is per-consumer, so staged rollouts degrade cleanly instead of corrupting data.

### 13.2 Evolution mechanism

| Change | Mechanism |
| --- | --- |
| New parameter type, component, or payload slot | new registry entry; `spec` unchanged; old consumers degrade per tier 2 |
| Incompatible change to a capability's value domain | capability version +1 (e.g. `color@2`) |
| Breaking change to the manifest structure | `nook.prefab` major +1; higher majors are rejected |

## 14. Reference implementation

`src/prefab-package/` contains a local, side-effect-free inspection and validation proof of concept for this contract, and `tests/fixtures/prefab-package/` contains the normative fixture corpus. The PoC implements inspection only. It does not implement creator SDK export, upload, registry/CAS storage, editor placement, baking, or publishing.

## 15. Deferred items

The following are explicitly out of scope for this contract version: long-term positioning of custom shaders and runtime programmability; runtime mutability of parameters after bake; the parameter UI generation rules table; `materialRef` and `textureRef` semantics; `curve`/`gradient` parameter types; the world/scene file format; extracting textures into standalone blobs; the `.nookbundle` format; version delisting/deprecation policy; reconciliation-matching heuristics; the Unreal-side SDK carrier; SDK local preview/simulator; and paid/licensed assets.

## 16. Relationship to legacy contracts

- [`CANONICAL_FORMAT.md`](CANONICAL_FORMAT.md) `PrefabAsset.rootNode` and `prefabRef` component are **legacy prototype behavior**, superseded by this document for all future prefab work. The remainder of that scene contract is unchanged and is not redesigned here.
- [`UNITY_EXPORT.md`](UNITY_EXPORT.md) prefab generation is **frozen implemented behavior**. It receives no package-format functionality; package/bake integration is a separate future change.
- See [`ADR/006-prefab-package-interchange.md`](ADR/006-prefab-package-interchange.md) for the decision record.
