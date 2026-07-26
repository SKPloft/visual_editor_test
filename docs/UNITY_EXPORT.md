# World Creator — Unity Export Specification

> **Status:** Implemented. The browser-side generator is `src/export/unityPackageGenerator.ts`. The generated mini Unity package imports canonical JSON into Unity via `World Creator → Import Scene from JSON`.
>
> **Prefab scope notice.** Prefab generation described in §3.3 is **frozen implemented behavior**. It builds Unity prefabs from the legacy embedded `PrefabAsset.rootNode` model and receives no Nook prefab package functionality. Consuming `.nookpkg` packages, resolving pinned `{kind, id, version, digest}` references, and bake/export integration are out of scope here and belong to separate future changes; see [`PREFAB_PACKAGE_FORMAT.md`](PREFAB_PACKAGE_FORMAT.md) and [`ADR/006`](ADR/006-prefab-package-interchange.md). This document is not rewritten as package support.

## 1. Overview

This document specifies how the canonical JSON scene format (defined in `docs/CANONICAL_FORMAT.md`) is imported into Unity for World Creator. The chosen approach is a **mini Unity package** containing Editor and Runtime assembly definitions that reads the canonical JSON and constructs GameObjects in the active scene. The browser-side generator emits the package manifest, C# sources, and assembly definitions into a ZIP file. The user extracts this ZIP into their Unity project, then selects a separately exported canonical JSON scene through the importer.

The package uses **Newtonsoft.Json** (included with modern Unity via the `com.unity.nuget.newtonsoft-json` package) for polymorphic component deserialization, replacing the earlier `JsonUtility` approach.

The resulting Unity scene is the **foundation** for all downstream targets, including VRChat. VRChat-specific metadata (e.g., VRC Scene Descriptor, spawn points, occlusion culling) will be added later by a dedicated adapter layer.

---

## 2. Invocation

### Menu Item Path

```
World Creator -> Import Scene from JSON
```

### Package Installation

The package is installed by extracting the downloaded ZIP into the Unity project:

- **Option A (recommended):** Extract into the project's `Assets/WorldCreator/` folder. Unity will detect the `.asmdef` files and compile the package automatically.
- **Option B:** Extract into `Packages/com.worldcreator.importer/` as a local package (requires adding an entry in `Packages/manifest.json`).

The ZIP contains a `package.json`, Editor and Runtime assembly definitions, and the generated C# sources. Export the canonical scene JSON separately with the editor's scene export action.

### Workflow

1. Export the canonical scene JSON from the World Creator browser editor.
2. Export the Unity package ZIP from the editor.
3. Extract the ZIP into the Unity project's `Assets/WorldCreator/` folder.
4. Open the target Unity project. Unity compiles the package.
5. Select `World Creator -> Import Scene from JSON` from the menu bar.
6. A file dialog opens. Select the exported `.json` file.
7. The importer parses the JSON, validates the version, and builds the scene under a single root GameObject named after the scene metadata.

### Expected JSON Path

The script accepts any absolute or relative file path. The recommended convention is to place exported scenes under:

```
Assets/WorldCreatorScenes/<scene-name>.json
```

---

## 3. Unity Project Layout

### 3.1 Generated GameObjects

All imported GameObjects are parented under a single root:

```
<SceneName> (empty GameObject)
  ├── Floor
  ├── Wall North
  ├── Wall South
  ├── Wall East
  ├── Wall West
  ├── Point Light
  ├── Spot Light
  ├── Pickable Cube
  └── NPC Avatar
```

This keeps the Hierarchy clean and makes it easy to delete or re-import the entire scene.

### 3.2 Materials Folder

For every `MaterialAsset` in the JSON `assetLibrary`, the importer creates a corresponding Unity `Material` using the **Standard shader**:

```
Assets/WorldCreatorScenes/<scene-name>/Materials/
  ├── Floor Material.mat
  ├── Wall Material.mat
  └── Cube Material.mat
```

Mapping rules:

| Canonical Field | Unity Material Property |
|----------------|------------------------|
| `albedoColor`  | `_Color` (RGB from hex) |
| `albedoTexture`| `_MainTex` (imported Texture2D) |
| `metallic`     | `_Metallic` |
| `roughness`    | `_Smoothness` (inverted: `1 - roughness`) |
| `normalTexture`| `_BumpMap` |

If a texture is referenced but not found in the `textures` array, a warning is logged and the material falls back to the albedo color.

### 3.3 Prefabs Folder

> **Frozen.** This section documents the prototype path that consumes the legacy embedded prefab model. It is accurate for the shipped importer and must not be extended. Nook prefab package consumption is a separate future change.

For every `PrefabAsset` in the JSON `assetLibrary`, the importer creates a real `.prefab` asset:

```
Assets/WorldCreatorScenes/<scene-name>/Prefabs/
  └── <PrefabName>.prefab
```

Prefab creation uses `PrefabUtility.SaveAsPrefabAsset` at editor-time, which generates a fully functional Unity prefab. When a node contains a `prefabRef` component, the importer instantiates the matching prefab via `PrefabUtility.InstantiatePrefab` as a child of that node, maintaining the prefab link in the scene. Prefab transform and component overrides are not part of canonical format version 1.

### 3.4 Lights

`LightComponent` nodes map directly to Unity `Light` components:

| Canonical `lightType` | Unity Light Type |
|----------------------|------------------|
| `directional`        | `LightType.Directional` |
| `point`              | `LightType.Point` |
| `spot`               | `LightType.Spot` |

Additional mappings:

- `color` -> `Light.color` (parsed from hex)
- `intensity` -> `Light.intensity` (no unit conversion for the basic prototype; documented as "abstract units")
- `range` -> `Light.range` (point and spot only)
- `angle` -> `Light.spotAngle` (spot only)
- `castShadows` -> `Light.shadows = LightShadows.Soft` if true, else `LightShadows.None`

### 3.5 Colliders and Pickables

`ColliderComponent` nodes map to Unity collider components:

| Canonical `shape` | Unity Component |
|------------------|-----------------|
| `box`            | `BoxCollider` |
| `sphere`         | `SphereCollider` |
| `capsule`        | `CapsuleCollider` |
| `mesh`           | `MeshCollider` |

- `isTrigger` -> `Collider.isTrigger`
- `isPickable` -> A custom `WorldCreatorPickable` MonoBehaviour is added as a marker. Additionally, when the VRChat SDK is present, the importer scans loaded assemblies whose names begin with `VRC` for a non-abstract type named `VRC_Pickup` or `VRCPickup`, then attaches it via reflection. If no matching type resolves, only the `WorldCreatorPickable` marker remains.

Size overrides (`size`, `radius`, `height`) are applied directly. If omitted, the collider size is derived from the node's `transform.scale`.

### 3.6 NPC / Avatar Placeholder

`AvatarPlaceholderComponent` nodes create an **empty GameObject** with:

- A `WorldCreatorAvatarPlaceholder` MonoBehaviour attached.
- The component stores:
  - `avatarType` (`npc` or `player`)
  - `displayName`
  - `modelRef` (for future model binding)
  - `spawnPosition` and `spawnRotation` (defaulting to the node transform)

This is intentionally a placeholder. No AI behavior, animation, or actual avatar model is instantiated during the basic prototype phase.

---

## 4. Unity Package Structure

The importer is delivered as a multi-file Unity package rather than a single monolithic script. The browser-side generator (`src/export/unityPackageGenerator.ts`) emits the following file tree into the downloaded ZIP:

```
WorldCreatorUnityPackage/
├── package.json                                      # UPM package manifest
├── Editor/
│   ├── WorldCreatorUnityPackage.Editor.asmdef        # Editor assembly definition
│   ├── DataModels.cs                                 # Canonical JSON models
│   ├── WorldCreatorSceneImporter.cs                  # Menu item + import orchestration
│   ├── MaterialBuilder.cs                            # Creates Unity materials
│   ├── PrefabBuilder.cs                              # Creates and instantiates prefabs
│   └── ComponentMappers.cs                           # Maps canonical components to Unity
└── Runtime/
    ├── WorldCreatorUnityPackage.Runtime.asmdef       # Runtime assembly definition
    ├── WorldCreatorPickable.cs                       # Pickable marker
    └── WorldCreatorAvatarPlaceholder.cs              # Avatar placeholder data
```

The canonical scene JSON is exported separately by the editor and selected through the importer's file dialog; it is not embedded in the Unity package ZIP.

### Key Classes

| Class | Assembly | Responsibility |
|-------|----------|--------------|
| `WorldCreatorSceneImporter` | Editor | Registers the `World Creator -> Import Scene from JSON` menu item, opens a file dialog, validates version 1 JSON, creates output folders, and orchestrates import. |
| `DataModels` | Editor | Defines the Newtonsoft.Json models used to deserialize canonical scene data. |
| `MaterialBuilder` | Editor | Creates `Standard` shader materials under the imported scene's `Materials/` folder. |
| `PrefabBuilder` | Editor | Builds each prefab's node subgraph, saves it via `PrefabUtility.SaveAsPrefabAsset`, and caches it for `prefabRef` instantiation. |
| `ComponentMappers` | Editor | Creates node GameObjects, resolves builtin meshes, applies transforms, and maps lights, colliders, prefab references, and avatar placeholders. |
| `WorldCreatorPickable` | Runtime | `MonoBehaviour` marker attached to pickable GameObjects. |
| `WorldCreatorAvatarPlaceholder` | Runtime | `MonoBehaviour` storing avatar placeholder data. |

### Dependencies

- **Newtonsoft.Json** — referenced via Unity's built-in `com.unity.nuget.newtonsoft-json` package. The `Editor.asmdef` and `Runtime.asmdef` both declare a dependency on `Newtonsoft.Json`.
- No other third-party dependencies are required.

---

## 5. Limitations and Assumptions (Basic Prototype)

The following limitations apply to the basic prototype importer. They are intentional scope boundaries, not bugs.

| Limitation | Rationale |
|-----------|-----------|
| **No lightmap baking** | The basic prototype uses real-time lighting only. Baked lighting requires a secondary UV channel and a bake step that is out of scope. |
| **No custom shaders** | All materials use Unity's built-in `Standard` shader. Custom shader graphs or SRP shaders are not supported. |
| **No animations** | The canonical format does not define animation clips, states, or controllers. Animated objects are treated as static meshes. |
| **No texture import** | Texture assets are parsed but not imported into the Unity AssetDatabase. Only albedo color and scalar material properties are applied. |
| **Builtin meshes only** | External mesh files (`.obj`, `.fbx`, `.gltf`) are not resolved. Only `builtin:plane`, `builtin:cube`, `builtin:sphere`, and `builtin:cylinder` are mapped to Unity primitives. |
| **Coordinate system conversion** | Z positions are negated when importing into Unity's left-handed space. Rotation handedness conversion for non-trivial orientations is unresolved technical debt; see `docs/TECHNICAL_DEBT.md`. |
| **No nested parenting by `parent` ID** | The `parent` field on nodes is not part of the canonical format; only the `children` array defines hierarchy. |
| **No scene cleanup on re-import** | Re-importing a scene creates a second root GameObject. Manual deletion of the old root is required. |
| **No Nook prefab package support** | The importer reads only embedded `PrefabAsset.rootNode` trees. It does not read `.nookpkg` archives, verify manifest or blob digests, resolve pinned package references, apply declared parameters, or honor package-root transform composition. Package/bake integration is a separate future change. |

---

## 6. M4 Lighting and Material Alignment

- **Units**: 1 canonical unit = 1 meter. `unitScale` defaults to 1.0.
- **Light intensity**: direct 1:1 mapping to Unity's arbitrary intensity units for the basic prototype. Directional/point/spot share the same scale for now; photometric units (lux/candela/lumen) may be introduced later.
- **Color**: hex strings parsed by Unity's `ColorUtility.TryParseHtmlString`.
- **PBR**: canonical `roughness` maps to Unity Standard `_Smoothness` as `1 - roughness`; canonical `metallic` maps directly to `_Metallic`. This is a linear approximation because Unity's built-in Standard shader uses the metallic-smoothness workflow. A more accurate BRDF match, or switching to a metallic-roughness shader, is deferred to the adapter phase.
- **Shadows**: `castShadows: true` → `LightShadows.Soft` and `ShadowCastingMode.On`; default is off.
- **Ambient light**: represented by an explicit node with `lightType: "ambient"`. In the browser this becomes a `THREE.AmbientLight`. In Unity the current importer maps it to a low-intensity directional fill light; a true ambient/sky calibration is deferred to the alignment phase.
- **Missing material**: unresolved or empty `materialRef` values render as magenta in both the editor and Unity. The magenta fallback is created in-memory by the Unity importer and is not saved as a `.mat` asset.

---

## 7. Path to VRChat

The Unity scene produced by this importer is the **foundational layer** for all export targets. To make it VRChat-ready, a future adapter will:

1. Add a `VRC_SceneDescriptor` component to the root.
2. Configure spawn points from `AvatarPlaceholderComponent` nodes with `avatarType: "player"`.
3. Set up collision layers and occlusion culling.
4. Replace `WorldCreatorPickable` markers with VRChat's `VRC_Pickup` or `VRC_ObjectSync` components. As of M5, the importer already attaches `VRC_Pickup` via reflection when the SDK is available, so this step becomes a refinement (configure pickup fields, add `VRC_ObjectSync`) rather than a from-scratch mapping.
5. Bake lightmaps and reflection probes if the user opts into static lighting.
6. Resolve external avatar models and animation controllers.

This separation of concerns keeps the canonical format engine-agnostic and allows the Unity importer to evolve independently of VRChat-specific requirements.

---

*End of Document*
