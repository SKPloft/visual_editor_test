# Milestone Notes

Running observations, discoveries, and post-mortem notes for each milestone. Keep this lightweight: one or two lines per item, with a file or issue reference when possible.

---

## M0: Canonical Format + Scene Graph

### Format and scene graph
- The scene graph intentionally uses inline `children` arrays only. The old `parent` ID reference was removed from the canonical format in `docs/CANONICAL_FORMAT.md`.
- The M0 demo scene is hard-coded in `editor/src/scene/demoScene.ts`. Loading from a real JSON file is planned for M1/M2.

### Tooling
- Switched from npm to bun for faster installs and scripts.
- Imported legacy three.js docs for better coding reference; not yet integrated into the build or workflow.

### Discoveries
- Mouse viewpoint controls were already implemented. Need to review whether they conflict with gizmo/shortcut behavior later.
- Several implemented functions rely on nested branches and basic lookups. They are candidates for better data structures and algorithms to reduce O(n) traversal, even in the PoC, because performance may affect evaluation.

### Build
- Build output produces a 500 kB+ bundle because Three.js is bundled as one chunk. This is acceptable for the technology prototype; code-splitting is a future optimization.

---

## M1: 3D Editor Basics

### Status
Milestone is currently **⚠️ blocked / needs review** due to viewport and gizmo usability issues. See `docs/NOTES/bugs-debt.md#M1` for blockers and acceptance criteria.

### Scope clarification
- The renderer already renders a grid and a point light from the canonical scene, but these are part of M0 scene loading, not user-editable editor features.

### Input / shortcuts
- Decided during doc reconciliation:
  - `Q` Select
  - `W` Move
  - `E` Rotate
  - `R` Scale
- WASD camera movement must be disabled when any text input is focused.
- **Provisional viewport binding:** Middle-mouse drag for orbit is acceptable for M1; default bindings will be revisited in M4+.

### Open questions
- Can browser gestures be fully suppressed on the canvas in Vivaldi/other Chromium browsers, or will this become a documented limitation?

---

## M2–M6

No running notes yet. Add discoveries here as work starts.
