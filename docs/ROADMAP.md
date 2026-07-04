# Roadmap

## Overview

> **TODO / FOR REVIEW:** This roadmap intentionally does not include fixed durations. The order of milestones should be preserved, but per-milestone timing will be set manually during review.

| Phase | Milestone | Label |
|-------|-----------|-------|
| M0 | Canonical format + scene graph | Technology Prototype |
| M1 | 3D editor basics | Technology Prototype |
| M2 | Save / load + prefabs | Technology Prototype |
| M3 | Unity export (minimum viable PoC) | Technology Prototype |
| M4 | Lights + materials | Visual Pass |
| M5 | Pickables / interactables | World Prototype |
| M6 | NPC avatar placeholders | Social Prototype |
| M7 | VRChat adapter | Publish Prototype |

---

## M0: Canonical Format + Scene Graph

**What it proves:** We can represent a 3D scene as structured JSON and render it in a browser.

**Deliverables:**
- Set up build tooling for `editor/` (e.g., Vite) with TypeScript, dev server, and production build
- JSON schema for nodes, transforms, and components
- In-memory scene graph with parent/child hierarchy
- Basic browser renderer (Three.js) that loads the format and displays a few hard-coded objects

**Approximate sequencing:** TBD (manual review)

---

## M1: 3D Editor Basics

**What it proves:** A non-technical user can manipulate 3D objects in a browser viewport.

**Deliverables:**
- Viewport with orbit camera and grid
- Toolbar to add primitives (cube, sphere, cylinder, plane)
- Gizmo interactions: translate, rotate, scale
- Property panel showing position, rotation, scale values
- Basic lighting (directional, point, spot) and flat-color materials

**Approximate sequencing:** 2–3 weeks (after M0)

---

## M2: Save / Load + Prefabs

**What it proves:** Work persists across sessions and reusable objects speed up building.

**Deliverables:**
- Save scene to canonical JSON and load it back
- Prefab definition format (a scene subgraph that can be instanced)
- Built-in prefab library panel (e.g., a simple table, a lamp)
- Instancing a prefab into the scene

**Approximate sequencing:** 2–3 weeks (after M1)

---

## M3: Unity Export (Minimum Viable PoC)

**Status:** ✅ Completed

**What it proves:** The browser editor can produce a runnable Unity scene without manual C# work.

**Deliverables:**
- ✅ Generator that turns canonical JSON into a Unity Editor package
- ✅ Package recreates GameObjects, transforms, materials, lights, colliders, prefabs, and avatar placeholders in Unity
- ✅ End-to-end test: browser scene → Unity project → scene loads in Unity Editor

**Current notes:**
- The deliverable is a mini Unity package (Editor + Runtime asmdefs), not a single script. It is installed by extracting the ZIP into the Unity project.
- Visual lighting is intentionally rough and calibrated in M4.

**Approximate sequencing:** 3–4 weeks (after M2)

---

## M4: Lights + Materials

**Status:** ✅ Completed

**What it proves:** The editor can handle visual fidelity beyond flat primitives.

**Deliverables:**
- ✅ Add and configure directional, point, and spot lights
- ✅ Basic material editor (color, metallic, roughness)
- ✅ Export lights and materials to Unity script

**Current notes:**
- Shared material assets are editable in a dedicated Materials panel and assignable to meshes via the property panel.
- New scenes include a default directional "Sun" light and an ambient light node.
- Ambient light mapping to Unity is intentionally simple (low-intensity directional fill) and will be revisited in the alignment phase.

**Approximate sequencing:** 2–3 weeks (after M3)

---

## M5: Pickables / Interactables

**What it proves:** A non-technical user can place interactive objects that behave in VRChat.

**Deliverables:**
- Pickup object component and placement UI in the browser editor
- Property panel for pickable settings (weight, physics material, respawn)
- Export pickables to Unity script with VRChat-compatible components (`VRC_Pickup` / `VRC_ObjectSync`)

**Current notes:**
- `ColliderComponent` already exists in the canonical format with an `isPickable` flag, but it is not visualized or exported beyond a placeholder marker yet.

**Approximate sequencing:** 3–4 weeks (after M4)

---

## M6: NPC Avatar Placeholders

**What it proves:** A non-technical user can place avatar spawn points and social affordances for a VRChat world.

**Deliverables:**
- NPC avatar placeholder with basic sit/stand/lie markers
- Player spawn point configuration
- Export NPC markers and player spawns to Unity script with VRChat-compatible components

**Current notes:**
- `AvatarPlaceholderComponent` already exists in the canonical format but is not visualized or exported beyond a placeholder marker yet.
- Actual avatar models, AI behavior, and animation controllers remain out of scope.

**Approximate sequencing:** 2–3 weeks (after M5)

---

## M7: VRChat Adapter

**What it proves:** The export pipeline can target VRChat directly without requiring the user to open Unity.

**Deliverables:**
- Post-processing step that wraps exported scene in a VRChat world descriptor
- Automatic spawn point, reflection probe, and collision proxy generation
- Documentation for one-click publish workflow

**Current notes:**
- This milestone requires a working Unity export first (M3).
- Rotation handedness conversion for non-trivial orientations may be addressed here if it was deferred from M3.

**Approximate sequencing:** 3–4 weeks (after M6)

---

## Phase Summary

| Phase | Milestones | Definition of done |
|-------|-----------|--------------------|
| Technology Prototype | M0–M3 | Non-technical user builds a 5-object scene and exports to runnable Unity within 30 minutes. |
| Visual Pass | M4 | Lights and materials round-trip through save/load and Unity export. |
| World Prototype | M5 | Interactive pickable objects work end-to-end in VRChat. |
| Social Prototype | M6 | NPC/player spawn and sit/stand affordances work end-to-end in VRChat. |
| Publish Prototype | M7 | A world can be published to VRChat without opening Unity. |

*The product is considered a "basic prototype" (not yet a complete solution) once the Publish Prototype (M7) is done and a non-technical user believes the technical loop works.*
