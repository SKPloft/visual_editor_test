/**
 * The normative fixture corpus.
 *
 * `buildWallLamp` is the reference valid package. Every invalid fixture is
 * expressed as a mutation of it, so a test reads as "this one thing is wrong"
 * rather than as a second full package a reader has to diff by eye. External
 * consumers claiming `nook.prefab/1` conformance can reuse these artifacts.
 *
 * The lamp exercises, in one package: both payload roles, a non-identity
 * package-root transform, a color parameter bound through a by-name material
 * selector in `full` and a by-index selector in the structurally different
 * manual `proxy`, a scalar parameter bound to a root transform component, and a
 * registered Nook component.
 */

import {
  SCENE_BIN,
  buildGlb,
  buildPackage,
  material,
  mesh,
  node,
  primitive,
  scene,
  type BuiltPackage,
  type PackageSpec,
  type PayloadSpec,
} from "./build.ts";
import type { JsonObject } from "../../../src/prefab-package/types.ts";

export const WALL_LAMP_ID = "p_wall_lamp";
export const WALL_LAMP_VERSION = "1.2.0";

export const SHADE_COLOR_PARAM = "prm_shade_color";
export const EXTENSION_PARAM = "prm_extension";

/** Capabilities the reference package actually uses. */
export const WALL_LAMP_REQUIRES = [
  "nook.component/collider@1",
  "nook.parameter/color@1",
  "nook.parameter/float@1",
  "nook.path@1",
];

/**
 * `full`: the bake representation. The package root carries a non-identity
 * translation so transform-composition fixtures have something to preserve.
 */
export function wallLampFullGltf(): JsonObject {
  return scene({
    nodes: [
      node({
        name: "WallLamp",
        nodeId: "nook.root",
        packageRoot: true,
        translation: [0, 0, 0.25],
        children: [1],
        components: { collider: { shape: "box", isTrigger: false, enabled: true } },
      }),
      node({ name: "Shade", nodeId: "n_shade", mesh: 0 }),
    ],
    meshes: [mesh([primitive(0)])],
    materials: [material("ShadeGlass", [1, 0.84, 0, 1])],
  });
}

/**
 * `proxy`: a manually authored preview. Its hierarchy, node ids, and material
 * layout differ from `full` on purpose — that divergence is legal, and it is
 * why bindings are representation-scoped.
 */
export function wallLampProxyGltf(): JsonObject {
  return scene({
    nodes: [
      node({
        name: "WallLampProxy",
        nodeId: "nook.root",
        packageRoot: true,
        translation: [0, 0, 0.25],
        children: [1],
      }),
      node({ name: "ShadeProxy", nodeId: "n_shade_proxy", mesh: 0 }),
    ],
    meshes: [mesh([primitive(0)])],
    materials: [material("ProxyGlass", [1, 0.84, 0, 1])],
  });
}

export function wallLampManifest(payloads: Record<string, JsonObject>): JsonObject {
  return {
    spec: "nook.prefab/1",
    id: WALL_LAMP_ID,
    version: WALL_LAMP_VERSION,
    meta: {
      name: "Vintage Wall Lamp",
      author: "fixture",
      category: "furniture/light",
      tags: ["lamp", "wall"],
    },
    requires: [...WALL_LAMP_REQUIRES],
    parameters: [
      {
        paramId: SHADE_COLOR_PARAM,
        displayName: "Shade colour",
        type: "color",
        constraints: {},
        default: "#FFD700",
        bindings: [
          {
            representation: "full",
            nodeId: "n_shade",
            propertyPath:
              'mesh.material.named("ShadeGlass").pbrMetallicRoughness.baseColorFactor',
            required: true,
          },
          {
            representation: "proxy",
            nodeId: "n_shade_proxy",
            propertyPath: "mesh.primitives[0].material.pbrMetallicRoughness.baseColorFactor",
            required: false,
          },
        ],
      },
      {
        paramId: EXTENSION_PARAM,
        displayName: "Protrusion distance",
        type: "float",
        constraints: { min: 0, max: 1, step: 0.05 },
        default: 0.25,
        bindings: [
          {
            representation: "full",
            nodeId: "nook.root",
            propertyPath: "transform.translation[2]",
            required: true,
          },
          {
            representation: "proxy",
            nodeId: "nook.root",
            propertyPath: "transform.translation[2]",
            required: false,
          },
        ],
      },
    ],
    dependencies: [],
    payloads,
  };
}

export type ManifestMutator = (manifest: JsonObject) => JsonObject | void;

export interface WallLampOptions {
  /** Mutates the reference manifest in place, or returns a replacement. */
  manifest?: ManifestMutator;
  /** Replaces the `full` glTF document. */
  full?: JsonObject;
  /** Replaces the `proxy` glTF document. */
  proxy?: JsonObject;
  /**
   * Replaces a role's payload bytes outright, bypassing GLB assembly. The
   * descriptor still describes these bytes, so integrity passes and the defect
   * surfaces where it belongs — in GLB parsing.
   */
  rawPayloads?: Record<string, Uint8Array>;
  /** Per-role payload overrides such as substituted bytes or omitted blobs. */
  payloadOverrides?: Record<string, Partial<PayloadSpec>>;
  /** Additional payload roles, e.g. an unknown future slot. */
  extraPayloads?: Record<string, PayloadSpec>;
  extraEntries?: PackageSpec["extraEntries"];
  manifestEntryName?: string;
}

export async function buildWallLamp(options: WallLampOptions = {}): Promise<BuiltPackage> {
  const fullBytes = buildGlb(options.full ?? wallLampFullGltf(), SCENE_BIN);
  const proxyBytes = buildGlb(options.proxy ?? wallLampProxyGltf(), SCENE_BIN);

  const payloads: Record<string, PayloadSpec> = {
    full: { bytes: options.rawPayloads?.full ?? fullBytes, ...options.payloadOverrides?.full },
    proxy: { bytes: options.rawPayloads?.proxy ?? proxyBytes, ...options.payloadOverrides?.proxy },
    ...options.extraPayloads,
  };

  return buildPackage({
    payloads,
    extraEntries: options.extraEntries,
    manifestEntryName: options.manifestEntryName,
    manifest: (descriptors) => {
      const manifest = wallLampManifest(descriptors);
      const mutated = options.manifest?.(manifest);
      return mutated ?? manifest;
    },
  });
}

/**
 * A package carrying no declared parameters.
 *
 * Profile fixtures deliberately break payload structure, which would cascade
 * into binding failures and bury the defect under test. Dropping parameters
 * isolates the payload phase; parameter behaviour has its own fixtures.
 */
export async function buildProfilePackage(options: {
  full?: JsonObject;
  proxy?: JsonObject;
  rawPayloads?: Record<string, Uint8Array>;
  /** Capabilities the payloads use, which `requires` must cover. */
  requires?: string[];
}): Promise<BuiltPackage> {
  return buildWallLamp({
    full: options.full ?? profileBaseGltf(),
    proxy: options.proxy ?? profileBaseGltf(),
    rawPayloads: options.rawPayloads,
    manifest: (manifest) => {
      manifest.parameters = [];
      manifest.requires = options.requires ?? [];
    },
  });
}

/** The smallest payload that satisfies the profile: one marked logical root. */
export function profileBaseGltf(): JsonObject {
  return scene({
    nodes: [node({ name: "Root", nodeId: "nook.root", packageRoot: true })],
  });
}

/**
 * A payload whose material carries an embedded base-colour texture.
 *
 * `vec2` parameters bind to texture-transform targets, which only exist when a
 * material actually declares a texture — so exercising that type needs a
 * fixture that has one.
 */
export function texturedGltf(): JsonObject {
  return scene({
    nodes: [node({ name: "Panel", nodeId: "nook.root", packageRoot: true, mesh: 0 })],
    meshes: [mesh([primitive(0)])],
    materials: [material("PanelSurface", [1, 1, 1, 1], { texture: 0 })],
    textured: true,
    extensionsUsed: ["KHR_texture_transform"],
  });
}

/** A package built around {@link texturedGltf}, carrying one declared parameter. */
export async function buildTexturedPackage(
  parameter: JsonObject,
  requires: string[],
): Promise<BuiltPackage> {
  return buildWallLamp({
    full: texturedGltf(),
    proxy: texturedGltf(),
    manifest: (manifest) => {
      manifest.parameters = [parameter];
      manifest.requires = [...requires].sort();
    },
  });
}

// ---------------------------------------------------------------------------
// Nested dependency fixtures
// ---------------------------------------------------------------------------

export const BULB_ID = "p_bulb";
export const BULB_VERSION = "2.0.1";

export function bulbGltf(): JsonObject {
  return scene({
    nodes: [
      node({ name: "Bulb", nodeId: "nook.root", packageRoot: true, mesh: 0 }),
    ],
    meshes: [mesh([primitive(0)])],
    materials: [material("BulbGlass")],
  });
}

export function bulbManifest(payloads: Record<string, JsonObject>): JsonObject {
  return {
    spec: "nook.prefab/1",
    id: BULB_ID,
    version: BULB_VERSION,
    meta: { name: "Bulb", category: "furniture/light", tags: [] },
    requires: ["nook.parameter/color@1", "nook.path@1"],
    parameters: [
      {
        paramId: "prm_bulb_color",
        displayName: "Bulb colour",
        type: "color",
        constraints: {},
        default: "#FFFFFF",
        bindings: [
          {
            representation: "full",
            nodeId: "nook.root",
            propertyPath: 'mesh.material.named("BulbGlass").pbrMetallicRoughness.baseColorFactor',
            required: true,
          },
          {
            representation: "proxy",
            nodeId: "nook.root",
            propertyPath: 'mesh.material.named("BulbGlass").pbrMetallicRoughness.baseColorFactor',
            required: false,
          },
        ],
      },
    ],
    dependencies: [],
    payloads,
  };
}

export async function buildBulb(): Promise<BuiltPackage> {
  const bytes = buildGlb(bulbGltf(), SCENE_BIN);
  return buildPackage({
    payloads: { full: { bytes }, proxy: { bytes } },
    manifest: bulbManifest,
  });
}

/** A wall lamp whose `full` payload dynamically links the bulb package. */
export async function buildWallLampWithNestedBulb(
  bulbDigest: string,
  options: {
    declareDependency?: boolean;
    nestedParams?: JsonObject;
    /**
     * Digest the manifest declares, when it must differ from the digest the
     * nested instance pins. Same tuple, two artifacts.
     */
    declaredDigest?: string;
  } = {},
): Promise<BuiltPackage> {
  const reference = {
    kind: "prefab",
    id: BULB_ID,
    version: BULB_VERSION,
    digest: bulbDigest,
  };

  const full = scene({
    nodes: [
      node({
        name: "WallLamp",
        nodeId: "nook.root",
        packageRoot: true,
        translation: [0, 0, 0.25],
        children: [1, 2],
        components: { collider: { shape: "box", isTrigger: false, enabled: true } },
      }),
      node({ name: "Shade", nodeId: "n_shade", mesh: 0 }),
      node({
        name: "BulbSocket",
        nodeId: "n_bulb_socket",
        translation: [0, -0.1, 0],
        prefabInstance: {
          ...reference,
          params: options.nestedParams ?? { prm_bulb_color: "#FFEECC" },
        },
      }),
    ],
    meshes: [mesh([primitive(0)])],
    materials: [material("ShadeGlass", [1, 0.84, 0, 1])],
  });

  return buildWallLamp({
    full,
    manifest: (manifest) => {
      if (options.declareDependency === false) {
        manifest.dependencies = [];
        return;
      }
      manifest.dependencies = [
        options.declaredDigest ? { ...reference, digest: options.declaredDigest } : reference,
      ];
    },
  });
}
