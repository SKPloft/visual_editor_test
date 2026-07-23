# World Creator

Browser-based 3D world editor. The active implementation targets canonical JSON and a generated Unity importer package.

## Authority and workflow

Use each system for one purpose:

1. **Lark — product authority.** Current product direction, user and application flows, UX, MVP scope, priority, and success criteria live in:
   - [项目：Nook](https://vrcd-community.feishu.cn/wiki/ILvDwglemixrBekqtDFc4b6Rnwb)
   - [MVP前工作图](https://vrcd-community.feishu.cn/wiki/HTrmwgVa5i31JSkP6bDcoJWinId)
2. **OpenSpec — approved engineering changes.** Once work is approved in Lark, create an OpenSpec change for scope, requirements, design, acceptance criteria, and tasks. Link the originating Lark decision. Do not copy the product backlog into OpenSpec.
3. **Repository contracts — durable technical truth.** `docs/` contains accepted architecture and stable format/export contracts.
4. **Code and tests — implemented behavior.** If code and a contract disagree, reconcile them explicitly; do not use an archived plan to decide behavior.

The former M0–M7 roadmap, tracker, and planning notes are historical context only under `docs/archive/`. Do not implement their unfinished items unless Lark approves them as current work and an OpenSpec change is created.

## Active project map

- `src/` — TypeScript + Three.js browser editor source
  - `scene/` — scene types, demo data, and Three.js loading
  - `export/` — generated Unity importer package
- `index.html`, `package.json`, `bun.lock`, `tsconfig.json` — root application entrypoint and build manifests
- `openspec/` — active and accepted engineering change specifications
- `.agents/skills/` — canonical project-local installed skills; selected agent directories link to these copies
- `.claude/`, `.codex/`, `.gemini/`, `.opencode/`, `.windsurf/` — supported agent integrations
- `docs/` — documentation index, technical contracts, and ADRs
- `design/` — Pencil source and exported mockups; product/UX authority remains Lark
- `adapters/` — reserved; new adapter work requires Lark approval and an architectural decision
- `_legacy/` — read-only Rogue Engine archive and offline references

See `docs/README.md` for the active documentation map.

## Engineering conventions

- Use TypeScript for browser/editor code and match the surrounding style.
- Keep canonical format contracts engine-agnostic; Unity/VRChat mapping belongs in export or adapter contracts.
- Treat `_legacy/` and `docs/archive/` as read-only history.
- Use an ADR for durable or expensive-to-reverse architecture decisions. Do not use ADRs as task trackers.
- Record future feature behavior in an OpenSpec change, not in `AGENTS.md`, technical contracts, or a new milestone document.
- Update stable contracts when accepted behavior changes, normally while archiving the responsible OpenSpec change.
- Do not revive a Rogue Engine/standalone-runtime target without a new Lark decision and superseding ADR.

## Tooling conventions

- Run application, OpenSpec, skill-management, and agent commands from the repository root.
- `skills-lock.json` records project-local external skills; `.agents/skills/` is the canonical installed store.
- Only Claude Code, Codex, Gemini CLI, OpenCode, and Windsurf integrations are maintained locally. Do not generate every supported agent integration by default.
- OpenSpec owns its generated commands and skills. Refresh them with `openspec update .`; do not edit generated workflow files by hand.

## Build and run

The active application uses Bun from the repository root:

```bash
bun install
bun run dev
bun run build
bun run preview
```

The `_legacy/` npm project is archival and should not receive new feature work.
