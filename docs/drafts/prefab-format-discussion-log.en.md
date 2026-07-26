# Prefab Format · Discussion and Decision Log

> **Status: Discussion minutes (2026-07-24/25, updated at R8). Read alongside [`prefab-package-format-v0.en.md`](prefab-package-format-v0.en.md).**
> This document records the **questions raised by both parties, the options considered, the chosen answers, and their rationale**, as well as the parts not yet decided.
> Status legend: ✓ Confirmed ｜ ⚑ Pending (needs further discussion) ｜ ⏸ Deferred (until after PoC or when conditions mature)
> Starting materials: Lark's "Prefab Internal Structure · Technical Comparison" (options A/B/C), the Lark end-to-end pipeline and prefabs pages, and the proposal of OpenSpec change `prefab-contract-foundation`.

## 1. Discussion chronology

```
Round  Topic                              Output
──────────────────────────────────────────────────────────
R1     Initial constraints → 3-layer model  Semantics/serialization/in-memory separation; engine format survey
R2     Three product answers                Interchange-first positioning, declared parameters, version pinning → pipeline map
R3     Lifecycle draft v0                   9-stage flow; 6 new product-question flags
R4     Parameter type system                Type list v1; binding rules; compatibility rules v0
R5     Identity allocation (thread 4)       Four identities × strategy allocation table
R6     Package anatomy (thread 2)           β structural ownership; manifest+CAS; two physical forms; upload Option A
R7     External review (another agent)      13 findings: 5 pure tightenings, 4 corrections, 3 product calls, §5 deep-dive
R8     Review disposition + compat final    All accepted (with amendments); semantic-consistency rename; 3-tier behavior → v0.1
```

## 2. Initial questions (raised by the user)

**Q0-1: The format should be structurally similar to — or easily convertible to — prefab/asset-collection structures of popular engines.**
→ Conclusion: ✓ Achieved by aligning with the industry convergence point of "node tree + components + asset references + instances-with-deltas"; the real divergences are the override model, identity/references, and root semantics. Frame of reference: for structural semantics look at glTF/USD/Unity; **for versioning and distribution look at npm/OCI** — because game engines collectively punt on versioning (they assume assets and scenes co-evolve, while Nook assumes creators publish versions and builders pin them).

**Q0-2: Memory-efficient structures; balance between space and IO speed.**
→ Conclusion: ✓ Once decomposed, "efficiency" does not really apply to the editor's local save files (small scale; JSON is fine). Its real landing spots are: ① mall→editor downloads (CAS dedup; upgrades fetch only changed blobs); ② the editor never downloads full payloads; ③ the runtime of baked output (belongs to the world format, not yet discussed). The L3 in-memory layout (SoA/TypedArray) is ⏸ deferred as a whole — "too far out; settle the upper layers first".

**Q0-3 (the user's puzzle): the constraints, concepts, and open questions in the Lark doc "don't feel tangible".**
→ Diagnosis: the doc only developed the semantic layer (transform composition A/B/C), while the user's intuition was looking for the other layers. "Prefab format" is not one decision but three layers, and decisions across layers are orthogonal — they need not be settled simultaneously.

## 3. Product-level decisions

**Q1 (assistant): where do creators author?**

- User: in engines (Unity/Unreal), imported into the ecosystem via platform Nook SDKs (LOD uploaded to the mall, mall downloads to the editor). The format lives in the mall preview, asset storage, editor live preview, and backend bake input. **Primarily an interchange format, but with some authoring-format aspects.**
- Corollary: ✓ "Interchange format vs authoring format" is split — the editor's in-memory representation is free; serialization follows the interchange format. "Human-readable" is largely abandoned for prefab packages (revisit for world save files).

**Q2 (assistant): what can builders change?**

- User: only the transform and creator-exposed parameters. Parameter types TBD but must include numbers (int/float), objects (Nook prefabs), materials, textures.
- Corollary: ✓ No Unity-style freeform overrides needed (see §4-D).

**Q3 (assistant): what happens to instances when a prefab updates?**

- User: **they pin the old version; the user chooses when to upgrade.**
- Corollary: ✓ The frame of reference shifts from game engines to package managers: immutable `id@version`, multi-version coexistence, lockfile mental model, CAS dedup.

**Q4 (⚑5, assistant): where are nested prefabs authored?**

- User: **the creator chooses at export time** — a nested prefab may become/correspond to a Nook prefab (a dependency then exists), or be integrated into the parent. ("Corresponding to an existing store prefab" was flagged by the user as "a potentially broad topic".)
- Crystallized: ✓ the **static linking vs dynamic linking** mental model (same as USD flatten, linkers, Unity unpack). Choosing dynamic linking → inter-package dependencies → publish-ordering constraints (the dependency must be published first, or co-published in dependency order) → packages need their own dependency declarations.

**Q5 (⚑2, assistant): can the mall preview adjust parameters?**

- User: undecided but **leaning yes**.
- Corollary: ✓ hard constraint — proxy + parameter declarations must be standalone-renderable; after R7 this was further crystallized as "a parameter with an absent proxy binding simply has no preview effect (INFO/WARNING)" (see §7-R7).

**Q6 (⚑4, assistant): are parameter values frozen at bake time or dynamic at runtime?**

- User: depends on the editor user; genuinely complex; **discuss later**. The goal of this round is "settle stable standards as far as possible, complete the PoC, then advance".
- Status: ⏸ deferred. The format does not yet distinguish bake-time vs runtime parameters.

**Q7 (assistant): does the world file contain loose content besides prefab instances?**

- User: uncertain; most likely considered after the whole flow is done. ⏸
- Also confirmed: the world format has its own constraints but is unthought-through; **discuss after the prefab definition stabilizes**.

**Q8 (assistant): the status of the current repository contract (CANONICAL_FORMAT.md)?**

- User: ✓ confirmed as an old scratch that no longer matches the product direction; **it can be replaced**.

**Q9 (surfaced by the flow; flagged, not deeply discussed)**:

- ⚑1 SDK local preview/simulator (can creators preview the "Nook-ified" result before uploading) — TBD.
- ⚑6 version delisting/deprecation policy (what happens to worlds pinned on that version) — TBD.

**Q10 (added at R8, review-triggered): the positioning of custom shaders and runtime programmability?**

- User: ✓ the Portable Prefab Profile starts from basic components (geometry/PBR/lights/Nook components); **the long-term shader/programmability story is filed as a separate Lark-level product issue** — no default decision inside the technical draft.

**Q11 (added at R8, review-triggered): how to dispose of the legacy implementation path (browser loader with embedded prefabs + Unity generator)?**

- User: ✓ the OpenSpec change must record the disposition stance for the legacy path (frozen; no new work; replaced by a later change), even if that change touches no code — per AGENTS.md, "contract/code disagreements are reconciled explicitly".

## 4. Semantic-layer decisions

**D. The override model**

- Options: freeform overrides (Unity-style arbitrary property delta tables keyed by propertyPath) vs declared parameters (creators declare knobs; instances only assign values).
- Choice: ✓ **declared parameters**. The user initially intuited that "a delta set / override system may still be needed"; after the conceptual distinction was drawn, confirmed unnecessary — within the builder's permission scope (transform + exposed parameters) there is no use case for freeform overrides.
- Rationale: fixed-shape data `{paramId: value}`; trivial validation; auto-generatable UI; naturally cross-engine; skips the hardest part of Unity's prefab system.
- Key clarification: **reference-typed parameters (prefab/material/texture) introduce new dependencies into a world through their values** → dependency-closure collection must traverse parameter values.

**E. Anchors (user's technical point 1: "version switching involves parameter independence and update issues; there must be a user-intervenable migration process, so parameter binding and overrides probably need anchors")**

- Conclusion: ✓ two kinds of anchors with different stability requirements:
  - **paramId** = migration anchor, stable across versions, facing creators/SDK (the only thing that lets instance values follow an upgrade).
  - **nodeId** = binding anchor, only needs within-version stability, facing the SDK; only nodes targeted by parameter bindings need one.
- Payoff: bindings may be restructured freely within a version; as long as paramIds survive, instance values migrate.

**F. Root semantics (the A/B/C debate in the Lark doc)**

- Options: A (identity root), B (dual-transform composition, the doc's recommendation), C (anchor, no root node).
- Conclusion: ✓ **store per B + composition semantics independent**. The interchange format's first principle is scoped-lossless capture: the glb logical root preserves the creator's root transform verbatim; how placement and root compose is a one-line rule in the spec (composition, degenerating to A when the root is identity).
- Rationale: demotes a "format decision" to "a semantic rule + SDK validation". Supporting trivia: Unity instantiation actually **replaces** the root transform (stored as a modification), while USD/glTF **compose**; Nook adopts composition.
- proxy/full composed-result consistency = an SDK export-time validation duty.
- R7 addendum (review 4.4): ✓ logical root constraint finalized — exactly one logical root; single-root sources are marked (`extras.nook.packageRoot` + reserved nodeId `nook.root`); multi-root exports get a synthesized identity wrapper; composition formula `world = ancestors × placement × storedPackageRoot`.

## 5. Parameter type system (confirmed at R4, amended at R7)

- ✓ Type list v1: int / float / bool / string (user-added) / enum / color / vec2 / vec3 / prefabRef. After R7, `textureRef` and `materialRef` are **reserved types (names registered, unsupported in v1)**. curve and gradient suspended ⏸.
- Binding cardinality: ✓ author-configured, 1..n; may drive transforms (the wall-lamp "protrusion distance" use case — after R7, uniformly addressable via the reserved root nodeId `nook.root`).
- ⏸ UI generation rules: a large discussion needing a dedicated table — **not now**.
- ✓ prefabRef parameters may constrain accepted prefab types/categories; whether materialRef is a standalone asset or an inline property group ⏸ undecided (discussion relaxed while the type is reserved).
- ✓ compatibility rules table (standard doc §10) — the adjudication basis of the upgrade review UI; R7 amendment: `renamedParams` → `parameterReplacements` (exceptional channel); displayName changes produce no migration entries.

## 6. Identity allocation (thread 4)

**Q: does the received wisdom "Unity .meta GUIDs are slow at runtime" hold? (user relaying, guessing "maybe because they're directly exposed to users")**

- Analysis: ✓ misattribution. GUID lookup is O(1), and Unity's runtime doesn't use GUIDs at all; the slowness comes from full-library import/refresh scanning and Library rebuilds. .meta's real disease is **operational fragility** (a second file the user must manage: forgotten commits, Explorer copy-paste collisions, merge conflicts, moves outside the editor) — the user's guess is closer to the truth.
- Corollary for Nook: identities are used only at authoring/export/registry time; runtimes use direct references resolved at load — "runtime efficiency" is not even in the decision space.

**Q: identity strategy selection?**

- Options compared:

| Strategy | Precedent | Cross-version stability | Creator burden | Failure modes |
| --- | --- | --- | --- | --- |
| Sidecar-file persistence | Unity .meta | high | manage/commit sidecar | loss, copy collisions, merge conflicts |
| Component-embedded persistence | VRChat PipelineManager | high | install SDK, don't delete component | asset duplication → ID collision |
| Path-derived | Godot / USD | low (rename breaks) | zero | rename/restructure breaks all |
| Content-hash-derived | git / CAS | none | zero | any edit changes identity |
| Export-time reconciliation | git rename detection / React reconciliation | medium (heuristic) | review UI | similar-node mismatch |

- Choice: ✓ **no single strategy; allocate by stability requirement** (user-confirmed):
  - blob → content hash; prefabId → NookAuthoring component (assigned at first enablement); paramId → SDK-assigned inside the component, never exposed; nodeId → hybrid (persisted binding table + export re-resolution + reconciliation fallback + warning UI).
- Key unlock: **the vast majority of nodes need no cross-version identity** — only "knob targets" do, a very small set.
- Failure countermeasures: Ctrl+D collision → export detection + "new or overwrite" prompt; deleted component → reconciliation offers recovery (⏸ post-PoC enhancement).
- Byproduct: mall-downloaded prefabs carry their identity component → nested references read `id@version` directly, no manual mapping.
- ⚑ Open: paramId form (leaning UUID + free displayName + optional semantic slug; R7's parameterReplacements framing further supports UUIDs); reconciliation similarity algorithm; Unreal-side carrier.

## 7. Package anatomy (thread 2) and the R7 review disposition

### 7.1 Original R6 conclusions

**Sub-question 1: where does structural information live?**

- Options: α manifest holds structure, glb is a geometry payload (two sources of truth) vs β glb holds structure, manifest holds semantics only.
- Choice: ✓ **β (user-confirmed)**. Rationale: single source of truth; `extras.nook.nodeId` lands anchors in glTF's standard extension slot; proxy/full generated in one export pass keep nodeIds consistent; preview/editor load glb anyway; the A/B/C debate settles as "glb root preserved losslessly (B storage) + one composition rule".
- Addendum: semantic components live in `extras.nook.components`; lights use `KHR_lights_punctual`.

**Sub-question 2: logical model?** ✓ manifest + content-addressed blobs; typed payload slots are extensible; dependencies may be ranges in the workspace but are pinned at publish.

**Sub-question 3: physical forms and upload?** ✓ canonical CAS with two serializations — wire (OCI-style) + archive `.nookpkg` (zip). **Upload starts with Option A (whole-archive upload, server unpacks into CAS); the protocol stays compatible with Option B (blob-by-blob push)** (user-confirmed). proxy = glb (draft). ⏸ texture extraction into standalone blobs: v1 embeds self-contained.

### 7.2 R7 external review, item by item (raised by another agent; dispositioned by the user at R8)

| # | Finding | Disposition | Key points |
| --- | --- | --- | --- |
| 4.1 | "Lossless" lacks a portability boundary | ✓ accepted | Define the Nook Portable Prefab Profile (v1: geometry/PBR/lights/Nook components/transforms/whitelisted properties); "lossless" = lossless within the profile; out-of-profile content is **not silently dropped** (explicit export diagnostics). Shaders/programmability → Lark product issue (Q10) |
| 4.2 | One binding path cannot serve both proxy and full | ✓ accepted, **amends the v0 binding model** | representation-scoped bindings (`representation: proxy/full` + `required`); unresolvable full binding = ERROR, absent proxy binding = INFO/WARNING; explicit format, SDK dual-writes for ergonomics. The real blind spot exposed: v0's "single export pass ⇒ consistent nodeIds" only holds for auto-generated proxies, while manual proxies are a first-class authoring intent in the proposal |
| 4.3 | propertyPath needs a real syntax | ✓ accepted | `nook.path/1` whitelisted semantic paths; glTF-correct roots (`translation` / `mesh.primitives[i].material...`); by-name segments against index fragility; whitelist × parameter-type compatibility table serving both validation and UI |
| 4.4 | Logical root constraint is imprecise | ✓ accepted (with an implementation improvement) | don't always synthesize: mark single-root sources (`packageRoot` + `nook.root`); synthesize identity wrappers only for multi-root exports; an addressable root gives root-transform parameters a home |
| 4.5 | Nested-instance representation not encoded | ✓ accepted | glb node `extras.nook.prefabInstance` (node transform is placement, recursively consistent); dependency collection = nested extensions + reference-typed parameter defaults; cycle detection at publish |
| 4.6 | Reference-typed parameters need a unified reference structure | ✓ accepted as A+C combination | generic envelope `{kind, id, version, digest}` (isomorphic to the instance prefabRef and dependency declarations); materialRef/textureRef reserved-unsupported; only prefabRef functional in the PoC |
| 4.7 | paramIds should almost never be "renamed" | ✓ accepted | `renamedParams` → `parameterReplacements`, framed as an exceptional channel; displayName changes produce zero migration entries; reinforces the UUID-paramId orientation |
| 4.8 | Manifest hashing needs canonical bytes | ✓ accepted | JCS (RFC 8785) + `sha256:<hex>` (OCI style); publish-once, reject republish-with-different-digest, manifest excludes its own digest, requires sorted & deduplicated |
| 4.9 | Archive completeness is ambiguous | ✓ accepted | `.nookpkg` = single package + own payloads, not closure-self-contained; future `.nookbundle` — only the distinction is registered |
| 4.10 | Validation and security need a normative chapter | ✓ accepted | untrusted artifacts; manifest and archive checklists; ERROR/WARNING/INFO tiers; stable diagnostic codes in the contract; added: use battle-tested glTF parsing libraries |
| §5 | Forward-compatibility tiers | ✓ accepted and deepened (see §7.3) | |
| — | "runtime parity" is imprecise | ✓ rename accepted (see §7.4) | |
| — | OpenSpec boundary re-scoping | ✓ accepted (see §7.5) | |

### 7.3 Forward compatibility, finalized (R8, user-confirmed)

The review's four tiers and `requires` suggestion are directionally right, but two gaps needed filling: **`requires` duplicates document content and can drift**; and there was no bridge between "mark unsupported configuration" and "reject outright". The final form is **three tiers of consumer behavior + registry governance**:

```
① Unknown optional metadata / payload slots → preserve + ignore
② Unrecognized capability in requires → reject by default
   (NOOK-UNSUPPORTED-CAPABILITY); role-scoped degradation optional
   (force-inspect / render-proxy-only), but no configuring, no republishing
③ Round-trip preservation in all cases (not raised by the review but
   necessary for interchange; negative precedent Unity, positive USD)
```

- `requires` is mechanically generated by the SDK; validators enforce `⊇ actual usage` (borrowing glTF's extensionsUsed/Required mental model, plus under-reporting = ERROR); sorted & deduplicated (affects the hash).
- Independently versioned capability registry (`nook.parameter/color@1`, etc.) → adding a parameter type **does not bump the manifest major**; evolution matrix: addition → registry entry; incompatible domain change → capability @v+1; structural break → spec major.
- `x.*` experimental prefix reserved; mall packages must not use it.
- Why now: defining rejection semantics before any published package exists costs almost nothing; retrofitting them later is a breaking change; the real v1 scenario is editor version lag during staged rollouts.

### 7.4 The "runtime parity" rename (R8, user-confirmed)

- Under the old architecture parity held: two interpreters read **the same** embedded representation, so "equivalent interpretation" is well-defined.
- Under the new architecture it fails: consumers read **different representations** (proxy/full/baked output), and renders **are not supposed to match** (LOD is by design); parity would mislead both implementation and acceptance criteria.
- Renamed to **representation-semantic consistency**, with four invariants: parameter semantic consistency (within declared binding scope), composition math consistency, identity/version semantic consistency, diagnostic semantic consistency. Pixel equivalence is explicitly not required.
- Testability actually improves: fixture assertions without rendering → the core method of the local validation PoC.
- The OpenSpec capability is renamed accordingly: `prefab-runtime-parity` → `prefab-semantic-consistency`.

### 7.5 OpenSpec boundary re-scoping (R8, user-confirmed)

- `prefab-contract-foundation` narrows to **package-contract foundation + a local validation/inspection PoC**: manifest schema, identity & immutable versions, payload roles, the portable profile, root composition, parameter declarations & bindings, nested references, dependency closure, validation & diagnostics, `.nookpkg`, minimal world-reference boundary, fixtures.
- Out of scope: cloud APIs/storage implementation, marketplace launch, auth/entitlements, production backend, full world format, upgrade UI, full SDK, bake implementation, VRChat publishing, runtime dynamic parameters.
- The disposition stance for the legacy path must be recorded (Q11).

## 8. Consolidated open questions

| Question | Status | Trigger |
| --- | --- | --- |
| Positioning of custom shaders / runtime programmability | ⚑ | Lark product issue (Q10) |
| Runtime mutability of parameters after bake | ⏸ | advance after PoC |
| Parameter UI generation rules table | ⏸ | dedicated discussion |
| materialRef semantics | ⏸ | relaxed while reserved; pending surrounding discussions |
| textureRef implementation | ⏸ | relaxed while reserved |
| curve / gradient | ⏸ | revisit after PoC |
| World/scene format (including loose content) | ⚑ | after the prefab definition stabilizes |
| Version delisting/deprecation policy | ⚑ | product discussion |
| SDK local preview/simulator | ⚑ | product discussion |
| Mapping details for "corresponding to existing store prefabs" | ⚑ | when the nesting topic expands (user flagged as "broad") |
| paramId form (UUID vs semantic name) | ⚑ | when the standard is refined (leaning UUID+slug) |
| Reconciliation-matching heuristics | ⏸ | post-PoC enhancement |
| Unreal-side NookAuthoring carrier | ⏸ | engineering validation |
| Texture extraction into standalone blobs | ⏸ | based on real data |
| `.nookbundle` closure archive | ⏸ | when offline whole-tree migration is needed |
| Whether instance params store only non-default values | ⚑ | when the world format is discussed |
| Paid/licensed assets | ⏸ | beyond current scope |

## 9. Precedents referenced during the discussion

| Decision point | glTF | USD | Unity | Godot | npm/OCI |
| --- | --- | --- | --- | --- | --- |
| Identity | index/name | paths | GUID+fileID | node paths | name@version + content hash |
| Versioning | none | none (punted to pipelines) | none | none | first-class, immutable |
| Instance model | subtree sharing/copying | reference composition arc | PrefabInstance + deltas | inherited scenes | dependency declaration + lockfile |
| Overrides | none (extras) | attribute overrides | arbitrary propertyPath | any instance property | — |
| Lazy loading | on-demand buffers | payload arcs | Addressables | lazy resources | on-demand blobs |
| Packaging | .glb dual chunks | usdc crate | AssetBundle | .pck | OCI layers / CAS |
| Forward compatibility | extensionsUsed/Required | versioning + plugins | silent dropping | — | semver/lockfile |

Others: Unity instantiation replaces the root transform (not composes); USD/glTF compose; VRChat PipelineManager = the component-embedded identity precedent (the target user base already knows this mental model); pnpm store = the editor local-cache mental model; git rename detection / React reconciliation = reconciliation-matching precedents; JCS (RFC 8785) = canonicalized JSON hashing; OCI digest `sha256:<hex>` encoding.
