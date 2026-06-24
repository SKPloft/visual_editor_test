Title: StereoPassNode
Source URL: https://threejs.org/docs/pages/StereoPassNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [TempNode](TempNode.html) → [PassNode](PassNode.html) →

# StereoPassNode

A special render pass node that renders the scene as a stereoscopic image.

## Import

StereoPassNode is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { stereoPass } from 'three/addons/tsl/display/StereoPassNode.js';
```

## Constructor

### new [StereoPassNode](#StereoPassNode)( scene : [Scene](Scene.html), camera : [Camera](Camera.html) )

Constructs a new stereo pass node.

**scene**

The scene to render.

**camera**

The camera to render the scene with.

## Properties

### .[isStereoPassNode](#isStereoPassNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[stereo](#stereo) : [StereoCamera](StereoCamera.html)

The internal stereo camera that is used to render the scene.

## Methods

### .[updateBefore](#updateBefore)( frame : [NodeFrame](NodeFrame.html) )

This method is used to render the stereo effect once per frame.

**frame**

The current node frame.

**Overrides:** [PassNode#updateBefore](PassNode.html#updateBefore)

## Source

[examples/jsm/tsl/display/StereoPassNode.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/tsl/display/StereoPassNode.js)