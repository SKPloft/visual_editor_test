# ADR-002: JSON as Canonical Scene Format

## Status

Accepted

## Context

The editor needs a single, portable representation of a scene that can be:
- Saved and loaded by the browser editor.
- Inspected and hand-edited by advanced users.
- Consumed by the Unity export generator.
- Potentially consumed by other runtimes (e.g., VRChat, Resonite) in the future.

We evaluated:

1. **Custom binary format** — Compact and fast, but opaque and harder to debug.
2. **JSON** — Human-readable, universally supported, easy to version, but larger and slower to parse for huge scenes.
3. **Existing standard (glTF, USD)** — Rich ecosystem, but overkill for our primitive-only MVP and adds heavy dependencies.

## Decision

Use a custom JSON schema as the canonical scene format. The schema will define nodes, transforms, components, and prefab references in a flat, versioned structure. We will not adopt glTF or USD until the asset pipeline matures beyond built-in primitives.

## Consequences

- **Positive:** Human-readable and hand-editable; trivial to diff in version control.
- **Positive:** Zero external parsing dependencies in the browser and in the Unity C# generator.
- **Positive:** Easy to evolve via schema versioning fields.
- **Negative:** Textual representation is larger than binary; we accept this trade-off until scene sizes become a measured bottleneck.
- **Negative:** We must design and maintain the schema ourselves, including migration logic for breaking changes.
- **Risk:** Future asset-heavy scenes may require a binary chunk companion (e.g., base64-encoded meshes or external blob references); the schema is designed to allow this extension without breaking existing documents.
