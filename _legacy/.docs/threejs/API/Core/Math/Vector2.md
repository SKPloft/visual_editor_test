Title: Vector2
Source URL: https://threejs.org/docs/pages/Vector2.html

# Vector2

Class representing a 2D vector. A 2D vector is an ordered pair of numbers (labeled x and y), which can be used to represent a number of things, such as:

*   A point in 2D space (i.e. a position on a plane).
*   A direction and length across a plane. In three.js the length will always be the Euclidean distance(straight-line distance) from `(0, 0)` to `(x, y)` and the direction is also measured from `(0, 0)` towards `(x, y)`.
*   Any arbitrary ordered pair of numbers.

There are other things a 2D vector can be used to represent, such as momentum vectors, complex numbers and so on, however these are the most common uses in three.js.

Iterating through a vector instance will yield its components `(x, y)` in the corresponding order.

## Code Example

```js
const a = new THREE.Vector2( 0, 1 );
//no arguments; will be initialised to (0, 0)
const b = new THREE.Vector2( );
const d = a.distanceTo( b );
```

## Constructor

### new [Vector2](#Vector2)( x : number, y : number )

Constructs a new 2D vector.

**x**

The x value of this vector.

Default is `0`.

**y**

The y value of this vector.

Default is `0`.

## Properties

### .[height](#height) : number

Alias for [Vector2#y](Vector2.html#y).

### .[width](#width) : number

Alias for [Vector2#x](Vector2.html#x).

### .[x](#x) : number

The x value of this vector.

### .[y](#y) : number

The y value of this vector.

## Methods

### .[add](#add)( v : [Vector2](Vector2.html) ) : [Vector2](Vector2.html)

Adds the given vector to this instance.

**v**

The vector to add.

**Returns:** A reference to this vector.

### .[addScalar](#addScalar)( s : number ) : [Vector2](Vector2.html)

Adds the given scalar value to all components of this instance.

**s**

The scalar to add.

**Returns:** A reference to this vector.

### .[addScaledVector](#addScaledVector)( v : [Vector2](Vector2.html), s : number ) : [Vector2](Vector2.html)

Adds the given vector scaled by the given factor to this instance.

**v**

The vector.

**s**

The factor that scales `v`.

**Returns:** A reference to this vector.

### .[addVectors](#addVectors)( a : [Vector2](Vector2.html), b : [Vector2](Vector2.html) ) : [Vector2](Vector2.html)

Adds the given vectors and stores the result in this instance.

**a**

The first vector.

**b**

The second vector.

**Returns:** A reference to this vector.

### .[angle](#angle)() : number

Computes the angle in radians of this vector with respect to the positive x-axis.

**Returns:** The angle in radians.

### .[angleTo](#angleTo)( v : [Vector2](Vector2.html) ) : number

Returns the angle between the given vector and this instance in radians.

**v**

The vector to compute the angle with.

**Returns:** The angle in radians.

### .[applyMatrix3](#applyMatrix3)( m : [Matrix3](Matrix3.html) ) : [Vector2](Vector2.html)

Multiplies this vector (with an implicit 1 as the 3rd component) by the given 3x3 matrix.

**m**

The matrix to apply.

**Returns:** A reference to this vector.

### .[ceil](#ceil)() : [Vector2](Vector2.html)

The components of this vector are rounded up to the nearest integer value.

**Returns:** A reference to this vector.

### .[clamp](#clamp)( min : [Vector2](Vector2.html), max : [Vector2](Vector2.html) ) : [Vector2](Vector2.html)

If this vector's x or y value is greater than the max vector's x or y value, it is replaced by the corresponding value. If this vector's x or y value is less than the min vector's x or y value, it is replaced by the corresponding value.

**min**

The minimum x and y values.

**max**

The maximum x and y values in the desired range.

**Returns:** A reference to this vector.

### .[clampLength](#clampLength)( min : number, max : number ) : [Vector2](Vector2.html)

If this vector's length is greater than the max value, it is replaced by the max value. If this vector's length is less than the min value, it is replaced by the min value.

**min**

The minimum value the vector length will be clamped to.

**max**

The maximum value the vector length will be clamped to.

**Returns:** A reference to this vector.

### .[clampScalar](#clampScalar)( minVal : number, maxVal : number ) : [Vector2](Vector2.html)

If this vector's x or y values are greater than the max value, they are replaced by the max value. If this vector's x or y values are less than the min value, they are replaced by the min value.

**minVal**

The minimum value the components will be clamped to.

**maxVal**

The maximum value the components will be clamped to.

**Returns:** A reference to this vector.

### .[clone](#clone)() : [Vector2](Vector2.html)

Returns a new vector with copied values from this instance.

**Returns:** A clone of this instance.

### .[copy](#copy)( v : [Vector2](Vector2.html) ) : [Vector2](Vector2.html)

Copies the values of the given vector to this instance.

**v**

The vector to copy.

**Returns:** A reference to this vector.

### .[cross](#cross)( v : [Vector2](Vector2.html) ) : number

Calculates the cross product of the given vector with this instance.

**v**

The vector to compute the cross product with.

**Returns:** The result of the cross product.

### .[distanceTo](#distanceTo)( v : [Vector2](Vector2.html) ) : number

Computes the distance from the given vector to this instance.

**v**

The vector to compute the distance to.

**Returns:** The distance.

### .[distanceToSquared](#distanceToSquared)( v : [Vector2](Vector2.html) ) : number

Computes the squared distance from the given vector to this instance. If you are just comparing the distance with another distance, you should compare the distance squared instead as it is slightly more efficient to calculate.

**v**

The vector to compute the squared distance to.

**Returns:** The squared distance.

### .[divide](#divide)( v : [Vector2](Vector2.html) ) : [Vector2](Vector2.html)

Divides this instance by the given vector.

**v**

The vector to divide.

**Returns:** A reference to this vector.

### .[divideScalar](#divideScalar)( scalar : number ) : [Vector2](Vector2.html)

Divides this vector by the given scalar.

**scalar**

The scalar to divide.

**Returns:** A reference to this vector.

### .[dot](#dot)( v : [Vector2](Vector2.html) ) : number

Calculates the dot product of the given vector with this instance.

**v**

The vector to compute the dot product with.

**Returns:** The result of the dot product.

### .[equals](#equals)( v : [Vector2](Vector2.html) ) : boolean

Returns `true` if this vector is equal with the given one.

**v**

The vector to test for equality.

**Returns:** Whether this vector is equal with the given one.

### .[floor](#floor)() : [Vector2](Vector2.html)

The components of this vector are rounded down to the nearest integer value.

**Returns:** A reference to this vector.

### .[fromArray](#fromArray)( array : Array.<number>, offset : number ) : [Vector2](Vector2.html)

Sets this vector's x value to be `array[ offset ]` and y value to be `array[ offset + 1 ]`.

**array**

An array holding the vector component values.

**offset**

The offset into the array.

Default is `0`.

**Returns:** A reference to this vector.

### .[fromBufferAttribute](#fromBufferAttribute)( attribute : [BufferAttribute](BufferAttribute.html), index : number ) : [Vector2](Vector2.html)

Sets the components of this vector from the given buffer attribute.

**attribute**

The buffer attribute holding vector data.

**index**

The index into the attribute.

**Returns:** A reference to this vector.

### .[getComponent](#getComponent)( index : number ) : number

Returns the value of the vector component which matches the given index.

**index**

The component index. `0` equals to x, `1` equals to y.

**Returns:** A vector component value.

### .[length](#length)() : number

Computes the Euclidean length (straight-line length) from (0, 0) to (x, y).

**Returns:** The length of this vector.

### .[lengthSq](#lengthSq)() : number

Computes the square of the Euclidean length (straight-line length) from (0, 0) to (x, y). If you are comparing the lengths of vectors, you should compare the length squared instead as it is slightly more efficient to calculate.

**Returns:** The square length of this vector.

### .[lerp](#lerp)( v : [Vector2](Vector2.html), alpha : number ) : [Vector2](Vector2.html)

Linearly interpolates between the given vector and this instance, where alpha is the percent distance along the line - alpha = 0 will be this vector, and alpha = 1 will be the given one.

**v**

The vector to interpolate towards.

**alpha**

The interpolation factor, typically in the closed interval `[0, 1]`.

**Returns:** A reference to this vector.

### .[lerpVectors](#lerpVectors)( v1 : [Vector2](Vector2.html), v2 : [Vector2](Vector2.html), alpha : number ) : [Vector2](Vector2.html)

Linearly interpolates between the given vectors, where alpha is the percent distance along the line - alpha = 0 will be first vector, and alpha = 1 will be the second one. The result is stored in this instance.

**v1**

The first vector.

**v2**

The second vector.

**alpha**

The interpolation factor, typically in the closed interval `[0, 1]`.

**Returns:** A reference to this vector.

### .[manhattanDistanceTo](#manhattanDistanceTo)( v : [Vector2](Vector2.html) ) : number

Computes the Manhattan distance from the given vector to this instance.

**v**

The vector to compute the Manhattan distance to.

**Returns:** The Manhattan distance.

### .[manhattanLength](#manhattanLength)() : number

Computes the Manhattan length of this vector.

**Returns:** The length of this vector.

### .[max](#max)( v : [Vector2](Vector2.html) ) : [Vector2](Vector2.html)

If this vector's x or y value is less than the given vector's x or y value, replace that value with the corresponding max value.

**v**

The vector.

**Returns:** A reference to this vector.

### .[min](#min)( v : [Vector2](Vector2.html) ) : [Vector2](Vector2.html)

If this vector's x or y value is greater than the given vector's x or y value, replace that value with the corresponding min value.

**v**

The vector.

**Returns:** A reference to this vector.

### .[multiply](#multiply)( v : [Vector2](Vector2.html) ) : [Vector2](Vector2.html)

Multiplies the given vector with this instance.

**v**

The vector to multiply.

**Returns:** A reference to this vector.

### .[multiplyScalar](#multiplyScalar)( scalar : number ) : [Vector2](Vector2.html)

Multiplies the given scalar value with all components of this instance.

**scalar**

The scalar to multiply.

**Returns:** A reference to this vector.

### .[negate](#negate)() : [Vector2](Vector2.html)

Inverts this vector - i.e. sets x = -x and y = -y.

**Returns:** A reference to this vector.

### .[normalize](#normalize)() : [Vector2](Vector2.html)

Converts this vector to a unit vector - that is, sets it equal to a vector with the same direction as this one, but with a vector length of `1`.

**Returns:** A reference to this vector.

### .[random](#random)() : [Vector2](Vector2.html)

Sets each component of this vector to a pseudo-random value between `0` and `1`, excluding `1`.

**Returns:** A reference to this vector.

### .[rotateAround](#rotateAround)( center : [Vector2](Vector2.html), angle : number ) : [Vector2](Vector2.html)

Rotates this vector around the given center by the given angle.

**center**

The point around which to rotate.

**angle**

The angle to rotate, in radians.

**Returns:** A reference to this vector.

### .[round](#round)() : [Vector2](Vector2.html)

The components of this vector are rounded to the nearest integer value

**Returns:** A reference to this vector.

### .[roundToZero](#roundToZero)() : [Vector2](Vector2.html)

The components of this vector are rounded towards zero (up if negative, down if positive) to an integer value.

**Returns:** A reference to this vector.

### .[set](#set)( x : number, y : number ) : [Vector2](Vector2.html)

Sets the vector components.

**x**

The value of the x component.

**y**

The value of the y component.

**Returns:** A reference to this vector.

### .[setComponent](#setComponent)( index : number, value : number ) : [Vector2](Vector2.html)

Allows to set a vector component with an index.

**index**

The component index. `0` equals to x, `1` equals to y.

**value**

The value to set.

**Returns:** A reference to this vector.

### .[setLength](#setLength)( length : number ) : [Vector2](Vector2.html)

Sets this vector to a vector with the same direction as this one, but with the specified length.

**length**

The new length of this vector.

**Returns:** A reference to this vector.

### .[setScalar](#setScalar)( scalar : number ) : [Vector2](Vector2.html)

Sets the vector components to the same value.

**scalar**

The value to set for all vector components.

**Returns:** A reference to this vector.

### .[setX](#setX)( x : number ) : [Vector2](Vector2.html)

Sets the vector's x component to the given value

**x**

The value to set.

**Returns:** A reference to this vector.

### .[setY](#setY)( y : number ) : [Vector2](Vector2.html)

Sets the vector's y component to the given value

**y**

The value to set.

**Returns:** A reference to this vector.

### .[sub](#sub)( v : [Vector2](Vector2.html) ) : [Vector2](Vector2.html)

Subtracts the given vector from this instance.

**v**

The vector to subtract.

**Returns:** A reference to this vector.

### .[subScalar](#subScalar)( s : number ) : [Vector2](Vector2.html)

Subtracts the given scalar value from all components of this instance.

**s**

The scalar to subtract.

**Returns:** A reference to this vector.

### .[subVectors](#subVectors)( a : [Vector2](Vector2.html), b : [Vector2](Vector2.html) ) : [Vector2](Vector2.html)

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

[src/math/Vector2.js](https://github.com/mrdoob/three.js/blob/master/src/math/Vector2.js)