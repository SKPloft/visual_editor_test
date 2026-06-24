# Bugs and Technical Debt

Known bugs, performance hotspots, refactor candidates, and “review later” items. Items should be small enough to move into a TODO comment, issue, or milestone task when someone starts work on them.

---

## M1 — milestone blockers

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
- **Proposed approach:** `touch-action: none`, `preventDefault()` on pointer/wheel events, pointer capture during drag.
- **Fallback:** If a specific browser cannot be tamed, document as known limitation.

### M1-05 — Provisional middle-mouse orbit
- **Severity:** Note
- **Decision:** Middle-mouse drag for orbit is acceptable for M1.
- **Follow-up:** Revisit default viewport bindings in M4+ input/shortcut milestone.

## Performance

- **M0 — Scene traversal O(n):** Implemented scene lookups use nested loops / branches in places. Review `editor/src/scene/sceneLoader.ts` and related scene-graph code; replace with Maps or indexed structures where lookups repeat.
- **M0 — Bundle size:** Three.js is bundled as one chunk producing 500 kB+. Acceptable for PoC; revisit code-splitting before M4/M5 when asset count grows.

## UX / Interaction

- **M0 — Mouse viewpoint controls:** Already present. Review for conflict with gizmo interactions and M1 shortcuts (`Q/W/E/R`).
- **M1 — WASD text-input guard:** Implemented in principle; verify focus handling on all property-panel inputs and number fields.

## Tooling / Build

- **M0 — Legacy three.js docs imported:** Currently unused. Either wire them into the build/reference workflow or remove them before the PoC is evaluated.
- **M0 — npm → bun migration:** Complete, but CI/scripts should be checked for any remaining `npm` calls.

## Code quality

- **M0 — Branch-heavy functions:** Several helper functions grew branches during fast implementation. Candidate for early refactor before M2 adds save/load complexity on top of the same structures.

---

## Resolved

_Move items here when fixed, with the date and commit/PR reference._
