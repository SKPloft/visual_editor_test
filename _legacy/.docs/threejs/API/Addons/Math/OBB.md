Title: OBB
Source URL: https://threejs.org/docs/pages/OBB.html

# OBB

Represents an oriented bounding box (OBB) in 3D space.

## Import

OBB is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { OBB } from 'three/addons/math/OBB.js';
```

## Constructor

### new [OBB](#OBB)( center : [Vector3](Vector3.html), halfSize : [Vector3](Vector3.html), rotation : [Matrix3](Matrix3.html) )

Constructs a new OBB.

**center**

The center of the OBB.

**halfSize**

Positive halfwidth extents of the OBB along each axis.

**rotation**

The rotation of the OBB.

## Properties

### .[center](#center) : [Vector3](Vector3.html)

The center of the OBB.

### .[halfSize](#halfSize) : [Vector3](Vector3.html)

Positive halfwidth extents of the OBB along each axis.

### .[rotation](#rotation) : [Matrix3](Matrix3.html)

The rotation of the OBB.

## Methods

### .[applyMatrix4](#applyMatrix4)( matrix : [Matrix4](Matrix4.html) ) : [OBB](OBB.html)

Applies the given transformation matrix to this OBB. This method can be used to transform the bounding volume with the world matrix of a 3D object in order to keep both entities in sync.

**matrix**

The matrix to apply.

**Returns:** A reference of this OBB.

### .[clampPoint](#clampPoint)( point : [Vector3](Vector3.html), target : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Clamps the given point within the bounds of this OBB.

**point**

The point that should be clamped within the bounds of this OBB.

**target**

The target vector that is used to store the method's result.

**Returns:**

*   The clamped point.

### .[clone](#clone)() : [OBB](OBB.html)

Returns a new OBB with copied values from this instance.

**Returns:** A clone of this instance.

### .[containsPoint](#containsPoint)( point : [Vector3](Vector3.html) ) : boolean

Returns `true` if the given point lies within this OBB.

**point**

The point to test.

**Returns:**

*   Whether the given point lies within this OBB or not.

### .[copy](#copy)( obb : [OBB](OBB.html) ) : [OBB](OBB.html)

Copies the values of the given OBB to this instance.

**obb**

The OBB to copy.

**Returns:** A reference to this OBB.

### .[equals](#equals)( obb : [OBB](OBB.html) ) : boolean

Returns `true` if the given OBB is equal to this OBB.

**obb**

The OBB to test.

**Returns:** Whether the given OBB is equal to this OBB or not.

### .[fromBox3](#fromBox3)( box3 : [Box3](Box3.html) ) : [OBB](OBB.html)

Defines an OBB based on the given AABB.

**box3**

The AABB to setup the OBB from.

**Returns:** A reference of this OBB.

### .[getSize](#getSize)( target : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Returns the size of this OBB.

**target**

The target vector that is used to store the method's result.

**Returns:** The size.

### .[intersectRay](#intersectRay)( ray : [Ray](Ray.html), target : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Performs a ray/OBB intersection test and stores the intersection point in the given 3D vector.

**ray**

The ray to test.

**target**

The target vector that is used to store the method's result.

**Returns:** The intersection point. If no intersection is detected, `null` is returned.

### .[intersectsBox3](#intersectsBox3)( box3 : [Box3](Box3.html) ) : boolean

Returns `true` if the given AABB intersects this OBB.

**box3**

The AABB to test.

**Returns:**

*   Whether the given AABB intersects this OBB or not.

### .[intersectsOBB](#intersectsOBB)( obb : [OBB](OBB.html), epsilon : number ) : boolean

Returns `true` if the given OBB intersects this OBB.

**obb**

The OBB to test.

**epsilon**

A small value to prevent arithmetic errors.

Default is `Number.EPSILON`.

**Returns:**

*   Whether the given OBB intersects this OBB or not.

### .[intersectsPlane](#intersectsPlane)( plane : [Plane](Plane.html) ) : boolean

Returns `true` if the given plane intersects this OBB.

**plane**

The plane to test.

**Returns:** Whether the given plane intersects this OBB or not.

### .[intersectsRay](#intersectsRay)( ray : [Ray](Ray.html) ) : boolean

Returns `true` if the given ray intersects this OBB.

**ray**

The ray to test.

**Returns:** Whether the given ray intersects this OBB or not.

### .[intersectsSphere](#intersectsSphere)( sphere : [Sphere](Sphere.html) ) : boolean

Returns `true` if the given bounding sphere intersects this OBB.

**sphere**

The bounding sphere to test.

**Returns:**

*   Whether the given bounding sphere intersects this OBB or not.

### .[set](#set)( center : [Vector3](Vector3.html), halfSize : [Vector3](Vector3.html), rotation : [Matrix3](Matrix3.html) ) : [OBB](OBB.html)

Sets the OBBs components to the given values.

**center**

The center of the OBB.

**halfSize**

Positive halfwidth extents of the OBB along each axis.

**rotation**

The rotation of the OBB.

**Returns:** A reference to this OBB.

## Source

[examples/jsm/math/OBB.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/math/OBB.js)