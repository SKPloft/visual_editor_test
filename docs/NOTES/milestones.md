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
⏳ Not started.

### Scope clarification
- Add a pickup/interactable component to the browser editor.
- Export maps `ColliderComponent.isPickable` to a VRChat-compatible component (`VRC_Pickup` / `VRC_ObjectSync`).

### Open questions
- What pickable properties need a UI (weight, respawn, physics material)?
- Should the editor visualize pickables with a distinct icon or gizmo color?

---

## M6: NPC Avatar Placeholders

### Status
⏳ Not started.

### Scope clarification
- Add NPC and player spawn placeholder components.
- Add sit/stand/lie marker placement UI.
- Export maps `AvatarPlaceholderComponent` to VRChat spawn/station components.

### Open questions
- What is the minimum visual placeholder (capsule, imported avatar, simple icon)?
- Do markers need orientation gizmos independent of the node transform?

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
