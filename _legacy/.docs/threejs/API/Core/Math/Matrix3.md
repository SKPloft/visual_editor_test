Title: Matrix3
Source URL: https://threejs.org/docs/pages/Matrix3.html

# Matrix3

Represents a 3x3 matrix.

A Note on Row-Major and Column-Major Ordering:

The constructor and [Matrix3#set](Matrix3.html#set) method take arguments in [row-major](https://en.wikipedia.org/wiki/Row-_and_column-major_order#Column-major_order) order, while internally they are stored in the [Matrix3#elements](Matrix3.html#elements) array in column-major order. This means that calling:

will result in the elements array containing:

```js
m.elements = [ 11, 21, 31,
               12, 22, 32,
               13, 23, 33 ];
```

and internally all calculations are performed using column-major ordering. However, as the actual ordering makes no difference mathematically and most people are used to thinking about matrices in row-major order, the three.js documentation shows matrices in row-major order. Just bear in mind that if you are reading the source code, you'll have to take the transpose of any matrices outlined here to make sense of the calculations.

## Code Example

```js
const m = new THREE.Matrix();
m.set( 11, 12, 13,
       21, 22, 23,
       31, 32, 33 );
```

## Constructor

### new [Matrix3](#Matrix3)( n11 : number, n12 : number, n13 : number, n21 : number, n22 : number, n23 : number, n31 : number, n32 : number, n33 : number )

Constructs a new 3x3 matrix. The arguments are supposed to be in row-major order. If no arguments are provided, the constructor initializes the matrix as an identity matrix.

**n11**

1-1 matrix element.

**n12**

1-2 matrix element.

**n13**

1-3 matrix element.

**n21**

2-1 matrix element.

**n22**

2-2 matrix element.

**n23**

2-3 matrix element.

**n31**

3-1 matrix element.

**n32**

3-2 matrix element.

**n33**

3-3 matrix element.

## Properties

### .[elements](#elements) : Array.<number>

A column-major list of matrix values.

## Methods

### .[clone](#clone)() : [Matrix3](Matrix3.html)

Returns a matrix with copied values from this instance.

**Returns:** A clone of this instance.

### .[copy](#copy)( m : [Matrix3](Matrix3.html) ) : [Matrix3](Matrix3.html)

Copies the values of the given matrix to this instance.

**m**

The matrix to copy.

**Returns:** A reference to this matrix.

### .[determinant](#determinant)() : number

Computes and returns the determinant of this matrix.

**Returns:** The determinant.

### .[equals](#equals)( matrix : [Matrix3](Matrix3.html) ) : boolean

Returns `true` if this matrix is equal with the given one.

**matrix**

The matrix to test for equality.

**Returns:** Whether this matrix is equal with the given one.

### .[extractBasis](#extractBasis)( xAxis : [Vector3](Vector3.html), yAxis : [Vector3](Vector3.html), zAxis : [Vector3](Vector3.html) ) : [Matrix3](Matrix3.html)

Extracts the basis of this matrix into the three axis vectors provided.

**xAxis**

The basis's x axis.

**yAxis**

The basis's y axis.

**zAxis**

The basis's z axis.

**Returns:** A reference to this matrix.

### .[fromArray](#fromArray)( array : Array.<number>, offset : number ) : [Matrix3](Matrix3.html)

Sets the elements of the matrix from the given array.

**array**

The matrix elements in column-major order.

**offset**

Index of the first element in the array.

Default is `0`.

**Returns:** A reference to this matrix.

### .[getNormalMatrix](#getNormalMatrix)( matrix4 : [Matrix4](Matrix4.html) ) : [Matrix3](Matrix3.html)

Computes the normal matrix which is the inverse transpose of the upper left 3x3 portion of the given 4x4 matrix.

**matrix4**

The 4x4 matrix.

**Returns:** A reference to this matrix.

### .[identity](#identity)() : [Matrix3](Matrix3.html)

Sets this matrix to the 3x3 identity matrix.

**Returns:** A reference to this matrix.

### .[invert](#invert)() : [Matrix3](Matrix3.html)

Inverts this matrix, using the [analytic method](https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution). You can not invert with a determinant of zero. If you attempt this, the method produces a zero matrix instead.

**Returns:** A reference to this matrix.

### .[makeRotation](#makeRotation)( theta : number ) : [Matrix3](Matrix3.html)

Sets this matrix as a 2D rotational transformation.

**theta**

The rotation in radians.

**Returns:** A reference to this matrix.

### .[makeScale](#makeScale)( x : number, y : number ) : [Matrix3](Matrix3.html)

Sets this matrix as a 2D scale transform.

**x**

The amount to scale in the X axis.

**y**

The amount to scale in the Y axis.

**Returns:** A reference to this matrix.

### .[makeTranslation](#makeTranslation)( x : number | [Vector2](Vector2.html), y : number ) : [Matrix3](Matrix3.html)

Sets this matrix as a 2D translation transform.

**x**

The amount to translate in the X axis or alternatively a translation vector.

**y**

The amount to translate in the Y axis.

**Returns:** A reference to this matrix.

### .[multiply](#multiply)( m : [Matrix3](Matrix3.html) ) : [Matrix3](Matrix3.html)

Post-multiplies this matrix by the given 3x3 matrix.

**m**

The matrix to multiply with.

**Returns:** A reference to this matrix.

### .[multiplyMatrices](#multiplyMatrices)( a : [Matrix3](Matrix3.html), b : [Matrix3](Matrix3.html) ) : [Matrix3](Matrix3.html)

Multiples the given 3x3 matrices and stores the result in this matrix.

**a**

The first matrix.

**b**

The second matrix.

**Returns:** A reference to this matrix.

### .[multiplyScalar](#multiplyScalar)( s : number ) : [Matrix3](Matrix3.html)

Multiplies every component of the matrix by the given scalar.

**s**

The scalar.

**Returns:** A reference to this matrix.

### .[premultiply](#premultiply)( m : [Matrix3](Matrix3.html) ) : [Matrix3](Matrix3.html)

Pre-multiplies this matrix by the given 3x3 matrix.

**m**

The matrix to multiply with.

**Returns:** A reference to this matrix.

### .[rotate](#rotate)( theta : number ) : [Matrix3](Matrix3.html)

Rotates this matrix by the given angle.

**theta**

The rotation in radians.

**Returns:** A reference to this matrix.

### .[scale](#scale)( sx : number, sy : number ) : [Matrix3](Matrix3.html)

Scales this matrix with the given scalar values.

**sx**

The amount to scale in the X axis.

**sy**

The amount to scale in the Y axis.

**Returns:** A reference to this matrix.

### .[set](#set)( n11 : number, n12 : number, n13 : number, n21 : number, n22 : number, n23 : number, n31 : number, n32 : number, n33 : number ) : [Matrix3](Matrix3.html)

Sets the elements of the matrix.The arguments are supposed to be in row-major order.

**n11**

1-1 matrix element.

**n12**

1-2 matrix element.

**n13**

1-3 matrix element.

**n21**

2-1 matrix element.

**n22**

2-2 matrix element.

**n23**

2-3 matrix element.

**n31**

3-1 matrix element.

**n32**

3-2 matrix element.

**n33**

3-3 matrix element.

**Returns:** A reference to this matrix.

### .[setFromMatrix4](#setFromMatrix4)( m : [Matrix4](Matrix4.html) ) : [Matrix3](Matrix3.html)

Set this matrix to the upper 3x3 matrix of the given 4x4 matrix.

**m**

The 4x4 matrix.

**Returns:** A reference to this matrix.

### .[setUvTransform](#setUvTransform)( tx : number, ty : number, sx : number, sy : number, rotation : number, cx : number, cy : number ) : [Matrix3](Matrix3.html)

Sets the UV transform matrix from offset, repeat, rotation, and center.

**tx**

Offset x.

**ty**

Offset y.

**sx**

Repeat x.

**sy**

Repeat y.

**rotation**

Rotation, in radians. Positive values rotate counterclockwise.

**cx**

Center x of rotation.

**cy**

Center y of rotation

**Returns:** A reference to this matrix.

### .[toArray](#toArray)( array : Array.<number>, offset : number ) : Array.<number>

Writes the elements of this matrix to the given array. If no array is provided, the method returns a new instance.

**array**

The target array holding the matrix elements in column-major order.

Default is `[]`.

**offset**

Index of the first element in the array.

Default is `0`.

**Returns:** The matrix elements in column-major order.

### .[translate](#translate)( tx : number, ty : number ) : [Matrix3](Matrix3.html)

Translates this matrix by the given scalar values.

**tx**

The amount to translate in the X axis.

**ty**

The amount to translate in the Y axis.

**Returns:** A reference to this matrix.

### .[transpose](#transpose)() : [Matrix3](Matrix3.html)

Transposes this matrix in place.

**Returns:** A reference to this matrix.

### .[transposeIntoArray](#transposeIntoArray)( r : Array.<number> ) : [Matrix3](Matrix3.html)

Transposes this matrix into the supplied array, and returns itself unchanged.

**r**

An array to store the transposed matrix elements.

**Returns:** A reference to this matrix.

## Source

[src/math/Matrix3.js](https://github.com/mrdoob/three.js/blob/master/src/math/Matrix3.js)