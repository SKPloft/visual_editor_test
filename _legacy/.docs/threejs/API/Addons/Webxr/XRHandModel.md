Title: XRHandModel
Source URL: https://threejs.org/docs/pages/XRHandModel.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) →

# XRHandModel

Represents a XR hand model.

## Constructor

### new [XRHandModel](#XRHandModel)( controller : [Group](Group.html) )

Constructs a new XR hand model.

**controller**

The hand controller.

## Properties

### .[controller](#controller) : [Group](Group.html)

The hand controller.

### .[envMap](#envMap) : [Texture](Texture.html)

The controller's environment map.

Default is `null`.

### .[mesh](#mesh) : [Mesh](Mesh.html)

The model mesh.

Default is `null`.

### .[motionController](#motionController) : MotionController

The motion controller.

Default is `null`.

## Methods

### .[updateMatrixWorld](#updateMatrixWorld)( force : boolean )

Overwritten with a custom implementation. Makes sure the motion controller updates the mesh.

**force**

When set to `true`, a recomputation of world matrices is forced even when [Object3D#matrixWorldAutoUpdate](Object3D.html#matrixWorldAutoUpdate) is set to `false`.

Default is `false`.

**Overrides:** [Object3D#updateMatrixWorld](Object3D.html#updateMatrixWorld)

## Source

[examples/jsm/webxr/XRHandModelFactory.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/webxr/XRHandModelFactory.js)