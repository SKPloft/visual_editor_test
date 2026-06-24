Title: Vector4
Source URL: https://threejs.org/docs/pages/Vector4.html

# Vector4

Class representing a 4D vector. A 4D vector is an ordered quadruplet of numbers (labeled x, y, z and w), which can be used to represent a number of things, such as:

*   A point in 4D space.
*   A direction and length in 4D space. In three.js the length will always be the Euclidean distance(straight-line distance) from `(0, 0, 0, 0)` to `(x, y, z, w)` and the direction is also measured from `(0, 0, 0, 0)` towards `(x, y, z, w)`.
*   Any arbitrary ordered quadruplet of numbers.

There are other things a 4D vector can be used to represent, however these are the most common uses in _three.js_.

Iterating through a vector instance will yield its components `(x, y, z, w)` in the corresponding order.

## Code Example

```js
const a = new THREE.Vector4( 0, 1, 0, 0 );
//no arguments; will be initialised to (0, 0, 0, 1)
const b = new THREE.Vector4( );
const d = a.dot( b );
```

## Constructor

### new [Vector4](#Vector4)( x : number, y : number, z : number, w : number )

Constructs a new 4D vector.

**x**

The x value of this vector.

Default is `0`.

**y**

The y value of this vector.

Default is `0`.

**z**

The z value of this vector.

Default is `0`.

**w**

The w value of this vector.

Default is `1`.

## Properties

### .[height](#height) : number

Alias for [Vector4#w](Vector4.html#w).

### .[w](#w) : number

The w value of this vector.

### .[width](#width) : number

Alias for [Vector4#z](Vector4.html#z).

### .[x](#x) : number

The x value of this vector.

### .[y](#y) : number

The y value of this vector.

### .[z](#z) : number

The z value of this vector.

## Methods

### .[add](#add)( v : [Vector4](Vector4.html) ) : [Vector4](Vector4.html)

Adds the given vector to this instance.

**v**

The vector to add.

**Returns:** A reference to this vector.

### .[addScalar](#addScalar)( s : number ) : [Vector4](Vector4.html)

Adds the given scalar value to all components of this instance.

**s**

The scalar to add.

**Returns:** A reference to this vector.

### .[addScaledVector](#addScaledVector)( v : [Vector4](Vector4.html), s : number ) : [Vector4](Vector4.html)

Adds the given vector scaled by the given factor to this instance.

**v**

The vector.

**s**

The factor that scales `v`.

**Returns:** A reference to this vector.

### .[addVectors](#addVectors)( a : [Vector4](Vector4.html), b : [Vector4](Vector4.html) ) : [Vector4](Vector4.html)

Adds the given vectors and stores the result in this instance.

**a**

The first vector.

**b**

The second vector.

**Returns:** A reference to this vector.

### .[applyMatrix4](#applyMatrix4)( m : [Matrix4](Matrix4.html) ) : [Vector4](Vector4.html)

Multiplies this vector with the given 4x4 matrix.

**m**

The 4x4 matrix.

**Returns:** A reference to this vector.

### .[ceil](#ceil)() : [Vector4](Vector4.html)

The components of this vector are rounded up to the nearest integer value.

**Returns:** A reference to this vector.

### .[clamp](#clamp)( min : [Vector4](Vector4.html), max : [Vector4](Vector4.html) ) : [Vector4](Vector4.html)

If this vector's x, y, z or w value is greater than the max vector's x, y, z or w value, it is replaced by the corresponding value. If this vector's x, y, z or w value is less than the min vector's x, y, z or w value, it is replaced by the corresponding value.

**min**

The minimum x, y and z values.

**max**

The maximum x, y and z values in the desired range.

**Returns:** A reference to this vector.

### .[clampLength](#clampLength)( min : number, max : number ) : [Vector4](Vector4.html)

If this vector's length is greater than the max value, it is replaced by the max value. If this vector's length is less than the min value, it is replaced by the min value.

**min**

The minimum value the vector length will be clamped to.

**max**

The maximum value the vector length will be clamped to.

**Returns:** A reference to this vector.

### .[clampScalar](#clampScalar)( minVal : number, maxVal : number ) : [Vector4](Vector4.html)

If this vector's x, y, z or w values are greater than the max value, they are replaced by the max value. If this vector's x, y, z or w values are less than the min value, they are replaced by the min value.

**minVal**

The minimum value the components will be clamped to.

**maxVal**

The maximum value the components will be clamped to.

**Returns:** A reference to this vector.

### .[clone](#clone)() : [Vector4](Vector4.html)

Returns a new vector with copied values from this instance.

**Returns:** A clone of this instance.

### .[copy](#copy)( v : [Vector3](Vector3.html) | [Vector4](Vector4.html) ) : [Vector4](Vector4.html)

Copies the values of the given vector to this instance.

**v**

The vector to copy.

**Returns:** A reference to this vector.

### .[divide](#divide)( v : [Vector4](Vector4.html) ) : [Vector4](Vector4.html)

Divides this instance by the given vector.

**v**

The vector to divide.

**Returns:** A reference to this vector.

### .[divideScalar](#divideScalar)( scalar : number ) : [Vector4](Vector4.html)

Divides this vector by the given scalar.

**scalar**

The scalar to divide.

**Returns:** A reference to this vector.

### .[dot](#dot)( v : [Vector4](Vector4.html) ) : number

Calculates the dot product of the given vector with this instance.

**v**

The vector to compute the dot product with.

**Returns:** The result of the dot product.

### .[equals](#equals)( v : [Vector4](Vector4.html) ) : boolean

Returns `true` if this vector is equal with the given one.

**v**

The vector to test for equality.

**Returns:** Whether this vector is equal with the given one.

### .[floor](#floor)() : [Vector4](Vector4.html)

The components of this vector are rounded down to the nearest integer value.

**Returns:** A reference to this vector.

### .[fromArray](#fromArray)( array : Array.<number>, offset : number ) : [Vector4](Vector4.html)

Sets this vector's x value to be `array[ offset ]`, y value to be `array[ offset + 1 ]`, z value to be `array[ offset + 2 ]`, w value to be `array[ offset + 3 ]`.

**array**

An array holding the vector component values.

**offset**

The offset into the array.

Default is `0`.

**Returns:** A reference to this vector.

### .[fromBufferAttribute](#fromBufferAttribute)( attribute : [BufferAttribute](BufferAttribute.html), index : number ) : [Vector4](Vector4.html)

Sets the components of this vector from the given buffer attribute.

**attribute**

The buffer attribute holding vector data.

**index**

The index into the attribute.

**Returns:** A reference to this vector.

### .[getComponent](#getComponent)( index : number ) : number

Returns the value of the vector component which matches the given index.

**index**

The component index. `0` equals to x, `1` equals to y, `2` equals to z, `3` equals to w.

**Returns:** A vector component value.

### .[length](#length)() : number

Computes the Euclidean length (straight-line length) from (0, 0, 0, 0) to (x, y, z, w).

**Returns:** The length of this vector.

### .[lengthSq](#lengthSq)() : number

Computes the square of the Euclidean length (straight-line length) from (0, 0, 0, 0) to (x, y, z, w). If you are comparing the lengths of vectors, you should compare the length squared instead as it is slightly more efficient to calculate.

**Returns:** The square length of this vector.

### .[lerp](#lerp)( v : [Vector4](Vector4.html), alpha : number ) : [Vector4](Vector4.html)

Linearly interpolates between the given vector and this instance, where alpha is the percent distance along the line - alpha = 0 will be this vector, and alpha = 1 will be the given one.

**v**

The vector to interpolate towards.

**alpha**

The interpolation factor, typically in the closed interval `[0, 1]`.

**Returns:** A reference to this vector.

### .[lerpVectors](#lerpVectors)( v1 : [Vector4](Vector4.html), v2 : [Vector4](Vector4.html), alpha : number ) : [Vector4](Vector4.html)

Linearly interpolates between the given vectors, where alpha is the percent distance along the line - alpha = 0 will be first vector, and alpha = 1 will be the second one. The result is stored in this instance.

**v1**

The first vector.

**v2**

The second vector.

**alpha**

The interpolation factor, typically in the closed interval `[0, 1]`.

**Returns:** A reference to this vector.

### .[manhattanLength](#manhattanLength)() : number

Computes the Manhattan length of this vector.

**Returns:** The length of this vector.

### .[max](#max)( v : [Vector4](Vector4.html) ) : [Vector4](Vector4.html)

If this vector's x, y, z or w value is less than the given vector's x, y, z or w value, replace that value with the corresponding max value.

**v**

The vector.

**Returns:** A reference to this vector.

### .[min](#min)( v : [Vector4](Vector4.html) ) : [Vector4](Vector4.html)

If this vector's x, y, z or w value is greater than the given vector's x, y, z or w value, replace that value with the corresponding min value.

**v**

The vector.

**Returns:** A reference to this vector.

### .[multiply](#multiply)( v : [Vector4](Vector4.html) ) : [Vector4](Vector4.html)

Multiplies the given vector with this instance.

**v**

The vector to multiply.

**Returns:** A reference to this vector.

### .[multiplyScalar](#multiplyScalar)( scalar : number ) : [Vector4](Vector4.html)

Multiplies the given scalar value with all components of this instance.

**scalar**

The scalar to multiply.

**Returns:** A reference to this vector.

### .[negate](#negate)() : [Vector4](Vector4.html)

Inverts this vector - i.e. sets x = -x, y = -y, z = -z, w = -w.

**Returns:** A reference to this vector.

### .[normalize](#normalize)() : [Vector4](Vector4.html)

Converts this vector to a unit vector - that is, sets it equal to a vector with the same direction as this one, but with a vector length of `1`.

**Returns:** A reference to this vector.

### .[random](#random)() : [Vector4](Vector4.html)

Sets each component of this vector to a pseudo-random value between `0` and `1`, excluding `1`.

**Returns:** A reference to this vector.

### .[round](#round)() : [Vector4](Vector4.html)

The components of this vector are rounded to the nearest integer value

**Returns:** A reference to this vector.

### .[roundToZero](#roundToZero)() : [Vector4](Vector4.html)

The components of this vector are rounded towards zero (up if negative, down if positive) to an integer value.

**Returns:** A reference to this vector.

### .[set](#set)( x : number, y : number, z : number, w : number ) : [Vector4](Vector4.html)

Sets the vector components.

**x**

The value of the x component.

**y**

The value of the y component.

**z**

The value of the z component.

**w**

The value of the w component.

**Returns:** A reference to this vector.

### .[setAxisAngleFromQuaternion](#setAxisAngleFromQuaternion)( q : [Quaternion](Quaternion.html) ) : [Vector4](Vector4.html)

Sets the x, y and z components of this vector to the quaternion's axis and w to the angle.

**q**

The Quaternion to set.

**Returns:** A reference to this vector.

### .[setAxisAngleFromRotationMatrix](#setAxisAngleFromRotationMatrix)( m : [Matrix4](Matrix4.html) ) : [Vector4](Vector4.html)

Sets the x, y and z components of this vector to the axis of rotation and w to the angle.

**m**

A 4x4 matrix of which the upper left 3x3 matrix is a pure rotation matrix.

**Returns:** A reference to this vector.

### .[setComponent](#setComponent)( index : number, value : number ) : [Vector4](Vector4.html)

Allows to set a vector component with an index.

**index**

The component index. `0` equals to x, `1` equals to y, `2` equals to z, `3` equals to w.

**value**

The value to set.

**Returns:** A reference to this vector.

### .[setFromMatrixPosition](#setFromMatrixPosition)( m : [Matrix4](Matrix4.html) ) : [Vector4](Vector4.html)

Sets the vector components to the position elements of the given transformation matrix.

**m**

The 4x4 matrix.

**Returns:** A reference to this vector.

### .[setLength](#setLength)( length : number ) : [Vector4](Vector4.html)

Sets this vector to a vector with the same direction as this one, but with the specified length.

**length**

The new length of this vector.

**Returns:** A reference to this vector.

### .[setScalar](#setScalar)( scalar : number ) : [Vector4](Vector4.html)

Sets the vector components to the same value.

**scalar**

The value to set for all vector components.

**Returns:** A reference to this vector.

### .[setW](#setW)( w : number ) : [Vector4](Vector4.html)

Sets the vector's w component to the given value

**w**

The value to set.

**Returns:** A reference to this vector.

### .[setX](#setX)( x : number ) : [Vector4](Vector4.html)

Sets the vector's x component to the given value

**x**

The value to set.

**Returns:** A reference to this vector.

### .[setY](#setY)( y : number ) : [Vector4](Vector4.html)

Sets the vector's y component to the given value

**y**

The value to set.

**Returns:** A reference to this vector.

### .[setZ](#setZ)( z : number ) : [Vector4](Vector4.html)

Sets the vector's z component to the given value

**z**

The value to set.

**Returns:** A reference to this vector.

### .[sub](#sub)( v : [Vector4](Vector4.html) ) : [Vector4](Vector4.html)

Subtracts the given vector from this instance.

**v**

The vector to subtract.

**Returns:** A reference to this vector.

### .[subScalar](#subScalar)( s : number ) : [Vector4](Vector4.html)

Subtracts the given scalar value from all components of this instance.

**s**

The scalar to subtract.

**Returns:** A reference to this vector.

### .[subVectors](#subVectors)( a : [Vector4](Vector4.html), b : [Vector4](Vector4.html) ) : [Vector4](Vector4.html)

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

## Source

[src/math/Vector4.js](https://github.com/mrdoob/three.js/blob/master/src/math/Vector4.js)