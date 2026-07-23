# ADR-003: Unity Editor Script Export

## Status

Superseded by [ADR-005](005-generated-unity-importer-package.md).

## Context

The technology prototype must demonstrate that a scene built in the browser can become a runnable VRChat world. VRChat worlds are authored in Unity, so our export must produce something Unity can consume. We evaluated two export strategies:

1. **Generate a Unity package (.unitypackage) containing prefabs and scenes** — Native Unity format, but requires reverse-engineering undocumented package internals or running Unity headless to import, which is heavy and fragile.
2. **Generate a C# Editor script that recreates the scene via Unity APIs** — Plain text, easy to inspect, runs inside the user's existing Unity project, and requires no custom binary formats.

## Decision

Export by generating a Unity Editor C# script. The user copies the script into their Unity project, runs it from the menu, and the script instantiates GameObjects, applies transforms, and attaches components to recreate the scene exactly.

## Consequences

- **Positive:** Transparent and debuggable; users can read and modify the generated script before running it.
- **Positive:** No dependency on Unity's internal package format or version-specific serialization.
- **Positive:** Works with any Unity version that supports the APIs we use (2019.4 LTS and newer).
- **Negative:** Requires the user to have Unity installed and a VRChat project set up; this is acceptable for the technology prototype because our target early adopters already use VRChat and have followed the SDK setup guide.
- **Negative:** Large scenes may produce long scripts; we will mitigate with script splitting or asset bundling if this becomes a problem.
- **Risk:** VRChat SDK components (e.g., VRC_SceneDescriptor) are subject to change; the generator must be version-pinned and updated when VRChat releases breaking SDK changes.
