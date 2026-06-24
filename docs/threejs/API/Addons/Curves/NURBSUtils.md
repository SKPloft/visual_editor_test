Title: module-NURBSUtils
Source URL: https://threejs.org/docs/pages/module-NURBSUtils.html

# NURBSUtils

## Import

NURBSUtils is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import * as NURBSUtils from 'three/addons/curves/NURBSUtils.js';
```

## Methods

### .[calcBSplineDerivatives](#~calcBSplineDerivatives)( p : number, U : Array.<number>, P : Array.<[Vector4](Vector4.html)\>, u : number, nd : number ) : Array.<[Vector4](Vector4.html)\> (inner)

Calculates derivatives of a B-Spline. See The NURBS Book, page 93, algorithm A3.2.

**p**

The degree.

**U**

The knot vector.

**P**

The control points

**u**

The parametric point.

**nd**

The number of derivatives.

**Returns:** An array\[d+1\] with derivatives.

### .[calcBSplinePoint](#~calcBSplinePoint)( p : number, U : Array.<number>, P : Array.<[Vector4](Vector4.html)\>, u : number ) : [Vector4](Vector4.html) (inner)

Calculates B-Spline curve points. See The NURBS Book, page 82, algorithm A3.1.

**p**

The degree of the B-Spline.

**U**

The knot vector.

**P**

The control points

**u**

The parametric point.

**Returns:** The point for given `u`.

### .[calcBasisFunctionDerivatives](#~calcBasisFunctionDerivatives)( span : number, u : number, p : number, n : number, U : Array.<number> ) : Array.<Array.<number>> (inner)

Calculates basis functions derivatives. See The NURBS Book, page 72, algorithm A2.3.

**span**

The span in which `u` lies.

**u**

The parametric point.

**p**

The degree.

**n**

number of derivatives to calculate

**U**

The knot vector.

**Returns:** An array\[n+1\]\[p+1\] with basis functions derivatives.

### .[calcBasisFunctions](#~calcBasisFunctions)( span : number, u : number, p : number, U : Array.<number> ) : Array.<number> (inner)

Calculates basis functions. See The NURBS Book, page 70, algorithm A2.2.

**span**

The span in which `u` lies.

**u**

The parametric value.

**p**

The degree.

**U**

The knot vector.

**Returns:** Array\[p+1\] with basis functions values.

### .[calcKoverI](#~calcKoverI)( k : number, i : number ) : number (inner)

Calculates "K over I".

**k**

The K value.

**i**

The I value.

**Returns:** k!/(i!(k-i)!)

### .[calcNURBSDerivatives](#~calcNURBSDerivatives)( p : number, U : Array.<number>, P : Array.<[Vector4](Vector4.html)\>, u : number, nd : number ) : Array.<[Vector3](Vector3.html)\> (inner)

Calculates NURBS curve derivatives. See The NURBS Book, page 127, algorithm A4.2.

**p**

The degree.

**U**

The knot vector.

**P**

The control points in homogeneous space.

**u**

The parametric point.

**nd**

The number of derivatives.

**Returns:** array with derivatives for rational curve.

### .[calcRationalCurveDerivatives](#~calcRationalCurveDerivatives)( Pders : Array.<[Vector4](Vector4.html)\> ) : Array.<[Vector3](Vector3.html)\> (inner)

Calculates derivatives (0-nd) of rational curve. See The NURBS Book, page 127, algorithm A4.2.

**Pders**

Array with derivatives.

**Returns:** An array with derivatives for rational curve.

### .[calcSurfacePoint](#~calcSurfacePoint)( p : number, q : number, U : Array.<number>, V : Array.<number>, P : Array.<Array.<[Vector4](Vector4.html)\>>, u : number, v : number, target : [Vector3](Vector3.html) ) (inner)

Calculates a rational B-Spline surface point. See The NURBS Book, page 134, algorithm A4.3.

**p**

The first degree of B-Spline surface.

**q**

The second degree of B-Spline surface.

**U**

The first knot vector.

**V**

The second knot vector.

**P**

The control points in homogeneous space.

**u**

The first parametric point.

**v**

The second parametric point.

**target**

The target vector.

### .[calcVolumePoint](#~calcVolumePoint)( p : number, q : number, r : number, U : Array.<number>, V : Array.<number>, W : Array.<number>, P : Array.<Array.<Array.<[Vector4](Vector4.html)\>>>, u : number, v : number, w : number, target : [Vector3](Vector3.html) ) (inner)

Calculates a rational B-Spline volume point. See The NURBS Book, page 134, algorithm A4.3.

**p**

The first degree of B-Spline surface.

**q**

The second degree of B-Spline surface.

**r**

The third degree of B-Spline surface.

**U**

The first knot vector.

**V**

The second knot vector.

**W**

The third knot vector.

**P**

The control points in homogeneous space.

**u**

The first parametric point.

**v**

The second parametric point.

**w**

The third parametric point.

**target**

The target vector.

### .[findSpan](#~findSpan)( p : number, u : number, U : Array.<number> ) : number (inner)

Finds knot vector span.

**p**

The degree.

**u**

The parametric value.

**U**

The knot vector.

**Returns:** The span.

## Source

[examples/jsm/curves/NURBSUtils.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/curves/NURBSUtils.js)