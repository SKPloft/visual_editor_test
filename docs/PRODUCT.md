# Product Definition

## Problem Statement

Creating a simple VRChat world currently requires installing Unity, learning a complex editor, and navigating asset pipelines — a barrier that stops non-technical creators before they can place their first object. World Creator removes that barrier by letting them compose worlds in a browser and export directly to Unity.

## Target User Persona (Technology Prototype)

**Early Adopter: "Hobbyist World Builder"**
A VRChat regular who has ideas for custom hangout worlds but no Unity or coding experience. They are comfortable with browser apps, active in creative communities, and willing to tolerate rough edges in exchange for a faster path from idea to published world.

## Value Proposition

World Creator is a browser-based 3D editor that lets non-technical creators assemble VRChat worlds using drag-and-drop primitives and prefabs without installing Unity or writing code. By exporting directly to a Unity Editor package, it collapses days of environment setup and manual scene building into minutes of in-browser composition.

## Success Metrics

### Technology Prototype (M0–M3)

1. A non-technical user can build a scene with at least 5 distinct objects and export it to a runnable Unity project within 30 minutes of first opening the editor.
2. The export produces a Unity scene that loads in the Unity Editor without manual C# changes.

### Basic Prototype (M0–M7)

1. A non-technical user can build a visually lit scene, place pickable objects and NPC/player spawn points, and produce a VRChat-compatible Unity package that feels technically complete.
2. The user believes the tool works end-to-end, even if it is not yet a polished or feature-complete solution.
3. VRChat-zero-manual-changes is deferred to the VRChat adapter (M7).

## Scope

### In Scope (Technology Prototype — M0 to M3)

- Browser-based 3D viewport (Three.js)
- Scene graph with transform hierarchy
- Place, move, rotate, and scale primitives (cube, sphere, cylinder, plane)
- Save / load scene to a canonical JSON format
- Prefab instancing from a built-in library
- Export to a Unity Editor package that reconstructs the scene
- Basic lighting (directional, point, spot) and flat-color materials

### Out of Scope (Technology Prototype)

- Custom asset upload or import (only built-in primitives and prefabs)
- Real-time collaboration / multiplayer editing
- Visual scripting or behavior authoring
- Advanced lighting configuration, materials, or shaders
- Terrain, foliage, or advanced world systems
- Direct VRChat SDK integration (export is via Unity script only)
- Runtime preview inside a VR headset
- User accounts, cloud storage, or publishing pipeline

### Post-M3 Prototype Work (M4 to M7)

| Phase | Milestone | Focus |
|-------|-----------|-------|
| Visual Pass | M4 | Lighting and material editing |
| World Prototype | M5 | Pickables and interactables |
| Social Prototype | M6 | NPC avatar and player spawn affordances |
| Publish Prototype | M7 | VRChat adapter and one-click publish workflow |

Custom asset import pipeline remains out of scope for the basic prototype and is deferred to a later phase.
