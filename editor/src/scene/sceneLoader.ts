import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import type { Component, MaterialAsset, MeshAsset, Node, PrefabAsset, SceneFile } from "./types.ts";

const materialCache = new Map<string, THREE.Material>();
export const CANONICAL_NODE_ID = "canonicalNodeId";

function getBuiltinMeshGeometry(source: string): THREE.BufferGeometry {
  const primitive = source.split(":")[1];
  switch (primitive) {
    case "plane":
      return new THREE.PlaneGeometry(1, 1);
    case "cube":
      return new THREE.BoxGeometry(1, 1, 1);
    case "sphere":
      return new THREE.SphereGeometry(0.5, 32, 16);
    case "cylinder":
      return new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
    default:
      console.warn(`Unknown builtin mesh source: ${source}. Falling back to cube.`);
      return new THREE.BoxGeometry(1, 1, 1);
  }
}

function buildMaterial(asset: MaterialAsset): THREE.Material {
  const material = new THREE.MeshStandardMaterial({
    color: asset.albedoColor ?? "#FFFFFF",
    roughness: asset.roughness ?? 0.5,
    metalness: asset.metallic ?? 0.0,
  });
  material.name = asset.name;
  return material;
}

const missingMaterial = new THREE.MeshStandardMaterial({ color: 0xff00ff, name: "Missing Material" });

function resolveMaterial(id: string | undefined, assetMap: Map<string, MaterialAsset>): THREE.Material {
  if (!id) return missingMaterial;
  if (materialCache.has(id)) return materialCache.get(id)!;
  const asset = assetMap.get(id);
  const material = asset ? buildMaterial(asset) : missingMaterial;
  if (asset) materialCache.set(id, material);
  return material;
}

export function invalidateMaterialCache(id: string): void {
  materialCache.delete(id);
}

function applyTransform(object: THREE.Object3D, transform: Node["transform"]): void {
  const [px, py, pz] = transform.position;
  const [rx, ry, rz, rw] = transform.rotation;
  const [sx, sy, sz] = transform.scale;
  object.position.set(px, py, pz);
  object.quaternion.set(rx, ry, rz, rw);
  object.scale.set(sx, sy, sz);
}

function addLight(object: THREE.Object3D, component: Extract<Component, { type: "light" }>): void {
  const lightColor = new THREE.Color(component.color);
  let light: THREE.Light;
  switch (component.lightType) {
    case "ambient":
      light = new THREE.AmbientLight(lightColor, component.intensity);
      break;
    case "directional":
      light = new THREE.DirectionalLight(lightColor, component.intensity);
      light.castShadow = component.castShadows ?? false;
      break;
    case "spot":
      light = new THREE.SpotLight(lightColor, component.intensity, component.range, (component.angle ?? 30) * (Math.PI / 180));
      light.castShadow = component.castShadows ?? false;
      break;
    case "point":
    default:
      light = new THREE.PointLight(lightColor, component.intensity, component.range);
      light.castShadow = component.castShadows ?? false;
      break;
  }
  object.add(light);
}

interface AssetMaps {
  meshes: Map<string, MeshAsset>;
  materials: Map<string, MaterialAsset>;
  prefabs: Map<string, PrefabAsset>;
}

function buildNode(node: Node, assets: AssetMaps, prefabStack = new Set<string>(), tagNode = true): THREE.Object3D {
  const object = new THREE.Group();
  object.name = node.name;
  if (tagNode) {
    object.userData[CANONICAL_NODE_ID] = node.id;
  }
  applyTransform(object, node.transform);

  for (const component of node.components) {
    switch (component.type) {
      case "mesh": {
        const meshAsset = assets.meshes.get(component.meshRef);
        const geometry = meshAsset ? getBuiltinMeshGeometry(meshAsset.source) : new THREE.BoxGeometry(1, 1, 1);
        const material = resolveMaterial(component.materialRef, assets.materials);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = component.castShadows ?? false;
        mesh.receiveShadow = component.receiveShadows ?? false;
        object.add(mesh);
        break;
      }
      case "light": {
        addLight(object, component);
        break;
      }
      case "prefabRef": {
        const prefab = assets.prefabs.get(component.prefabRef);
        if (!prefab) {
          console.warn(`Unknown prefab reference: ${component.prefabRef}`);
          break;
        }
        if (prefabStack.has(prefab.id)) {
          console.warn(`Skipping recursive prefab reference: ${prefab.id}`);
          break;
        }
        const nextPrefabStack = new Set(prefabStack);
        nextPrefabStack.add(prefab.id);
        for (const child of prefab.rootNode.children) {
          object.add(buildNode(child, assets, nextPrefabStack, false));
        }
        break;
      }
      case "collider":
      case "avatar":
        // Not visualized in the M0 viewport.
        break;
      default:
        console.warn(`Unsupported component type: ${(component as { type: string }).type}`);
    }
  }

  for (const child of node.children) {
    object.add(buildNode(child, assets, prefabStack, tagNode));
  }

  return object;
}

export function loadSceneInto(scene: THREE.Scene, sceneFile: SceneFile): void {
  scene.clear();
  materialCache.clear();


  // A subtle grid for spatial reference.
  scene.add(new THREE.GridHelper(20, 20, 0x334155, 0x1e293b));

  const meshMap = new Map(sceneFile.assetLibrary.meshes.map((m) => [m.id, m]));
  const materialMap = new Map(sceneFile.assetLibrary.materials.map((m) => [m.id, m]));
  const prefabMap = new Map(sceneFile.assetLibrary.prefabs.map((p) => [p.id, p]));

  const root = buildNode(sceneFile.sceneGraph.root, {
    meshes: meshMap,
    materials: materialMap,
    prefabs: prefabMap,
  });
  scene.add(root);
}

export function createEditor(container: HTMLElement): { scene: THREE.Scene; camera: THREE.PerspectiveCamera; renderer: THREE.WebGLRenderer; controls: OrbitControls } {
  const width = container.clientWidth;
  const height = container.clientHeight;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0f172a);

  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.set(8, 6, 8);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.target.set(0, 1, 0);

  controls.mouseButtons = {
    LEFT: null as any,
    MIDDLE: THREE.MOUSE.PAN,
    RIGHT: THREE.MOUSE.ROTATE
  };

  const onResize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };
  window.addEventListener("resize", onResize);

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  return { scene, camera, renderer, controls };
}
