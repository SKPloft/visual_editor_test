Title: FrustumArray
Source URL: https://threejs.org/docs/pages/FrustumArray.html

# FrustumArray

FrustumArray is used to determine if an object is visible in at least one camera from an array of cameras. This is particularly useful for multi-view renderers.

## Constructor

### new [FrustumArray](#FrustumArray)()

Constructs a new frustum array.

## Properties

### .[coordinateSystem](#coordinateSystem) : [WebGLCoordinateSystem](global.html#WebGLCoordinateSystem) | [WebGPUCoordinateSystem](global.html#WebGPUCoordinateSystem)

The coordinate system to use.

Default is `WebGLCoordinateSystem`.

## Methods

### .[clone](#clone)() : [FrustumArray](FrustumArray.html)

Returns a new frustum array with copied values from this instance.

**Returns:** A clone of this instance.

### .[containsPoint](#containsPoint)( point : [Vector3](Vector3.html), cameraArray : Object ) : boolean

Returns `true` if the given point lies within any frustum from the camera array.

**point**

The point to test.

**cameraArray**

An object with a cameras property containing an array of cameras.

**Returns:** Whether the point is visible in any camera.

### .[intersectsBox](#intersectsBox)( box : [Box3](Box3.html), cameraArray : Object ) : boolean

Returns `true` if the given bounding box is intersecting any frustum from the camera array.

**box**

The bounding box to test.

**cameraArray**

An object with a cameras property containing an array of cameras.

**Returns:** Whether the box is visible in any camera.

### .[intersectsObject](#intersectsObject)( object : [Object3D](Object3D.html), cameraArray : Object ) : boolean

Returns `true` if the 3D object's bounding sphere is intersecting any frustum from the camera array.

**object**

The 3D object to test.

**cameraArray**

An object with a cameras property containing an array of cameras.

**Returns:** Whether the 3D object is visible in any camera.

### .[intersectsSphere](#intersectsSphere)( sphere : [Sphere](Sphere.html), cameraArray : Object ) : boolean

Returns `true` if the given bounding sphere is intersecting any frustum from the camera array.

**sphere**

The bounding sphere to test.

**cameraArray**

An object with a cameras property containing an array of cameras.

**Returns:** Whether the sphere is visible in any camera.

### .[intersectsSprite](#intersectsSprite)( sprite : [Sprite](Sprite.html), cameraArray : Object ) : boolean

Returns `true` if the given sprite is intersecting any frustum from the camera array.

**sprite**

The sprite to test.

**cameraArray**

An object with a cameras property containing an array of cameras.

**Returns:** Whether the sprite is visible in any camera.

## Source

[src/math/FrustumArray.js](https://github.com/mrdoob/three.js/blob/master/src/math/FrustumArray.js)