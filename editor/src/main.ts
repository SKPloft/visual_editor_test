import * as THREE from "three";
import { TransformControls } from "three/addons/controls/TransformControls.js";
import { createEditor, loadSceneInto } from "./scene/sceneLoader.ts";
import { demoScene } from "./scene/demoScene.ts";

const viewport = document.getElementById("viewport");
if (!viewport) throw new Error("Viewport container not found");

const { scene, camera, renderer, controls } = createEditor(viewport);
loadSceneInto(scene, demoScene);

// Setup TransformControls
const transformControl = new TransformControls(camera, renderer.domElement);
transformControl.addEventListener('dragging-changed', (event) => {
  controls.enabled = !event.value; // Disable orbit controls while dragging gizmo
});
scene.add(transformControl.getHelper());

// Raycaster for selection
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let selectedObject: THREE.Object3D | null = null;

// UI Elements
const propPanelContent = document.getElementById('properties-content') as HTMLElement;
const noSelectionMsg = document.getElementById('no-selection-msg') as HTMLElement;
const propName = document.getElementById('prop-name') as HTMLInputElement;

const px = document.getElementById('prop-pos-x') as HTMLInputElement;
const py = document.getElementById('prop-pos-y') as HTMLInputElement;
const pz = document.getElementById('prop-pos-z') as HTMLInputElement;

const rx = document.getElementById('prop-rot-x') as HTMLInputElement;
const ry = document.getElementById('prop-rot-y') as HTMLInputElement;
const rz = document.getElementById('prop-rot-z') as HTMLInputElement;

const sx = document.getElementById('prop-scale-x') as HTMLInputElement;
const sy = document.getElementById('prop-scale-y') as HTMLInputElement;
const sz = document.getElementById('prop-scale-z') as HTMLInputElement;

function updatePropertyPanel() {
  if (!selectedObject) {
    propPanelContent.style.display = 'none';
    noSelectionMsg.style.display = 'block';
    return;
  }
  propPanelContent.style.display = 'block';
  noSelectionMsg.style.display = 'none';
  
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
}

transformControl.addEventListener('change', updatePropertyPanel);

function selectObject(obj: THREE.Object3D | null) {
  selectedObject = obj;
  if (obj) {
    transformControl.attach(obj);
  } else {
    transformControl.detach();
  }
  updatePropertyPanel();
}

viewport.addEventListener('pointerdown', (event) => {
  if (transformControl.dragging) return;
  
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  
  raycaster.setFromCamera(mouse, camera);
  const selectableObjects = scene.children.filter(c => 
    c !== transformControl.getHelper() && 
    !(c instanceof THREE.GridHelper) && 
    !(c instanceof THREE.AmbientLight)
  );
  
  const intersects = raycaster.intersectObjects(selectableObjects, true);
  
  let target: THREE.Object3D | null = null;
  for (const hit of intersects) {
    if (hit.object instanceof THREE.GridHelper || hit.object.type === 'Line' || hit.object.type === 'Sprite') continue;
    // Walk up to find the root group added to the scene
    let obj = hit.object;
    while (obj.parent && obj.parent.type !== 'Scene') {
      obj = obj.parent;
    }
    target = obj;
    break;
  }
  
  selectObject(target);
});

function updateTransformFromUI() {
  if (!selectedObject) return;
  selectedObject.name = propName.value;
  selectedObject.position.set(parseFloat(px.value), parseFloat(py.value), parseFloat(pz.value));
  
  const euler = new THREE.Euler(
    THREE.MathUtils.degToRad(parseFloat(rx.value)),
    THREE.MathUtils.degToRad(parseFloat(ry.value)),
    THREE.MathUtils.degToRad(parseFloat(rz.value))
  );
  selectedObject.quaternion.setFromEuler(euler);
  
  selectedObject.scale.set(parseFloat(sx.value), parseFloat(sy.value), parseFloat(sz.value));
}

[px, py, pz, rx, ry, rz, sx, sy, sz, propName].forEach(input => {
  input.addEventListener('change', updateTransformFromUI);
  input.addEventListener('keydown', (e) => e.stopPropagation());
});

const tools = {
  select: document.getElementById('btn-tool-select')!,
  translate: document.getElementById('btn-tool-translate')!,
  rotate: document.getElementById('btn-tool-rotate')!,
  scale: document.getElementById('btn-tool-scale')!
};

function setTool(mode: 'translate' | 'rotate' | 'scale' | 'select') {
  Object.values(tools).forEach(btn => btn.classList.remove('active'));
  
  if (mode === 'select') {
    transformControl.enabled = false;
    transformControl.getHelper().visible = false;
    tools.select.classList.add('active');
  } else {
    transformControl.enabled = true;
    transformControl.getHelper().visible = true;
    transformControl.setMode(mode);
    tools[mode].classList.add('active');
  }
}

tools.select.addEventListener('click', () => setTool('select'));
tools.translate.addEventListener('click', () => setTool('translate'));
tools.rotate.addEventListener('click', () => setTool('rotate'));
tools.scale.addEventListener('click', () => setTool('scale'));

window.addEventListener('keydown', (event) => {
  if (document.activeElement?.tagName === 'INPUT') return;
  switch (event.key.toLowerCase()) {
    case 'q': setTool('select'); break;
    case 'w': setTool('translate'); break;
    case 'e': setTool('rotate'); break;
    case 'r': setTool('scale'); break;
  }
});

function addPrimitive(type: string) {
  let geometry: THREE.BufferGeometry;
  if (type === 'cube') geometry = new THREE.BoxGeometry();
  else if (type === 'sphere') geometry = new THREE.SphereGeometry(0.5, 32, 16);
  else if (type === 'cylinder') geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
  else geometry = new THREE.PlaneGeometry();

  const material = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.5 });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  
  const group = new THREE.Group();
  group.name = `New ${type}`;
  group.position.set(0, 1, 0);
  group.add(mesh);
  
  scene.add(group);
  selectObject(group);
  setTool('translate');
}

document.getElementById('btn-add-cube')?.addEventListener('click', () => addPrimitive('cube'));
document.getElementById('btn-add-sphere')?.addEventListener('click', () => addPrimitive('sphere'));
document.getElementById('btn-add-cylinder')?.addEventListener('click', () => addPrimitive('cylinder'));
document.getElementById('btn-add-plane')?.addEventListener('click', () => addPrimitive('plane'));
document.getElementById('btn-add-light')?.addEventListener('click', () => {
    const light = new THREE.PointLight(0xffffff, 10, 10);
    const group = new THREE.Group();
    group.name = "New Point Light";
    group.position.set(0, 5, 0);
    group.add(light);
    scene.add(group);
    selectObject(group);
    setTool('translate');
});

setTool('select');
