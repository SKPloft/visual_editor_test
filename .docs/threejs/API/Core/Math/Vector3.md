Title: Vector3
Source URL: https://threejs.org/docs/pages/Vector3.html

# Vector3

Class representing a 3D vector. A 3D vector is an ordered triplet of numbers (labeled x, y and z), which can be used to represent a number of things, such as:

*   A point in 3D space.
*   A direction and length in 3D space. In three.js the length will always be the Euclidean distance(straight-line distance) from `(0, 0, 0)` to `(x, y, z)` and the direction is also measured from `(0, 0, 0)` towards `(x, y, z)`.
*   Any arbitrary ordered triplet of numbers.

There are other things a 3D vector can be used to represent, such as momentum vectors and so on, however these are the most common uses in three.js.

Iterating through a vector instance will yield its components `(x, y, z)` in the corresponding order.

## Code Example

```js
const a = new THREE.Vector3( 0, 1, 0 );
//no arguments; will be initialised to (0, 0, 0)
const b = new THREE.Vector3( );
const d = a.distanceTo( b );
```

## Constructor

### new [Vector3](#Vector3)( x : number, y : number, z : number )

Constructs a new 3D vector.

**x**

The x value of this vector.

Default is `0`.

**y**

The y value of this vector.

Default is `0`.

**z**

The z value of this vector.

Default is `0`.

## Properties

### .[x](#x) : number

The x value of this vector.

### .[y](#y) : number

The y value of this vector.

### .[z](#z) : number

The z value of this vector.

## Methods

### .[add](#add)( v : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Adds the given vector to this instance.

**v**

The vector to add.

**Returns:** A reference to this vector.

### .[addScalar](#addScalar)( s : number ) : [Vector3](Vector3.html)

Adds the given scalar value to all components of this instance.

**s**

The scalar to add.

**Returns:** A reference to this vector.

### .[addScaledVector](#addScaledVector)( v : [Vector3](Vector3.html) | [Vector4](Vector4.html), s : number ) : [Vector3](Vector3.html)

Adds the given vector scaled by the given factor to this instance.

**v**

The vector.

**s**

The factor that scales `v`.

**Returns:** A reference to this vector.

### .[addVectors](#addVectors)( a : [Vector3](Vector3.html), b : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Adds the given vectors and stores the result in this instance.

**a**

The first vector.

**b**

The second vector.

**Returns:** A reference to this vector.

### .[angleTo](#angleTo)( v : [Vector3](Vector3.html) ) : number

Returns the angle between the given vector and this instance in radians.

**v**

The vector to compute the angle with.

**Returns:** The angle in radians.

### .[applyAxisAngle](#applyAxisAngle)( axis : [Vector3](Vector3.html), angle : number ) : [Vector3](Vector3.html)

Applies a rotation specified by an axis and an angle to this vector.

**axis**

A normalized vector representing the rotation axis.

**angle**

The angle in radians.

**Returns:** A reference to this vector.

### .[applyEuler](#applyEuler)( euler : [Euler](Euler.html) ) : [Vector3](Vector3.html)

Applies the given Euler rotation to this vector.

**euler**

The Euler angles.

**Returns:** A reference to this vector.

### .[applyMatrix3](#applyMatrix3)( m : [Matrix3](Matrix3.html) ) : [Vector3](Vector3.html)

Multiplies this vector with the given 3x3 matrix.

**m**

The 3x3 matrix.

**Returns:** A reference to this vector.

### .[applyMatrix4](#applyMatrix4)( m : [Matrix4](Matrix4.html) ) : [Vector3](Vector3.html)

Multiplies this vector (with an implicit 1 in the 4th dimension) by m, and divides by perspective.

**m**

The matrix to apply.

**Returns:** A reference to this vector.

### .[applyNormalMatrix](#applyNormalMatrix)( m : [Matrix3](Matrix3.html) ) : [Vector3](Vector3.html)

Multiplies this vector by the given normal matrix and normalizes the result.

**m**

The normal matrix.

**Returns:** A reference to this vector.

### .[applyQuaternion](#applyQuaternion)( q : [Quaternion](Quaternion.html) ) : [Vector3](Vector3.html)

Applies the given Quaternion to this vector.

**q**

The Quaternion.

**Returns:** A reference to this vector.

### .[ceil](#ceil)() : [Vector3](Vector3.html)

The components of this vector are rounded up to the nearest integer value.

**Returns:** A reference to this vector.

### .[clamp](#clamp)( min : [Vector3](Vector3.html), max : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

If this vector's x, y or z value is greater than the max vector's x, y or z value, it is replaced by the corresponding value. If this vector's x, y or z value is less than the min vector's x, y or z value, it is replaced by the corresponding value.

**min**

The minimum x, y and z values.

**max**

The maximum x, y and z values in the desired range.

**Returns:** A reference to this vector.

### .[clampLength](#clampLength)( min : number, max : number ) : [Vector3](Vector3.html)

If this vector's length is greater than the max value, it is replaced by the max value. If this vector's length is less than the min value, it is replaced by the min value.

**min**

The minimum value the vector length will be clamped to.

**max**

The maximum value the vector length will be clamped to.

**Returns:** A reference to this vector.

### .[clampScalar](#clampScalar)( minVal : number, maxVal : number ) : [Vector3](Vector3.html)

If this vector's x, y or z values are greater than the max value, they are replaced by the max value. If this vector's x, y or z values are less than the min value, they are replaced by the min value.

**minVal**

The minimum value the components will be clamped to.

**maxVal**

The maximum value the components will be clamped to.

**Returns:** A reference to this vector.

### .[clone](#clone)() : [Vector3](Vector3.html)

Returns a new vector with copied values from this instance.

**Returns:** A clone of this instance.

### .[copy](#copy)( v : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Copies the values of the given vector to this instance.

**v**

The vector to copy.

**Returns:** A reference to this vector.

### .[cross](#cross)( v : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Calculates the cross product of the given vector with this instance.

**v**

The vector to compute the cross product with.

**Returns:** The result of the cross product.

### .[crossVectors](#crossVectors)( a : [Vector3](Vector3.html), b : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Calculates the cross product of the given vectors and stores the result in this instance.

**a**

The first vector.

**b**

The second vector.

**Returns:** A reference to this vector.

### .[distanceTo](#distanceTo)( v : [Vector3](Vector3.html) ) : number

Computes the distance from the given vector to this instance.

**v**

The vector to compute the distance to.

**Returns:** The distance.

### .[distanceToSquared](#distanceToSquared)( v : [Vector3](Vector3.html) ) : number

Computes the squared distance from the given vector to this instance. If you are just comparing the distance with another distance, you should compare the distance squared instead as it is slightly more efficient to calculate.

**v**

The vector to compute the squared distance to.

**Returns:** The squared distance.

### .[divide](#divide)( v : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Divides this instance by the given vector.

**v**

The vector to divide.

**Returns:** A reference to this vector.

### .[divideScalar](#divideScalar)( scalar : number ) : [Vector3](Vector3.html)

Divides this vector by the given scalar.

**scalar**

The scalar to divide.

**Returns:** A reference to this vector.

### .[dot](#dot)( v : [Vector3](Vector3.html) ) : number

Calculates the dot product of the given vector with this instance.

**v**

The vector to compute the dot product with.

**Returns:** The result of the dot product.

### .[equals](#equals)( v : [Vector3](Vector3.html) ) : boolean

Returns `true` if this vector is equal with the given one.

**v**

The vector to test for equality.

**Returns:** Whether this vector is equal with the given one.

### .[floor](#floor)() : [Vector3](Vector3.html)

The components of this vector are rounded down to the nearest integer value.

**Returns:** A reference to this vector.

### .[fromArray](#fromArray)( array : Array.<number>, offset : number ) : [Vector3](Vector3.html)

Sets this vector's x value to be `array[ offset ]`, y value to be `array[ offset + 1 ]` and z value to be `array[ offset + 2 ]`.

**array**

An array holding the vector component values.

**offset**

The offset into the array.

Default is `0`.

**Returns:** A reference to this vector.

### .[fromBufferAttribute](#fromBufferAttribute)( attribute : [BufferAttribute](BufferAttribute.html), index : number ) : [Vector3](Vector3.html)

Sets the components of this vector from the given buffer attribute.

**attribute**

The buffer attribute holding vector data.

**index**

The index into the attribute.

**Returns:** A reference to this vector.

### .[getComponent](#getComponent)( index : number ) : number

Returns the value of the vector component which matches the given index.

**index**

The component index. `0` equals to x, `1` equals to y, `2` equals to z.

**Returns:** A vector component value.

### .[length](#length)() : number

Computes the Euclidean length (straight-line length) from (0, 0, 0) to (x, y, z).

**Returns:** The length of this vector.

### .[lengthSq](#lengthSq)() : number

Computes the square of the Euclidean length (straight-line length) from (0, 0, 0) to (x, y, z). If you are comparing the lengths of vectors, you should compare the length squared instead as it is slightly more efficient to calculate.

**Returns:** The square length of this vector.

### .[lerp](#lerp)( v : [Vector3](Vector3.html), alpha : number ) : [Vector3](Vector3.html)

Linearly interpolates between the given vector and this instance, where alpha is the percent distance along the line - alpha = 0 will be this vector, and alpha = 1 will be the given one.

**v**

The vector to interpolate towards.

**alpha**

The interpolation factor, typically in the closed interval `[0, 1]`.

**Returns:** A reference to this vector.

### .[lerpVectors](#lerpVectors)( v1 : [Vector3](Vector3.html), v2 : [Vector3](Vector3.html), alpha : number ) : [Vector3](Vector3.html)

Linearly interpolates between the given vectors, where alpha is the percent distance along the line - alpha = 0 will be first vector, and alpha = 1 will be the second one. The result is stored in this instance.

**v1**

The first vector.

**v2**

The second vector.

**alpha**

The interpolation factor, typically in the closed interval `[0, 1]`.

**Returns:** A reference to this vector.

### .[manhattanDistanceTo](#manhattanDistanceTo)( v : [Vector3](Vector3.html) ) : number

Computes the Manhattan distance from the given vector to this instance.

**v**

The vector to compute the Manhattan distance to.

**Returns:** The Manhattan distance.

### .[manhattanLength](#manhattanLength)() : number

Computes the Manhattan length of this vector.

**Returns:** The length of this vector.

### .[max](#max)( v : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

If this vector's x, y or z value is less than the given vector's x, y or z value, replace that value with the corresponding max value.

**v**

The vector.

**Returns:** A reference to this vector.

### .[min](#min)( v : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

If this vector's x, y or z value is greater than the given vector's x, y or z value, replace that value with the corresponding min value.

**v**

The vector.

**Returns:** A reference to this vector.

### .[multiply](#multiply)( v : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Multiplies the given vector with this instance.

**v**

The vector to multiply.

**Returns:** A reference to this vector.

### .[multiplyScalar](#multiplyScalar)( scalar : number ) : [Vector3](Vector3.html)

Multiplies the given scalar value with all components of this instance.

**scalar**

The scalar to multiply.

**Returns:** A reference to this vector.

### .[multiplyVectors](#multiplyVectors)( a : [Vector3](Vector3.html), b : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Multiplies the given vectors and stores the result in this instance.

**a**

The first vector.

**b**

The second vector.

**Returns:** A reference to this vector.

### .[negate](#negate)() : [Vector3](Vector3.html)

Inverts this vector - i.e. sets x = -x, y = -y and z = -z.

**Returns:** A reference to this vector.

### .[normalize](#normalize)() : [Vector3](Vector3.html)

Converts this vector to a unit vector - that is, sets it equal to a vector with the same direction as this one, but with a vector length of `1`.

**Returns:** A reference to this vector.

### .[project](#project)( camera : [Camera](Camera.html) ) : [Vector3](Vector3.html)

Projects this vector from world space into the camera's normalized device coordinate (NDC) space.

**camera**

The camera.

**Returns:** A reference to this vector.

### .[projectOnPlane](#projectOnPlane)( planeNormal : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Projects this vector onto a plane by subtracting this vector projected onto the plane's normal from this vector.

**planeNormal**

The plane normal.

**Returns:** A reference to this vector.

### .[projectOnVector](#projectOnVector)( v : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Projects this vector onto the given one.

**v**

The vector to project to.

**Returns:** A reference to this vector.

### .[random](#random)() : [Vector3](Vector3.html)

Sets each component of this vector to a pseudo-random value between `0` and `1`, excluding `1`.

**Returns:** A reference to this vector.

### .[randomDirection](#randomDirection)() : [Vector3](Vector3.html)

Sets this vector to a uniformly random point on a unit sphere.

**Returns:** A reference to this vector.

### .[reflect](#reflect)( normal : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Reflects this vector off a plane orthogonal to the given normal vector.

**normal**

The (normalized) normal vector.

**Returns:** A reference to this vector.

### .[round](#round)() : [Vector3](Vector3.html)

The components of this vector are rounded to the nearest integer value

**Returns:** A reference to this vector.

### .[roundToZero](#roundToZero)() : [Vector3](Vector3.html)

The components of this vector are rounded towards zero (up if negative, down if positive) to an integer value.

**Returns:** A reference to this vector.

### .[set](#set)( x : number, y : number, z : number ) : [Vector3](Vector3.html)

Sets the vector components.

**x**

The value of the x component.

**y**

The value of the y component.

**z**

The value of the z component.

**Returns:** A reference to this vector.

### .[setComponent](#setComponent)( index : number, value : number ) : [Vector3](Vector3.html)

Allows to set a vector component with an index.

**index**

The component index. `0` equals to x, `1` equals to y, `2` equals to z.

**value**

The value to set.

**Returns:** A reference to this vector.

### .[setFromColor](#setFromColor)( c : [Color](Color.html) ) : [Vector3](Vector3.html)

Sets the vector components from the RGB components of the given color.

**c**

The color to set.

**Returns:** A reference to this vector.

### .[setFromCylindrical](#setFromCylindrical)( c : [Cylindrical](Cylindrical.html) ) : [Vector3](Vector3.html)

Sets the vector components from the given cylindrical coordinates.

**c**

The cylindrical coordinates.

**Returns:** A reference to this vector.

### .[setFromCylindricalCoords](#setFromCylindricalCoords)( radius : number, theta : number, y : number ) : [Vector3](Vector3.html)

Sets the vector components from the given cylindrical coordinates.

**radius**

The radius.

**theta**

The theta angle in radians.

**y**

The y value.

**Returns:** A reference to this vector.

### .[setFromEuler](#setFromEuler)( e : [Euler](Euler.html) ) : [Vector3](Vector3.html)

Sets the vector components from the given Euler angles.

**e**

The Euler angles to set.

**Returns:** A reference to this vector.

### .[setFromMatrix3Column](#setFromMatrix3Column)( m : [Matrix3](Matrix3.html), index : number ) : [Vector3](Vector3.html)

Sets the vector components from the specified matrix column.

**m**

The 3x3 matrix.

**index**

The column index.

**Returns:** A reference to this vector.

### .[setFromMatrixColumn](#setFromMatrixColumn)( m : [Matrix4](Matrix4.html), index : number ) : [Vector3](Vector3.html)

Sets the vector components from the specified matrix column.

**m**

The 4x4 matrix.

**index**

The column index.

**Returns:** A reference to this vector.

### .[setFromMatrixPosition](#setFromMatrixPosition)( m : [Matrix4](Matrix4.html) ) : [Vector3](Vector3.html)

Sets the vector components to the position elements of the given transformation matrix.

**m**

The 4x4 matrix.

**Returns:** A reference to this vector.

### .[setFromMatrixScale](#setFromMatrixScale)( m : [Matrix4](Matrix4.html) ) : [Vector3](Vector3.html)

Sets the vector components to the scale elements of the given transformation matrix.

**m**

The 4x4 matrix.

**Returns:** A reference to this vector.

### .[setFromSpherical](#setFromSpherical)( s : [Spherical](Spherical.html) ) : [Vector3](Vector3.html)

Sets the vector components from the given spherical coordinates.

**s**

The spherical coordinates.

**Returns:** A reference to this vector.

### .[setFromSphericalCoords](#setFromSphericalCoords)( radius : number, phi : number, theta : number ) : [Vector3](Vector3.html)

Sets the vector components from the given spherical coordinates.

**radius**

The radius.

**phi**

The phi angle in radians.

**theta**

The theta angle in radians.

**Returns:** A reference to this vector.

### .[setLength](#setLength)( length : number ) : [Vector3](Vector3.html)

Sets this vector to a vector with the same direction as this one, but with the specified length.

**length**

The new length of this vector.

**Returns:** A reference to this vector.

### .[setScalar](#setScalar)( scalar : number ) : [Vector3](Vector3.html)

Sets the vector components to the same value.

**scalar**

The value to set for all vector components.

**Returns:** A reference to this vector.

### .[setX](#setX)( x : number ) : [Vector3](Vector3.html)

Sets the vector's x component to the given value.

**x**

The value to set.

**Returns:** A reference to this vector.

### .[setY](#setY)( y : number ) : [Vector3](Vector3.html)

Sets the vector's y component to the given value.

**y**

The value to set.

**Returns:** A reference to this vector.

### .[setZ](#setZ)( z : number ) : [Vector3](Vector3.html)

Sets the vector's z component to the given value.

**z**

The value to set.

**Returns:** A reference to this vector.

### .[sub](#sub)( v : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Subtracts the given vector from this instance.

**v**

The vector to subtract.

**Returns:** A reference to this vector.

### .[subScalar](#subScalar)( s : number ) : [Vector3](Vector3.html)

Subtracts the given scalar value from all components of this instance.

**s**

The scalar to subtract.

**Returns:** A reference to this vector.

### .[subVectors](#subVectors)( a : [Vector3](Vector3.html), b : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Subtracts the given vectors and stores the result in this instance.

**a**

The first vector.

**b**

The second vector.

**Returns:** A reference to this vector.

### .[toArray](#toArray)( array : Array.<number>, offset : number ) : Array.<number>

Writes the components of this vector to the given array. If no array is provided, the method returns a new instance.

**array**

The target array holding the vector components.

Default is `[]`.

**offset**

Index of the first element in the array.

Default is `0`.

**Returns:** The vector components.

### .[transformDirection](#transformDirection)( m : [Matrix4](Matrix4.html) ) : [Vector3](Vector3.html)

Transforms the direction of this vector by a matrix (the upper left 3 x 3 subset of the given 4x4 matrix and then normalizes the result.

**m**

The matrix.

**Returns:** A reference to this vector.

### .[unproject](#unproject)( camera : [Camera](Camera.html) ) : [Vector3](Vector3.html)

Unprojects this vector from the camera's normalized device coordinate (NDC) space into world space.

**camera**

The camera.

**Returns:** A reference to this vector.

## Source

[src/math/Vector3.js](https://github.com/mrdoob/three.js/blob/master/src/math/Vector3.js)