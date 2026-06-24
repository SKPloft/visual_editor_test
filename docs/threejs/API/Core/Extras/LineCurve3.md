Title: LineCurve3
Source URL: https://threejs.org/docs/pages/LineCurve3.html

[Curve](Curve.html) →

# LineCurve3

A curve representing a 3D line segment.

## Constructor

### new [LineCurve3](#LineCurve3)( v1 : [Vector3](Vector3.html), v2 : [Vector3](Vector3.html) )

Constructs a new line curve.

**v1**

The start point.

**v2**

The end point.

## Properties

### .[isLineCurve3](#isLineCurve3) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[v1](#v1) : [Vector3](Vector3.html)

The start point.

### .[v2](#v2) : [Vector2](Vector2.html)

The end point.

## Methods

### .[getPoint](#getPoint)( t : number, optionalTarget : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Returns a point on the line.

**t**

A interpolation factor representing a position on the line. Must be in the range `[0,1]`.

**optionalTarget**

The optional target vector the result is written to.

**Overrides:** [Curve#getPoint](Curve.html#getPoint)

**Returns:** The position on the line.

## Source

[src/extras/curves/LineCurve3.js](https://github.com/mrdoob/three.js/blob/master/src/extras/curves/LineCurve3.js)