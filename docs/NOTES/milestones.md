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
- WASD camera movement must be disabled when any text input is focused. Fixed: Keyboard shortcuts are suppressed when inputs are active.
- **Provisional viewport binding:** Middle-mouse drag for orbit is acceptable for M1; default bindings will be revisited in M4+.

### Open questions
- Can browser gestures be fully suppressed on the canvas in Vivaldi/other Chromium browsers, or will this become a documented limitation? (Answer: Yes, `touch-action: none` resolved the gestures).

---

## M2–M6

No running notes yet. Add discoveries here as work starts.
