Title: ConvexHull
Source URL: https://threejs.org/docs/pages/ConvexHull.html

# ConvexHull

Can be used to compute the convex hull in 3D space for a given set of points. It is primarily intended for [ConvexGeometry](ConvexGeometry.html).

This Quickhull 3D implementation is a port of [quickhull3d](https://github.com/maurizzzio/quickhull3d/) by Mauricio Poppe.

## Import

ConvexHull is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { ConvexHull } from 'three/addons/math/ConvexHull.js';
```

## Constructor

### new [ConvexHull](#ConvexHull)()

Constructs a new convex hull.

## Methods

### .[containsPoint](#containsPoint)( point : [Vector3](Vector3.html) ) : boolean

Returns `true` if the given point lies in the convex hull.

**point**

The point to test.

**Returns:** Whether the given point lies in the convex hull or not.

### .[intersectRay](#intersectRay)( ray : [Ray](Ray.html), target : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Computes the intersections point of the given ray and this convex hull.

**ray**

The ray to test.

**target**

The target vector that is used to store the method's result.

**Returns:** The intersection point. Returns `null` if not intersection was detected.

### .[intersectsRay](#intersectsRay)( ray : [Ray](Ray.html) ) : boolean

Returns `true` if the given ray intersects with this convex hull.

**ray**

The ray to test.

**Returns:** Whether the given ray intersects with this convex hull or not.

### .[makeEmpty](#makeEmpty)() : [ConvexHull](ConvexHull.html)

Makes the convex hull empty.

**Returns:** A reference to this convex hull.

### .[setFromObject](#setFromObject)( object : [Object3D](Object3D.html) ) : [ConvexHull](ConvexHull.html)

Computes the convex hull of the given 3D object (including its descendants), accounting for the world transforms of both the 3D object and its descendants.

**object**

The 3D object to compute the convex hull for.

**Returns:** A reference to this convex hull.

### .[setFromPoints](#setFromPoints)( points : Array.<[Vector3](Vector3.html)\> ) : [ConvexHull](ConvexHull.html)

Computes to convex hull for the given array of points.

**points**

The array of points in 3D space.

**Returns:** A reference to this convex hull.

## Source

[examples/jsm/math/ConvexHull.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/math/ConvexHull.js)