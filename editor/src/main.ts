import * as THREE from "three";
import { TransformControls } from "three/addons/controls/TransformControls.js";
import JSZip from "jszip";
import { CANONICAL_NODE_ID, createEditor, loadSceneInto, invalidateMaterialCache } from "./scene/sceneLoader.ts";
import { demoScene } from "./scene/demoScene.ts";
import { generateUnityPackage } from "./export/unityPackageGenerator.ts";
import type { Component, MaterialAsset, MeshAsset, Node, PrefabAsset, SceneFile } from "./scene/types.ts";

type ToolMode = "translate" | "rotate" | "scale" | "select";
type PrimitiveType = "cube" | "sphere" | "cylinder" | "plane";

const SCENE_VERSION = "1.0.0";
const builtinPrefabAssets = deepClone(demoScene.assetLibrary.prefabs);
const builtinMeshAssets = deepClone(demoScene.assetLibrary.meshes);
const builtinMaterialAssets = deepClone(demoScene.assetLibrary.materials);

const viewport = document.getElementById("viewport");
if (!viewport) throw new Error("Viewport container not found");

const { scene, camera, renderer, controls } = createEditor(viewport);

const transformControl = new TransformControls(camera, renderer.domElement);
transformControl.addEventListener("dragging-changed", (event) => {
  controls.enabled = !event.value;
});

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const nodeIndex = new Map<string, Node>();
const objectIndex = new Map<string, THREE.Object3D>();

let currentScene = prepareSceneForEditing(deepClone(demoScene));
let selectedObject: THREE.Object3D | null = null;
let nextNodeId = 1;

const propPanelContent = requiredElement<HTMLElement>("properties-content");
const noSelectionMsg = requiredElement<HTMLElement>("no-selection-msg");
const propName = requiredElement<HTMLInputElement>("prop-name");

const px = requiredElement<HTMLInputElement>("prop-pos-x");
const py = requiredElement<HTMLInputElement>("prop-pos-y");
const pz = requiredElement<HTMLInputElement>("prop-pos-z");

const rx = requiredElement<HTMLInputElement>("prop-rot-x");
const ry = requiredElement<HTMLInputElement>("prop-rot-y");
const rz = requiredElement<HTMLInputElement>("prop-rot-z");

const sx = requiredElement<HTMLInputElement>("prop-scale-x");
const sy = requiredElement<HTMLInputElement>("prop-scale-y");
const sz = requiredElement<HTMLInputElement>("prop-scale-z");

const materialList = requiredElement<HTMLElement>("material-list");
const btnAddMaterial = requiredElement<HTMLButtonElement>("btn-add-material");

const propPanelMesh = requiredElement<HTMLElement>("prop-panel-mesh");
const propMeshMaterial = requiredElement<HTMLSelectElement>("prop-mesh-material");
const propMeshCastShadows = requiredElement<HTMLInputElement>("prop-mesh-cast-shadows");
const propMeshReceiveShadows = requiredElement<HTMLInputElement>("prop-mesh-receive-shadows");

const propPanelLight = requiredElement<HTMLElement>("prop-panel-light");
const propLightType = requiredElement<HTMLSelectElement>("prop-light-type");
const propLightColor = requiredElement<HTMLInputElement>("prop-light-color");
const propLightIntensity = requiredElement<HTMLInputElement>("prop-light-intensity");
const propLightRange = requiredElement<HTMLInputElement>("prop-light-range");
const propLightAngle = requiredElement<HTMLInputElement>("prop-light-angle");
const propLightCastShadows = requiredElement<HTMLInputElement>("prop-light-cast-shadows");
const propGroupLightRange = requiredElement<HTMLElement>("prop-group-light-range");
const propGroupLightAngle = requiredElement<HTMLElement>("prop-group-light-angle");
const propGroupLightShadows = requiredElement<HTMLElement>("prop-group-light-shadows");

const sceneFileInput = requiredElement<HTMLInputElement>("scene-file-input");

const tools = {
  select: requiredElement<HTMLButtonElement>("btn-tool-select"),
  translate: requiredElement<HTMLButtonElement>("btn-tool-translate"),
  rotate: requiredElement<HTMLButtonElement>("btn-tool-rotate"),
  scale: requiredElement<HTMLButtonElement>("btn-tool-scale"),
};

function requiredElement<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (!element) throw new Error(`Missing required element: ${id}`);
  return element as T;
}

function deepClone<T>(value: T): T {
  return structuredClone(value);
}

function indexNodes(root: Node): void {
  nodeIndex.clear();
  const stack = [root];
  while (stack.length > 0) {
    const node = stack.pop()!;
    if (nodeIndex.has(node.id)) {
      console.warn(`Duplicate node id encountered while indexing: ${node.id}`);
    }
    nodeIndex.set(node.id, node);
    for (let i = node.children.length - 1; i >= 0; i -= 1) {
      stack.push(node.children[i]);
    }
  }
}

function indexObjects(): void {
  objectIndex.clear();
  scene.traverse((object) => {
    const nodeId = object.userData[CANONICAL_NODE_ID];
    if (typeof nodeId === "string") {
      objectIndex.set(nodeId, object);
    }
  });
}

function makeAssetMap<T extends { id: string }>(assets: T[]): Map<string, T> {
  return new Map(assets.map((asset) => [asset.id, asset]));
}

function mergeMissingAssets<T extends { id: string }>(target: T[], builtins: T[]): void {
  const existing = new Set(target.map((asset) => asset.id));
  for (const asset of builtins) {
    if (!existing.has(asset.id)) {
      target.push(deepClone(asset));
      existing.add(asset.id);
    }
  }
}

function prepareSceneForEditing(sceneFile: SceneFile): SceneFile {
  mergeMissingAssets(sceneFile.assetLibrary.meshes, builtinMeshAssets);
  mergeMissingAssets(sceneFile.assetLibrary.materials, builtinMaterialAssets);
  mergeMissingAssets(sceneFile.assetLibrary.prefabs, builtinPrefabAssets);
  sceneFile.assetLibrary.textures ??= [];
  return sceneFile;
}

function renderCurrentScene(): void {
  selectedObject = null;
  transformControl.detach();
  loadSceneInto(scene, currentScene);
  scene.add(transformControl.getHelper());
  indexNodes(currentScene.sceneGraph.root);
  indexObjects();
  nextNodeId = computeNextNodeId();
  updatePropertyPanel();
  renderMaterialPanel();
}

function createMaterialAsset(name: string, color: string): MaterialAsset {
  const newId = `mat_${Date.now()}`;
  const mat: MaterialAsset = {
    id: newId,
    type: "material",
    name,
    albedoColor: color,
    metallic: 0,
    roughness: 0.5,
  };
  currentScene.assetLibrary.materials.push(mat);
  markModified();
  renderMaterialPanel();
  return mat;
}

function deleteMaterialAsset(id: string): void {
  const updateMaterialRefs = (node: Node) => {
    for (const comp of node.components) {
      if (comp.type === "mesh" && comp.materialRef === id) {
        comp.materialRef = undefined;
      }
    }
    for (const child of node.children) updateMaterialRefs(child);
  };
  updateMaterialRefs(currentScene.sceneGraph.root);

  for (const prefab of currentScene.assetLibrary.prefabs) {
    updateMaterialRefs(prefab.rootNode);
  }

  currentScene.assetLibrary.materials = currentScene.assetLibrary.materials.filter(m => m.id !== id);
  invalidateMaterialCache(id);
  markModified();
  renderMaterialPanel();
  renderCurrentScene();
}

function updateMaterialAsset(id: string, patch: Partial<MaterialAsset>): void {
  const mat = currentScene.assetLibrary.materials.find(m => m.id === id);
  if (!mat) return;
  if (patch.name !== undefined) mat.name = patch.name;
  if (patch.albedoColor !== undefined) mat.albedoColor = patch.albedoColor;
  if (patch.metallic !== undefined) mat.metallic = Math.max(0, Math.min(1, patch.metallic));
  if (patch.roughness !== undefined) mat.roughness = Math.max(0, Math.min(1, patch.roughness));
  
  markModified();
  invalidateMaterialCache(id);
  renderMaterialPanel();
  renderCurrentScene();
}

function renderMaterialPanel(): void {
  materialList.innerHTML = "";
  for (const mat of currentScene.assetLibrary.materials) {
    const item = document.createElement("div");
    item.className = "material-item";

    const header = document.createElement("div");
    header.className = "material-item-header";

    const swatch = document.createElement("div");
    swatch.className = "material-swatch";
    swatch.style.backgroundColor = mat.albedoColor || "#ffffff";
    header.appendChild(swatch);

    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = mat.name;
    nameInput.addEventListener("change", () => updateMaterialAsset(mat.id, { name: nameInput.value }));
    header.appendChild(nameInput);

    const colorInput = document.createElement("input");
    colorInput.type = "color";
    colorInput.value = mat.albedoColor || "#ffffff";
    colorInput.style.width = "30px";
    colorInput.style.height = "24px";
    colorInput.style.padding = "0";
    colorInput.addEventListener("change", () => updateMaterialAsset(mat.id, { albedoColor: colorInput.value }));
    header.appendChild(colorInput);

    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.style.color = "var(--danger-color)";
    delBtn.addEventListener("click", () => deleteMaterialAsset(mat.id));
    header.appendChild(delBtn);

    item.appendChild(header);

    const sliders = document.createElement("div");
    sliders.className = "material-item-sliders";

    const metallicLabel = document.createElement("label");
    metallicLabel.textContent = `Metallic: ${(mat.metallic ?? 0).toFixed(2)}`;
    sliders.appendChild(metallicLabel);

    const metallicInput = document.createElement("input");
    metallicInput.type = "range";
    metallicInput.min = "0";
    metallicInput.max = "1";
    metallicInput.step = "0.01";
    metallicInput.value = (mat.metallic ?? 0).toString();
    metallicInput.addEventListener("input", () => {
      metallicLabel.textContent = `Metallic: ${Number(metallicInput.value).toFixed(2)}`;
    });
    metallicInput.addEventListener("change", () => updateMaterialAsset(mat.id, { metallic: Number(metallicInput.value) }));
    sliders.appendChild(metallicInput);

    const roughnessLabel = document.createElement("label");
    roughnessLabel.textContent = `Roughness: ${(mat.roughness ?? 0.5).toFixed(2)}`;
    sliders.appendChild(roughnessLabel);

    const roughnessInput = document.createElement("input");
    roughnessInput.type = "range";
    roughnessInput.min = "0";
    roughnessInput.max = "1";
    roughnessInput.step = "0.01";
    roughnessInput.value = (mat.roughness ?? 0.5).toString();
    roughnessInput.addEventListener("input", () => {
      roughnessLabel.textContent = `Roughness: ${Number(roughnessInput.value).toFixed(2)}`;
    });
    roughnessInput.addEventListener("change", () => updateMaterialAsset(mat.id, { roughness: Number(roughnessInput.value) }));
    sliders.appendChild(roughnessInput);

    item.appendChild(sliders);
    materialList.appendChild(item);
  }
}

function computeNextNodeId(): number {
  let highest = 0;
  for (const id of nodeIndex.keys()) {
    const match = /(?:^|_)node_(\d+)$/.exec(id);
    if (match) highest = Math.max(highest, Number(match[1]));
  }
  return highest + 1;
}

function createNodeId(prefix: string): string {
  let id = `${prefix}_node_${nextNodeId}`;
  nextNodeId += 1;
  while (nodeIndex.has(id)) {
    id = `${prefix}_node_${nextNodeId}`;
    nextNodeId += 1;
  }
  return id;
}

function markModified(): void {
  currentScene.metadata.modifiedAt = new Date().toISOString();
}

function findSelectedNode(): Node | null {
  if (!selectedObject) return null;
  const nodeId = selectedObject.userData[CANONICAL_NODE_ID];
  return typeof nodeId === "string" ? nodeIndex.get(nodeId) ?? null : null;
}

function updateNodeFromObject(node: Node, object: THREE.Object3D): void {
  node.name = object.name;
  node.transform.position = [
    roundForJson(object.position.x),
    roundForJson(object.position.y),
    roundForJson(object.position.z),
  ];
  node.transform.rotation = [
    roundForJson(object.quaternion.x),
    roundForJson(object.quaternion.y),
    roundForJson(object.quaternion.z),
    roundForJson(object.quaternion.w),
  ];
  node.transform.scale = [
    roundForJson(object.scale.x),
    roundForJson(object.scale.y),
    roundForJson(object.scale.z),
  ];
}

function roundForJson(value: number): number {
  return Number(value.toFixed(6));
}

function updatePropertyPanel(): void {
  if (!selectedObject) {
    propPanelContent.style.display = "none";
    noSelectionMsg.style.display = "block";
    return;
  }
  propPanelContent.style.display = "block";
  noSelectionMsg.style.display = "none";

  propName.value = selectedObject.name || "Unnamed Object";

  px.value = selectedObject.position.x.toFixed(2);
  py.value = selectedObject.position.y.toFixed(2);
  pz.value = selectedObject.position.z.toFixed(2);

  const euler = new THREE.Euler().setFromQuaternion(selectedObject.quaternion);
  rx.value = THREE.MathUtils.radToDeg(euler.x).toFixed(1);
  ry.value = THREE.MathUtils.radToDeg(euler.y).toFixed(1);
  rz.value = THREE.MathUtils.radToDeg(euler.z).toFixed(1);

  sx.value = selectedObject.scale.x.toFixed(2);
  sy.value = selectedObject.scale.y.toFixed(2);
  sz.value = selectedObject.scale.z.toFixed(2);

  updateComponentPropertyPanel();
}

function updateComponentPropertyPanel(): void {
  propPanelMesh.style.display = "none";
  propPanelLight.style.display = "none";

  const node = findSelectedNode();
  if (!node) return;

  const meshComp = node.components.find((c) => c.type === "mesh") as Extract<Component, { type: "mesh" }> | undefined;
  if (meshComp) {
    propPanelMesh.style.display = "block";
    propMeshMaterial.innerHTML = "";

    const noneOpt = document.createElement("option");
    noneOpt.value = "";
    noneOpt.textContent = "Missing Material";
    noneOpt.selected = !meshComp.materialRef;
    propMeshMaterial.appendChild(noneOpt);

    for (const mat of currentScene.assetLibrary.materials) {
      const opt = document.createElement("option");
      opt.value = mat.id;
      opt.textContent = mat.name;
      opt.selected = mat.id === meshComp.materialRef;
      propMeshMaterial.appendChild(opt);
    }
    propMeshCastShadows.checked = meshComp.castShadows ?? false;
    propMeshReceiveShadows.checked = meshComp.receiveShadows ?? false;
  }

  const lightComp = node.components.find((c) => c.type === "light") as Extract<Component, { type: "light" }> | undefined;
  if (lightComp) {
    propPanelLight.style.display = "block";
    propLightType.value = lightComp.lightType;
    propLightColor.value = lightComp.color;
    propLightIntensity.value = lightComp.intensity.toString();
    
    if (lightComp.lightType === "directional" || lightComp.lightType === "ambient") {
      propGroupLightRange.style.display = "none";
    } else {
      propGroupLightRange.style.display = "flex";
      propLightRange.value = (lightComp.range ?? 10).toString();
    }

    if (lightComp.lightType === "spot") {
      propGroupLightAngle.style.display = "flex";
      propLightAngle.value = (lightComp.angle ?? 30).toString();
    } else {
      propGroupLightAngle.style.display = "none";
    }

    if (lightComp.lightType === "ambient") {
      propGroupLightShadows.style.display = "none";
    } else {
      propGroupLightShadows.style.display = "flex";
      propLightCastShadows.checked = lightComp.castShadows ?? false;
    }
  }
}

function updateComponentFromUI(): void {
  const node = findSelectedNode();
  if (!node) return;

  const meshComp = node.components.find((c) => c.type === "mesh") as Extract<Component, { type: "mesh" }> | undefined;
  if (meshComp && propPanelMesh.style.display !== "none") {
    const selectedMaterial = propMeshMaterial.value;
    meshComp.materialRef = selectedMaterial || undefined;
    meshComp.castShadows = propMeshCastShadows.checked;
    meshComp.receiveShadows = propMeshReceiveShadows.checked;
  }

  const lightComp = node.components.find((c) => c.type === "light") as Extract<Component, { type: "light" }> | undefined;
  if (lightComp && propPanelLight.style.display !== "none") {
    lightComp.lightType = propLightType.value as any;
    lightComp.color = propLightColor.value;
    lightComp.intensity = parseNumber(propLightIntensity, lightComp.intensity);
    if (lightComp.lightType === "point" || lightComp.lightType === "spot") {
      lightComp.range = parseNumber(propLightRange, lightComp.range ?? 10);
    }
    if (lightComp.lightType === "spot") {
      lightComp.angle = parseNumber(propLightAngle, lightComp.angle ?? 30);
    }
    if (lightComp.lightType !== "ambient") {
      lightComp.castShadows = propLightCastShadows.checked;
    }
  }

  markModified();
  renderCurrentScene();
  const object = objectIndex.get(node.id);
  if (object) {
    selectObject(object);
  }
}

function selectObject(obj: THREE.Object3D | null): void {
  selectedObject = obj;
  if (obj) {
    transformControl.attach(obj);
  } else {
    transformControl.detach();
  }
  updatePropertyPanel();
}

function resolveSelectableObject(object: THREE.Object3D): THREE.Object3D | null {
  let current: THREE.Object3D | null = object;
  while (current) {
    if (typeof current.userData[CANONICAL_NODE_ID] === "string") return current;
    current = current.parent;
  }
  return null;
}

viewport.addEventListener("pointerdown", (event) => {
  if (event.button !== 0) return;
  if (transformControl.dragging) return;

  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children, true);

  for (const hit of intersects) {
    if (hit.object instanceof THREE.GridHelper || hit.object.type === "Line" || hit.object.type === "Sprite") {
      continue;
    }
    const target = resolveSelectableObject(hit.object);
    if (target && target !== transformControl.getHelper()) {
      selectObject(target);
      return;
    }
  }

  selectObject(null);
});

function parseNumber(input: HTMLInputElement, fallback: number): number {
  const value = Number.parseFloat(input.value);
  return Number.isFinite(value) ? value : fallback;
}

function updateTransformFromUI(): void {
  if (!selectedObject) return;
  selectedObject.name = propName.value;
  selectedObject.position.set(
    parseNumber(px, selectedObject.position.x),
    parseNumber(py, selectedObject.position.y),
    parseNumber(pz, selectedObject.position.z),
  );

  const euler = new THREE.Euler(
    THREE.MathUtils.degToRad(parseNumber(rx, THREE.MathUtils.radToDeg(selectedObject.rotation.x))),
    THREE.MathUtils.degToRad(parseNumber(ry, THREE.MathUtils.radToDeg(selectedObject.rotation.y))),
    THREE.MathUtils.degToRad(parseNumber(rz, THREE.MathUtils.radToDeg(selectedObject.rotation.z))),
  );
  selectedObject.quaternion.setFromEuler(euler);

  selectedObject.scale.set(
    parseNumber(sx, selectedObject.scale.x),
    parseNumber(sy, selectedObject.scale.y),
    parseNumber(sz, selectedObject.scale.z),
  );

  const node = findSelectedNode();
  if (node) {
    updateNodeFromObject(node, selectedObject);
    markModified();
  }
}

for (const input of [px, py, pz, rx, ry, rz, sx, sy, sz, propName]) {
  input.addEventListener("change", updateTransformFromUI);
  input.addEventListener("keydown", (event) => event.stopPropagation());
}

for (const input of [propMeshMaterial, propMeshCastShadows, propMeshReceiveShadows, propLightType, propLightColor, propLightIntensity, propLightRange, propLightAngle, propLightCastShadows]) {
  input.addEventListener("change", updateComponentFromUI);
  input.addEventListener("keydown", (event) => event.stopPropagation());
}

transformControl.addEventListener("objectChange", () => {
  if (!selectedObject) return;
  const node = findSelectedNode();
  if (!node) return;
  updateNodeFromObject(node, selectedObject);
  markModified();
  updatePropertyPanel();
});

function setTool(mode: ToolMode): void {
  Object.values(tools).forEach((btn) => btn.classList.remove("active"));

  if (mode === "select") {
    transformControl.enabled = false;
    transformControl.getHelper().visible = false;
    tools.select.classList.add("active");
  } else {
    transformControl.enabled = true;
    transformControl.getHelper().visible = true;
    transformControl.setMode(mode);
    tools[mode].classList.add("active");
  }
}

tools.select.addEventListener("click", () => setTool("select"));
tools.translate.addEventListener("click", () => setTool("translate"));
tools.rotate.addEventListener("click", () => setTool("rotate"));
tools.scale.addEventListener("click", () => setTool("scale"));

let isRMBHeld = false;
const keyState = { w: false, a: false, s: false, d: false };

viewport.addEventListener("contextmenu", (event) => event.preventDefault());

viewport.addEventListener("pointerdown", (event) => {
  if (event.button === 2) isRMBHeld = true;
});

window.addEventListener("pointerup", (event) => {
  if (event.button === 2) isRMBHeld = false;
});

window.addEventListener("pointercancel", () => {
  isRMBHeld = false;
});

window.addEventListener("blur", () => {
  isRMBHeld = false;
  for (const key of Object.keys(keyState) as Array<keyof typeof keyState>) {
    keyState[key] = false;
  }
});

function isInputFocused(): boolean {
  const active = document.activeElement;
  if (!active) return false;
  const tag = active.tagName.toLowerCase();
  return tag === "input" || tag === "textarea" || tag === "select" || (active as HTMLElement).isContentEditable;
}

window.addEventListener("keydown", (event) => {
  if (isInputFocused()) return;

  const key = event.key.toLowerCase();
  if (key in keyState) {
    keyState[key as keyof typeof keyState] = true;
  }

  if (!isRMBHeld) {
    switch (key) {
      case "q":
        setTool("select");
        break;
      case "w":
        setTool("translate");
        break;
      case "e":
        setTool("rotate");
        break;
      case "r":
        setTool("scale");
        break;
    }
  }
});

window.addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase();
  if (key in keyState) {
    keyState[key as keyof typeof keyState] = false;
  }
});

let lastTime = performance.now();
function updateFlyCamera(): void {
  requestAnimationFrame(updateFlyCamera);
  const now = performance.now();
  const dt = (now - lastTime) / 1000;
  lastTime = now;

  if (isRMBHeld && !isInputFocused()) {
    const speed = 10 * dt;
    const move = new THREE.Vector3();
    const forward = new THREE.Vector3();
    const right = new THREE.Vector3();

    camera.getWorldDirection(forward);
    right.crossVectors(forward, camera.up).normalize();

    if (keyState.w) move.add(forward);
    if (keyState.s) move.sub(forward);
    if (keyState.a) move.sub(right);
    if (keyState.d) move.add(right);

    if (move.lengthSq() > 0) {
      move.normalize().multiplyScalar(speed);
      camera.position.add(move);
      controls.target.add(move);
    }
  }
}

function createPrimitiveNode(type: PrimitiveType): Node {
  const meshRefByType: Record<PrimitiveType, string> = {
    cube: "mesh_cube",
    sphere: "mesh_sphere",
    cylinder: "mesh_cylinder",
    plane: "mesh_plane",
  };
  return {
    id: createNodeId(type),
    name: `New ${capitalize(type)}`,
    transform: {
      position: [0, type === "plane" ? 0 : 1, 0],
      rotation: [0, 0, 0, 1],
      scale: [1, 1, 1],
    },
    components: [
      {
        type: "mesh",
        meshRef: meshRefByType[type],
        materialRef: "mat_editor_blue",
        castShadows: true,
        receiveShadows: true,
      },
    ],
    children: [],
  };
}

function createLightNode(type: Extract<Component, { type: "light" }>["lightType"]): Node {
  const node: Node = {
    id: createNodeId("light"),
    name: `New ${capitalize(type)} Light`,
    transform: { position: [0, 5, 0], rotation: [0, 0, 0, 1], scale: [1, 1, 1] },
    components: [],
    children: [],
  };

  switch (type) {
    case "directional":
      node.transform.position = [5, 10, 5];
      node.components.push({ type: "light", lightType: "directional", color: "#FFFFFF", intensity: 1.5, castShadows: false });
      break;
    case "point":
      node.components.push({ type: "light", lightType: "point", color: "#FFFFFF", intensity: 10, range: 10, castShadows: false });
      break;
    case "spot":
      node.components.push({ type: "light", lightType: "spot", color: "#FFFFFF", intensity: 10, range: 20, angle: 30, castShadows: false });
      break;
    case "ambient":
      node.transform.position = [0, 0, 0];
      node.components.push({ type: "light", lightType: "ambient", color: "#404040", intensity: 1.0 });
      break;
  }
  return node;
}

function addLight(type: Extract<Component, { type: "light" }>["lightType"]): void {
  addNodeToScene(createLightNode(type));
}

function createPrefabInstanceNode(prefab: PrefabAsset): Node {
  return {
    id: createNodeId(prefab.id.replace(/^prefab_/, "")),
    name: prefab.name,
    transform: {
      position: [0, 0, 0],
      rotation: [0, 0, 0, 1],
      scale: [1, 1, 1],
    },
    components: [
      { type: "prefabRef", prefabRef: prefab.id },
    ],
    children: [],
  };
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function ensureEditorMaterial(): void {
  if (currentScene.assetLibrary.materials.some((material) => material.id === "mat_editor_blue")) return;
  currentScene.assetLibrary.materials.push({
    id: "mat_editor_blue",
    type: "material",
    name: "Editor Blue",
    albedoColor: "#3B82F6",
    roughness: 0.5,
  });
}

function addNodeToScene(node: Node): void {
  currentScene.sceneGraph.root.children.push(node);
  nodeIndex.set(node.id, node);
  markModified();
  renderCurrentScene();
  const object = objectIndex.get(node.id);
  if (object) {
    selectObject(object);
    setTool("translate");
  }
}

function addPrimitive(type: PrimitiveType): void {
  ensureEditorMaterial();
  addNodeToScene(createPrimitiveNode(type));
}

function addPrefab(prefabId: string): void {
  const prefabMap = makeAssetMap(currentScene.assetLibrary.prefabs);
  const prefab = prefabMap.get(prefabId);
  if (!prefab) {
    alert(`Prefab is not available in this scene: ${prefabId}`);
    return;
  }
  addNodeToScene(createPrefabInstanceNode(prefab));
}

function saveScene(): void {
  markModified();
  const sceneJson = `${JSON.stringify(currentScene, null, 2)}\n`;
  const blob = new Blob([sceneJson], { type: "application/json" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = `${sanitizeFileName(currentScene.metadata.name || "world-creator-scene")}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function sanitizeFileName(value: string): string {
  const sanitized = value.toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "");
  return sanitized || "world-creator-scene";
}

async function exportUnity(): Promise<void> {
  try {
    const files = generateUnityPackage(currentScene);
    const zip = new JSZip();
    for (const [filePath, content] of Object.entries(files)) {
      zip.file(filePath, content);
    }
    const blob = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `${sanitizeFileName(currentScene.metadata.name || "world-creator-scene")}-unity-package.zip`;
    link.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Unity export failed:", error);
    alert("Unity export failed. Check the browser console for details.");
  }
}

function isSceneFile(value: unknown): value is SceneFile {
  if (!value || typeof value !== "object") return false;
  const sceneFile = value as SceneFile;
  return (
    sceneFile.version === SCENE_VERSION &&
    Boolean(sceneFile.metadata) &&
    Boolean(sceneFile.assetLibrary) &&
    Array.isArray(sceneFile.assetLibrary.meshes) &&
    Array.isArray(sceneFile.assetLibrary.materials) &&
    Array.isArray(sceneFile.assetLibrary.textures) &&
    Array.isArray(sceneFile.assetLibrary.prefabs) &&
    Boolean(sceneFile.sceneGraph?.root) &&
    isNode(sceneFile.sceneGraph.root)
  );
}

function isNode(value: unknown): value is Node {
  if (!value || typeof value !== "object") return false;
  const node = value as Node;
  return (
    typeof node.id === "string" &&
    typeof node.name === "string" &&
    isTransform(node.transform) &&
    Array.isArray(node.components) &&
    Array.isArray(node.children) &&
    node.children.every(isNode)
  );
}

function isTransform(value: unknown): value is Node["transform"] {
  if (!value || typeof value !== "object") return false;
  const transform = value as Node["transform"];
  return isNumberTuple(transform.position, 3) && isNumberTuple(transform.rotation, 4) && isNumberTuple(transform.scale, 3);
}

function isNumberTuple(value: unknown, length: number): boolean {
  return Array.isArray(value) && value.length === length && value.every((item) => typeof item === "number" && Number.isFinite(item));
}

function normalizeLoadedScene(sceneFile: SceneFile): SceneFile {
  const stripPlaceholderRef = (node: Node) => {
    for (const comp of node.components) {
      if (comp.type === "mesh" && comp.materialRef === "mat_missing_placeholder") {
        comp.materialRef = undefined;
      }
    }
    for (const child of node.children) stripPlaceholderRef(child);
  };
  stripPlaceholderRef(sceneFile.sceneGraph.root);
  for (const prefab of sceneFile.assetLibrary.prefabs) {
    stripPlaceholderRef(prefab.rootNode);
  }

  return {
    ...sceneFile,
    assetLibrary: {
      meshes: sceneFile.assetLibrary.meshes as MeshAsset[],
      materials: sceneFile.assetLibrary.materials.filter((m) => m.id !== "mat_missing_placeholder") as MaterialAsset[],
      textures: sceneFile.assetLibrary.textures,
      prefabs: sceneFile.assetLibrary.prefabs,
    },
    metadata: {
      ...sceneFile.metadata,
      modifiedAt: new Date().toISOString(),
    },
  };
}

async function loadSceneFile(file: File): Promise<void> {
  try {
    const parsed = JSON.parse(await file.text()) as unknown;
    if (!isSceneFile(parsed)) {
      alert("That file is not a supported World Creator scene JSON file.");
      return;
    }
    currentScene = prepareSceneForEditing(normalizeLoadedScene(parsed));
    renderCurrentScene();
    setTool("select");
  } catch (error) {
    console.error(error);
    alert("Could not load the scene JSON. Check that the file is valid JSON.");
  } finally {
    sceneFileInput.value = "";
  }
}

function resetScene(): void {
  currentScene = prepareSceneForEditing(deepClone(demoScene));
  renderCurrentScene();
  setTool("select");
}

requiredElement<HTMLButtonElement>("btn-add-cube").addEventListener("click", () => addPrimitive("cube"));
requiredElement<HTMLButtonElement>("btn-add-sphere").addEventListener("click", () => addPrimitive("sphere"));
requiredElement<HTMLButtonElement>("btn-add-cylinder").addEventListener("click", () => addPrimitive("cylinder"));
requiredElement<HTMLButtonElement>("btn-add-plane").addEventListener("click", () => addPrimitive("plane"));
requiredElement<HTMLButtonElement>("btn-add-directional").addEventListener("click", () => addLight("directional"));
requiredElement<HTMLButtonElement>("btn-add-point").addEventListener("click", () => addLight("point"));
requiredElement<HTMLButtonElement>("btn-add-spot").addEventListener("click", () => addLight("spot"));
btnAddMaterial.addEventListener("click", () => createMaterialAsset("New Material", "#ffffff"));
requiredElement<HTMLButtonElement>("btn-save-scene").addEventListener("click", saveScene);
requiredElement<HTMLButtonElement>("btn-load-scene").addEventListener("click", () => sceneFileInput.click());
requiredElement<HTMLButtonElement>("btn-export-unity").addEventListener("click", () => void exportUnity());
requiredElement<HTMLButtonElement>("btn-reset-scene").addEventListener("click", resetScene);

sceneFileInput.addEventListener("change", () => {
  const file = sceneFileInput.files?.[0];
  if (file) void loadSceneFile(file);
});

for (const button of document.querySelectorAll<HTMLButtonElement>(".prefab-button")) {
  button.addEventListener("click", () => {
    const prefabId = button.dataset.prefabId;
    if (prefabId) addPrefab(prefabId);
  });
}

renderCurrentScene();
setTool("select");
updateFlyCamera();
