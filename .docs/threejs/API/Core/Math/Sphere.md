Title: Sphere
Source URL: https://threejs.org/docs/pages/Sphere.html

# Sphere

An analytical 3D sphere defined by a center and radius. This class is mainly used as a Bounding Sphere for 3D objects.

## Constructor

### new [Sphere](#Sphere)( center : [Vector3](Vector3.html), radius : number )

Constructs a new sphere.

**center**

The center of the sphere

Default is `(0,0,0)`.

**radius**

The radius of the sphere.

Default is `-1`.

## Properties

### .[center](#center) : [Vector3](Vector3.html)

The center of the sphere

### .[isSphere](#isSphere) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[radius](#radius) : number

The radius of the sphere.

## Methods

### .[applyMatrix4](#applyMatrix4)( matrix : [Matrix4](Matrix4.html) ) : [Sphere](Sphere.html)

Transforms this sphere with the given 4x4 transformation matrix.

**matrix**

The transformation matrix.

**Returns:** A reference to this sphere.

### .[clampPoint](#clampPoint)( point : [Vector3](Vector3.html), target : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Clamps a point within the sphere. If the point is outside the sphere, it will clamp it to the closest point on the edge of the sphere. Points already inside the sphere will not be affected.

**point**

The plane to clamp.

**target**

The target vector that is used to store the method's result.

**Returns:** The clamped point.

### .[clone](#clone)() : [Sphere](Sphere.html)

Returns a new sphere with copied values from this instance.

**Returns:** A clone of this instance.

### .[containsPoint](#containsPoint)( point : [Vector3](Vector3.html) ) : boolean

Returns `true` if this sphere contains the given point inclusive of the surface of the sphere.

**point**

The point to check.

**Returns:** Whether this sphere contains the given point or not.

### .[copy](#copy)( sphere : [Sphere](Sphere.html) ) : [Sphere](Sphere.html)

Copies the values of the given sphere to this instance.

**sphere**

The sphere to copy.

**Returns:** A reference to this sphere.

### .[distanceToPoint](#distanceToPoint)( point : [Vector3](Vector3.html) ) : number

Returns the closest distance from the boundary of the sphere to the given point. If the sphere contains the point, the distance will be negative.

**point**

The point to compute the distance to.

**Returns:** The distance to the point.

### .[equals](#equals)( sphere : [Sphere](Sphere.html) ) : boolean

Returns `true` if this sphere is equal with the given one.

**sphere**

The sphere to test for equality.

**Returns:** Whether this bounding sphere is equal with the given one.

### .[expandByPoint](#expandByPoint)( point : [Vector3](Vector3.html) ) : [Sphere](Sphere.html)

Expands the boundaries of this sphere to include the given point.

**point**

The point to include.

**Returns:** A reference to this sphere.

### .[fromJSON](#fromJSON)( json : Object ) : [Sphere](Sphere.html)

Returns a serialized structure of the bounding sphere.

**json**

The serialized json to set the sphere from.

**Returns:** A reference to this bounding sphere.

### .[getBoundingBox](#getBoundingBox)( target : [Box3](Box3.html) ) : [Box3](Box3.html)

Returns a bounding box that encloses this sphere.

**target**

The target box that is used to store the method's result.

**Returns:** The bounding box that encloses this sphere.

### .[intersectsBox](#intersectsBox)( box : [Box3](Box3.html) ) : boolean

Returns `true` if this sphere intersects with the given box.

**box**

The box to test.

**Returns:** Whether this sphere intersects with the given box or not.

### .[intersectsPlane](#intersectsPlane)( plane : [Plane](Plane.html) ) : boolean

Returns `true` if this sphere intersects with the given plane.

**plane**

The plane to test.

**Returns:** Whether this sphere intersects with the given plane or not.

### .[intersectsSphere](#intersectsSphere)( sphere : [Sphere](Sphere.html) ) : boolean

Returns `true` if this sphere intersects with the given one.

**sphere**

The sphere to test.

**Returns:** Whether this sphere intersects with the given one or not.

### .[isEmpty](#isEmpty)() : boolean

Returns `true` if the sphere is empty (the radius set to a negative number).

Spheres with a radius of `0` contain only their center point and are not considered to be empty.

**Returns:** Whether this sphere is empty or not.

### .[makeEmpty](#makeEmpty)() : [Sphere](Sphere.html)

Makes this sphere empty which means in encloses a zero space in 3D.

**Returns:** A reference to this sphere.

### .[set](#set)( center : [Vector3](Vector3.html), radius : number ) : [Sphere](Sphere.html)

Sets the sphere's components by copying the given values.

**center**

The center.

**radius**

The radius.

**Returns:** A reference to this sphere.

### .[setFromPoints](#setFromPoints)( points : Array.<[Vector3](Vector3.html)\>, optionalCenter : [Vector3](Vector3.html) ) : [Sphere](Sphere.html)

Computes the minimum bounding sphere for list of points. If the optional center point is given, it is used as the sphere's center. Otherwise, the center of the axis-aligned bounding box encompassing the points is calculated.

**points**

A list of points in 3D space.

**optionalCenter**

The center of the sphere.

**Returns:** A reference to this sphere.

### .[toJSON](#toJSON)() : Object

Returns a serialized structure of the bounding sphere.

**Returns:** Serialized structure with fields representing the object state.

### .[translate](#translate)( offset : [Vector3](Vector3.html) ) : [Sphere](Sphere.html)

Translates the sphere's center by the given offset.

**offset**

The offset.

**Returns:** A reference to this sphere.

### .[union](#union)( sphere : [Sphere](Sphere.html) ) : [Sphere](Sphere.html)

Expands this sphere to enclose both the original sphere and the given sphere.

**sphere**

The sphere to include.

**Returns:** A reference to this sphere.

## Source

[src/math/Sphere.js](https://github.com/mrdoob/three.js/blob/master/src/math/Sphere.js)