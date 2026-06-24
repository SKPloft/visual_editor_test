# Bugs and Technical Debt

<!--
FORMAT:
- Group items by milestone first.
- Cross-cutting items that do not belong to a single milestone live under category sections at the end.
- Each item is a level-3 heading with this exact card shape:
    ### ID — Title
    - **Severity:** Blocker | High | Medium | Low | Note
    - **Acceptance:** Observable behavior that would let us close the item.
    - **Proposed approach:** One-line hint; do not prescribe APIs unless necessary.
- Items should be small enough to become a TODO comment, issue, or milestone task once work starts.
- Do not change this structure without discussing it first.
-->

Known bugs, performance hotspots, refactor candidates, and “review later” items.

---

## M1 — Viewport and gizmo

### M1-01 — Void click selects synthetic object
- **Severity:** Blocker
- **Acceptance:** Clicking empty canvas deselects current object and hides the gizmo. No unnamed/synthetic object appears selected.
- **Proposed approach:** Ensure selection raycast only hits selectable scene objects; on miss, clear selection state.

### M1-02 — Transform gizmo not visible/discoverable
- **Severity:** Blocker
- **Acceptance:** When translate/rotate/scale tool is active and an object is selected, a gizmo is drawn at the object pivot. Tool buttons visually reflect active tool.
- **Proposed approach:** Verify gizmo renderer is attached to selection state and tool state.

### M1-03 — Orbit/pan/zoom erratic or unresponsive
- **Severity:** Blocker
- **Acceptance:** Mouse drag on background orbits; right-drag pans; scroll zooms smoothly; no browser gesture triggers instead.
- **Proposed approach:** Capture pointer events on canvas, prevent default, normalize wheel delta.

### M1-04 — Browser gesture conflict (Vivaldi)
- **Severity:** High
- **Acceptance:** Canvas input does not trigger browser back/forward or pinch gestures in Chromium-based browsers.
- **Proposed approach:** `touch-action: none`, `preventDefault()` on pointer/wheel events, pointer capture during drag. If a specific browser cannot be tamed, document as a known limitation.

### M1-05 — Provisional middle-mouse orbit
- **Severity:** Note
- **Acceptance:** Middle-mouse drag for orbit is acceptable for M1.
- **Proposed approach:** Revisit default viewport bindings in M4+ input/shortcut milestone.

---

## M0 — Scene graph and tooling

### M0-01 — Scene traversal O(n)
- **Severity:** Medium
- **Acceptance:** Repeated scene lookups use indexed structures instead of nested loops where it measurably matters.
- **Proposed approach:** Review `editor/src/scene/sceneLoader.ts` and related scene-graph code; replace hot paths with Maps or indexed structures.

### M0-02 — Bundle size
- **Severity:** Low
- **Acceptance:** Three.js code-splitting is evaluated and either implemented or explicitly deferred.
- **Proposed approach:** Three.js is bundled as one chunk producing 500 kB+. Acceptable for PoC; revisit before M4/M5 when asset count grows.

### M0-03 — Mouse viewpoint controls
- **Severity:** Medium
- **Acceptance:** Existing mouse viewpoint controls do not conflict with gizmo interactions or M1 shortcuts (`Q/W/E/R`).
- **Proposed approach:** Review current implementation and unify with M1 viewport controls.

### M0-04 — WASD text-input guard
- **Severity:** Medium
- **Acceptance:** WASD camera navigation is suppressed whenever any property-panel input or number field is focused.
- **Proposed approach:** Verify focus handling on all property-panel inputs and number fields.

### M0-05 — Legacy three.js docs imported
- **Severity:** Note
- **Acceptance:** Legacy docs are either wired into the build/reference workflow or removed before PoC evaluation.
- **Proposed approach:** Currently unused; decide whether to integrate or delete.

### M0-06 — npm → bun migration
- **Severity:** Note
- **Acceptance:** No `npm` calls remain in CI, scripts, or README instructions.
- **Proposed approach:** Audit and replace any remaining `npm` references.

### M0-07 — Branch-heavy functions
- **Severity:** Low
- **Acceptance:** Helper functions with excessive branching are simplified before M2 adds save/load complexity.
- **Proposed approach:** Refactor candidate helpers to reduce nesting and clarify data flow.

---

## Resolved

_Move items here when fixed, with the date and commit/PR reference._
