# Bugs and Technical Debt

Known bugs, performance hotspots, refactor candidates, and “review later” items. Items should be small enough to move into a TODO comment, issue, or milestone task when someone starts work on them.

---

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
