# Engineering Documentation

This directory contains durable technical documentation. Product planning does not live here.

## Authority

| Concern | Authority |
| --- | --- |
| Product direction, UX/application flows, priority, and success criteria | Lark pages linked from `AGENTS.md` |
| Approved engineering change, requirements, design, and tasks | `openspec/changes/` |
| Accepted current behavior | `openspec/specs/`, stable contracts below, code, and tests |
| Durable architecture decisions | `ADR/` |
| Historical plans and implementation records | `archive/` |

When sources disagree, do not silently choose an old document. Reconcile code and active contracts through an OpenSpec change; use Lark when the disagreement is a product decision.

## Active contracts

- [`PREFAB_PACKAGE_FORMAT.md`](PREFAB_PACKAGE_FORMAT.md) — Nook prefab package interchange contract (manifest, payloads, parameters, capabilities, validation). Supersedes the prefab portions of `CANONICAL_FORMAT.md`.
- [`CANONICAL_FORMAT.md`](CANONICAL_FORMAT.md) — engine-agnostic scene-data contract and JSON Schema. Its prefab model is legacy prototype behavior.
- [`UNITY_EXPORT.md`](UNITY_EXPORT.md) — generated Unity importer package behavior. Its prefab generation is frozen.
- [`TECHNICAL_DEBT.md`](TECHNICAL_DEBT.md) — active engineering debt only; not a feature backlog.

## Rationale records (non-normative)

- [`drafts/prefab-package-format-v0.md`](drafts/prefab-package-format-v0.md) / [`.en.md`](drafts/prefab-package-format-v0.en.md) — v0.1 draft, promoted to `PREFAB_PACKAGE_FORMAT.md` by OpenSpec change `prefab-contract-foundation`. Retained as source history.
- [`drafts/prefab-format-discussion-log.md`](drafts/prefab-format-discussion-log.md) / [`.en.md`](drafts/prefab-format-discussion-log.en.md) — discussion record: questions, options, chosen answers, rationale, and open items.

These documents record why the contract says what it says. They are not runtime contracts and do not override the active contracts above.

## Architecture decisions

- [`ADR/001-browser-first.md`](ADR/001-browser-first.md)
- [`ADR/002-json-canonical-format.md`](ADR/002-json-canonical-format.md)
- [`ADR/003-unity-editor-script-export.md`](ADR/003-unity-editor-script-export.md) — superseded.
- [`ADR/004-no-rogue-adapter.md`](ADR/004-no-rogue-adapter.md)
- [`ADR/005-generated-unity-importer-package.md`](ADR/005-generated-unity-importer-package.md)
- [`ADR/006-prefab-package-interchange.md`](ADR/006-prefab-package-interchange.md)

ADRs capture durable, expensive-to-reverse choices. Feature acceptance criteria and task lists belong in OpenSpec changes.

## Archives

- [`archive/local-plans/`](archive/local-plans/) — former local product, roadmap, user-flow, and MVP drafts.
- [`archive/implementation-history/`](archive/implementation-history/) — former milestone tracker, notes, decisions, and resolved-debt history.

Archived files are immutable historical context and are not requirements for current work.
