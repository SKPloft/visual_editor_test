import { createEditor, loadSceneInto } from "./scene/sceneLoader.ts";
import { demoScene } from "./scene/demoScene.ts";

const viewport = document.getElementById("viewport");
if (!viewport) throw new Error("Viewport container not found");

const { scene } = createEditor(viewport);
loadSceneInto(scene, demoScene);
