Title: Camera
Source URL: https://threejs.org/docs/pages/Camera.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) →

# Camera

Abstract base class for cameras. This class should always be inherited when you build a new camera.

## Constructor

### new [Camera](#Camera)() (abstract)

Constructs a new camera.

## Properties

### .[coordinateSystem](#coordinateSystem) : [WebGLCoordinateSystem](global.html#WebGLCoordinateSystem) | [WebGPUCoordinateSystem](global.html#WebGPUCoordinateSystem)

The coordinate system in which the camera is used.

### .[isCamera](#isCamera) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[matrixWorldInverse](#matrixWorldInverse) : [Matrix4](Matrix4.html)

The inverse of the camera's world matrix.

### .[projectionMatrix](#projectionMatrix) : [Matrix4](Matrix4.html)

The camera's projection matrix.

### .[projectionMatrixInverse](#projectionMatrixInverse) : [Matrix4](Matrix4.html)

The inverse of the camera's projection matrix.

### .[reversedDepth](#reversedDepth) : boolean

The flag that indicates whether the camera uses a reversed depth buffer.

Default is `false`.

## Methods

### .[getWorldDirection](#getWorldDirection)( target : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Returns a vector representing the ("look") direction of the 3D object in world space.

This method is overwritten since cameras have a different forward vector compared to other 3D objects. A camera looks down its local, negative z-axis by default.

**target**

The target vector the result is stored to.

**Overrides:** [Object3D#getWorldDirection](Object3D.html#getWorldDirection)

**Returns:** The 3D object's direction in world space.

## Source

[src/cameras/Camera.js](https://github.com/mrdoob/three.js/blob/master/src/cameras/Camera.js)