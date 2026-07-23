# NOTES folder

This folder holds operational notes that change frequently during implementation. The files here are intentionally lightweight; formal architecture decisions belong in `docs/ADR/`, while current product and UX decisions live in the Nook Lark documents linked from `AGENTS.md`. The former local product plans are archived under `docs/archive/local-plans/`.

## Files

| File | Purpose | Format summary |
|------|---------|----------------|
| `milestones.md` | Per-milestone observations, discoveries, and post-mortems | One section per milestone (`## M0`, `## M1`, …) with optional subsections: Status, Scope clarification, Tooling, Discoveries, Input / shortcuts, Open questions. |
| `bugs-debt.md` | Known bugs, performance debt, and refactor candidates | Grouped by milestone; each item is a level-3 heading with Severity, Acceptance, and Proposed approach. Cross-cutting items live in category sections at the end. |
| `decisions.md` | Informal decisions not worth a full ADR | Date-stamped entries with Context, Decision, Consequences, and Follow-up. |

## Stability

Each file starts with a `FORMAT:` HTML comment that defines its expected structure. Do not change these formats without discussing the change first, because consistency across notes reduces reading effort for everyone working on the project.
