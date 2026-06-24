# World Creator — Unity Export Specification

## 1. Overview

This document specifies how the canonical JSON scene format (defined in `docs/CANONICAL_FORMAT.md`) is imported into Unity for World Creator. The chosen approach is a **Unity Editor script** that reads the canonical JSON and constructs GameObjects in the active scene. This keeps the export pipeline simple, deterministic, and fully under our control without requiring a custom Unity package or runtime loader.

The resulting Unity scene is the **foundation** for all downstream targets, including VRChat. VRChat-specific metadata (e.g., VRC Scene Descriptor, spawn points, occlusion culling) will be added later by a dedicated adapter layer.

---

## 2. Invocation

### Menu Item Path

```
World Creator -> Import Scene from JSON
```

> **TODO / FOR REVIEW:** Confirm the final menu item path and naming convention.

### Workflow

1. Open the target Unity project.
2. Select `World Creator -> Import Scene from JSON` from the menu bar.
3. A file dialog opens. Select the `.json` file exported from the World Creator editor.
4. The script parses the JSON, validates the version, and builds the scene under a single root GameObject named after the scene metadata.

### Expected JSON Path

The script accepts any absolute or relative file path. The recommended convention is to place exported scenes under:

```
Assets/WorldCreatorScenes/<scene-name>.json
```

> **TODO / FOR REVIEW:** Confirm the recommended folder name.

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

For every `PrefabAsset` in the JSON `assetLibrary`, the importer creates a `.prefab` file:

```
Assets/WorldCreatorScenes/<scene-name>/Prefabs/
  └── <PrefabName>.prefab
```

When a node contains a `prefabRef` component, the script instantiates the matching prefab using `PrefabUtility.InstantiatePrefab` (editor-time) or `Object.Instantiate` (if running at runtime). The importer applies any `transformOverride` or `componentOverrides` after instantiation.

### 3.4 Lights

`LightComponent` nodes map directly to Unity `Light` components:

| Canonical `lightType` | Unity Light Type |
|----------------------|------------------|
| `directional`        | `LightType.Directional` |
| `point`              | `LightType.Point` |
| `spot`               | `LightType.Spot` |

Additional mappings:

- `color` -> `Light.color` (parsed from hex)
- `intensity` -> `Light.intensity` (no unit conversion for PoC; documented as "abstract units")
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
- `isPickable` -> A custom `WorldCreatorPickable` MonoBehaviour is added, and the GameObject is tagged with `WorldCreatorPickable`. This marker is used by the editor and future VR interactions.

> **TODO / FOR REVIEW:** Decide whether the pickable marker is needed for the PoC, and whether it should be a tag, a component, or both.

Size overrides (`size`, `radius`, `height`) are applied directly. If omitted, the collider size is derived from the node's `transform.scale`.

### 3.6 NPC / Avatar Placeholder

`AvatarPlaceholderComponent` nodes create an **empty GameObject** with:

- A `WorldCreatorAvatarPlaceholder` MonoBehaviour attached.
- The component stores:
  - `avatarType` (`npc` or `player`)
  - `displayName`
  - `modelRef` (for future model binding)
  - `spawnPosition` and `spawnRotation` (defaulting to the node transform)

This is intentionally a placeholder. No AI behavior, animation, or actual avatar model is instantiated during the PoC phase.

---

## 4. Sample C# Editor Script

Below is a complete, self-contained Unity Editor script that imports the example JSON from `docs/CANONICAL_FORMAT.md`. Place it in `Assets/Editor/WorldCreatorSceneImporter.cs`.

> **TODO / FOR REVIEW:** This sample uses `JsonUtility`, which handles polymorphic arrays poorly. Consider switching to `Newtonsoft.Json` (included with Unity) for the real implementation.

```csharp
using System;
using System.Collections.Generic;
using System.IO;
using UnityEngine;
using UnityEditor;
using UnityEngine.Rendering;

namespace WorldCreator.Editor
{
    public static class WorldCreatorSceneImporter
    {
        [MenuItem("World Creator/Import Scene from JSON")]
        public static void ImportScene()
        {
            string path = EditorUtility.OpenFilePanel("Select World Creator Scene JSON", "Assets", "json");
            if (string.IsNullOrEmpty(path)) return;

            string json = File.ReadAllText(path);
            SceneFile scene = JsonUtility.FromJson<SceneFile>(json);

            if (scene == null || scene.version == null)
            {
                Debug.LogError("[World Creator] Failed to parse scene JSON.");
                return;
            }

            // Version check (PoC supports 1.x)
            if (!scene.version.StartsWith("1."))
            {
                Debug.LogError($"[World Creator] Unsupported scene version: {scene.version}");
                return;
            }

            // Create root
            GameObject root = new GameObject(scene.metadata.name);

            // Prepare asset folders
            string sceneFolder = $"Assets/WorldCreatorScenes/{scene.metadata.name}";
            string materialsFolder = $"{sceneFolder}/Materials";
            string prefabsFolder = $"{sceneFolder}/Prefabs";
            EnsureFolder(materialsFolder);
            EnsureFolder(prefabsFolder);

            // Build material cache
            Dictionary<string, Material> materialCache = new Dictionary<string, Material>();
            foreach (var matAsset in scene.assetLibrary.materials)
            {
                Material mat = new Material(Shader.Find("Standard"));
                mat.name = matAsset.name;

                if (!string.IsNullOrEmpty(matAsset.albedoColor))
                {
                    ColorUtility.TryParseHtmlString(matAsset.albedoColor, out Color col);
                    mat.SetColor("_Color", col);
                }

                if (matAsset.metallic.HasValue)
                    mat.SetFloat("_Metallic", matAsset.metallic.Value);

                if (matAsset.roughness.HasValue)
                    mat.SetFloat("_Smoothness", 1f - matAsset.roughness.Value);

                // Textures are skipped in PoC (no asset database resolution)

                string matPath = $"{materialsFolder}/{matAsset.name}.mat";
                AssetDatabase.CreateAsset(mat, matPath);
                materialCache[matAsset.id] = mat;
            }

            // Build prefab cache (skipped in PoC — no prefabs in example)
            Dictionary<string, GameObject> prefabCache = new Dictionary<string, GameObject>();

            // Process scene graph
            foreach (var node in scene.sceneGraph.root)
            {
                BuildNode(node, root.transform, materialCache, prefabsFolder);
            }

            Debug.Log($"[World Creator] Imported scene '{scene.metadata.name}' with {scene.sceneGraph.root.Length} root nodes.");
        }

        private static void BuildNode(Node node, Transform parent, Dictionary<string, Material> materialCache, string prefabsFolder)
        {
            GameObject go = new GameObject(node.name);
            go.transform.SetParent(parent, false);

            // Apply transform
            go.transform.localPosition = new Vector3(
                node.transform.position[0],
                node.transform.position[1],
                node.transform.position[2]
            );
            go.transform.localRotation = new Quaternion(
                node.transform.rotation[0],
                node.transform.rotation[1],
                node.transform.rotation[2],
                node.transform.rotation[3]
            );
            go.transform.localScale = new Vector3(
                node.transform.scale[0],
                node.transform.scale[1],
                node.transform.scale[2]
            );

            // Process components
            foreach (var comp in node.components)
            {
                switch (comp.type)
                {
                    case "mesh":
                        AddMeshComponent(go, comp, materialCache);
                        break;
                    case "light":
                        AddLightComponent(go, comp);
                        break;
                    case "collider":
                        AddColliderComponent(go, comp);
                        break;
                    case "prefabRef":
                        // PoC: instantiate placeholder cube
                        Debug.LogWarning($"[World Creator] Prefab references not yet supported. Creating placeholder for '{node.name}'.");
                        GameObject placeholder = GameObject.CreatePrimitive(PrimitiveType.Cube);
                        placeholder.name = $"{node.name}_PrefabPlaceholder";
                        placeholder.transform.SetParent(go.transform, false);
                        DestroyImmediate(placeholder.GetComponent<Collider>());
                        break;
                    case "avatar":
                        go.AddComponent<WorldCreatorAvatarPlaceholder>().Initialize(comp);
                        break;
                    default:
                        Debug.LogWarning($"[World Creator] Unknown component type '{comp.type}' on node '{node.name}'. Skipped.");
                        break;
                }
            }

            // Recurse into children
            if (node.children != null)
            {
                foreach (var child in node.children)
                {
                    BuildNode(child, go.transform, materialCache, prefabsFolder);
                }
            }
        }

        private static void AddMeshComponent(GameObject go, ComponentData comp, Dictionary<string, Material> materialCache)
        {
            // PoC: only builtin primitives are supported
            MeshFilter filter = go.AddComponent<MeshFilter>();
            MeshRenderer renderer = go.AddComponent<MeshRenderer>();

            string meshRef = comp.meshRef;
            if (meshRef == "mesh_plane" || meshRef.EndsWith(":plane"))
                filter.sharedMesh = Resources.GetBuiltinResource<Mesh>("New-Plane.fbx");
            else if (meshRef == "mesh_cube" || meshRef.EndsWith(":cube"))
                filter.sharedMesh = Resources.GetBuiltinResource<Mesh>("Cube.fbx");
            else
                Debug.LogWarning($"[World Creator] Mesh '{meshRef}' not resolved. Using Cube fallback.");

            if (filter.sharedMesh == null)
                filter.sharedMesh = Resources.GetBuiltinResource<Mesh>("Cube.fbx");

            if (!string.IsNullOrEmpty(comp.materialRef) && materialCache.ContainsKey(comp.materialRef))
            {
                renderer.sharedMaterial = materialCache[comp.materialRef];
            }

            renderer.shadowCastingMode = comp.castShadows ? ShadowCastingMode.On : ShadowCastingMode.Off;
            renderer.receiveShadows = comp.receiveShadows;
        }

        private static void AddLightComponent(GameObject go, ComponentData comp)
        {
            Light light = go.AddComponent<Light>();

            switch (comp.lightType)
            {
                case "directional": light.type = LightType.Directional; break;
                case "point": light.type = LightType.Point; break;
                case "spot": light.type = LightType.Spot; break;
            }

            if (!string.IsNullOrEmpty(comp.color))
            {
                ColorUtility.TryParseHtmlString(comp.color, out Color col);
                light.color = col;
            }

            light.intensity = comp.intensity;

            if (comp.range.HasValue)
                light.range = comp.range.Value;

            if (comp.angle.HasValue && light.type == LightType.Spot)
                light.spotAngle = comp.angle.Value;

            light.shadows = comp.castShadows ? LightShadows.Soft : LightShadows.None;
        }

        private static void AddColliderComponent(GameObject go, ComponentData comp)
        {
            Collider col = null;
            switch (comp.shape)
            {
                case "box":
                    BoxCollider box = go.AddComponent<BoxCollider>();
                    if (comp.size != null)
                        box.size = new Vector3(comp.size[0], comp.size[1], comp.size[2]);
                    col = box;
                    break;
                case "sphere":
                    SphereCollider sphere = go.AddComponent<SphereCollider>();
                    if (comp.radius.HasValue)
                        sphere.radius = comp.radius.Value;
                    col = sphere;
                    break;
                case "capsule":
                    CapsuleCollider capsule = go.AddComponent<CapsuleCollider>();
                    if (comp.radius.HasValue)
                        capsule.radius = comp.radius.Value;
                    if (comp.height.HasValue)
                        capsule.height = comp.height.Value;
                    col = capsule;
                    break;
                case "mesh":
                    col = go.AddComponent<MeshCollider>();
                    break;
            }

            if (col != null)
            {
                col.isTrigger = comp.isTrigger;
            }

            if (comp.isPickable)
            {
                go.AddComponent<WorldCreatorPickable>();
                go.tag = "WorldCreatorPickable";
            }
        }

        private static void EnsureFolder(string path)
        {
            if (!AssetDatabase.IsValidFolder(path))
            {
                string parent = Path.GetDirectoryName(path).Replace('\\', '/');
                string folder = Path.GetFileName(path);
                AssetDatabase.CreateFolder(parent, folder);
            }
        }
    }

    // --- Data Models for JsonUtility ---

    [Serializable]
    public class SceneFile
    {
        public string version;
        public Metadata metadata;
        public AssetLibrary assetLibrary;
        public SceneGraph sceneGraph;
    }

    [Serializable]
    public class Metadata
    {
        public string name;
        public string description;
        public string author;
        public string createdAt;
        public string modifiedAt;
        public float unitScale;
        public string upAxis;
    }

    [Serializable]
    public class AssetLibrary
    {
        public MeshAsset[] meshes;
        public MaterialAsset[] materials;
        public TextureAsset[] textures;
        public PrefabAsset[] prefabs;
    }

    [Serializable]
    public class MeshAsset
    {
        public string id;
        public string type;
        public string name;
        public string source;
        public bool generateColliders;
        public float importScale;
    }

    [Serializable]
    public class MaterialAsset
    {
        public string id;
        public string type;
        public string name;
        public string albedoColor;
        public string albedoTexture;
        public float? metallic;
        public float? roughness;
        public string normalTexture;
    }

    [Serializable]
    public class TextureAsset
    {
        public string id;
        public string type;
        public string name;
        public string source;
    }

    [Serializable]
    public class PrefabAsset
    {
        public string id;
        public string type;
        public string name;
        public Node rootNode;
    }

    [Serializable]
    public class SceneGraph
    {
        public Node[] root;
    }

    [Serializable]
    public class Node
    {
        public string id;
        public string name;
        public string parent;
        public TransformData transform;
        public ComponentData[] components;
        public Node[] children;
    }

    [Serializable]
    public class TransformData
    {
        public float[] position;
        public float[] rotation;
        public float[] scale;
    }

    [Serializable]
    public class ComponentData
    {
        public string type;
        public string meshRef;
        public string materialRef;
        public bool castShadows;
        public bool receiveShadows;
        public string lightType;
        public string color;
        public float intensity;
        public float? range;
        public float? angle;
        public string shape;
        public bool isTrigger;
        public bool isPickable;
        public float[] size;
        public float? radius;
        public float? height;
        public string prefabRef;
        public string avatarType;
        public string modelRef;
        public string displayName;
    }

    // --- Custom MonoBehaviours ---

    public class WorldCreatorPickable : MonoBehaviour { }

    public class WorldCreatorAvatarPlaceholder : MonoBehaviour
    {
        public string avatarType;
        public string displayName;
        public string modelRef;

        public void Initialize(ComponentData data)
        {
            avatarType = data.avatarType;
            displayName = data.displayName;
            modelRef = data.modelRef;
        }
    }
}
```

---

## 5. Limitations and Assumptions (PoC)

The following limitations apply to the Proof-of-Concept importer. They are intentional scope boundaries, not bugs.

| Limitation | Rationale |
|-----------|-----------|
| **No lightmap baking** | The PoC uses real-time lighting only. Baked lighting requires a secondary UV channel and a bake step that is out of scope. |
| **No custom shaders** | All materials use Unity's built-in `Standard` shader. Custom shader graphs or SRP shaders are not supported. |
| **No animations** | The canonical format does not define animation clips, states, or controllers. Animated objects are treated as static meshes. |
| **No texture import** | Texture assets are parsed but not imported into the Unity AssetDatabase. Only albedo color and scalar material properties are applied. |
| **Builtin meshes only** | External mesh files (`.obj`, `.fbx`, `.gltf`) are not resolved. Only `builtin:plane` and `builtin:cube` are mapped to Unity primitives. |
| **No prefab instantiation** | `prefabRef` components create a placeholder cube instead of a real prefab. Prefab assets in the JSON are ignored. |
| **No coordinate system conversion** | The importer assumes Y-up, right-handed data and maps it directly into Unity's Y-up, left-handed space. For the PoC primitives, this is sufficient. |
| **No nested parenting by `parent` ID** | The `parent` field on nodes is ignored; only the `children` array defines hierarchy. |
| **No scene cleanup on re-import** | Re-importing a scene creates a second root GameObject. Manual deletion of the old root is required. |

---

## 6. Path to VRChat

The Unity scene produced by this importer is the **foundational layer** for all export targets. To make it VRChat-ready, a future adapter will:

1. Add a `VRC_SceneDescriptor` component to the root.
2. Configure spawn points from `AvatarPlaceholderComponent` nodes with `avatarType: "player"`.
3. Set up collision layers and occlusion culling.
4. Replace `WorldCreatorPickable` markers with VRChat's `VRC_Pickup` or `VRC_ObjectSync` components.
5. Bake lightmaps and reflection probes if the user opts into static lighting.
6. Resolve external avatar models and animation controllers.

This separation of concerns keeps the canonical format engine-agnostic and allows the Unity importer to evolve independently of VRChat-specific requirements.

---

*End of Document*
