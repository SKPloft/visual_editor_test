Title: Ray
Source URL: https://threejs.org/docs/pages/Ray.html

# Ray

A ray that emits from an origin in a certain direction. The class is used by [Raycaster](Raycaster.html) to assist with raycasting. Raycasting is used for mouse picking (working out what objects in the 3D space the mouse is over) amongst other things.

## Constructor

### new [Ray](#Ray)( origin : [Vector3](Vector3.html), direction : [Vector3](Vector3.html) )

Constructs a new ray.

**origin**

The origin of the ray.

Default is `(0,0,0)`.

**direction**

The (normalized) direction of the ray.

Default is `(0,0,-1)`.

## Properties

### .[direction](#direction) : [Vector3](Vector3.html)

The (normalized) direction of the ray.

### .[origin](#origin) : [Vector3](Vector3.html)

The origin of the ray.

## Methods

### .[applyMatrix4](#applyMatrix4)( matrix4 : [Matrix4](Matrix4.html) ) : [Ray](Ray.html)

Transforms this ray with the given 4x4 transformation matrix.

**matrix4**

The transformation matrix.

**Returns:** A reference to this ray.

### .[at](#at)( t : number, target : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Returns a vector that is located at a given distance along this ray.

**t**

The distance along the ray to retrieve a position for.

**target**

The target vector that is used to store the method's result.

**Returns:** A position on the ray.

### .[clone](#clone)() : [Ray](Ray.html)

Returns a new ray with copied values from this instance.

**Returns:** A clone of this instance.

### .[closestPointToPoint](#closestPointToPoint)( point : [Vector3](Vector3.html), target : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Returns the point along this ray that is closest to the given point.

**point**

A point in 3D space to get the closet location on the ray for.

**target**

The target vector that is used to store the method's result.

**Returns:** The closest point on this ray.

### .[copy](#copy)( ray : [Ray](Ray.html) ) : [Ray](Ray.html)

Copies the values of the given ray to this instance.

**ray**

The ray to copy.

**Returns:** A reference to this ray.

### .[distanceSqToPoint](#distanceSqToPoint)( point : [Vector3](Vector3.html) ) : number

Returns the squared distance of the closest approach between this ray and the given point.

**point**

A point in 3D space to compute the distance to.

**Returns:** The squared distance.

### .[distanceSqToSegment](#distanceSqToSegment)( v0 : [Vector3](Vector3.html), v1 : [Vector3](Vector3.html), optionalPointOnRay : [Vector3](Vector3.html), optionalPointOnSegment : [Vector3](Vector3.html) ) : number

Returns the squared distance between this ray and the given line segment.

**v0**

The start point of the line segment.

**v1**

The end point of the line segment.

**optionalPointOnRay**

When provided, it receives the point on this ray that is closest to the segment.

**optionalPointOnSegment**

When provided, it receives the point on the line segment that is closest to this ray.

**Returns:** The squared distance.

### .[distanceToPlane](#distanceToPlane)( plane : [Plane](Plane.html) ) : number

Computes the distance from the ray's origin to the given plane. Returns `null` if the ray does not intersect with the plane.

**plane**

The plane to compute the distance to.

**Returns:** Whether this ray intersects with the given sphere or not.

### .[distanceToPoint](#distanceToPoint)( point : [Vector3](Vector3.html) ) : number

Returns the distance of the closest approach between this ray and the given point.

**point**

A point in 3D space to compute the distance to.

**Returns:** The distance.

### .[equals](#equals)( ray : [Ray](Ray.html) ) : boolean

Returns `true` if this ray is equal with the given one.

**ray**

The ray to test for equality.

**Returns:** Whether this ray is equal with the given one.

### .[intersectBox](#intersectBox)( box : [Box3](Box3.html), target : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Intersects this ray with the given bounding box, returning the intersection point or `null` if there is no intersection.

**box**

The box to intersect.

**target**

The target vector that is used to store the method's result.

**Returns:** The intersection point.

### .[intersectPlane](#intersectPlane)( plane : [Plane](Plane.html), target : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Intersects this ray with the given plane, returning the intersection point or `null` if there is no intersection.

**plane**

The plane to intersect.

**target**

The target vector that is used to store the method's result.

**Returns:** The intersection point.

### .[intersectSphere](#intersectSphere)( sphere : [Sphere](Sphere.html), target : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Intersects this ray with the given sphere, returning the intersection point or `null` if there is no intersection.

**sphere**

The sphere to intersect.

**target**

The target vector that is used to store the method's result.

**Returns:** The intersection point.

### .[intersectTriangle](#intersectTriangle)( a : [Vector3](Vector3.html), b : [Vector3](Vector3.html), c : [Vector3](Vector3.html), backfaceCulling : boolean, target : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Intersects this ray with the given triangle, returning the intersection point or `null` if there is no intersection.

**a**

The first vertex of the triangle.

**b**

The second vertex of the triangle.

**c**

The third vertex of the triangle.

**backfaceCulling**

Whether to use backface culling or not.

**target**

The target vector that is used to store the method's result.

**Returns:** The intersection point.

### .[intersectsBox](#intersectsBox)( box : [Box3](Box3.html) ) : boolean

Returns `true` if this ray intersects with the given box.

**box**

The box to intersect.

**Returns:** Whether this ray intersects with the given box or not.

### .[intersectsPlane](#intersectsPlane)( plane : [Plane](Plane.html) ) : boolean

Returns `true` if this ray intersects with the given plane.

**plane**

The plane to intersect.

**Returns:** Whether this ray intersects with the given plane or not.

### .[intersectsSphere](#intersectsSphere)( sphere : [Sphere](Sphere.html) ) : boolean

Returns `true` if this ray intersects with the given sphere.

**sphere**

The sphere to intersect.

**Returns:** Whether this ray intersects with the given sphere or not.

### .[lookAt](#lookAt)( v : [Vector3](Vector3.html) ) : [Ray](Ray.html)

Adjusts the direction of the ray to point at the given vector in world space.

**v**

The target position.

**Returns:** A reference to this ray.

### .[recast](#recast)( t : number ) : [Ray](Ray.html)

Shift the origin of this ray along its direction by the given distance.

**t**

The distance along the ray to interpolate.

**Returns:** A reference to this ray.

### .[set](#set)( origin : [Vector3](Vector3.html), direction : [Vector3](Vector3.html) ) : [Ray](Ray.html)

Sets the ray's components by copying the given values.

**origin**

The origin.

**direction**

The direction.

**Returns:** A reference to this ray.

## Source

[src/math/Ray.js](https://github.com/mrdoob/three.js/blob/master/src/math/Ray.js)