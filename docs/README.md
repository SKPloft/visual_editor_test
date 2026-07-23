# Engineering Documentation

This directory contains durable technical documentation. Product planning does not live here.

## Authority

| Concern | Authority |
|---|---|
| Product direction, UX/application flows, priority, and success criteria | Lark pages linked from `AGENTS.md` |
| Approved engineering change, requirements, design, and tasks | `openspec/changes/` |
| Accepted current behavior | `openspec/specs/`, stable contracts below, code, and tests |
| Durable architecture decisions | `ADR/` |
| Historical plans and implementation records | `archive/` |

When sources disagree, do not silently choose an old document. Reconcile code and active contracts through an OpenSpec change; use Lark when the disagreement is a product decision.

## Active contracts

- [`CANONICAL_FORMAT.md`](CANONICAL_FORMAT.md) — engine-agnostic scene-data contract and JSON Schema.
- [`UNITY_EXPORT.md`](UNITY_EXPORT.md) — generated Unity importer package behavior.
- [`TECHNICAL_DEBT.md`](TECHNICAL_DEBT.md) — active engineering debt only; not a feature backlog.

## Architecture decisions

- [`ADR/001-browser-first.md`](ADR/001-browser-first.md)
- [`ADR/002-json-canonical-format.md`](ADR/002-json-canonical-format.md)
- [`ADR/003-unity-editor-script-export.md`](ADR/003-unity-editor-script-export.md) — superseded.
- [`ADR/004-no-rogue-adapter.md`](ADR/004-no-rogue-adapter.md)
- [`ADR/005-generated-unity-importer-package.md`](ADR/005-generated-unity-importer-package.md)

ADRs capture durable, expensive-to-reverse choices. Feature acceptance criteria and task lists belong in OpenSpec changes.

## Archives

- [`archive/local-plans/`](archive/local-plans/) — former local product, roadmap, user-flow, and MVP drafts.
- [`archive/implementation-history/`](archive/implementation-history/) — former milestone tracker, notes, decisions, and resolved-debt history.

Archived files are immutable historical context and are not requirements for current work.
