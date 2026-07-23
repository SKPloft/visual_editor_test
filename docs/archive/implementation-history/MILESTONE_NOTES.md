# Milestone Notes

<!--
FORMAT:
- One section per milestone: ## M0, ## M1, etc.
- Subsections are optional but use these names when they apply:
    ### Status
    ### Scope clarification
    ### Tooling
    ### Discoveries
    ### Input / shortcuts
    ### Open questions
- Keep entries to one or two lines with a file or issue reference when possible.
- Do not change this structure without discussing it first.
-->

Running observations, discoveries, and post-mortem notes for each milestone.

---

## M0: Canonical Format + Scene Graph

### Format and scene graph
- The scene graph intentionally uses inline `children` arrays only. The old `parent` ID reference was removed from the canonical format in `docs/CANONICAL_FORMAT.md`.
- The M0 demo scene is hard-coded in `editor/src/scene/demoScene.ts`. Loading from a real JSON file is planned for M1/M2.

### Tooling
- Switched from npm to bun for faster installs and scripts.
- Imported legacy three.js docs for better coding reference; not yet integrated into the build or workflow.
- Build output produces a 500 kB+ bundle because Three.js is bundled as one chunk. This is acceptable for the technology prototype; code-splitting is a future optimization.

### Discoveries
- Mouse viewpoint controls were already implemented. Need to review whether they conflict with gizmo/shortcut behavior later.
- Several implemented functions rely on nested branches and basic lookups. They are candidates for better data structures and algorithms to reduce O(n) traversal, even in the PoC, because performance may affect evaluation.

---

## M1: 3D Editor Basics

### Status
Milestone is **✅ Completed**. Usability blockers from `bugs-debt.md` (synthetic object selection, gizmo visibility, browser gestures) were resolved.

### Scope clarification
- The renderer already renders a grid and a point light from the canonical scene, but these are part of M0 scene loading, not user-editable editor features.
- Editor UI built with premium dark mode and glassmorphism styling in `index.css`.

### Input / shortcuts
- Decided during doc reconciliation:
  - `Q` Select
  - `W` Move
  - `E` Rotate
  - `R` Scale
- `WASD` camera movement conflicts with `W` for Move. Resolution: camera fly requires holding the right mouse button (`Hold RMB + WASD`) when the viewport is focused.
- `Hold RMB + WASD` camera fly and `Q/W/E/R` tool shortcuts must be disabled when any text input is focused. Current implementation only suppresses `Q/W/E/R` while an `INPUT` is focused; full RMB+WASD camera fly is not yet implemented.

### Open questions
- Can browser gestures be fully suppressed on the canvas in Vivaldi/other Chromium browsers, or will this become a documented limitation? (Answer: Yes, `touch-action: none` resolved the gestures).

---

## M2: Save / Load + Prefabs

### Status
M2 is **✅ Completed**. Save/load uses canonical JSON, and built-in prefabs are represented as `PrefabAsset` definitions plus `prefabRef` scene nodes.

### Discoveries
- The editor now keeps a canonical scene document indexed by node ID in `editor/src/main.ts`; Three.js objects carry their canonical node ID in `userData` for O(1) selection-to-node updates.
- Prefab internals render from the prefab asset but are not individually selectable/editable in M2. Users transform the placed prefab reference node; overrides remain out of scope.

## M3: Unity Export (Minimum Viable PoC)

### Status
M3 is **✅ Completed**. The browser exports a mini Unity package; the Unity Editor importer reconstructs GameObjects, transforms, materials, lights, colliders, prefabs, and avatar placeholders from canonical JSON.

### Discoveries
- The generated package uses Editor + Runtime assembly definitions and Newtonsoft.Json for deserialization.
- Prefabs are exported as real `.prefab` assets via `PrefabUtility.SaveAsPrefabAsset` and instantiated with `PrefabUtility.InstantiatePrefab`.
- Z positions are negated for Unity's left-handed space; rotation quaternions are passed through unchanged.
- Visual lighting fidelity is acceptable for a runnable PoC but needs calibration in M4 (ambient contribution, intensity units, shadow settings).

## M4: Lights + Materials

### Status
Milestone is **✅ Completed**. Shared material assets, a materials panel, light creation/editing, and Unity export parity are implemented.

### Scope clarification
- Ambient light is added as a canonical `lightType: "ambient"` node and rendered with `THREE.AmbientLight` in the browser.
- Unity export maps the ambient node to a low-intensity directional fill light for now. True ambient/sky calibration is intentionally deferred to the alignment phase.

### Discoveries
- The renderer and Unity exporter already consumed shared `MaterialAsset` and `LightComponent`, so M4 was mostly editor UI work.
- `renderCurrentScene()` rebuilds the whole Three.js scene on changes, which is acceptable for the basic prototype but may need optimization later.
- Missing material references are rendered with a magenta fallback material in both the browser and Unity. The fallback is not a real asset; it is stripped from saved scenes and not exported as a `.mat` file.

### Open questions
- What is the correct mapping of ambient light to Unity? Options: `RenderSettings.ambientLight`, a skybox workflow, or keep it as a fill directional light. Deferred to alignment phase.
- Should light intensity adopt photometric units (lux/candela/lumen) later, or stay as abstract units? Deferred to alignment phase.

---

## M5: Pickables / Interactables

### Status
Milestone is **✅ Completed**. A single Pickable checkbox covers the Minimal M5 scope.

### Scope clarification
- M5 is intentionally minimal: the existing `ColliderComponent` is reused, and only `isPickable` is exposed in the mesh property panel (no pickup weight, respawn, or physics material fields).
- When the checkbox is checked and no collider exists, a default `box` collider with `isTrigger: false` is created. When unchecked, `isPickable` is set to `false` on the existing collider (the collider is not deleted, to avoid heuristic risk).

### Discoveries
- Pickability is rendered with a green `THREE.LineSegments` wireframe overlay parented to the mesh, so it inherits the mesh transform and is skipped by the existing raycast guard (`hit.object.type === "Line"`).
- The overlay shows the mesh bounds, not the actual collider bounds. This is acceptable for Minimal M5.
- Unity export keeps the `WorldCreatorPickable` marker as a fallback and additionally adds `VRC_Pickup` via reflection when the VRChat SDK (SDK2/SDK3) is present, so the generated package still compiles without the SDK. `ComponentMappers.cs` now has `using System;` for `System.Type`.

### Open questions
- VRChat SDK type names may vary by SDK version; refine the type strings once the target SDK version is locked.

---

## M6: NPC Avatar Placeholders

### Status
⏳ Not started. Scope locked in during planning discussion on 2026-07-13.

### Scope clarification
- Canonical format unchanged — `AvatarPlaceholderComponent` stays as defined in `editor/src/scene/types.ts:38` (no new `pose` field).
- Pose markers (sit / stand / lie → VRChat `VRC_Station`) deferred to M6-stretch; see below.
- Add NPC and player spawn placeholder placement UI and viewport visualization.
- Export maps `AvatarPlaceholderComponent` to `VRC_SpawnPoint` (player) and the existing `WorldCreatorAvatarPlaceholder` marker (NPC). SDK3 only.

### Discoveries
- `AvatarPlaceholderComponent` and the current Unity `MapAvatar` implementation already exist (`editor/src/export/unityPackageGenerator.ts:881`) — they only add the `WorldCreatorAvatarPlaceholder` mono-behaviour marker; no VRChat SDK type is added yet.
- The scene loader skips avatar components at `editor/src/scene/sceneLoader.ts:145` (`// Not visualized in the M0 viewport.` — shared no-op with collider), so adding the capsule + arrow visualization is a fresh codepath that mirrors the existing M5 wireframe overlay approach.
- The M5 pickable overlay already established the pattern: childed `LineSegments` overlay → inherits transform, skipped by raycast guard (`hit.object.type === "Line"`). Avatar visualization will reuse this contract.

### Decisions
- **Viewport visualization:** Wireframe capsule (~1.8m tall) + arrow showing facing direction (forward vector from `spawnRotation`). Color by `avatarType`: blue = player, orange = NPC.
- **Placement UI:** Two new toolbar buttons — "Add Player Spawn" and "Add NPC Avatar". Each creates a node with `AvatarPlaceholderComponent` of the matching type.
- **Property panel:** Show `avatarType` radio (NPC / Player) and `displayName` text input. `spawnPosition` / `spawnRotation` are not surfaced; they default to the node transform via the existing `MapAvatar` fallback in `unityPackageGenerator.ts`. The marker follows the node transform as a childed `LineSegments` so it tracks edits anyway.
- **Export target:** SDK3 only (UdonSharp). `avatarType: "player"` → `VRC_SpawnPoint` via reflection. The existing `WorldCreatorAvatarPlaceholder` marker is retained alongside `VRC_SpawnPoint` on player spawns. `avatarType: "npc"` → only the `WorldCreatorAvatarPlaceholder` marker (no SDK NPC equivalent; NPC behavior is a custom Udon script, out of scope).
- **Reflection pattern:** Mirrors M5 — reflection with guarded `Type.GetType` calls so the generated package still compiles without the VRChat SDK present. SDK3 component type strings will be documented here as discovered during implementation.

### Open questions
- Exact `VRC_SpawnPoint` SDK3 type name(s) — refine when implementation begins and a reference SDK is checked. Earlier M5 reflection string (`VRC_Pickup`) may need to be revisited for SDK3 naming parity.

---

## M6-stretch: Sit / Stand / Lie Pose Markers

### Status
⏳ Stretch milestone; not started. Deferred from M6.

### Scope clarification
- Adds VRChat station components (sit / stand / lie) for seating-style social affordances (chairs, beds, leaning spots).
- Requires introducing either a `pose?: "stand" | "sit" | "lie"` field on `AvatarPlaceholderComponent` or a separate `StationComponent` — to be revisited when M6 base is shipped.

### Open questions
- Pose as a field on `AvatarPlaceholderComponent` vs. a separate station component — design call to make when starting this stretch.
- Real mapping target: `VRC_Station` with `StationType` enum? Pin during implementation.

---

## M7: VRChat Adapter

### Status
⏳ Not started.

### Scope clarification
- Wrap the Unity export into a VRChat world descriptor.
- Generate spawn points, reflection probes, and collision proxies automatically.
- Document the one-click publish workflow.

### Open questions
- Can the adapter run headlessly, or does it still require the Unity Editor to be open once?
- What is the earliest Unity / VRChat SDK version we target?

---
