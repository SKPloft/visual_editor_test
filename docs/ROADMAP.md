# Roadmap

## Overview

> **TODO / FOR REVIEW:** This roadmap intentionally does not include fixed durations. The order of milestones should be preserved, but per-milestone timing will be set manually during review.

| Phase | Milestone | Label |
|-------|-----------|-------|
| M0 | Canonical format + scene graph | Technology Prototype |
| M1 | 3D editor basics | Technology Prototype |
| M2 | Save / load + prefabs | Technology Prototype |
| M3 | Unity export (minimum viable PoC) | Technology Prototype |
| M4 | Lights + materials | Post-PoC |
| M5 | Pickables + NPC avatar | Post-PoC |
| M6 | VRChat adapter | Post-PoC |

---

## M0: Canonical Format + Scene Graph

**What it proves:** We can represent a 3D scene as structured JSON and render it in a browser.

**Deliverables:**
- JSON schema for nodes, transforms, and components
- In-memory scene graph with parent/child hierarchy
- Basic browser renderer (Three.js or Babylon.js) that loads the format and displays a few hard-coded objects

**Approximate sequencing:** TBD (manual review)

---

## M1: 3D Editor Basics

**What it proves:** A non-technical user can manipulate 3D objects in a browser viewport.

**Deliverables:**
- Viewport with orbit camera and grid
- Toolbar to add primitives (cube, sphere, cylinder, plane)
- Gizmo interactions: translate, rotate, scale
- Property panel showing position, rotation, scale values

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

**What it proves:** The browser editor can produce a runnable Unity scene without manual C# work.

**Deliverables:**
- Generator that turns canonical JSON into a Unity Editor C# script
- Script recreates GameObjects, transforms, and prefabs in Unity
- End-to-end test: browser scene → Unity project → VRChat world loads

**Approximate sequencing:** 3–4 weeks (after M2)

---

## M4: Lights + Materials

**What it proves:** The editor can handle visual fidelity beyond flat primitives.

**Deliverables:**
- Add and configure directional, point, and spot lights
- Basic material editor (color, metallic, roughness)
- Export lights and materials to Unity script

**Approximate sequencing:** 2–3 weeks (after M3)

---

## M5: Pickables + NPC Avatar

**What it proves:** The editor can place interactive objects and avatars that behave in VRChat.

**Deliverables:**
- Pickup object component and placement UI
- NPC avatar placeholder with basic sit/stand markers
- Export pickables and NPC markers to Unity script with VRChat-compatible components

**Approximate sequencing:** 3–4 weeks (after M4)

---

## M6: VRChat Adapter

**What it proves:** The export pipeline can target VRChat directly without requiring the user to open Unity.

**Deliverables:**
- Post-processing step that wraps exported scene in a VRChat world descriptor
- Automatic spawn point, reflection probe, and collision proxy generation
- Documentation for one-click publish workflow

**Approximate sequencing:** 3–4 weeks (after M5)
