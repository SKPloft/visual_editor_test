Title: Triangle
Source URL: https://threejs.org/docs/pages/Triangle.html

# Triangle

A geometric triangle as defined by three vectors representing its three corners.

## Constructor

### new [Triangle](#Triangle)( a : [Vector3](Vector3.html), b : [Vector3](Vector3.html), c : [Vector3](Vector3.html) )

Constructs a new triangle.

**a**

The first corner of the triangle.

Default is `(0,0,0)`.

**b**

The second corner of the triangle.

Default is `(0,0,0)`.

**c**

The third corner of the triangle.

Default is `(0,0,0)`.

## Properties

### .[a](#a) : [Vector3](Vector3.html)

The first corner of the triangle.

### .[b](#b) : [Vector3](Vector3.html)

The second corner of the triangle.

### .[c](#c) : [Vector3](Vector3.html)

The third corner of the triangle.

## Methods

### .[clone](#clone)() : [Triangle](Triangle.html)

Returns a new triangle with copied values from this instance.

**Returns:** A clone of this instance.

### .[closestPointToPoint](#closestPointToPoint)( p : [Vector3](Vector3.html), target : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Returns the closest point on the triangle to the given point.

**p**

The point to compute the closest point for.

**target**

The target vector that is used to store the method's result.

**Returns:** The closest point on the triangle.

### .[containsPoint](#containsPoint)( point : [Vector3](Vector3.html) ) : boolean

Returns `true` if the given point, when projected onto the plane of the triangle, lies within the triangle.

**point**

The point in 3D space to test.

**Returns:** Whether the given point, when projected onto the plane of the triangle, lies within the triangle or not.

### .[copy](#copy)( triangle : [Triangle](Triangle.html) ) : [Triangle](Triangle.html)

Copies the values of the given triangle to this instance.

**triangle**

The triangle to copy.

**Returns:** A reference to this triangle.

### .[equals](#equals)( triangle : [Triangle](Triangle.html) ) : boolean

Returns `true` if this triangle is equal with the given one.

**triangle**

The triangle to test for equality.

**Returns:** Whether this triangle is equal with the given one.

### .[getArea](#getArea)() : number

Computes the area of the triangle.

**Returns:** The triangle's area.

### .[getBarycoord](#getBarycoord)( point : [Vector3](Vector3.html), target : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Computes a barycentric coordinates from the given vector. Returns `null` if the triangle is degenerate.

**point**

A point in 3D space.

**target**

The target vector that is used to store the method's result.

**Returns:** The barycentric coordinates for the given point

### .[getInterpolation](#getInterpolation)( point : [Vector3](Vector3.html), v1 : [Vector3](Vector3.html), v2 : [Vector3](Vector3.html), v3 : [Vector3](Vector3.html), target : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Computes the value barycentrically interpolated for the given point on the triangle. Returns `null` if the triangle is degenerate.

**point**

Position of interpolated point.

**v1**

Value to interpolate of first vertex.

**v2**

Value to interpolate of second vertex.

**v3**

Value to interpolate of third vertex.

**target**

The target vector that is used to store the method's result.

**Returns:** The interpolated value.

### .[getMidpoint](#getMidpoint)( target : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Computes the midpoint of the triangle.

**target**

The target vector that is used to store the method's result.

**Returns:** The triangle's midpoint.

### .[getNormal](#getNormal)( target : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Computes the normal of the triangle.

**target**

The target vector that is used to store the method's result.

**Returns:** The triangle's normal.

### .[getPlane](#getPlane)( target : [Plane](Plane.html) ) : [Plane](Plane.html)

Computes a plane the triangle lies within.

**target**

The target vector that is used to store the method's result.

**Returns:** The plane the triangle lies within.

### .[intersectsBox](#intersectsBox)( box : [Box3](Box3.html) ) : boolean

Returns `true` if this triangle intersects with the given box.

**box**

The box to intersect.

**Returns:** Whether this triangle intersects with the given box or not.

### .[isFrontFacing](#isFrontFacing)( direction : [Vector3](Vector3.html) ) : boolean

Returns `true` if the triangle is oriented towards the given direction.

**direction**

The (normalized) direction vector.

**Returns:** Whether the triangle is oriented towards the given direction or not.

### .[set](#set)( a : [Vector3](Vector3.html), b : [Vector3](Vector3.html), c : [Vector3](Vector3.html) ) : [Triangle](Triangle.html)

Sets the triangle's vertices by copying the given values.

**a**

The first corner of the triangle.

**b**

The second corner of the triangle.

**c**

The third corner of the triangle.

**Returns:** A reference to this triangle.

### .[setFromAttributeAndIndices](#setFromAttributeAndIndices)( attribute : [BufferAttribute](BufferAttribute.html), i0 : number, i1 : number, i2 : number ) : [Triangle](Triangle.html)

Sets the triangle's vertices by copying the given attribute values.

**attribute**

A buffer attribute with 3D points data.

**i0**

The attribute index representing the first corner of the triangle.

**i1**

The attribute index representing the second corner of the triangle.

**i2**

The attribute index representing the third corner of the triangle.

**Returns:** A reference to this triangle.

### .[setFromPointsAndIndices](#setFromPointsAndIndices)( points : Array.<[Vector3](Vector3.html)\>, i0 : number, i1 : number, i2 : number ) : [Triangle](Triangle.html)

Sets the triangle's vertices by copying the given array values.

**points**

An array with 3D points.

**i0**

The array index representing the first corner of the triangle.

**i1**

The array index representing the second corner of the triangle.

**i2**

The array index representing the third corner of the triangle.

**Returns:** A reference to this triangle.

## Static Methods

### .[containsPoint](#.containsPoint)( point : [Vector3](Vector3.html), a : [Vector3](Vector3.html), b : [Vector3](Vector3.html), c : [Vector3](Vector3.html) ) : boolean

Returns `true` if the given point, when projected onto the plane of the triangle, lies within the triangle.

**point**

The point in 3D space to test.

**a**

The first corner of the triangle.

**b**

The second corner of the triangle.

**c**

The third corner of the triangle.

**Returns:** Whether the given point, when projected onto the plane of the triangle, lies within the triangle or not.

### .[getBarycoord](#.getBarycoord)( point : [Vector3](Vector3.html), a : [Vector3](Vector3.html), b : [Vector3](Vector3.html), c : [Vector3](Vector3.html), target : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Computes a barycentric coordinates from the given vector. Returns `null` if the triangle is degenerate.

**point**

A point in 3D space.

**a**

The first corner of the triangle.

**b**

The second corner of the triangle.

**c**

The third corner of the triangle.

**target**

The target vector that is used to store the method's result.

**Returns:** The barycentric coordinates for the given point

### .[getInterpolatedAttribute](#.getInterpolatedAttribute)( attr : [BufferAttribute](BufferAttribute.html), i1 : number, i2 : number, i3 : number, barycoord : [Vector3](Vector3.html), target : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Computes the value barycentrically interpolated for the given attribute and indices.

**attr**

The attribute to interpolate.

**i1**

Index of first vertex.

**i2**

Index of second vertex.

**i3**

Index of third vertex.

**barycoord**

The barycoordinate value to use to interpolate.

**target**

The target vector that is used to store the method's result.

**Returns:** The interpolated attribute value.

### .[getInterpolation](#.getInterpolation)( point : [Vector3](Vector3.html), p1 : [Vector3](Vector3.html), p2 : [Vector3](Vector3.html), p3 : [Vector3](Vector3.html), v1 : [Vector3](Vector3.html), v2 : [Vector3](Vector3.html), v3 : [Vector3](Vector3.html), target : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Computes the value barycentrically interpolated for the given point on the triangle. Returns `null` if the triangle is degenerate.

**point**

Position of interpolated point.

**p1**

The first corner of the triangle.

**p2**

The second corner of the triangle.

**p3**

The third corner of the triangle.

**v1**

Value to interpolate of first vertex.

**v2**

Value to interpolate of second vertex.

**v3**

Value to interpolate of third vertex.

**target**

The target vector that is used to store the method's result.

**Returns:** The interpolated value.

### .[getNormal](#.getNormal)( a : [Vector3](Vector3.html), b : [Vector3](Vector3.html), c : [Vector3](Vector3.html), target : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Computes the normal vector of a triangle.

**a**

The first corner of the triangle.

**b**

The second corner of the triangle.

**c**

The third corner of the triangle.

**target**

The target vector that is used to store the method's result.

**Returns:** The triangle's normal.

### .[isFrontFacing](#.isFrontFacing)( a : [Vector3](Vector3.html), b : [Vector3](Vector3.html), c : [Vector3](Vector3.html), direction : [Vector3](Vector3.html) ) : boolean

Returns `true` if the triangle is oriented towards the given direction.

**a**

The first corner of the triangle.

**b**

The second corner of the triangle.

**c**

The third corner of the triangle.

**direction**

The (normalized) direction vector.

**Returns:** Whether the triangle is oriented towards the given direction or not.

## Source

[src/math/Triangle.js](https://github.com/mrdoob/three.js/blob/master/src/math/Triangle.js)