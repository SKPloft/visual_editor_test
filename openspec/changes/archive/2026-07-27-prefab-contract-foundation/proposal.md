## Product Origin

- **Lark sources:** [MVP前工作图](https://vrcd-community.feishu.cn/wiki/HTrmwgVa5i31JSkP6bDcoJWinId), [全流程管道](https://vrcd-community.feishu.cn/wiki/Tsz2w55fNiYUhokjFrZc6mEFnud), and the linked `预制件`, `配置/上传`, and `创作者资产适配` pages.
- **Approved engineering inputs:** `docs/drafts/prefab-package-format-v0.en.md` v0.1 and `docs/drafts/prefab-format-discussion-log.en.md` through R8 consolidate the product decisions that this change formalizes.
- **Decision status:** Approved to proceed progressively with package-contract formalization and a local validation/inspection proof of concept. Explicitly deferred topics remain deferred rather than being inferred as requirements.
- **Decision dates:** Product discussion 2026-07-24 through 2026-07-25; OpenSpec scope confirmed 2026-07-26.

## Why

Nook needs a portable prefab interchange contract before independently developed Unity/Unreal SDKs, marketplace services, the browser editor, and baking systems can exchange creator assets without identity, parameter, transform, or compatibility drift. The existing embedded-JSON prefab prototype does not represent the approved product direction, so the first progressive step is to formalize the package boundary and prove it with local, deterministic inspection and validation rather than attempting the entire prefab pipeline at once.

## What Changes

- Define a Nook prefab package as a canonical manifest plus content-addressed payload blobs, with exact identity, immutable-version, dependency, integrity, archive, and round-trip rules.
- Define the Nook Portable Prefab Profile and GLB structural contract, including separate proxy/full roles, exactly one logical package root, composed placement/root transforms, semantic components, and dynamically linked nested prefab instances.
- Define creator-declared parameters without freeform instance overrides, including stable parameter identity, supported and reserved types, representation-scoped bindings, the `nook.path/1` semantic path language, reference envelopes, defaults, constraints, and migration anchors.
- Define untrusted-package validation, resource/security limits, capability declarations, forward-compatible degradation, and stable `ERROR`/`WARNING`/`INFO` diagnostic codes.
- Define representation-semantic consistency across proxy, full, and future baked consumers without requiring pixel equivalence or shared internal representations.
- Implement only a **local validation/inspection PoC** with normative fixtures sufficient to exercise the contract. It does not implement creator SDK export, cloud upload, marketplace storage, production CAS, editor placement, baking, or publishing.
- **BREAKING CONTRACT DIRECTION:** Replace the prefab-related assumptions of `docs/CANONICAL_FORMAT.md` with the package/reference model. The complete world format remains a later change; this change defines only the minimum prefab-instance reference boundary needed to avoid contradiction.
- Freeze the current embedded-prefab browser loader and generated Unity importer path for prefab work. They remain implemented prototype behavior, receive no new package functionality in this change, and are superseded by later integration changes rather than silently treated as the target architecture.

**User-visible outcome:** no end-user editor workflow changes in this foundation slice. Engineers and future SDK/service consumers gain an inspectable package format, deterministic validation behavior, stable diagnostics, and fixtures that make subsequent prefab changes incremental and interoperable.

**Non-goals:** cloud APIs or storage implementation; marketplace launch; authentication, licensing, or entitlements; production backend jobs; full creator SDKs; browser-editor package integration; complete world/scene format; upgrade UI; bake/export implementation; runtime-dynamic parameters; VRChat publishing; custom shader/programmability policy; reserved material/texture reference implementation; and all items explicitly deferred in the approved drafts.

## Capabilities

### New Capabilities

- `prefab-package-contract`: Defines the canonical manifest, content identity, immutable versions, pinned dependencies, payload descriptors, unified references, `.nookpkg` serialization, minimal world-reference boundary, and round-trip requirements.
- `prefab-portable-profile`: Defines GLB structural ownership, Portable Prefab Profile v1, proxy/full roles, logical-root and transform-composition semantics, Nook components, nested instances, and profile-compliance behavior.
- `prefab-parameter-contract`: Defines declarative parameter identities, supported and reserved types, constraints/defaults, representation-scoped bindings, `nook.path/1`, reference values, and migration semantics.
- `prefab-package-validation`: Defines validation phases, package integrity and security checks, capability governance, compatibility behavior, resource limits, transactional rejection, and stable diagnostics.
- `prefab-semantic-consistency`: Defines invariant parameter, composition, identity/version, and diagnostic semantics across independent package consumers and representations.

### Modified Capabilities

None. There are no existing main OpenSpec capability specifications. Existing prefab behavior is documented by repository contracts and code, whose supersession is addressed explicitly under Impact.

## Impact

- **Stable contracts:** prefab sections of `docs/CANONICAL_FORMAT.md` are superseded by this package contract; the remaining scene/world contract is not redesigned here. `docs/UNITY_EXPORT.md` continues to describe implemented legacy behavior and must be annotated as frozen/superseded for prefab evolution rather than rewritten as package support.
- **Draft promotion:** approved content in `docs/drafts/prefab-package-format-v0.en.md` becomes normative contract material; the discussion log remains rationale rather than a runtime contract.
- **Architecture decisions:** add an ADR recording interchange-first packaging, GLB structural ownership, manifest plus CAS identity, real-root composition, declared parameters, semantic consistency, and the staged migration away from embedded prefabs.
- **PoC code:** add isolated package schema/types, safe archive inspection, maintained GLB parsing/validation integration, JCS/digest verification, dependency and binding validation, capability checks, and diagnostic reporting. Avoid coupling these modules to the current editor state in this change.
- **Fixtures/tests:** add valid and adversarial `.nookpkg`/manifest/GLB fixtures covering identity, root, parameter, nested dependency, compatibility, round-trip, integrity, archive-security, and diagnostic consistency requirements.
- **Legacy path:** `src/scene` embedded prefab loading and `src/export/unityPackageGenerator.ts` remain unchanged except for any strictly necessary contract-status documentation; later OpenSpec changes will adapt or replace them.
- **Dependencies:** a maintained GLB parser/validator and an RFC 8785-compatible JSON canonicalization implementation may be introduced for the isolated PoC; no network service or production storage dependency is introduced.
