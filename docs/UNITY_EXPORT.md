# World Creator — Unity Export Specification

> **Status:** M3 implemented. The browser-side generator is `editor/src/export/unityPackageGenerator.ts`. The generated mini Unity package imports canonical JSON into Unity via `World Creator → Import Scene from JSON`.

## 1. Overview

This document specifies how the canonical JSON scene format (defined in `docs/CANONICAL_FORMAT.md`) is imported into Unity for World Creator. The chosen approach is a **mini Unity package** containing Editor and Runtime assembly definitions that reads the canonical JSON and constructs GameObjects in the active scene. The browser-side generator emits all C# sources, assembly definitions, and the canonical JSON into a ZIP file. The user extracts this ZIP into their Unity project to install the importer.

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

The ZIP contains a `package.json`, Editor and Runtime assembly definitions, all C# sources, and the canonical scene JSON file.

### Workflow

1. Export the scene from the World Creator browser editor (downloads a ZIP).
2. Extract the ZIP into the Unity project's `Assets/WorldCreator/` folder.
3. Open the target Unity project. Unity compiles the package.
4. Select `World Creator -> Import Scene from JSON` from the menu bar.
5. A file dialog opens. Select the `.json` file (included in the extracted ZIP, or any other exported scene).
6. The script parses the JSON, validates the version, and builds the scene under a single root GameObject named after the scene metadata.

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

For every `PrefabAsset` in the JSON `assetLibrary`, the importer creates a real `.prefab` asset:

```
Assets/WorldCreatorScenes/<scene-name>/Prefabs/
  └── <PrefabName>.prefab
```

Prefab creation uses `PrefabUtility.SaveAsPrefabAsset` at editor-time, which generates a fully functional Unity prefab. When a node contains a `prefabRef` component, the importer instantiates the matching prefab via `PrefabUtility.InstantiatePrefab`, maintaining the prefab link in the scene. Any `transformOverride` or `componentOverrides` are applied after instantiation.

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
- `isPickable` -> A custom `WorldCreatorPickable` MonoBehaviour is added as a marker. Additionally, when the VRChat SDK is present in the Unity project, a `VRC_Pickup` component is attached via runtime reflection so the package compiles either with or without the SDK installed. The type lookup tries `VRC.SDKBase.VRC_Pickup, VRCSDKBase` first, then `VRC.SDK3.Components.VRC_Pickup, VRCSDK3`; if neither resolves, only the `WorldCreatorPickable` marker remains.

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

The importer is delivered as a multi-file Unity package rather than a single monolithic script. The browser-side generator (`editor/src/export/unityPackageGenerator.ts`) emits the following file tree into the downloaded ZIP:

```
WorldCreator/
├── package.json                          # UPM package manifest
├── Editor/
│   ├── WorldCreator.Editor.asmdef        # Editor assembly definition
│   ├── WorldCreatorSceneImporter.cs      # Menu item + import orchestration
│   ├── SceneBuilder.cs                   # Builds GameObjects from parsed nodes
│   ├── MaterialBuilder.cs               # Creates Material assets from MaterialAsset entries
│   ├── PrefabBuilder.cs                  # Creates .prefab assets via PrefabUtility
│   └── MeshResolver.cs                   # Maps mesh refs to Unity builtin meshes
├── Runtime/
│   ├── WorldCreator.Runtime.asmdef       # Runtime assembly definition
│   ├── Models/
│   │   ├── SceneFile.cs                  # Root deserialization model
│   │   ├── NodeData.cs                   # Node, TransformData
│   │   └── ComponentData.cs              # Polymorphic component models
│   ├── WorldCreatorPickable.cs           # MonoBehaviour marker for pickable objects
│   └── WorldCreatorAvatarPlaceholder.cs  # MonoBehaviour for avatar placeholders
└── Scenes/
    └── <scene-name>.json                 # The exported canonical JSON
```

### Key Classes

| Class | Assembly | Responsibility |
|-------|----------|--------------|
| `WorldCreatorSceneImporter` | Editor | Entry point. Registers the `World Creator -> Import Scene from JSON` menu item, opens a file dialog, orchestrates the import pipeline. |
| `SceneBuilder` | Editor | Walks the `sceneGraph.root` array recursively, creating GameObjects, applying transforms (Z negated), and delegating to component-specific builders. |
| `MaterialBuilder` | Editor | Iterates `assetLibrary.materials`, creates `Standard` shader materials, and saves them as `.mat` assets under the scene's `Materials/` folder. |
| `PrefabBuilder` | Editor | Iterates `assetLibrary.prefabs`, builds each prefab's node subgraph, saves it via `PrefabUtility.SaveAsPrefabAsset`, and provides a cache for `prefabRef` lookups. When a node references a prefab, instantiation uses `PrefabUtility.InstantiatePrefab` to preserve the prefab link. |
| `MeshResolver` | Editor | Resolves canonical mesh references (e.g., `builtin:cube`, `builtin:sphere`, `builtin:cylinder`, `builtin:plane`) to Unity's built-in mesh resources. Falls back to a cube for unrecognised references. |
| `SceneFile` / `NodeData` / `ComponentData` | Runtime | Data models deserialised from the canonical JSON via **Newtonsoft.Json**. These live in the Runtime assembly so they can be referenced by both Editor scripts and future runtime loaders. |
| `WorldCreatorPickable` | Runtime | Empty `MonoBehaviour` marker attached to pickable GameObjects. |
| `WorldCreatorAvatarPlaceholder` | Runtime | `MonoBehaviour` storing `avatarType`, `displayName`, and `modelRef` for NPC/player spawn placeholders. |

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
| **Coordinate system conversion** | Z positions are negated when importing into Unity's left-handed space. Rotation handedness conversion for non-trivial orientations is deferred to the VRChat adapter (M7). |
| **No nested parenting by `parent` ID** | The `parent` field on nodes is not part of the canonical format; only the `children` array defines hierarchy. |
| **No scene cleanup on re-import** | Re-importing a scene creates a second root GameObject. Manual deletion of the old root is required. |

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
