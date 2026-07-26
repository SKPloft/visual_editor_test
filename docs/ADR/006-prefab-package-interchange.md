# ADR-006: Prefab Package Interchange Format

## Status

Accepted

## Context

ADR-002 established a single canonical JSON scene file in which prefabs are embedded node trees (`PrefabAsset.rootNode`). That model was adequate for a browser-local prototype: the Three.js loader walks the embedded tree and the generated Unity importer (ADR-005) rebuilds it.

The approved Nook product model is different in kind, not degree. Creators author in Unity or Unreal with a Nook SDK, the SDK exports an immutable portable package, a marketplace registry stores it, the browser editor previews a lightweight representation, and a backend later bakes a high-fidelity representation. Four independently developed consumers must agree on identity, structure, parameters, transforms, and compatibility without sharing code.

An embedded-JSON node tree cannot carry that: it has no content identity, no immutable versioning, no integrity verification, no dependency pinning, no capability negotiation, and no separation between preview and bake fidelity. It also makes the editor's in-memory model the de facto interchange format.

Doing everything at once — package design, editor migration, world-format redesign, and export rework — would be an unreviewable change. The first slice must therefore formalize the contract and prove it locally.

## Decision

Adopt a prefab **package** as the interchange unit, defined by `docs/PREFAB_PACKAGE_FORMAT.md`. The durable decisions are:

1. **Interchange-first packaging.** The package is an SDK export product consumed by services, the editor, and the bake backend. Consumers' in-memory representations are unconstrained; only serialized bytes follow the contract.

2. **GLB owns structure.** Each representation's node hierarchy lives solely in its GLB payload. The manifest carries semantics and references and never carries a second node tree. Nook semantics ride in `extras.nook` and defined glTF extensions so ordinary glTF consumers can ignore them.

3. **Manifest plus content-addressed blobs.** A package is one manifest plus payload blobs addressed by raw-byte SHA-256. A version's machine identity is `sha256(JCS(manifest))` under RFC 8785, with contract-canonical arrays sorted and deduplicated. `(id, version)` is immutable; republishing a tuple with a different digest is rejected. Wire form and the `.nookpkg` archive form are losslessly interconvertible; the archive is not a dependency closure.

4. **Real-root composition.** Each representation has exactly one logical package root marked `extras.nook.packageRoot = true` with reserved `nodeId = "nook.root"`. Multi-root sources get a synthesized identity wrapper. Every consumer computes `effectiveRoot = worldAncestors × instancePlacement × storedPackageRoot` and never discards the stored root transform.

5. **Declared parameters only.** Instances may modify placement and creator-declared parameters keyed by stable `paramId`, and nothing else. Binding targets are expressed in the whitelisted `nook.path/1` semantic path language, and bindings are scoped per representation because a manually authored proxy may differ structurally from full.

6. **Capability governance.** `requires` is mechanically derived from actual usage and validators enforce `requires ⊇ usage`. Capabilities are versioned independently of the manifest major, unknown required capabilities reject normal consumption, and unknown optional data is preserved verbatim through round-trip.

7. **Semantic consistency without pixel parity.** Conformance is defined over identities, resolved paths, typed values, transforms, component fields, dependency graphs, support states, and stable diagnostic codes — never over rendered output.

8. **Staged migration.** The current `PrefabAsset.rootNode` model, browser prefab resolver, and generated Unity importer are frozen prototype behavior. They receive no package functionality and are superseded for future prefab work. Creator export, registry/CAS, browser consumption, world instances, upgrades, and bake integration each land as their own change, in that dependency order.

The first implementation slice is a local, side-effect-free validation and inspection proof of concept under `src/prefab-package/` with a normative fixture corpus. It is deliberately not wired to the editor.

## Follow-on change boundaries

The contract is broader than any one change can implement. The decomposition below is part of this decision: each boundary names what a change owns and what it must not absorb, so later work does not silently re-open settled questions or bundle unrelated risk.

Ordering is a dependency constraint, not a schedule. A change may only start once everything it reads from exists.

1. **Creator SDK export.** Owns: producing conforming packages from native engine content — identity assignment, profile enforcement at export, proxy/full generation, mechanical `requires` derivation, dependency pinning. Depends on: this contract and the fixture corpus. Must not own: upload, storage, or registry semantics. This comes first because nothing downstream can be tested against real packages until something can make one.

2. **Registry and CAS.** Owns: `(id, version)` immutability enforcement, digest-addressed blob storage, publication policy including the `x.*` prohibition, and the wire form. Depends on: 1, for artifacts to store. Must not own: marketplace UX, entitlements, or licensing — those are separate product decisions.

3. **Browser package consumption.** Owns: fetching manifest plus proxy, local CAS cache, rendering a package instance, and surfacing diagnostics in the editor. Depends on: 2 for retrieval, or on local `.nookpkg` import if it needs to start earlier. Must not own: the world format. This is the change that begins retiring the embedded-prefab loader.

4. **World instance records.** Owns: the minimum instance record (§9) inside the real scene format — pinned references, placement, parameter assignments — and the removal of `PrefabAsset.rootNode` and the `prefabRef` component from the canonical scene contract. Depends on: 3. Must not own: the rest of the world/scene format redesign beyond what prefab instances require.

5. **Version upgrades.** Owns: the migration flow — `paramId` matching, the diff review panel, constraint clamping, `parameterReplacements` handling, changed-blob-only download, atomic switch. Depends on: 4, because there must be pinned instances to upgrade.

6. **Bake and export integration.** Owns: resolving the dependency closure, consuming `full` payloads, applying full bindings, and whatever replaces the current generated Unity importer for package content. Depends on: 2 and 4. Must not own: the frozen legacy importer, which is superseded rather than extended.

Two cross-cutting constraints apply to all six: none may add prefab functionality to the frozen legacy path, and any change to package semantics goes through manifest or capability version evolution rather than editing published behaviour in place.

## Consequences

- **Positive:** Independently developed SDK, marketplace, editor, and bake implementations have one deterministic contract to build against before any of them exist.
- **Positive:** Content addressing gives integrity, deduplication, changed-blob-only upgrades, and reproducible published versions.
- **Positive:** A single structural authority per representation removes the manifest/GLB drift that a dual hierarchy would require reconciling.
- **Positive:** Whitelisted parameters and paths make untrusted-package handling, cross-engine mapping, type validation, and UI generation tractable.
- **Positive:** Freezing rather than rewriting the legacy path keeps the first slice reviewable and leaves the working demo intact.
- **Negative:** The repository temporarily carries two prefab models — the frozen embedded one in `CANONICAL_FORMAT.md` and the package contract — until later changes retire the former.
- **Negative:** The formal contract is broader than the code that implements it in this slice.
- **Negative:** Package inspection introduces untrusted binary parsing surfaces (ZIP, GLB) and therefore third-party parser dependencies and resource-limit policy.
- **Risk:** Stable diagnostic codes and canonical hashing are expensive to change after external SDKs consume them; both are versioned and fixture-pinned from the start.
- **Risk:** Once published packages exist, incompatible contract changes require manifest/capability version evolution rather than repository rollback.
