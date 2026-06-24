Title: ToonOutlinePassNode
Source URL: https://threejs.org/docs/pages/ToonOutlinePassNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [TempNode](TempNode.html) → [PassNode](PassNode.html) →

# ToonOutlinePassNode

Represents a render pass for producing a toon outline effect on compatible objects. Only 3D objects with materials of type `MeshToonMaterial` and `MeshToonNodeMaterial` will receive the outline.

## Code Example

```js
const postProcessing = new RenderPipeline( renderer );
const scenePass = toonOutlinePass( scene, camera );
postProcessing.outputNode = scenePass;
```

## Constructor

### new [ToonOutlinePassNode](#ToonOutlinePassNode)( scene : [Scene](Scene.html), camera : [Camera](Camera.html), colorNode : [Node](Node.html), thicknessNode : [Node](Node.html), alphaNode : [Node](Node.html) )

Constructs a new outline pass node.

**scene**

A reference to the scene.

**camera**

A reference to the camera.

**colorNode**

Defines the outline's color.

**thicknessNode**

Defines the outline's thickness.

**alphaNode**

Defines the outline's alpha.

## Properties

### .[alphaNode](#alphaNode) : [Node](Node.html)

Defines the outline's alpha.

### .[colorNode](#colorNode) : [Node](Node.html)

Defines the outline's color.

### .[name](#name) : string

The name of this pass.

Default is `'Outline Pass'`.

**Overrides:** [PassNode#name](PassNode.html#name)

### .[thicknessNode](#thicknessNode) : [Node](Node.html)

Defines the outline's thickness.

## Source

[src/nodes/display/ToonOutlinePassNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/display/ToonOutlinePassNode.js)