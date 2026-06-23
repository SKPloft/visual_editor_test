Title: StereoCompositePassNode
Source URL: https://threejs.org/docs/pages/StereoCompositePassNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [TempNode](TempNode.html) → [PassNode](PassNode.html) →

# StereoCompositePassNode

A special (abstract) render pass node that renders the scene as a stereoscopic image. Unlike [StereoPassNode](StereoPassNode.html), this node merges the image for the left and right eye into a single one. That is required for effects like anaglyph or parallax barrier.

## Import

StereoCompositePassNode is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { StereoCompositePassNode } from 'three/addons/tsl/display/StereoCompositePassNode.js';
```

## Constructor

### new [StereoCompositePassNode](#StereoCompositePassNode)( scene : [Scene](Scene.html), camera : [Camera](Camera.html) ) (abstract)

Constructs a new stereo composite pass node.

**scene**

The scene to render.

**camera**

The camera to render the scene with.

## Properties

### .[isStereoCompositePassNode](#isStereoCompositePassNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[stereo](#stereo) : [StereoCamera](StereoCamera.html)

The internal stereo camera that is used to render the scene.

## Methods

### .[dispose](#dispose)()

Frees internal resources. This method should be called when the pass is no longer required.

**Overrides:** [PassNode#dispose](PassNode.html#dispose)

### .[setSize](#setSize)( width : number, height : number )

Sets the size of the pass.

**width**

The width of the pass.

**height**

The height of the pass.

**Overrides:** [PassNode#setSize](PassNode.html#setSize)

### .[updateBefore](#updateBefore)( frame : [NodeFrame](NodeFrame.html) )

This method is used to render the effect once per frame.

**frame**

The current node frame.

**Overrides:** [PassNode#updateBefore](PassNode.html#updateBefore)

### .[updateStereoCamera](#updateStereoCamera)( coordinateSystem : number )

Updates the internal stereo camera.

**coordinateSystem**

The current coordinate system.

## Source

[examples/jsm/tsl/display/StereoCompositePassNode.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/tsl/display/StereoCompositePassNode.js)