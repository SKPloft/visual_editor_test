# CANONICAL_FORMAT.md

## Editor-Agnostic JSON Scene Graph Format

### 1. Design Goals

- **Engine-neutral**: The format does not contain engine-specific data types, shader graphs, or scripting logic. It describes the scene in abstract terms that can be translated into Unity, Unreal, Godot, or custom engines.
- **Human-readable**: JSON is chosen for its ubiquity and ease of debugging. The structure is flat enough to be readable without heavy nesting, but rich enough to represent a full 3D scene.
- **Versioned**: Every file declares its format version, allowing parsers to evolve gracefully and reject or migrate outdated files.
- **Extensible**: Custom components and asset types can be added without breaking the core schema. Unknown fields are preserved and ignored by strict parsers.

### 2. Top-Level Structure

```typescript
interface SceneFile {
  version: string;        // Format version, e.g. "1.0.0"
  metadata: Metadata;
  assetLibrary: AssetLibrary;
  sceneGraph: SceneGraph;
}
```

#### 2.1 Metadata

```typescript
interface Metadata {
  name: string;
  description?: string;
  author?: string;
  createdAt: string;      // ISO 8601 timestamp
  modifiedAt: string;       // ISO 8601 timestamp
  unitScale?: number;     // Meters per unit. Default: 1.0 (1 unit = 1 meter)
  upAxis?: "Y" | "Z";     // Default: "Y"
}
```

#### 2.2 Asset Library

The asset library holds all reusable data: meshes, materials, textures, and prefabs. Nodes in the scene graph reference these by ID.

```typescript
interface AssetLibrary {
  meshes: MeshAsset[];
  materials: MaterialAsset[];
  textures: TextureAsset[];
  prefabs: PrefabAsset[];
}
```

##### Mesh Asset

```typescript
interface MeshAsset {
  id: string;
  type: "mesh";
  name: string;
  source: string;         // Path or URI to the mesh file (e.g. ".obj", ".fbx", ".gltf")
  // Optional engine hints
  generateColliders?: boolean;
  importScale?: number;
}
```

##### Material Asset

```typescript
interface MaterialAsset {
  id: string;
  type: "material";
  name: string;
  albedoColor?: string;     // Hex color, e.g. "#FFFFFF"
  albedoTexture?: string;   // Reference to TextureAsset.id
  metallic?: number;        // 0.0 - 1.0
  roughness?: number;       // 0.0 - 1.0
  normalTexture?: string;   // Reference to TextureAsset.id
  // Extensible: engines may ignore unknown fields
  [key: string]: any;
}
```

##### Texture Asset

```typescript
interface TextureAsset {
  id: string;
  type: "texture";
  name: string;
  source: string;           // Path or URI to the image file
}
```

##### Prefab Asset

```typescript
interface PrefabAsset {
  id: string;
  type: "prefab";
  name: string;
  rootNode: Node;           // A complete sub-scene graph
}
```

#### 2.3 Scene Graph

The scene graph is a tree of nodes. Each node has a unique ID, a name, a local transform, and a list of components.

> **TODO / FOR REVIEW:** Decide whether to keep `parent` references only, `children` arrays only, or both. Having both is redundant and can lead to inconsistent state.

```typescript
interface SceneGraph {
  root: Node[];             // The scene may have multiple top-level nodes
}

interface Node {
  id: string;
  name: string;
  parent?: string;          // ID of parent node. If omitted, node is at root level
  transform: Transform;
  components: Component[];
  children?: Node[];        // Optional inline children for convenience
}

#### Transform Representation

> **TODO / FOR REVIEW:** The canonical format stores rotation as a quaternion for engine neutrality. The editor UI will likely expose Euler angles for usability, converting to/from quaternion on save/load. Confirm the desired convention (e.g., intrinsic/extrinsic order, degree/radian display).
```

### 3. Node Components

Components are the data-bearing elements attached to nodes. A node may have zero or more components.

```typescript
type Component =
  | TransformComponent
  | MeshComponent
  | LightComponent
  | ColliderComponent
  | PrefabReferenceComponent
  | AvatarPlaceholderComponent
  | CustomComponent;
```

#### 3.1 Transform Component

The `transform` field on the node itself is mandatory and represents the local transform. It is not a separate component in the `components` array, but is documented here for clarity.

```typescript
interface Transform {
  position: Vector3;        // [x, y, z]
  rotation: Quaternion;     // [x, y, z, w]
  scale: Vector3;           // [x, y, z]
}

type Vector3 = [number, number, number];
type Quaternion = [number, number, number, number];
```

#### 3.2 Mesh Component

```typescript
interface MeshComponent {
  type: "mesh";
  meshRef: string;          // Reference to MeshAsset.id
  materialRef?: string;     // Reference to MaterialAsset.id
  castShadows?: boolean;
  receiveShadows?: boolean;
}
```

#### 3.3 Light Component

```typescript
interface LightComponent {
  type: "light";
  lightType: "directional" | "point" | "spot";
  color: string;            // Hex color, e.g. "#FFFFFF"
  intensity: number;        // Candela or lux, depending on lightType
  range?: number;           // Meters. Relevant for point and spot
  angle?: number;           // Degrees. Relevant for spot only
  castShadows?: boolean;
}
```

#### 3.4 Collider / Pickable Component

```typescript
interface ColliderComponent {
  type: "collider";
  shape: "box" | "sphere" | "capsule" | "mesh";
  isTrigger?: boolean;
  isPickable?: boolean;     // If true, the object is interactable in the editor/VR
  // For non-mesh shapes, size is derived from transform scale unless overridden:
  size?: Vector3;           // Optional override for box colliders
  radius?: number;          // Optional override for sphere/capsule
  height?: number;          // Optional override for capsule
}
```

#### 3.5 Prefab Reference Component

```typescript
interface PrefabReferenceComponent {
  type: "prefabRef";
  prefabRef: string;        // Reference to PrefabAsset.id
  // Overrides to the prefab's root transform or components can be added here
  // TODO / FOR REVIEW: decide whether transform/component overrides are needed for the PoC
  transformOverride?: Partial<Transform>;
  componentOverrides?: Partial<Component>[];
}
```

#### 3.6 NPC / Avatar Placeholder Component

```typescript
interface AvatarPlaceholderComponent {
  type: "avatar";
  avatarType: "npc" | "player";
  modelRef?: string;        // Reference to MeshAsset.id or PrefabAsset.id
  spawnPosition?: Vector3; // Defaults to node transform position
  spawnRotation?: Quaternion; // Defaults to node transform rotation
  displayName?: string;
  // No AI behavior is defined here; this is purely a spawn point + visual reference
}
```

#### 3.7 Custom Component (Extensibility)

```typescript
interface CustomComponent {
  type: string;             // Any string not reserved by the core spec
  [key: string]: any;
}
```

### 4. Full Example JSON

A single room with a floor, 4 walls, a point light, a spot light, a pickable cube, and an NPC avatar.

```json
{
  "version": "1.0.0",
  "metadata": {
    "name": "Demo Room",
    "description": "A simple room for testing the canonical format exporter",
    "author": "World Creator",
    "createdAt": "2026-06-23T10:00:00Z",
    "modifiedAt": "2026-06-23T10:00:00Z",
    "unitScale": 1.0,
    "upAxis": "Y"
  },
  "assetLibrary": {
    "meshes": [
      {
        "id": "mesh_plane",
        "type": "mesh",
        "name": "Plane",
        "source": "builtin:plane"
      },
      {
        "id": "mesh_cube",
        "type": "mesh",
        "name": "Cube",
        "source": "builtin:cube"
      }
    ],
    "materials": [
      {
        "id": "mat_floor",
        "type": "material",
        "name": "Floor Material",
        "albedoColor": "#888888",
        "roughness": 0.8
      },
      {
        "id": "mat_wall",
        "type": "material",
        "name": "Wall Material",
        "albedoColor": "#CCCCCC",
        "roughness": 0.9
      },
      {
        "id": "mat_cube",
        "type": "material",
        "name": "Cube Material",
        "albedoColor": "#FF5722",
        "metallic": 0.1,
        "roughness": 0.4
      }
    ],
    "textures": [],
    "prefabs": []
  },
  "sceneGraph": {
    "root": [
      {
        "id": "node_floor",
        "name": "Floor",
        "transform": {
          "position": [0, 0, 0],
          "rotation": [0, 0, 0, 1],
          "scale": [10, 1, 10]
        },
        "components": [
          {
            "type": "mesh",
            "meshRef": "mesh_plane",
            "materialRef": "mat_floor",
            "castShadows": false,
            "receiveShadows": true
          },
          {
            "type": "collider",
            "shape": "box",
            "isTrigger": false,
            "isPickable": false
          }
        ]
      },
      {
        "id": "node_wall_north",
        "name": "Wall North",
        "transform": {
          "position": [0, 2.5, -5],
          "rotation": [0, 0, 0, 1],
          "scale": [10, 5, 0.2]
        },
        "components": [
          {
            "type": "mesh",
            "meshRef": "mesh_cube",
            "materialRef": "mat_wall",
            "castShadows": true,
            "receiveShadows": true
          },
          {
            "type": "collider",
            "shape": "box",
            "isTrigger": false,
            "isPickable": false
          }
        ]
      },
      {
        "id": "node_wall_south",
        "name": "Wall South",
        "transform": {
          "position": [0, 2.5, 5],
          "rotation": [0, 0, 0, 1],
          "scale": [10, 5, 0.2]
        },
        "components": [
          {
            "type": "mesh",
            "meshRef": "mesh_cube",
            "materialRef": "mat_wall",
            "castShadows": true,
            "receiveShadows": true
          },
          {
            "type": "collider",
            "shape": "box",
            "isTrigger": false,
            "isPickable": false
          }
        ]
      },
      {
        "id": "node_wall_east",
        "name": "Wall East",
        "transform": {
          "position": [5, 2.5, 0],
          "rotation": [0, 0.7071068, 0, 0.7071068],
          "scale": [10, 5, 0.2]
        },
        "components": [
          {
            "type": "mesh",
            "meshRef": "mesh_cube",
            "materialRef": "mat_wall",
            "castShadows": true,
            "receiveShadows": true
          },
          {
            "type": "collider",
            "shape": "box",
            "isTrigger": false,
            "isPickable": false
          }
        ]
      },
      {
        "id": "node_wall_west",
        "name": "Wall West",
        "transform": {
          "position": [-5, 2.5, 0],
          "rotation": [0, 0.7071068, 0, 0.7071068],
          "scale": [10, 5, 0.2]
        },
        "components": [
          {
            "type": "mesh",
            "meshRef": "mesh_cube",
            "materialRef": "mat_wall",
            "castShadows": true,
            "receiveShadows": true
          },
          {
            "type": "collider",
            "shape": "box",
            "isTrigger": false,
            "isPickable": false
          }
        ]
      },
      {
        "id": "node_point_light",
        "name": "Point Light",
        "transform": {
          "position": [0, 4, 0],
          "rotation": [0, 0, 0, 1],
          "scale": [1, 1, 1]
        },
        "components": [
          {
            "type": "light",
            "lightType": "point",
            "color": "#FFD700",
            "intensity": 10,
            "range": 15,
            "castShadows": true
          }
        ]
      },
      {
        "id": "node_spot_light",
        "name": "Spot Light",
        "transform": {
          "position": [0, 4.5, 0],
          "rotation": [0.7071068, 0, 0, 0.7071068],
          "scale": [1, 1, 1]
        },
        "components": [
          {
            "type": "light",
            "lightType": "spot",
            "color": "#FFFFFF",
            "intensity": 20,
            "range": 20,
            "angle": 30,
            "castShadows": true
          }
        ]
      },
      {
        "id": "node_pickable_cube",
        "name": "Pickable Cube",
        "transform": {
          "position": [2, 1, 2],
          "rotation": [0, 0, 0, 1],
          "scale": [1, 1, 1]
        },
        "components": [
          {
            "type": "mesh",
            "meshRef": "mesh_cube",
            "materialRef": "mat_cube",
            "castShadows": true,
            "receiveShadows": true
          },
          {
            "type": "collider",
            "shape": "box",
            "isTrigger": false,
            "isPickable": true
          }
        ]
      },
      {
        "id": "node_npc",
        "name": "NPC Avatar",
        "transform": {
          "position": [-2, 0, -2],
          "rotation": [0, 0.7071068, 0, 0.7071068],
          "scale": [1, 1, 1]
        },
        "components": [
          {
            "type": "avatar",
            "avatarType": "npc",
            "modelRef": "mesh_cube",
            "displayName": "Guide Bot"
          }
        ]
      }
    ]
  }
}
```

### 5. JSON Schema

A formal JSON Schema for validation and auto-completion.

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "WorldCreatorScene",
  "type": "object",
  "required": ["version", "metadata", "assetLibrary", "sceneGraph"],
  "properties": {
    "version": { "type": "string", "pattern": "^\\d+\\.\\d+\\.\\d+$" },
    "metadata": {
      "type": "object",
      "required": ["name", "createdAt", "modifiedAt"],
      "properties": {
        "name": { "type": "string" },
        "description": { "type": "string" },
        "author": { "type": "string" },
        "createdAt": { "type": "string", "format": "date-time" },
        "modifiedAt": { "type": "string", "format": "date-time" },
        "unitScale": { "type": "number", "default": 1.0 },
        "upAxis": { "type": "string", "enum": ["Y", "Z"], "default": "Y" }
      }
    },
    "assetLibrary": {
      "type": "object",
      "properties": {
        "meshes": {
          "type": "array",
          "items": { "$ref": "#/definitions/meshAsset" }
        },
        "materials": {
          "type": "array",
          "items": { "$ref": "#/definitions/materialAsset" }
        },
        "textures": {
          "type": "array",
          "items": { "$ref": "#/definitions/textureAsset" }
        },
        "prefabs": {
          "type": "array",
          "items": { "$ref": "#/definitions/prefabAsset" }
        }
      }
    },
    "sceneGraph": {
      "type": "object",
      "required": ["root"],
      "properties": {
        "root": {
          "type": "array",
          "items": { "$ref": "#/definitions/node" }
        }
      }
    }
  },
  "definitions": {
    "meshAsset": {
      "type": "object",
      "required": ["id", "type", "name", "source"],
      "properties": {
        "id": { "type": "string" },
        "type": { "const": "mesh" },
        "name": { "type": "string" },
        "source": { "type": "string" },
        "generateColliders": { "type": "boolean" },
        "importScale": { "type": "number" }
      }
    },
    "materialAsset": {
      "type": "object",
      "required": ["id", "type", "name"],
      "properties": {
        "id": { "type": "string" },
        "type": { "const": "material" },
        "name": { "type": "string" },
        "albedoColor": { "type": "string" },
        "albedoTexture": { "type": "string" },
        "metallic": { "type": "number" },
        "roughness": { "type": "number" },
        "normalTexture": { "type": "string" }
      }
    },
    "textureAsset": {
      "type": "object",
      "required": ["id", "type", "name", "source"],
      "properties": {
        "id": { "type": "string" },
        "type": { "const": "texture" },
        "name": { "type": "string" },
        "source": { "type": "string" }
      }
    },
    "prefabAsset": {
      "type": "object",
      "required": ["id", "type", "name", "rootNode"],
      "properties": {
        "id": { "type": "string" },
        "type": { "const": "prefab" },
        "name": { "type": "string" },
        "rootNode": { "$ref": "#/definitions/node" }
      }
    },
    "node": {
      "type": "object",
      "required": ["id", "name", "transform", "components"],
      "properties": {
        "id": { "type": "string" },
        "name": { "type": "string" },
        "parent": { "type": "string" },
        "transform": {
          "type": "object",
          "required": ["position", "rotation", "scale"],
          "properties": {
            "position": { "$ref": "#/definitions/vector3" },
            "rotation": { "$ref": "#/definitions/quaternion" },
            "scale": { "$ref": "#/definitions/vector3" }
          }
        },
        "components": {
          "type": "array",
          "items": { "$ref": "#/definitions/component" }
        },
        "children": {
          "type": "array",
          "items": { "$ref": "#/definitions/node" }
        }
      }
    },
    "component": {
      "type": "object",
      "required": ["type"],
      "properties": {
        "type": { "type": "string" }
      },
      "oneOf": [
        { "$ref": "#/definitions/meshComponent" },
        { "$ref": "#/definitions/lightComponent" },
        { "$ref": "#/definitions/colliderComponent" },
        { "$ref": "#/definitions/prefabRefComponent" },
        { "$ref": "#/definitions/avatarComponent" }
      ]
    },
    "meshComponent": {
      "type": "object",
      "required": ["type", "meshRef"],
      "properties": {
        "type": { "const": "mesh" },
        "meshRef": { "type": "string" },
        "materialRef": { "type": "string" },
        "castShadows": { "type": "boolean" },
        "receiveShadows": { "type": "boolean" }
      }
    },
    "lightComponent": {
      "type": "object",
      "required": ["type", "lightType", "color", "intensity"],
      "properties": {
        "type": { "const": "light" },
        "lightType": { "type": "string", "enum": ["directional", "point", "spot"] },
        "color": { "type": "string" },
        "intensity": { "type": "number" },
        "range": { "type": "number" },
        "angle": { "type": "number" },
        "castShadows": { "type": "boolean" }
      }
    },
    "colliderComponent": {
      "type": "object",
      "required": ["type", "shape"],
      "properties": {
        "type": { "const": "collider" },
        "shape": { "type": "string", "enum": ["box", "sphere", "capsule", "mesh"] },
        "isTrigger": { "type": "boolean" },
        "isPickable": { "type": "boolean" },
        "size": { "$ref": "#/definitions/vector3" },
        "radius": { "type": "number" },
        "height": { "type": "number" }
      }
    },
    "prefabRefComponent": {
      "type": "object",
      "required": ["type", "prefabRef"],
      "properties": {
        "type": { "const": "prefabRef" },
        "prefabRef": { "type": "string" },
        "transformOverride": { "type": "object" },
        "componentOverrides": { "type": "array" }
      }
    },
    "avatarComponent": {
      "type": "object",
      "required": ["type", "avatarType"],
      "properties": {
        "type": { "const": "avatar" },
        "avatarType": { "type": "string", "enum": ["npc", "player"] },
        "modelRef": { "type": "string" },
        "spawnPosition": { "$ref": "#/definitions/vector3" },
        "spawnRotation": { "$ref": "#/definitions/quaternion" },
        "displayName": { "type": "string" }
      }
    },
    "vector3": {
      "type": "array",
      "items": { "type": "number" },
      "minItems": 3,
      "maxItems": 3
    },
    "quaternion": {
      "type": "array",
      "items": { "type": "number" },
      "minItems": 4,
      "maxItems": 4
    }
  }
}
```

### 6. Notes for the Unity Editor Script Exporter

- **Coordinate System**: The format uses a Y-up, right-handed coordinate system by default. The Unity exporter should convert to Unity's Y-up, left-handed system by negating the Z component of positions and rotations as needed.
- **Asset Resolution**: The exporter should map `assetLibrary` entries to Unity `AssetDatabase` imports or runtime loads. `builtin:*` sources can be mapped to Unity primitives (Cube, Plane, Sphere, etc.).
- **Prefab Instancing**: `prefabRef` components should be instantiated using `PrefabUtility` or `Object.Instantiate` in editor scripts.
- **Collider Generation**: If a mesh has `generateColliders: true` or a node has a `collider` component, the exporter should add the corresponding `MeshCollider`, `BoxCollider`, etc.
- **Pickable Objects**: The `isPickable` flag is a hint for the editor and VR interactions. In Unity, this might map to a specific tag, layer, or a custom `Interactable` component.
- **Lights**: Intensity is abstract in the canonical format. The exporter may apply a conversion factor to match Unity's light intensity units (e.g., 1 candela = 1 Unity unit for point lights).
- **Versioning**: The exporter should check `version` and emit a warning or error if the major version is higher than what it supports.

---

*End of Document*
