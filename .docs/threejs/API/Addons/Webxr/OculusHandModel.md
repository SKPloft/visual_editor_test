Title: OculusHandModel
Source URL: https://threejs.org/docs/pages/OculusHandModel.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) →

# OculusHandModel

Represents an Oculus hand model.

## Import

OculusHandModel is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { OculusHandModel } from 'three/addons/webxr/OculusHandModel.js';
```

## Constructor

### new [OculusHandModel](#OculusHandModel)( controller : [Group](Group.html), loader : [Loader](Loader.html), onLoad : function )

Constructs a new Oculus hand model.

**controller**

The hand controller.

**loader**

A loader that is used to load hand models.

Default is `null`.

**onLoad**

A callback that is executed when a hand model has been loaded.

Default is `null`.

## Properties

### .[controller](#controller) : [Group](Group.html)

The hand controller.

### .[envMap](#envMap) : [Texture](Texture.html)

The model's environment map.

Default is `null`.

### .[loader](#loader) : [Loader](Loader.html)

A loader that is used to load hand models.

Default is `null`.

### .[mesh](#mesh) : [Mesh](Mesh.html)

The model mesh.

Default is `null`.

### .[motionController](#motionController) : MotionController

The motion controller.

Default is `null`.

### .[onLoad](#onLoad) : function

A callback that is executed when a hand model has been loaded.

Default is `null`.

### .[path](#path) : string

The path to the model repository.

Default is `null`.

## Methods

### .[checkButton](#checkButton)( button : Object )

Executed actions depending on the interaction state with the given button.

**button**

The button.

### .[getPointerPosition](#getPointerPosition)() : [Vector3](Vector3.html)

Returns the pointer position which is the position of the index finger tip.

**Returns:** The pointer position. Returns `null` if not index finger tip joint was found.

### .[intersectBoxObject](#intersectBoxObject)( boxObject : [Mesh](Mesh.html) ) : boolean

Returns `true` if the current pointer position (the index finger tip) intersections with the given box object.

**boxObject**

The box object.

**Returns:** Whether an intersection was found or not.

### .[updateMatrixWorld](#updateMatrixWorld)( force : boolean )

Overwritten with a custom implementation. Makes sure the motion controller updates the mesh.

**force**

When set to `true`, a recomputation of world matrices is forced even when [Object3D#matrixWorldAutoUpdate](Object3D.html#matrixWorldAutoUpdate) is set to `false`.

Default is `false`.

**Overrides:** [Object3D#updateMatrixWorld](Object3D.html#updateMatrixWorld)

## Source

[examples/jsm/webxr/OculusHandModel.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/webxr/OculusHandModel.js)