import type { SceneFile } from "../scene/types.ts";

/**
 * Generates a complete Unity package as a map of relative file paths to file
 * content strings. The package lives under `WorldCreatorUnityPackage/` and
 * provides an Editor menu item that imports canonical JSON scene files into
 * a Unity project.
 */
export function generateUnityPackage(_scene: SceneFile): Record<string, string> {
  const files: Record<string, string> = {};

  // ── package.json ──────────────────────────────────────────────────────
  files["WorldCreatorUnityPackage/package.json"] = JSON.stringify(
    {
      name: "com.worldcreator.importer",
      version: "0.1.0",
      displayName: "World Creator Scene Importer",
      description:
        "Imports World Creator canonical JSON scenes into Unity.",
      unity: "2022.3",
      dependencies: {
        "com.unity.nuget.newtonsoft-json": "3.2.1",
      },
    },
    null,
    2,
  );

  // ── Editor assembly definition ────────────────────────────────────────
  files["WorldCreatorUnityPackage/Editor/WorldCreatorUnityPackage.Editor.asmdef"] =
    JSON.stringify(
      {
        name: "WorldCreatorUnityPackage.Editor",
        rootNamespace: "WorldCreator.Editor",
        references: ["WorldCreatorUnityPackage.Runtime"],
        includePlatforms: ["Editor"],
        excludePlatforms: [],
        allowUnsafeCode: false,
        overrideReferences: true,
        precompiledReferences: ["Newtonsoft.Json.dll"],
        autoReferenced: false,
        defineConstraints: [],
        versionDefines: [],
        noEngineReferences: false,
      },
      null,
      2,
    );

  // ── Runtime assembly definition ───────────────────────────────────────
  files["WorldCreatorUnityPackage/Runtime/WorldCreatorUnityPackage.Runtime.asmdef"] =
    JSON.stringify(
      {
        name: "WorldCreatorUnityPackage.Runtime",
        rootNamespace: "WorldCreator.Runtime",
        references: [],
        includePlatforms: [],
        excludePlatforms: [],
        allowUnsafeCode: false,
        overrideReferences: false,
        precompiledReferences: [],
        autoReferenced: true,
        defineConstraints: [],
        versionDefines: [],
        noEngineReferences: false,
      },
      null,
      2,
    );

  // ── C# source files ──────────────────────────────────────────────────
  files["WorldCreatorUnityPackage/Editor/DataModels.cs"] = generateDataModels();
  files["WorldCreatorUnityPackage/Editor/WorldCreatorSceneImporter.cs"] =
    generateSceneImporter();
  files["WorldCreatorUnityPackage/Editor/MaterialBuilder.cs"] =
    generateMaterialBuilder();
  files["WorldCreatorUnityPackage/Editor/PrefabBuilder.cs"] =
    generatePrefabBuilder();
  files["WorldCreatorUnityPackage/Editor/ComponentMappers.cs"] =
    generateComponentMappers();
  files["WorldCreatorUnityPackage/Runtime/WorldCreatorPickable.cs"] =
    generatePickable();
  files["WorldCreatorUnityPackage/Runtime/WorldCreatorAvatarPlaceholder.cs"] =
    generateAvatarPlaceholder();

  return files;
}

// ─────────────────────────────────────────────────────────────────────────────
// C# generators
// ─────────────────────────────────────────────────────────────────────────────

function generateDataModels(): string {
  return `using System;
using Newtonsoft.Json;

namespace WorldCreator.Editor
{
    [Serializable]
    public class SceneFileData
    {
        [JsonProperty("version")]
        public string Version;

        [JsonProperty("metadata")]
        public MetadataData Metadata;

        [JsonProperty("assetLibrary")]
        public AssetLibraryData AssetLibrary;

        [JsonProperty("sceneGraph")]
        public SceneGraphData SceneGraph;
    }

    [Serializable]
    public class MetadataData
    {
        [JsonProperty("name")]
        public string Name;

        [JsonProperty("description")]
        public string Description;

        [JsonProperty("author")]
        public string Author;

        [JsonProperty("createdAt")]
        public string CreatedAt;

        [JsonProperty("modifiedAt")]
        public string ModifiedAt;

        [JsonProperty("unitScale")]
        public float? UnitScale;

        [JsonProperty("upAxis")]
        public string UpAxis;
    }

    [Serializable]
    public class AssetLibraryData
    {
        [JsonProperty("meshes")]
        public MeshAssetData[] Meshes;

        [JsonProperty("materials")]
        public MaterialAssetData[] Materials;

        [JsonProperty("textures")]
        public TextureAssetData[] Textures;

        [JsonProperty("prefabs")]
        public PrefabAssetData[] Prefabs;
    }

    [Serializable]
    public class MeshAssetData
    {
        [JsonProperty("id")]
        public string Id;

        [JsonProperty("type")]
        public string Type;

        [JsonProperty("name")]
        public string Name;

        [JsonProperty("source")]
        public string Source;

        [JsonProperty("generateColliders")]
        public bool? GenerateColliders;

        [JsonProperty("importScale")]
        public float? ImportScale;
    }

    [Serializable]
    public class MaterialAssetData
    {
        [JsonProperty("id")]
        public string Id;

        [JsonProperty("type")]
        public string Type;

        [JsonProperty("name")]
        public string Name;

        [JsonProperty("albedoColor")]
        public string AlbedoColor;

        [JsonProperty("albedoTexture")]
        public string AlbedoTexture;

        [JsonProperty("metallic")]
        public float? Metallic;

        [JsonProperty("roughness")]
        public float? Roughness;

        [JsonProperty("normalTexture")]
        public string NormalTexture;
    }

    [Serializable]
    public class TextureAssetData
    {
        [JsonProperty("id")]
        public string Id;

        [JsonProperty("type")]
        public string Type;

        [JsonProperty("name")]
        public string Name;

        [JsonProperty("source")]
        public string Source;
    }

    [Serializable]
    public class PrefabAssetData
    {
        [JsonProperty("id")]
        public string Id;

        [JsonProperty("type")]
        public string Type;

        [JsonProperty("name")]
        public string Name;

        [JsonProperty("rootNode")]
        public NodeData RootNode;
    }

    [Serializable]
    public class SceneGraphData
    {
        [JsonProperty("root")]
        public NodeData Root;
    }

    [Serializable]
    public class NodeData
    {
        [JsonProperty("id")]
        public string Id;

        [JsonProperty("name")]
        public string Name;

        [JsonProperty("transform")]
        public TransformData Transform;

        [JsonProperty("components")]
        public ComponentData[] Components;

        [JsonProperty("children")]
        public NodeData[] Children;
    }

    [Serializable]
    public class TransformData
    {
        [JsonProperty("position")]
        public float[] Position;

        [JsonProperty("rotation")]
        public float[] Rotation;

        [JsonProperty("scale")]
        public float[] Scale;
    }

    [Serializable]
    public class ComponentData
    {
        [JsonProperty("type")]
        public string Type;

        [JsonProperty("meshRef")]
        public string MeshRef;

        [JsonProperty("materialRef")]
        public string MaterialRef;

        [JsonProperty("castShadows")]
        public bool? CastShadows;

        [JsonProperty("receiveShadows")]
        public bool? ReceiveShadows;

        [JsonProperty("lightType")]
        public string LightType;

        [JsonProperty("color")]
        public string Color;

        [JsonProperty("intensity")]
        public float? Intensity;

        [JsonProperty("range")]
        public float? Range;

        [JsonProperty("angle")]
        public float? Angle;

        [JsonProperty("shape")]
        public string Shape;

        [JsonProperty("isTrigger")]
        public bool? IsTrigger;

        [JsonProperty("isPickable")]
        public bool? IsPickable;

        [JsonProperty("size")]
        public float[] Size;

        [JsonProperty("radius")]
        public float? Radius;

        [JsonProperty("height")]
        public float? Height;

        [JsonProperty("prefabRef")]
        public string PrefabRef;

        [JsonProperty("avatarType")]
        public string AvatarType;

        [JsonProperty("modelRef")]
        public string ModelRef;

        [JsonProperty("displayName")]
        public string DisplayName;

        [JsonProperty("spawnPosition")]
        public float[] SpawnPosition;

        [JsonProperty("spawnRotation")]
        public float[] SpawnRotation;
    }
}
`;
}

function generateSceneImporter(): string {
  return `using System.Collections.Generic;
using System.IO;
using UnityEditor;
using UnityEngine;
using Newtonsoft.Json;

namespace WorldCreator.Editor
{
    public static class WorldCreatorSceneImporter
    {
        [MenuItem("World Creator/Import Scene from JSON")]
        public static void ImportScene()
        {
            string path = EditorUtility.OpenFilePanel("Select Scene JSON", "", "json");
            if (string.IsNullOrEmpty(path))
                return;

            string json = File.ReadAllText(path);
            SceneFileData sceneFile = JsonConvert.DeserializeObject<SceneFileData>(json);

            if (sceneFile == null)
            {
                Debug.LogError("Failed to deserialize scene JSON.");
                return;
            }

            if (sceneFile.Version == null || !sceneFile.Version.StartsWith("1."))
            {
                Debug.LogError($"Unsupported scene version: {sceneFile.Version}. Expected version starting with \\"1.\\"");
                return;
            }

            string sceneName = sceneFile.Metadata != null && !string.IsNullOrEmpty(sceneFile.Metadata.Name)
                ? sceneFile.Metadata.Name
                : "UntitledScene";

            string baseFolder = $"Assets/WorldCreatorScenes/{sceneName}";
            EnsureFolder(baseFolder);

            string materialsFolder = $"{baseFolder}/Materials";
            EnsureFolder(materialsFolder);

            string prefabsFolder = $"{baseFolder}/Prefabs";
            EnsureFolder(prefabsFolder);

            // Build materials
            Dictionary<string, Material> materialCache = new Dictionary<string, Material>();
            if (sceneFile.AssetLibrary?.Materials != null)
            {
                materialCache = MaterialBuilder.BuildAll(sceneFile.AssetLibrary.Materials, materialsFolder);
            }

            // Build prefabs
            Dictionary<string, GameObject> prefabCache = new Dictionary<string, GameObject>();
            if (sceneFile.AssetLibrary?.Prefabs != null)
            {
                prefabCache = PrefabBuilder.BuildAll(sceneFile.AssetLibrary.Prefabs, prefabsFolder, materialCache);
            }

            // Build scene graph
            GameObject sceneRoot = new GameObject(sceneName);

            if (sceneFile.SceneGraph?.Root?.Children != null)
            {
                foreach (NodeData child in sceneFile.SceneGraph.Root.Children)
                {
                    ComponentMappers.BuildNode(child, sceneRoot.transform, materialCache, prefabCache);
                }
            }

            AssetDatabase.SaveAssets();
            AssetDatabase.Refresh();

            Debug.Log($"World Creator scene \\"{sceneName}\\" imported successfully.");
        }

        public static void EnsureFolder(string path)
        {
            if (AssetDatabase.IsValidFolder(path))
                return;

            string[] segments = path.Split('/');
            string current = segments[0]; // "Assets"

            for (int i = 1; i < segments.Length; i++)
            {
                string next = current + "/" + segments[i];
                if (!AssetDatabase.IsValidFolder(next))
                {
                    AssetDatabase.CreateFolder(current, segments[i]);
                }
                current = next;
            }
        }
    }
}
`;
}

function generateMaterialBuilder(): string {
  return `using System.Collections.Generic;
using UnityEditor;
using UnityEngine;

namespace WorldCreator.Editor
{
    public static class MaterialBuilder
    {
        public static Dictionary<string, Material> BuildAll(MaterialAssetData[] materials, string folder)
        {
            Dictionary<string, Material> cache = new Dictionary<string, Material>();

            if (materials == null)
                return cache;

            foreach (MaterialAssetData matData in materials)
            {
                Material mat = new Material(Shader.Find("Standard"));

                if (!string.IsNullOrEmpty(matData.AlbedoColor))
                {
                    Color color;
                    if (ColorUtility.TryParseHtmlString(matData.AlbedoColor, out color))
                    {
                        mat.SetColor("_Color", color);
                    }
                }

                if (matData.Metallic.HasValue)
                {
                    mat.SetFloat("_Metallic", matData.Metallic.Value);
                }

                if (matData.Roughness.HasValue)
                {
                    mat.SetFloat("_Smoothness", 1f - matData.Roughness.Value);
                }

                string safeName = string.IsNullOrEmpty(matData.Name) ? matData.Id : matData.Name;
                string assetPath = $"{folder}/{safeName}.mat";
                AssetDatabase.CreateAsset(mat, assetPath);

                cache[matData.Id] = mat;
            }

            return cache;
        }
    }
}
`;
}

function generatePrefabBuilder(): string {
  return `using System.Collections.Generic;
using UnityEditor;
using UnityEngine;

namespace WorldCreator.Editor
{
    public static class PrefabBuilder
    {
        public static Dictionary<string, GameObject> BuildAll(
            PrefabAssetData[] prefabs,
            string folder,
            Dictionary<string, Material> materialCache)
        {
            Dictionary<string, GameObject> cache = new Dictionary<string, GameObject>();

            if (prefabs == null)
                return cache;

            foreach (PrefabAssetData prefabData in prefabs)
            {
                string safeName = string.IsNullOrEmpty(prefabData.Name) ? prefabData.Id : prefabData.Name;
                GameObject tempRoot = new GameObject(safeName);

                if (prefabData.RootNode?.Children != null)
                {
                    foreach (NodeData child in prefabData.RootNode.Children)
                    {
                        ComponentMappers.BuildNode(child, tempRoot.transform, materialCache, cache);
                    }
                }

                string assetPath = $"{folder}/{safeName}.prefab";
                GameObject savedPrefab = PrefabUtility.SaveAsPrefabAsset(tempRoot, assetPath);

                Object.DestroyImmediate(tempRoot);

                cache[prefabData.Id] = savedPrefab;
            }

            return cache;
        }
    }
}
`;
}

function generateComponentMappers(): string {
  return `using System.Collections.Generic;
using UnityEditor;
using UnityEngine;
using WorldCreator.Runtime;

namespace WorldCreator.Editor
{
    public static class ComponentMappers
    {
        public static void BuildNode(
            NodeData node,
            Transform parent,
            Dictionary<string, Material> materialCache,
            Dictionary<string, GameObject> prefabCache)
        {
            if (node == null)
                return;

            GameObject go = new GameObject(node.Name ?? "Node");
            go.transform.SetParent(parent, false);

            // Apply transform — negate Z position for coordinate system conversion
            if (node.Transform != null)
            {
                if (node.Transform.Position != null && node.Transform.Position.Length >= 3)
                {
                    go.transform.localPosition = new Vector3(
                        node.Transform.Position[0],
                        node.Transform.Position[1],
                        -node.Transform.Position[2]
                    );
                }

                if (node.Transform.Rotation != null && node.Transform.Rotation.Length >= 4)
                {
                    go.transform.localRotation = new Quaternion(
                        node.Transform.Rotation[0],
                        node.Transform.Rotation[1],
                        node.Transform.Rotation[2],
                        node.Transform.Rotation[3]
                    );
                }

                if (node.Transform.Scale != null && node.Transform.Scale.Length >= 3)
                {
                    go.transform.localScale = new Vector3(
                        node.Transform.Scale[0],
                        node.Transform.Scale[1],
                        node.Transform.Scale[2]
                    );
                }
            }

            // Dispatch components
            if (node.Components != null)
            {
                foreach (ComponentData comp in node.Components)
                {
                    if (comp == null || string.IsNullOrEmpty(comp.Type))
                        continue;

                    switch (comp.Type)
                    {
                        case "mesh":
                            MapMesh(go, comp, materialCache);
                            break;
                        case "light":
                            MapLight(go, comp);
                            break;
                        case "collider":
                            MapCollider(go, comp);
                            break;
                        case "prefabRef":
                            MapPrefabRef(go, comp, prefabCache);
                            break;
                        case "avatar":
                            MapAvatar(go, comp);
                            break;
                    }
                }
            }

            // Recurse into children
            if (node.Children != null)
            {
                foreach (NodeData child in node.Children)
                {
                    BuildNode(child, go.transform, materialCache, prefabCache);
                }
            }
        }

        public static void MapMesh(
            GameObject go,
            ComponentData comp,
            Dictionary<string, Material> materialCache)
        {
            MeshFilter filter = go.AddComponent<MeshFilter>();
            MeshRenderer renderer = go.AddComponent<MeshRenderer>();

            // Resolve builtin meshes
            Mesh mesh = null;
            string meshRef = comp.MeshRef ?? "";

            if (meshRef == "mesh_plane" || meshRef.Contains("builtin:plane"))
            {
                mesh = Resources.GetBuiltinResource<Mesh>("New-Plane.fbx");
            }
            else if (meshRef == "mesh_cube" || meshRef.Contains("builtin:cube"))
            {
                mesh = Resources.GetBuiltinResource<Mesh>("Cube.fbx");
            }
            else if (meshRef == "mesh_sphere" || meshRef.Contains("builtin:sphere"))
            {
                mesh = Resources.GetBuiltinResource<Mesh>("New-Sphere.fbx");
            }
            else if (meshRef == "mesh_cylinder" || meshRef.Contains("builtin:cylinder"))
            {
                mesh = Resources.GetBuiltinResource<Mesh>("New-Cylinder.fbx");
            }

            if (mesh != null)
            {
                filter.sharedMesh = mesh;
            }

            // Assign material
            if (!string.IsNullOrEmpty(comp.MaterialRef) && materialCache.ContainsKey(comp.MaterialRef))
            {
                renderer.sharedMaterial = materialCache[comp.MaterialRef];
            }

            // Shadow flags
            if (comp.CastShadows.HasValue)
            {
                renderer.shadowCastingMode = comp.CastShadows.Value
                    ? UnityEngine.Rendering.ShadowCastingMode.On
                    : UnityEngine.Rendering.ShadowCastingMode.Off;
            }

            if (comp.ReceiveShadows.HasValue)
            {
                renderer.receiveShadows = comp.ReceiveShadows.Value;
            }
        }

        public static void MapLight(GameObject go, ComponentData comp)
        {
            Light light = go.AddComponent<Light>();

            switch (comp.LightType)
            {
                case "directional":
                    light.type = LightType.Directional;
                    break;
                case "point":
                    light.type = LightType.Point;
                    break;
                case "spot":
                    light.type = LightType.Spot;
                    break;
            }

            if (!string.IsNullOrEmpty(comp.Color))
            {
                Color color;
                if (ColorUtility.TryParseHtmlString(comp.Color, out color))
                {
                    light.color = color;
                }
            }

            if (comp.Intensity.HasValue)
            {
                light.intensity = comp.Intensity.Value;
            }

            if (comp.Range.HasValue)
            {
                light.range = comp.Range.Value;
            }

            if (comp.Angle.HasValue)
            {
                light.spotAngle = comp.Angle.Value;
            }

            if (comp.CastShadows.HasValue)
            {
                light.shadows = comp.CastShadows.Value
                    ? LightShadows.Soft
                    : LightShadows.None;
            }
        }

        public static void MapCollider(GameObject go, ComponentData comp)
        {
            string shape = comp.Shape ?? "box";

            switch (shape)
            {
                case "box":
                {
                    BoxCollider col = go.AddComponent<BoxCollider>();
                    if (comp.Size != null && comp.Size.Length >= 3)
                    {
                        col.size = new Vector3(comp.Size[0], comp.Size[1], comp.Size[2]);
                    }
                    if (comp.IsTrigger.HasValue)
                    {
                        col.isTrigger = comp.IsTrigger.Value;
                    }
                    break;
                }
                case "sphere":
                {
                    SphereCollider col = go.AddComponent<SphereCollider>();
                    if (comp.Radius.HasValue)
                    {
                        col.radius = comp.Radius.Value;
                    }
                    if (comp.IsTrigger.HasValue)
                    {
                        col.isTrigger = comp.IsTrigger.Value;
                    }
                    break;
                }
                case "capsule":
                {
                    CapsuleCollider col = go.AddComponent<CapsuleCollider>();
                    if (comp.Radius.HasValue)
                    {
                        col.radius = comp.Radius.Value;
                    }
                    if (comp.Height.HasValue)
                    {
                        col.height = comp.Height.Value;
                    }
                    if (comp.IsTrigger.HasValue)
                    {
                        col.isTrigger = comp.IsTrigger.Value;
                    }
                    break;
                }
                case "mesh":
                {
                    MeshCollider col = go.AddComponent<MeshCollider>();
                    if (comp.IsTrigger.HasValue)
                    {
                        col.convex = true;
                        col.isTrigger = comp.IsTrigger.Value;
                    }
                    break;
                }
            }

            if (comp.IsPickable.HasValue && comp.IsPickable.Value)
            {
                go.AddComponent<WorldCreatorPickable>();
            }
        }

        public static void MapPrefabRef(
            GameObject go,
            ComponentData comp,
            Dictionary<string, GameObject> prefabCache)
        {
            if (string.IsNullOrEmpty(comp.PrefabRef) || !prefabCache.ContainsKey(comp.PrefabRef))
                return;

            GameObject prefab = prefabCache[comp.PrefabRef];
            GameObject instance = (GameObject)PrefabUtility.InstantiatePrefab(prefab);
            if (instance != null)
            {
                instance.transform.SetParent(go.transform, false);
            }
        }

        public static void MapAvatar(GameObject go, ComponentData comp)
        {
            WorldCreatorAvatarPlaceholder avatar = go.AddComponent<WorldCreatorAvatarPlaceholder>();

            avatar.avatarType = comp.AvatarType ?? "";
            avatar.displayName = comp.DisplayName ?? "";
            avatar.modelRef = comp.ModelRef ?? "";

            if (comp.SpawnPosition != null && comp.SpawnPosition.Length >= 3)
            {
                avatar.spawnPosition = new Vector3(
                    comp.SpawnPosition[0],
                    comp.SpawnPosition[1],
                    comp.SpawnPosition[2]
                );
            }
            else
            {
                avatar.spawnPosition = go.transform.position;
            }

            if (comp.SpawnRotation != null && comp.SpawnRotation.Length >= 4)
            {
                avatar.spawnRotation = new Quaternion(
                    comp.SpawnRotation[0],
                    comp.SpawnRotation[1],
                    comp.SpawnRotation[2],
                    comp.SpawnRotation[3]
                );
            }
            else
            {
                avatar.spawnRotation = go.transform.rotation;
            }
        }
    }
}
`;
}

function generatePickable(): string {
  return `using UnityEngine;

namespace WorldCreator.Runtime
{
    /// <summary>
    /// Marker component indicating this object is pickable in a World Creator scene.
    /// </summary>
    public class WorldCreatorPickable : MonoBehaviour
    {
    }
}
`;
}

function generateAvatarPlaceholder(): string {
  return `using UnityEngine;

namespace WorldCreator.Runtime
{
    /// <summary>
    /// Placeholder component for avatar spawn points in a World Creator scene.
    /// </summary>
    public class WorldCreatorAvatarPlaceholder : MonoBehaviour
    {
        public string avatarType;
        public string displayName;
        public string modelRef;
        public Vector3 spawnPosition;
        public Quaternion spawnRotation;
    }
}
`;
}
