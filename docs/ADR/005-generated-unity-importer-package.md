# ADR-005: Generated Unity Importer Package

## Status

Accepted

## Context

ADR-003 chose a generated Unity Editor C# script as the simplest transparent bridge from canonical JSON to Unity. During implementation, the importer grew into multiple C# sources with separate Editor and Runtime assembly definitions, marker components, a package manifest, and a Newtonsoft.Json dependency.

Keeping that implementation in one copied script would make the generator harder to maintain and the generated output harder to inspect. It would also obscure the boundary between editor-only import code and runtime marker components.

## Decision

Export a generated, self-contained Unity importer package as a ZIP. The package contains a UPM manifest, Editor and Runtime assembly definitions, generated C# sources, and marker components. Canonical scene JSON remains a separate export selected through the importer's `World Creator -> Import Scene from JSON` menu action.

The generated package must compile without the VRChat SDK. Optional VRChat components may be attached through reflection when compatible SDK assemblies are present.

`docs/UNITY_EXPORT.md` is the detailed contract for current generated package behavior.

## Consequences

- **Positive:** Generated code is split by responsibility and remains inspectable.
- **Positive:** Editor-only import logic and runtime marker components have explicit assembly boundaries.
- **Positive:** The importer can evolve without requiring a binary `.unitypackage` format or headless Unity.
- **Positive:** Canonical JSON remains independent from a particular generated package build.
- **Negative:** Users export and manage both a canonical JSON file and a package ZIP.
- **Negative:** Package layout and dependency metadata become compatibility surfaces that need validation.
- **Risk:** Unity and VRChat SDK changes may require generator updates; optional SDK integration must remain reflection-based or move behind a separately approved adapter.
