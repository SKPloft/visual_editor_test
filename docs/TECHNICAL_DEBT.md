# Technical Debt

This file tracks active engineering debt that can be evaluated independently of product prioritization. It is not a feature roadmap. When an item is selected for implementation, create or link an OpenSpec change when behavior or contracts will change.

## Editor performance

### Bundle size

- **Impact:** Low
- **Current state:** Three.js is bundled into a 500 kB+ output chunk.
- **Done when:** Code splitting is measured and either implemented or explicitly rejected with current build evidence.

### Full-scene rebuilds

- **Impact:** Low while scenes remain small
- **Current state:** Editing calls `renderCurrentScene()`, which rebuilds the Three.js scene.
- **Done when:** Profiling establishes an acceptable scene-size threshold, or touched-node updates replace full rebuilds where measured latency requires it.

## Viewport accessibility

### Pointer-only navigation alternatives

- **Impact:** Medium for trackpad and accessibility users
- **Current state:** Navigation follows Unity-like right-drag orbit, middle-drag pan, scroll zoom, and RMB + WASD fly controls.
- **Done when:** Product-approved alternative bindings are specified and verified without conflicting with transform shortcuts or text input.

## Unity fidelity

### Rotation handedness

- **Impact:** Medium for non-trivial rotations
- **Current state:** Unity import negates Z positions but passes rotation quaternions through unchanged.
- **Done when:** Coordinate conversion is specified with representative fixtures and verified end-to-end in Unity.

### Ambient lighting mapping

- **Impact:** Low for the current prototype
- **Current state:** Canonical ambient lights become low-intensity directional fill lights in Unity.
- **Done when:** An approved Unity ambient/sky mapping is specified and browser/Unity output is compared with representative scenes.
