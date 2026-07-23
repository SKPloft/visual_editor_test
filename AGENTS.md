# World Creator

A browser-based 3D world editor for non-technical VRChat/Resonite creators.

## Product planning authority

Current product direction, UX work, collaboration context, MVP scope, and success criteria are maintained in Lark:

- [项目：Nook](https://vrcd-community.feishu.cn/wiki/ILvDwglemixrBekqtDFc4b6Rnwb)
- [MVP前工作图](https://vrcd-community.feishu.cn/wiki/HTrmwgVa5i31JSkP6bDcoJWinId)

Use Lark for current product decisions. The repository is authoritative for implemented behavior, technical specifications, ADRs, and implementation status. Earlier local product plans are preserved under `docs/archive/local-plans/` and must not be treated as current requirements.

## Tech stack

- **Runtime:** Browser-first web application (no install for users)
- **Language:** TypeScript
- **3D viewport:** Three.js (confirmed for the technology prototype; see ADR-001)
- **Scene format:** Custom canonical JSON (`docs/CANONICAL_FORMAT.md`)
- **Export target:** Unity Editor C# script (`docs/UNITY_EXPORT.md`)
- **Build tooling:** Vite in `editor/` (configured for M0), package management via `bun`. Legacy Webpack/Express setup lives in `_legacy/`.

## Project structure

- `docs/` — active engineering decisions, implementation tracking, and specifications
  - `CANONICAL_FORMAT.md` — engine-agnostic JSON scene format
  - `UNITY_EXPORT.md` — Unity Editor script exporter spec
  - `ADR/` — accepted architectural decision records
  - `NOTES/` — implementation observations, informal technical decisions, bugs, and debt
  - `archive/local-plans/` — superseded local product, roadmap, flow, and MVP drafts; Lark is authoritative instead
  - `threejs/` — legacy Three.js API docs imported as offline reference; not integrated into the build or workflow
- `design/` — UX source files and exported mockups
  - `visual-editor.pen` — Pencil design file
  - `exports/` — PNG mockups
- `assets/mockups/` — prototype screenshots and related docs
- `adapters/` — reserved for future engine adapters (currently empty)
- `editor/` — browser editor source (Vite + TypeScript + Three.js)
  - `src/scene/` — canonical format types, demo scene, and Three.js scene loader
  - `index.html` — editor entry point
  - `package.json` — Vite build scripts and dependencies
- `_legacy/` — archived Rogue Engine visual editor code and assets
- `docs/IMPLEMENTATION_TRACKER.md` — milestone completion status dashboard
  - `docs/NOTES/README.md` — what each NOTES file is for and how to keep formats stable
  - `docs/NOTES/milestones.md` — per-milestone observations, discoveries, and post-mortems
  - `docs/NOTES/bugs-debt.md` — known bugs, performance debt, and refactor candidates
  - `docs/NOTES/decisions.md` — informal decisions not worth a full ADR

## Architecture decisions

See `docs/ADR/` for full rationale. Key decisions:

1. **Browser-first** (ADR-001) — editor runs in the browser; no download or install step.
2. **JSON canonical format** (ADR-002) — human-readable, versioned scene graph consumed by the browser editor and Unity exporter.
3. **Unity Editor script export** (ADR-003) — export generates a runnable C# script instead of a `.unitypackage`.
4. **No Rogue Engine adapter** (ADR-004) — technology prototype focuses on Unity/VRChat only; Rogue Engine code is archived.

## Current work

Use Lark for the current product and UX workstream. Use `docs/IMPLEMENTATION_TRACKER.md` and the active code for technical implementation status; the archived M0–M7 roadmap is historical context only.

## Conventions

- Use TypeScript for all new browser/editor code.
- Keep the canonical format engine-agnostic — no Unity, VRChat, or Rogue-specific data in `CANONICAL_FORMAT.md`.
- Export and adapter code lives under `adapters/`; browser editor code lives under `editor/`.
- Treat `_legacy/` as read-only reference. Do not build new features on top of it.
- Update ADRs when making architectural changes that affect scope, format, or export targets.
- Log informal decisions, discovered bugs/debt, and milestone observations in `docs/NOTES/` rather than in `docs/IMPLEMENTATION_TRACKER.md`.
- Do not restructure `docs/NOTES/` files or `docs/IMPLEMENTATION_TRACKER.md` without proposing the change first. Format changes affect how the team reads project state.
- Record current product planning, UX direction, MVP scope, and collaboration decisions in Lark rather than adding new local product-plan documents.
- Add TODO/FOR REVIEW markers to active technical documents for engineering decisions that need manual validation before coding begins.
- Update AGENTS.md when project structure, build tooling, documentation authority, or implementation status changes.
- Review viewport controls and existing implementations for performance (data structures, algorithms) before expanding M1 features.

## Build & run

### Editor (M0+)

The editor is a standalone Vite project under `editor/`:

```bash
cd editor
bun install
bun run dev      # Start development server with hot reload
bun run build    # Production build to editor/dist/
bun run preview  # Preview production build locally
```

### Legacy

The legacy setup in `_legacy/` is kept on npm for reference only:

```bash
cd _legacy
npm install
npm run build
```

The active `editor/` uses `bun` (see M0 tooling notes).

The new `adapters/` directory will get its own build setup as M3 implementation begins.
