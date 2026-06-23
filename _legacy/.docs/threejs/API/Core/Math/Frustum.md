Title: Frustum
Source URL: https://threejs.org/docs/pages/Frustum.html

# Frustum

Frustums are used to determine what is inside the camera's field of view. They help speed up the rendering process - objects which lie outside a camera's frustum can safely be excluded from rendering.

This class is mainly intended for use internally by a renderer.

## Constructor

### new [Frustum](#Frustum)( p0 : [Plane](Plane.html), p1 : [Plane](Plane.html), p2 : [Plane](Plane.html), p3 : [Plane](Plane.html), p4 : [Plane](Plane.html), p5 : [Plane](Plane.html) )

Constructs a new frustum.

**p0**

The first plane that encloses the frustum.

**p1**

The second plane that encloses the frustum.

**p2**

The third plane that encloses the frustum.

**p3**

The fourth plane that encloses the frustum.

**p4**

The fifth plane that encloses the frustum.

**p5**

The sixth plane that encloses the frustum.

## Properties

### .[planes](#planes) : Array.<[Plane](Plane.html)\>

This array holds the planes that enclose the frustum.

## Methods

### .[clone](#clone)() : [Frustum](Frustum.html)

Returns a new frustum with copied values from this instance.

**Returns:** A clone of this instance.

### .[containsPoint](#containsPoint)( point : [Vector3](Vector3.html) ) : boolean

Returns `true` if the given point lies within the frustum.

**point**

The point to test.

**Returns:** Whether the point lies within this frustum or not.

### .[copy](#copy)( frustum : [Frustum](Frustum.html) ) : [Frustum](Frustum.html)

Copies the values of the given frustum to this instance.

**frustum**

The frustum to copy.

**Returns:** A reference to this frustum.

### .[intersectsBox](#intersectsBox)( box : [Box3](Box3.html) ) : boolean

Returns `true` if the given bounding box is intersecting this frustum.

**box**

The bounding box to test.

**Returns:** Whether the bounding box is intersecting this frustum or not.

### .[intersectsObject](#intersectsObject)( object : [Object3D](Object3D.html) ) : boolean

Returns `true` if the 3D object's bounding sphere is intersecting this frustum.

Note that the 3D object must have a geometry so that the bounding sphere can be calculated.

**object**

The 3D object to test.

**Returns:** Whether the 3D object's bounding sphere is intersecting this frustum or not.

### .[intersectsSphere](#intersectsSphere)( sphere : [Sphere](Sphere.html) ) : boolean

Returns `true` if the given bounding sphere is intersecting this frustum.

**sphere**

The bounding sphere to test.

**Returns:** Whether the bounding sphere is intersecting this frustum or not.

### .[intersectsSprite](#intersectsSprite)( sprite : [Sprite](Sprite.html) ) : boolean

Returns `true` if the given sprite is intersecting this frustum.

**sprite**

The sprite to test.

**Returns:** Whether the sprite is intersecting this frustum or not.

### .[set](#set)( p0 : [Plane](Plane.html), p1 : [Plane](Plane.html), p2 : [Plane](Plane.html), p3 : [Plane](Plane.html), p4 : [Plane](Plane.html), p5 : [Plane](Plane.html) ) : [Frustum](Frustum.html)

Sets the frustum planes by copying the given planes.

**p0**

The first plane that encloses the frustum.

**p1**

The second plane that encloses the frustum.

**p2**

The third plane that encloses the frustum.

**p3**

The fourth plane that encloses the frustum.

**p4**

The fifth plane that encloses the frustum.

**p5**

The sixth plane that encloses the frustum.

**Returns:** A reference to this frustum.

### .[setFromProjectionMatrix](#setFromProjectionMatrix)( m : [Matrix4](Matrix4.html), coordinateSystem : [WebGLCoordinateSystem](global.html#WebGLCoordinateSystem) | [WebGPUCoordinateSystem](global.html#WebGPUCoordinateSystem), reversedDepth : boolean ) : [Frustum](Frustum.html)

Sets the frustum planes from the given projection matrix.

**m**

The projection matrix.

**coordinateSystem**

The coordinate system.

**reversedDepth**

Whether to use a reversed depth.

Default is `false`.

**Returns:** A reference to this frustum.

## Source

[src/math/Frustum.js](https://github.com/mrdoob/three.js/blob/master/src/math/Frustum.js)