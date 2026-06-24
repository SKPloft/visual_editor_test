# Decisions Log

Informal decisions made during implementation that are not formal ADRs. Use this for tooling choices, workflow tweaks, conventions, and quick product calls. If a decision becomes architectural or hard to reverse, promote it to `docs/ADR/`.

---

## 2026-06-24 — Use bun instead of npm
- **Context:** Build/install speed and consistency for the editor package.
- **Decision:** Use `bun` for installs and scripts in `editor/`.
- **Consequences:** All contributors need bun installed. Check CI and README references for `npm`.

## 2026-06-24 — Import legacy three.js docs
- **Context:** Imported three.js documentation into the repo for easier AI/offline reference.
- **Decision:** Keep docs under `docs/threejs/API/` for now.
- **Consequences:** Adds repo size. They are not yet wired into the build or linked from code.

## 2026-06-24 — Keyboard shortcuts follow Unity/Blender convention
- **Context:** Reconciling editor interaction model during M1 planning.
- **Decision:** `Q` Select, `W` Move, `E` Rotate, `R` Scale.
- **Consequences:** WASD camera navigation must be suppressed when text inputs are focused.

---

## Promotion candidates

_Move items here when they look like they deserve an ADR._
