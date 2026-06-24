# Product Definition

## Problem Statement

Creating a simple VRChat world currently requires installing Unity, learning a complex editor, and navigating asset pipelines — a barrier that stops non-technical creators before they can place their first object. World Creator removes that barrier by letting them compose worlds in a browser and export directly to Unity.

## Target User Persona (Technology Prototype)

**Early Adopter: "Hobbyist World Builder"**
A VRChat regular who has ideas for custom hangout worlds but no Unity or coding experience. They are comfortable with browser apps, active in creative communities, and willing to tolerate rough edges in exchange for a faster path from idea to published world.

## Value Proposition

World Creator is a browser-based 3D editor that lets non-technical creators assemble VRChat worlds using drag-and-drop primitives and prefabs without installing Unity or writing code. By exporting directly to a Unity Editor script, it collapses days of environment setup and manual scene building into minutes of in-browser composition.

## Success Metric (Technology Prototype)

1. A non-technical user can build a scene with at least 5 distinct objects and export it to a runnable Unity project within 30 minutes of first opening the editor.
2. The export produces a Unity scene that loads in the Unity Editor without manual C# changes. VRChat-zero-manual-changes is deferred to the VRChat adapter (M6).

## Scope

### In Scope (Technology Prototype — M0 to M3)

- Browser-based 3D viewport (Three.js)
- Scene graph with transform hierarchy
- Place, move, rotate, and scale primitives (cube, sphere, cylinder, plane)
- Save / load scene to a canonical JSON format
- Prefab instancing from a built-in library
- Export to Unity Editor C# script that reconstructs the scene

### Out of Scope (Technology Prototype)

- Basic lighting (directional, point, spot) and flat-color materials are included in the technology prototype.
- Custom asset upload or import (only built-in primitives and prefabs)
- Real-time collaboration / multiplayer editing
- Visual scripting or behavior authoring
- Advanced lighting configuration, materials, or shaders
- Terrain, foliage, or advanced world systems
- Direct VRChat SDK integration (export is via Unity script only)
- Runtime preview inside a VR headset
- User accounts, cloud storage, or publishing pipeline

### Post-PoC (M4 to M6)

- Lighting and material editing
- Pickables, interactables, and NPC avatar placement
- VRChat adapter for direct world descriptor generation
- Custom asset import pipeline
