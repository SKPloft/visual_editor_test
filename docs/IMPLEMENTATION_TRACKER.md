# Implementation Tracker

This document tracks the implementation status of each World Creator milestone. It is updated as work progresses.

## Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Completed |
| 🔄 | In progress |
| ⏳ | Not started |
| ⚠️ | Partially completed / blocked / needs review |

---

## M0: Canonical Format + Scene Graph

**Status:** ✅ Completed

**Deliverables:**
- ✅ Set up build tooling for `editor/` (Vite + TypeScript + Three.js)
- ✅ JSON schema for nodes, transforms, and components (see `editor/src/scene/types.ts` and `docs/CANONICAL_FORMAT.md`)
- ✅ In-memory scene graph with parent/child hierarchy (inline `children` arrays only)
- ✅ Basic browser renderer (Three.js) that loads the format and displays hard-coded objects

**Current notes:**
- See `docs/NOTES/milestones.md` for M0 observations, discovered issues, and follow-ups.

---

## M1: 3D Editor Basics

**Status:** ✅ Completed

**Deliverables:**
- ✅ Viewport with orbit camera and grid
- ✅ Toolbar to add primitives (cube, sphere, cylinder, plane)
- ✅ Gizmo interactions: translate, rotate, scale
- ✅ Property panel showing position, rotation, scale values
- ✅ Basic lighting (directional, point, spot) and flat-color materials

**Current notes:**
- See `docs/NOTES/milestones.md` and `docs/NOTES/bugs-debt.md` for M1 bug fixes and decisions.

---

## M2: Save / Load + Prefabs

**Status:** ✅ Completed

**Deliverables:**
- ✅ Save scene to canonical JSON and load it back
- ✅ Prefab definition format (a scene subgraph that can be instanced)
- ✅ Built-in prefab library panel (Simple Table, Floor Lamp)
- ✅ Instancing a prefab into the scene

**Current notes:**
- The canonical format supports `PrefabReferenceComponent`; transform/component overrides remain out of scope for the technology prototype. See `docs/CANONICAL_FORMAT.md`.
- The editor now keeps an ID-indexed canonical scene document in memory so added primitives, transform edits, and prefab instances round-trip through saved JSON.

---

## M3: Unity Export (Minimum Viable PoC)

**Status:** ✅ Completed

**Deliverables:**
- ✅ Generator that turns canonical JSON into a Unity Editor C# script
- ✅ Script recreates GameObjects, transforms, and prefabs in Unity
- ✅ End-to-end test: browser scene → Unity project → world loads in Unity Editor

**Current notes:**
- M3 success metric was "produces a runnable Unity scene" — achieved. The browser exports a mini Unity package (Editor + Runtime assembly definitions) that imports the canonical JSON via Newtonsoft.Json.
- Coordinate conversion: Z positions are negated for Unity's left-handed space. Rotation handedness conversion for non-trivial orientations remains deferred to M7 unless needed sooner.
- Lights and materials are exported at the data level, but visual lighting fidelity (baking, ambient contribution, intensity calibration) is intentionally rough in M3 and will be hardened in M4.

---

## M4: Lights + Materials

**Status:** ✅ Completed

**Deliverables:**
- ✅ Add and configure directional, point, and spot lights
- ✅ Basic material editor (color, metallic, roughness)
- ✅ Export lights and materials to Unity script

**Current notes:**
- Shared material assets are now editable in a dedicated Materials panel and assignable to meshes via the property panel.
- Deleting an in-use material falls back to a magenta placeholder material in both the editor and Unity import.
- Directional, point, and spot lights can be added from the toolbar and configured in the property panel.
- New scenes start with a default directional "Sun" light and an ambient light node.
- Per-light shadow toggle defaults to off.
- Light and material settings round-trip through save/load and Unity export.
- Ambient light is represented as a node with `lightType: "ambient"` but is mapped to a low-intensity directional fill in Unity; true ambient/sky calibration is deferred to the alignment phase.

---

## M5: Pickables / Interactables

**Status:** ✅ Completed

**Deliverables:**
- ✅ Pickup object component and placement UI
- ✅ Property panel for pickable settings
- ✅ Export pickables to Unity script with VRChat-compatible components

**Current notes:**
- A single **Pickable** checkbox in the mesh property panel toggles `ColliderComponent.isPickable`. The collider is reused (a `box` collider is created if absent) rather than introducing a new component.
- Pickable meshes render a green `THREE.LineSegments` wireframe overlay (a child of the mesh) in the viewport. The existing raycast guard already skips `Line` objects, so clicking the overlay selects the parent mesh.
- Unity export keeps the `WorldCreatorPickable` marker and, when the VRChat SDK is present, also adds a `VRC_Pickup` component via reflection. The package still compiles without the SDK.

---

## M6: NPC Avatar Placeholders

**Status:** ⏳ Not started

**Deliverables:**
- ⏳ NPC and player avatar placeholder placement UI in the browser editor
- ⏳ Property panel for placeholder type (NPC / Player) and display name
- ⏳ Export avatar placeholders to Unity script with VRChat-compatible components (SDK3 only)

**Current notes:**
- `AvatarPlaceholderComponent` already exists in the canonical format but is not visualized or exported beyond a placeholder marker yet.
- Scope decisions locked in during M6 planning discussion (2026-07-13):
  - Canonical format unchanged — no `pose` field added yet (deferred to M6-stretch).
  - Viewport visualization: wireframe capsule (~1.8m tall) + arrow showing facing direction. Color by `avatarType` (blue = player, orange = NPC). Parented to the avatar node like the M5 pickable overlay, so it inherits transform and is skipped by the existing raycast guard.
  - Placement UI: two toolbar buttons — "Add Player Spawn" and "Add NPC Avatar".
  - Property panel: `avatarType` radio (NPC / Player) and `displayName` text input. `spawnPosition` / `spawnRotation` are not surfaced (default to node transform via existing `MapAvatar` fallback).
  - Export: SDK3 (UdonSharp) only, via reflection. `avatarType: "player"` → `VRC_SpawnPoint`, with the existing `WorldCreatorAvatarPlaceholder` marker retained. `avatarType: "npc"` → only the `WorldCreatorAvatarPlaceholder` marker (VRChat has no SDK NPC placeholder; NPCs are authored as custom Udon scripts, out of scope).
- Pose markers (sit / stand / lie → VRChat stations) moved to M6-stretch; see `docs/ROADMAP.md` and `docs/NOTES/milestones.md`.

---

## M7: VRChat Adapter

**Status:** ⏳ Not started

**Deliverables:**
- ⏳ Post-processing step that wraps exported scene in a VRChat world descriptor
- ⏳ Automatic spawn point, reflection probe, and collision proxy generation
- ⏳ Documentation for one-click publish workflow

**Current notes:**
- This milestone requires a working Unity export first (M3).
- Rotation handedness conversion for non-trivial orientations may be addressed here if it was deferred from M3.

---

## Cross-Cutting Decisions

These decisions affect multiple milestones and should be revisited if scope changes:

1. **Renderer:** Three.js is locked for the technology prototype.
2. **Scene graph representation:** Inline `children` arrays only.
3. **Shortcuts:** Unity/Blender convention (`Q` Select, `W` Move, `E` Rotate, `R` Scale).
4. **WASD camera fly:** Hold right mouse button + `WASD` to fly the camera. Disabled when any text input, property field, or modal is focused so `W` is unambiguously the Move tool shortcut.
5. **Unity JSON parser:** Use Newtonsoft.Json for the real implementation.
6. **Templates:** Template gallery and template variables are part of the Publish Prototype (M7+) or later.
7. **M1 viewport binding:** Middle-mouse drag for orbit is provisional; hold-RMB camera fly will be revisited alongside default viewport bindings in the Visual Pass or later.

---

## Where details live

| Topic | File |
|-------|------|
| Milestone observations and post-mortems | `docs/NOTES/milestones.md` |
| Known bugs, performance debt, refactor candidates | `docs/NOTES/bugs-debt.md` |
| Informal decisions not worth an ADR | `docs/NOTES/decisions.md` |
| Formal architecture/product decisions | `docs/ADR/` |

*Last updated: 2026-07-13*
