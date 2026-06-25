# Decisions Log

<!--
FORMAT:
- Date-stamped entries with this exact card shape:
    ## YYYY-MM-DD — Title
    - **Context:** Why the decision was needed.
    - **Decision:** What was decided.
    - **Consequences:** Trade-offs or follow-up work.
    - **Follow-up:** When to revisit (milestone or date).
- If a decision becomes architectural or hard to reverse, promote it to `docs/ADR/`.
- Do not change this structure without discussing it first.
-->

Informal decisions made during implementation that are not formal ADRs. Use this for tooling choices, workflow tweaks, conventions, and quick product calls.

---

## 2026-06-24 — Use bun instead of npm
- **Context:** Build/install speed and consistency for the editor package.
- **Decision:** Use `bun` for installs and scripts in `editor/`.
- **Consequences:** All contributors need bun installed. Check CI and README references for `npm`.
- **Follow-up:** Audit remaining `npm` references; see `docs/NOTES/bugs-debt.md#M0-06`.

## 2026-06-24 — Import legacy three.js docs
- **Context:** Imported three.js documentation into the repo for easier AI/offline reference.
- **Decision:** Keep docs under `docs/threejs/API/` for now.
- **Consequences:** Adds repo size. They are not yet wired into the build or linked from code.
- **Follow-up:** Decide whether to integrate or remove before PoC evaluation; see `docs/NOTES/bugs-debt.md#M0-05`.

## 2026-06-25 — WASD camera fly disambiguated by RMB
- **Context:** `W` is used by both the Move tool shortcut (`Q/W/E/R`) and traditional WASD camera navigation, creating a conflict. M1 needs both tool switching and camera movement.
- **Decision:** Camera fly is triggered by holding the right mouse button while pressing `WASD` (`Hold RMB + WASD`). `Q/W/E/R` tool shortcuts remain active when RMB is not held. Both are suppressed when a text input, property field, or modal is focused.
- **Consequences:** Users can keep the Unity/Blender tool convention while gaining a standard DCC-style fly camera. A future input state machine must enforce the RMB-gate and focus-gate consistently.
- **Follow-up:** Implement `Hold RMB + WASD` camera fly in `editor/src/main.ts`; revisit default viewport bindings in M4+; see `docs/NOTES/bugs-debt.md#M0-04`.

## 2026-06-24 — Provisional middle-mouse orbit binding
- **Context:** M1 viewport controls need a usable default while full keybinding design is deferred.
- **Decision:** Middle-mouse drag is accepted as the temporary orbit binding for M1.
- **Consequences:** Trackpad users may need an alternative later; this does not lock the final scheme.
- **Follow-up:** Revisit default viewport bindings in M4+ input/shortcut milestone; see `docs/NOTES/bugs-debt.md#M1-05`.

---

## Promotion candidates

_Move items here when they look like they deserve an ADR._
