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
    ],
    textures: [],
    prefabs: [],
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
            { type: "light", lightType: "point", color: "#FFD700", intensity: 10, range: 15, castShadows: true },
          ],
          children: [],
        },
      ],
    },
  },
};
