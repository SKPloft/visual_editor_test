import type { SceneFile } from "./types.ts";

export const demoScene: SceneFile = {
  version: "1.0.0",
  metadata: {
    name: "Demo Room",
    description: "A simple room for testing the canonical format renderer",
    author: "World Creator",
    createdAt: "2026-06-24T00:00:00Z",
    modifiedAt: "2026-06-24T00:00:00Z",
    unitScale: 1.0,
    upAxis: "Y",
  },
  assetLibrary: {
    meshes: [
      { id: "mesh_plane", type: "mesh", name: "Plane", source: "builtin:plane" },
      { id: "mesh_cube", type: "mesh", name: "Cube", source: "builtin:cube" },
      { id: "mesh_sphere", type: "mesh", name: "Sphere", source: "builtin:sphere" },
      { id: "mesh_cylinder", type: "mesh", name: "Cylinder", source: "builtin:cylinder" },
    ],
    materials: [
      {
        id: "mat_floor",
        type: "material",
        name: "Floor Material",
        albedoColor: "#888888",
        roughness: 0.8,
      },
      {
        id: "mat_missing_placeholder",
        type: "material",
        name: "Missing Material",
        albedoColor: "#FF00FF",
        metallic: 0,
        roughness: 0.5,
      },
      {
        id: "mat_wall",
        type: "material",
        name: "Wall Material",
        albedoColor: "#CCCCCC",
        roughness: 0.9,
      },
      {
        id: "mat_cube",
        type: "material",
        name: "Cube Material",
        albedoColor: "#FF5722",
        metallic: 0.1,
        roughness: 0.4,
      },
      {
        id: "mat_light",
        type: "material",
        name: "Light Material",
        albedoColor: "#FFD700",
        roughness: 0.2,
      },
      {
        id: "mat_wood",
        type: "material",
        name: "Warm Wood",
        albedoColor: "#8B5A2B",
        roughness: 0.65,
      },
      {
        id: "mat_lamp_stand",
        type: "material",
        name: "Lamp Stand",
        albedoColor: "#475569",
        metallic: 0.2,
        roughness: 0.35,
      },
    ],
    textures: [],
    prefabs: [
      {
        id: "prefab_simple_table",
        type: "prefab",
        name: "Simple Table",
        rootNode: {
          id: "prefab_simple_table_root",
          name: "Simple Table",
          transform: {
            position: [0, 0, 0],
            rotation: [0, 0, 0, 1],
            scale: [1, 1, 1],
          },
          components: [
            { type: "prefabRef", prefabRef: "prefab_simple_table" },
          ],
          children: [
            {
              id: "prefab_simple_table_top",
              name: "Table Top",
              transform: {
                position: [0, 1, 0],
                rotation: [0, 0, 0, 1],
                scale: [2.4, 0.18, 1.4],
              },
              components: [
                { type: "mesh", meshRef: "mesh_cube", materialRef: "mat_wood", castShadows: true, receiveShadows: true },
              ],
              children: [],
            },
            {
              id: "prefab_simple_table_leg_fl",
              name: "Front Left Leg",
              transform: {
                position: [-0.95, 0.48, 0.5],
                rotation: [0, 0, 0, 1],
                scale: [0.18, 0.95, 0.18],
              },
              components: [
                { type: "mesh", meshRef: "mesh_cube", materialRef: "mat_wood", castShadows: true, receiveShadows: true },
              ],
              children: [],
            },
            {
              id: "prefab_simple_table_leg_fr",
              name: "Front Right Leg",
              transform: {
                position: [0.95, 0.48, 0.5],
                rotation: [0, 0, 0, 1],
                scale: [0.18, 0.95, 0.18],
              },
              components: [
                { type: "mesh", meshRef: "mesh_cube", materialRef: "mat_wood", castShadows: true, receiveShadows: true },
              ],
              children: [],
            },
            {
              id: "prefab_simple_table_leg_bl",
              name: "Back Left Leg",
              transform: {
                position: [-0.95, 0.48, -0.5],
                rotation: [0, 0, 0, 1],
                scale: [0.18, 0.95, 0.18],
              },
              components: [
                { type: "mesh", meshRef: "mesh_cube", materialRef: "mat_wood", castShadows: true, receiveShadows: true },
              ],
              children: [],
            },
            {
              id: "prefab_simple_table_leg_br",
              name: "Back Right Leg",
              transform: {
                position: [0.95, 0.48, -0.5],
                rotation: [0, 0, 0, 1],
                scale: [0.18, 0.95, 0.18],
              },
              components: [
                { type: "mesh", meshRef: "mesh_cube", materialRef: "mat_wood", castShadows: true, receiveShadows: true },
              ],
              children: [],
            },
          ],
        },
      },
      {
        id: "prefab_floor_lamp",
        type: "prefab",
        name: "Floor Lamp",
        rootNode: {
          id: "prefab_floor_lamp_root",
          name: "Floor Lamp",
          transform: {
            position: [0, 0, 0],
            rotation: [0, 0, 0, 1],
            scale: [1, 1, 1],
          },
          components: [
            { type: "prefabRef", prefabRef: "prefab_floor_lamp" },
          ],
          children: [
            {
              id: "prefab_floor_lamp_base",
              name: "Lamp Base",
              transform: {
                position: [0, 0.05, 0],
                rotation: [0, 0, 0, 1],
                scale: [0.75, 0.1, 0.75],
              },
              components: [
                { type: "mesh", meshRef: "mesh_cylinder", materialRef: "mat_lamp_stand", castShadows: true, receiveShadows: true },
              ],
              children: [],
            },
            {
              id: "prefab_floor_lamp_pole",
              name: "Lamp Pole",
              transform: {
                position: [0, 1.15, 0],
                rotation: [0, 0, 0, 1],
                scale: [0.16, 2.2, 0.16],
              },
              components: [
                { type: "mesh", meshRef: "mesh_cylinder", materialRef: "mat_lamp_stand", castShadows: true, receiveShadows: true },
              ],
              children: [],
            },
            {
              id: "prefab_floor_lamp_shade",
              name: "Lamp Shade",
              transform: {
                position: [0, 2.35, 0],
                rotation: [0, 0, 0, 1],
                scale: [0.9, 0.45, 0.9],
              },
              components: [
                { type: "mesh", meshRef: "mesh_cylinder", materialRef: "mat_light", castShadows: true, receiveShadows: false },
              ],
              children: [],
            },
            {
              id: "prefab_floor_lamp_light",
              name: "Lamp Light",
              transform: {
                position: [0, 2.35, 0],
                rotation: [0, 0, 0, 1],
                scale: [1, 1, 1],
              },
              components: [
                { type: "light", lightType: "point", color: "#FFD700", intensity: 7, range: 8, castShadows: true },
              ],
              children: [],
            },
          ],
        },
      },
    ],
  },
  sceneGraph: {
    root: {
      id: "node_world",
      name: "Demo Room",
      transform: {
        position: [0, 0, 0],
        rotation: [0, 0, 0, 1],
        scale: [1, 1, 1],
      },
      components: [],
      children: [
        {
          id: "node_sun",
          name: "Sun",
          transform: {
            position: [5, 10, 5],
            rotation: [-0.27, 0.5, -0.16, 0.81],
            scale: [1, 1, 1],
          },
          components: [
            { type: "light", lightType: "directional", color: "#FFFFFF", intensity: 1.5, castShadows: false },
          ],
          children: [],
        },
        {
          id: "node_ambient",
          name: "Ambient",
          transform: {
            position: [0, 0, 0],
            rotation: [0, 0, 0, 1],
            scale: [1, 1, 1],
          },
          components: [
            { type: "light", lightType: "ambient", color: "#404040", intensity: 1.0 },
          ],
          children: [],
        },
        {
          id: "node_floor",
          name: "Floor",
          transform: {
            position: [0, 0, 0],
            rotation: [0, 0, 0, 1],
            scale: [10, 1, 10],
          },
          components: [
            { type: "mesh", meshRef: "mesh_plane", materialRef: "mat_floor", receiveShadows: true },
          ],
          children: [],
        },
        {
          id: "node_wall_north",
          name: "Wall North",
          transform: {
            position: [0, 2.5, -5],
            rotation: [0, 0, 0, 1],
            scale: [10, 5, 0.2],
          },
          components: [
            { type: "mesh", meshRef: "mesh_cube", materialRef: "mat_wall", castShadows: true, receiveShadows: true },
          ],
          children: [],
        },
        {
          id: "node_wall_south",
          name: "Wall South",
          transform: {
            position: [0, 2.5, 5],
            rotation: [0, 0, 0, 1],
            scale: [10, 5, 0.2],
          },
          components: [
            { type: "mesh", meshRef: "mesh_cube", materialRef: "mat_wall", castShadows: true, receiveShadows: true },
          ],
          children: [],
        },
        {
          id: "node_wall_east",
          name: "Wall East",
          transform: {
            position: [5, 2.5, 0],
            rotation: [0, 0.7071068, 0, 0.7071068],
            scale: [10, 5, 0.2],
          },
          components: [
            { type: "mesh", meshRef: "mesh_cube", materialRef: "mat_wall", castShadows: true, receiveShadows: true },
          ],
          children: [],
        },
        {
          id: "node_wall_west",
          name: "Wall West",
          transform: {
            position: [-5, 2.5, 0],
            rotation: [0, 0.7071068, 0, 0.7071068],
            scale: [10, 5, 0.2],
          },
          components: [
            { type: "mesh", meshRef: "mesh_cube", materialRef: "mat_wall", castShadows: true, receiveShadows: true },
          ],
          children: [],
        },
        {
          id: "node_cube",
          name: "Pickable Cube",
          transform: {
            position: [2, 1, 2],
            rotation: [0, 0, 0, 1],
            scale: [1, 1, 1],
          },
          components: [
            { type: "mesh", meshRef: "mesh_cube", materialRef: "mat_cube", castShadows: true, receiveShadows: true },
          ],
          children: [],
        },
        {
          id: "node_sphere",
          name: "Sphere",
          transform: {
            position: [-2, 1, -2],
            rotation: [0, 0, 0, 1],
            scale: [1, 1, 1],
          },
          components: [
            { type: "mesh", meshRef: "mesh_sphere", materialRef: "mat_light", castShadows: true, receiveShadows: true },
          ],
          children: [],
        },
        {
          id: "node_point_light",
          name: "Point Light",
          transform: {
            position: [0, 4, 0],
            rotation: [0, 0, 0, 1],
            scale: [1, 1, 1],
          },
          components: [
            { type: "light", lightType: "point", color: "#FFD700", intensity: 10, range: 15, castShadows: false },
          ],
          children: [],
        },
      ],
    },
  },
};
