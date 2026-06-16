Title: OculusHandPointerModel
Source URL: https://threejs.org/docs/pages/OculusHandPointerModel.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) →

# OculusHandPointerModel

Represents an Oculus hand pointer model.

## Import

OculusHandPointerModel is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { OculusHandPointerModel } from 'three/addons/webxr/OculusHandPointerModel.js';
```

## Constructor

### new [OculusHandPointerModel](#OculusHandPointerModel)( hand : [Group](Group.html), controller : [Group](Group.html) )

Constructs a new Oculus hand model.

**hand**

The hand controller.

**controller**

The WebXR controller in target ray space.

## Properties

### .[attached](#attached) : boolean

Whether the model is attached or not.

Default is `false`.

### .[controller](#controller) : [Group](Group.html)

The WebXR controller in target ray space.

### .[cursorObject](#cursorObject) : [Mesh](Mesh.html)

The cursor object.

Default is `null`.

### .[hand](#hand) : [Group](Group.html)

The hand controller.

### .[pinched](#pinched) : boolean

Whether the model is pinched or not.

Default is `false`.

### .[pointerGeometry](#pointerGeometry) : [BufferGeometry](BufferGeometry.html)

The pointer geometry.

Default is `null`.

### .[pointerMesh](#pointerMesh) : [Mesh](Mesh.html)

The pointer mesh.

Default is `null`.

### .[pointerObject](#pointerObject) : [Object3D](Object3D.html)

The pointer object that holds the pointer mesh.

Default is `null`.

### .[raycaster](#raycaster) : [Raycaster](Raycaster.html)

The internal raycaster used for detecting intersections.

Default is `null`.

## Methods

### .[checkIntersections](#checkIntersections)( objects : Array.<[Object3D](Object3D.html)\>, recursive : boolean )

Checks for intersections between the model's raycaster and the given objects. The method updates the cursor object to the intersection point.

**objects**

The 3D objects to check for intersection with the ray.

**recursive**

If set to `true`, it also checks all descendants. Otherwise it only checks intersection with the object.

Default is `false`.

### .[createPointer](#createPointer)()

Creates a pointer mesh and adds it to this model.

### .[dispose](#dispose)()

Frees the GPU-related resources allocated by this instance. Call this method whenever this instance is no longer used in your app.

### .[intersectObject](#intersectObject)( object : [Object3D](Object3D.html), recursive : boolean ) : Array.<[Raycaster~Intersection](Raycaster.html#~Intersection)\>

Performs an intersection test with the model's raycaster and the given object.

**object**

The 3D object to check for intersection with the ray.

**recursive**

If set to `true`, it also checks all descendants. Otherwise it only checks intersection with the object.

Default is `true`.

**Returns:** An array holding the intersection points.

### .[intersectObjects](#intersectObjects)( objects : Array.<[Object3D](Object3D.html)\>, recursive : boolean ) : Array.<[Raycaster~Intersection](Raycaster.html#~Intersection)\>

Performs an intersection test with the model's raycaster and the given objects.

**objects**

The 3D objects to check for intersection with the ray.

**recursive**

If set to `true`, it also checks all descendants. Otherwise it only checks intersection with the object.

Default is `true`.

**Returns:** An array holding the intersection points.

### .[isAttached](#isAttached)() : boolean

Returns `true` is the model is attached.

**Returns:** Whether the model is attached or not.

### .[isPinched](#isPinched)() : boolean

Returns `true` is the model is pinched.

**Returns:** Whether the model is pinched or not.

### .[setAttached](#setAttached)( attached : boolean )

Sets the attached state.

**attached**

Whether the model is attached or not.

### .[setCursor](#setCursor)( distance : number )

Sets the cursor to the given distance.

**distance**

The distance to set the cursor to.

### .[updateMatrixWorld](#updateMatrixWorld)( force : boolean )

Overwritten with a custom implementation. Makes sure the internal pointer and raycaster are updated.

**force**

When set to `true`, a recomputation of world matrices is forced even when [Object3D#matrixWorldAutoUpdate](Object3D.html#matrixWorldAutoUpdate) is set to `false`.

Default is `false`.

**Overrides:** [Object3D#updateMatrixWorld](Object3D.html#updateMatrixWorld)

## Source

[examples/jsm/webxr/OculusHandPointerModel.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/webxr/OculusHandPointerModel.js)