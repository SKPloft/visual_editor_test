# ADR-004: No Rogue Engine Adapter (Technology Prototype)

## Status

Accepted

## Context

This repository originated from a broader "Rogue Engine" vision that included a custom runtime, scripting layer, and asset system. For the technology prototype, we must stay focused on proving the core loop: browser editor → canonical format → Unity/VRChat world. Supporting a second runtime (Rogue Engine) would split effort across two export pipelines, two component models, and two testing surfaces.

## Decision

Do not build or maintain a Rogue Engine adapter during the technology prototype (M0–M3). All export and runtime targets are limited to Unity via C# Editor script. A Rogue Engine adapter may be revisited after M3 if the product direction expands to a standalone runtime.

## Consequences

- **Positive:** Keeps the technology prototype scope tight; one export target means one canonical format and one generator to validate.
- **Positive:** Avoids designing abstractions prematurely; we learn the real format requirements from Unity before generalizing.
- **Negative:** Any legacy Rogue Engine design documents or asset schemas in the repo are explicitly out of scope and should not drive prototype decisions.
- **Negative:** If the product later pivots to a custom runtime, we will need to retrofit the canonical format; we accept this cost because the format is JSON and designed to evolve.
- **Risk:** Emotional attachment to the original engine vision may cause scope creep; this ADR serves as a boundary document to reference during planning discussions.
