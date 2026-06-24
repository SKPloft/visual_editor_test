# ADR-001: Browser-First Architecture

## Status

Accepted

## Context

The world editor must be accessible to non-technical creators who lack Unity experience and may not have powerful workstations. We evaluated three host environments for the editor:

1. **Desktop application (Electron / Tauri)** — Full file-system access, better performance, but requires a download and update cycle.
2. **Browser-first (Web app)** — Zero install, instant updates, works on any OS, but constrained by browser sandbox and WebGL performance limits.
3. **Hybrid (browser UI + local native service)** — Best of both worlds, but doubles the deployment surface and complicates the setup story.

The target persona (hobbyist world builder) is highly sensitive to friction in setup. Any download or install step is a drop-off point.

## Decision

Build the editor as a browser-first web application. All editing, saving, and export generation happens in the browser. If future requirements demand file-system access (e.g., bulk asset import), we will add an optional local bridge rather than switch the core architecture.

## Consequences

- **Positive:** Zero install for users; instant updates; cross-platform by default; easy to share WIP scenes via URLs.
- **Positive:** Forces us to keep the runtime lightweight and the canonical format small, which benefits long-term portability.
- **Negative:** Large asset imports (custom 3D models, textures) must be handled via browser file APIs or an optional upload service, which is less convenient than drag-and-drop from a local folder.
- **Negative:** WebGL performance caps the complexity of real-time preview; very dense scenes may require simplification or LOD handling.
- **Negative:** Renderer choice is locked to Three.js for the technology prototype. Switching renderers later would require rewriting the viewport, gizmos, and scene graph binding.
- **Risk:** Offline usage is not supported unless we later add a PWA / service-worker layer; this is acceptable for the technology prototype.
