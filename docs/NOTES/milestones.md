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

## M3–M6

No running notes yet. Add discoveries here as work starts.
