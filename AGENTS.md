# World Creator

A browser-based 3D world editor for non-technical VRChat/Resonite creators.

## Product snapshot

- **Problem:** Making a simple VRChat world still requires installing Unity, learning a complex editor, and wrestling with asset pipelines — a barrier that stops many creators before they place their first object.
- **Target user:** "Hobbyist World Builder" — a VRChat regular with ideas for custom hangout worlds, no Unity or coding experience, and a high tolerance for rough edges if it means a faster path from idea to published world.
- **Value prop:** World Creator lets creators compose VRChat worlds in a browser using drag-and-drop primitives and prefabs, then export directly to a Unity Editor script — collapsing days of environment setup into minutes of in-browser composition.
- **Success metric (technology prototype):** A non-technical user can build a scene with at least 5 distinct objects and export it to a runnable Unity project within 30 minutes of first opening the editor.

## Tech stack

- **Runtime:** Browser-first web application (no install for users)
- **Language:** TypeScript
- **3D viewport:** Three.js or Babylon.js (decision pending implementation)
- **Scene format:** Custom canonical JSON (`docs/CANONICAL_FORMAT.md`)
- **Export target:** Unity Editor C# script (`docs/UNITY_EXPORT.md`)
- **Build tooling:** Not yet configured at repo root; old Webpack/Express setup lives in `_legacy/`

## Project structure

- `docs/` — product decisions, ADRs, roadmap, and specifications
  - `PRODUCT.md` — problem, persona, value proposition, and scope
  - `ROADMAP.md` — milestones M0–M6
  - `USER_FLOWS.md` — happy path, state machine, and shortcuts
  - `CANONICAL_FORMAT.md` — engine-agnostic JSON scene format
  - `UNITY_EXPORT.md` — Unity Editor script exporter spec
  - `ADR/` — accepted architectural decision records
- `design/` — UX source files and exported mockups
  - `visual-editor.pen` — Pencil design file
  - `exports/` — PNG mockups
- `assets/mockups/` — prototype screenshots and related docs
- `adapters/` — reserved for future engine adapters (currently empty)
- `editor/` — reserved for the browser editor source (currently empty)
- `_legacy/` — archived Rogue Engine visual editor code and assets
- `DRAFT.md` — raw MVP methodology notes and early brainstorming

## Architecture decisions

See `docs/ADR/` for full rationale. Key decisions:

1. **Browser-first** (ADR-001) — editor runs in the browser; no download or install step.
2. **JSON canonical format** (ADR-002) — human-readable, versioned scene graph consumed by the browser editor and Unity exporter.
3. **Unity Editor script export** (ADR-003) — export generates a runnable C# script instead of a `.unitypackage`.
4. **No Rogue Engine adapter** (ADR-004) — technology prototype focuses on Unity/VRChat only; Rogue Engine code is archived.

## Current phase

**Technology Prototype (M0–M3)**

| Milestone | Goal |
|-----------|------|
| M0 | Canonical format + scene graph |
| M1 | 3D editor basics |
| M2 | Save / load + prefabs |
| M3 | Unity export (minimum viable PoC) |

Post-PoC work (lights, materials, pickables, NPC avatars, VRChat adapter) is documented in `docs/ROADMAP.md` and intentionally out of scope until M3 is proven.

## Conventions

- Use TypeScript for all new browser/editor code.
- Keep the canonical format engine-agnostic — no Unity, VRChat, or Rogue-specific data in `CANONICAL_FORMAT.md`.
- Export and adapter code lives under `adapters/`; browser editor code lives under `editor/`.
- Treat `_legacy/` as read-only reference. Do not build new features on top of it.
- Update ADRs when making architectural changes that affect scope, format, or export targets.
- Add TODO/FOR REVIEW markers in planning docs for decisions that need manual validation before coding begins.

## Build & run

The top-level repo does not yet have a configured build system. The legacy setup in `_legacy/` can be run independently for reference only:

```bash
cd _legacy
npm install
npm run build
```

The new `editor/` and `adapters/` directories will get their own build setup as M0/M1 implementation begins.
