Title: Line3
Source URL: https://threejs.org/docs/pages/Line3.html

# Line3

An analytical line segment in 3D space represented by a start and end point.

## Constructor

### new [Line3](#Line3)( start : [Vector3](Vector3.html), end : [Vector3](Vector3.html) )

Constructs a new line segment.

**start**

Start of the line segment.

Default is `(0,0,0)`.

**end**

End of the line segment.

Default is `(0,0,0)`.

## Properties

### .[end](#end) : [Vector3](Vector3.html)

End of the line segment.

### .[start](#start) : [Vector3](Vector3.html)

Start of the line segment.

## Methods

### .[applyMatrix4](#applyMatrix4)( matrix : [Matrix4](Matrix4.html) ) : [Line3](Line3.html)

Applies a 4x4 transformation matrix to this line segment.

**matrix**

The transformation matrix.

**Returns:** A reference to this line segment.

### .[at](#at)( t : number, target : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Returns a vector at a certain position along the line segment.

**t**

A value between `[0,1]` to represent a position along the line segment.

**target**

The target vector that is used to store the method's result.

**Returns:** The delta vector.

### .[clone](#clone)() : [Line3](Line3.html)

Returns a new line segment with copied values from this instance.

**Returns:** A clone of this instance.

### .[closestPointToPoint](#closestPointToPoint)( point : [Vector3](Vector3.html), clampToLine : boolean, target : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Returns the closest point on the line for a given point.

**point**

The point to compute the closest point on the line for.

**clampToLine**

Whether to clamp the result to the range `[0,1]` or not.

**target**

The target vector that is used to store the method's result.

**Returns:** The closest point on the line.

### .[closestPointToPointParameter](#closestPointToPointParameter)( point : [Vector3](Vector3.html), clampToLine : boolean ) : number

Returns a point parameter based on the closest point as projected on the line segment.

**point**

The point for which to return a point parameter.

**clampToLine**

Whether to clamp the result to the range `[0,1]` or not.

**Returns:** The point parameter.

### .[copy](#copy)( line : [Line3](Line3.html) ) : [Line3](Line3.html)

Copies the values of the given line segment to this instance.

**line**

The line segment to copy.

**Returns:** A reference to this line segment.

### .[delta](#delta)( target : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Returns the delta vector of the line segment's start and end point.

**target**

The target vector that is used to store the method's result.

**Returns:** The delta vector.

### .[distance](#distance)() : number

Returns the Euclidean distance between the line' start and end point.

**Returns:** The Euclidean distance.

### .[distanceSq](#distanceSq)() : number

Returns the squared Euclidean distance between the line' start and end point.

**Returns:** The squared Euclidean distance.

### .[distanceSqToLine3](#distanceSqToLine3)( line : [Line3](Line3.html), c1 : [Vector3](Vector3.html), c2 : [Vector3](Vector3.html) ) : number

Returns the closest squared distance between this line segment and the given one.

**line**

The line segment to compute the closest squared distance to.

**c1**

The closest point on this line segment.

**c2**

The closest point on the given line segment.

**Returns:** The squared distance between this line segment and the given one.

### .[equals](#equals)( line : [Line3](Line3.html) ) : boolean

Returns `true` if this line segment is equal with the given one.

**line**

The line segment to test for equality.

**Returns:** Whether this line segment is equal with the given one.

### .[getCenter](#getCenter)( target : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Returns the center of the line segment.

**target**

The target vector that is used to store the method's result.

**Returns:** The center point.

### .[set](#set)( start : [Vector3](Vector3.html), end : [Vector3](Vector3.html) ) : [Line3](Line3.html)

Sets the start and end values by copying the given vectors.

**start**

The start point.

**end**

The end point.

**Returns:** A reference to this line segment.

## Source

[src/math/Line3.js](https://github.com/mrdoob/three.js/blob/master/src/math/Line3.js)