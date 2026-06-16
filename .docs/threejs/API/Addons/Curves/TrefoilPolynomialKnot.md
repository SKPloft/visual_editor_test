Title: TrefoilPolynomialKnot
Source URL: https://threejs.org/docs/pages/TrefoilPolynomialKnot.html

[Curve](Curve.html) →

# TrefoilPolynomialKnot

A Trefoil Polynomial Knot.

## Import

TrefoilPolynomialKnot is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { TrefoilPolynomialKnot } from 'three/addons/curves/CurveExtras.js';
```

## Constructor

### new [TrefoilPolynomialKnot](#TrefoilPolynomialKnot)( scale : number )

Constructs a new Trefoil Polynomial Knot.

**scale**

The curve's scale.

Default is `10`.

## Properties

### .[scale](#scale) : number

The curve's scale.

Default is `10`.

## Methods

### .[getPoint](#getPoint)( t : number, optionalTarget : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

This method returns a vector in 3D space for the given interpolation factor.

**t**

A interpolation factor representing a position on the curve. Must be in the range `[0,1]`.

**optionalTarget**

The optional target vector the result is written to.

**Overrides:** [Curve#getPoint](Curve.html#getPoint)

**Returns:** The position on the curve.

## Source

[examples/jsm/curves/CurveExtras.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/curves/CurveExtras.js)