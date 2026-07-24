## Product Origin

- **Lark sources:** [MVP前工作图](https://vrcd-community.feishu.cn/wiki/HTrmwgVa5i31JSkP6bDcoJWinId), [全流程管道](https://vrcd-community.feishu.cn/wiki/Tsz2w55fNiYUhokjFrZc6mEFnud), and the linked product pages `预制件`, `配置/上传`, and `创作者资产适配`.
- **Decision status:** Product direction is confirmed for OpenSpec architecture planning. This change is the approved first local-contract slice; implementation has not started.
- **Decision date:** 2026-07-24.

## Why

Nook's creator-to-editor pipeline requires prefabs to carry stable identity, creator-controlled declarative parameters, and a lightweight preview representation while preserving full-fidelity export semantics. The current editor has only an unversioned prefab reference whose root data is ignored and whose structure is insufficient for validated persistence or consistent browser and Unity behavior, so the canonical contract must be established before upload, processing, catalog, or bake services are designed.

## What Changes

- Define an engine-neutral contract for prefab definitions, version identity, prefab instances, dependency references, creator-declared parameters, and instance parameter values.
- **BREAKING:** Make the prefab root a real instantiated node whose transform and components participate in both browser preview and Unity export, replacing the current child-only behavior. Existing canonical documents require an explicit compatibility or migration rule.
- Represent two optimized-preview authoring intents without introducing cloud processing: creators may select dedicated proxy object(s), or request generation from selected source object(s).
- Require deterministic validation and actionable diagnostics for malformed definitions, duplicate identities, unresolved dependencies, recursive references, invalid parameter values, and unsupported compatibility states.
- Preserve prefab contract data and diagnostics across the browser-local canonical JSON save/open cycle.
- Require browser preview and generated Unity importer output to interpret the same valid prefab document consistently.
- Update the canonical-format and Unity-export contracts and record the root-semantics/compatibility decision in an ADR.
- Keep the slice local and declarative. Cloud upload, catalog, storage, background jobs, entitlements, world bake orchestration, external mesh or texture ingestion, VRChat publishing, and creator-authored configuration scripts are non-goals.

**User-visible outcome:** a locally saved Nook project can contain validated, declaratively configurable prefab instances with meaningful roots and preview intent, reopen without losing those semantics, and export to Unity without browser/export contract drift.

## Capabilities

### New Capabilities

- `prefab-domain-contract`: Defines prefab and version identity, real-root semantics, dependencies, declarative parameter definitions and values, and optimized-preview authoring intent.
- `prefab-contract-validation`: Defines document validation, stable diagnostics, compatibility handling, and lossless browser-local save/open behavior for prefab contract data.
- `prefab-runtime-parity`: Defines equivalent prefab interpretation across the browser preview and generated Unity importer, including root behavior, references, and parameter values.

### Modified Capabilities

None. The project does not currently contain main OpenSpec capability specifications; the existing behavior is governed by repository contracts and implementation.

## Impact

- **Stable contracts:** `docs/CANONICAL_FORMAT.md` and `docs/UNITY_EXPORT.md` require coordinated revisions. Canonical format versioning and compatibility behavior must be explicit.
- **Architecture decisions:** add an ADR covering real prefab-root semantics, engine-neutral declarative bindings, preview-authoring intent, and the boundary between canonical data and future platform processing.
- **Scene model and persistence:** prefab/component types, canonical JSON guards or schema validation, and local save/open compatibility are affected.
- **Browser runtime:** prefab reference resolution and diagnostics in the Three.js scene loader are affected.
- **Unity target:** generated data models, prefab construction, instance resolution, and parameter application are affected together; Unity-specific bindings remain outside the canonical scene model.
- **Tests and verification:** contract fixtures, invalid-document cases, save/open round trips, recursive and missing-reference cases, browser root rendering, and generated Unity-package behavior need coverage.
- **Dependencies and services:** no new runtime service, cloud dependency, asset-processing worker, authentication system, or external asset loader is introduced by this change.
