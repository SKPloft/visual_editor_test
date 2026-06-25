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

**Status:** ⏳ Not started

**Deliverables:**
- ⏳ Save scene to canonical JSON and load it back
- ⏳ Prefab definition format (a scene subgraph that can be instanced)
- ⏳ Built-in prefab library panel (e.g., a simple table, a lamp)
- ⏳ Instancing a prefab into the scene

**Current notes:**
- The canonical format supports `PrefabReferenceComponent` but transform/component overrides are out of scope for the technology prototype. See `docs/CANONICAL_FORMAT.md`.

---

## M3: Unity Export (Minimum Viable PoC)

**Status:** ⏳ Not started

**Deliverables:**
- ⏳ Generator that turns canonical JSON into a Unity Editor C# script
- ⏳ Script recreates GameObjects, transforms, and prefabs in Unity
- ⏳ End-to-end test: browser scene → Unity project → world loads in Unity Editor

**Current notes:**
- Success metric for M3 is "produces a runnable Unity scene," not "loads in VRChat without manual changes." VRChat-zero-manual-changes is deferred to M6.
- Coordinate conversion: Z positions are negated for Unity's left-handed space. Rotation handedness conversion for non-trivial orientations is deferred to M6 unless needed sooner.
- The real Unity importer should use **Newtonsoft.Json** rather than `JsonUtility`. The sample script in `docs/UNITY_EXPORT.md` still uses `JsonUtility` and should be treated as a temporary reference.

---

## M4: Lights + Materials

**Status:** ⏳ Not started

**Deliverables:**
- ⏳ Add and configure directional, point, and spot lights
- ⏳ Basic material editor (color, metallic, roughness)
- ⏳ Export lights and materials to Unity script

**Current notes:**
- Basic lighting and flat-color materials are already representable in the canonical format and render in the browser viewport. M4 is about making them user-editable in the editor UI and fully round-tripping through Unity export.

---

## M5: Pickables + NPC Avatar

**Status:** ⏳ Not started

**Deliverables:**
- ⏳ Pickup object component and placement UI
- ⏳ NPC avatar placeholder with basic sit/stand markers
- ⏳ Export pickables and NPC markers to Unity script with VRChat-compatible components

**Current notes:**
- `ColliderComponent` and `AvatarPlaceholderComponent` already exist in the canonical format but are not visualized or exported beyond placeholder markers during the PoC.

---

## M6: VRChat Adapter

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
6. **Templates:** Template gallery and template variables are Post-PoC (M4+).
7. **M1 viewport binding:** Middle-mouse drag for orbit is provisional; hold-RMB camera fly will be revisited alongside default viewport bindings in M4+.

---

## Where details live

| Topic | File |
|-------|------|
| Milestone observations and post-mortems | `docs/NOTES/milestones.md` |
| Known bugs, performance debt, refactor candidates | `docs/NOTES/bugs-debt.md` |
| Informal decisions not worth an ADR | `docs/NOTES/decisions.md` |
| Formal architecture/product decisions | `docs/ADR/` |

*Last updated: 2026-06-24*
