Title: LineCurve
Source URL: https://threejs.org/docs/pages/LineCurve.html

[Curve](Curve.html) →

# LineCurve

A curve representing a 2D line segment.

## Constructor

### new [LineCurve](#LineCurve)( v1 : [Vector2](Vector2.html), v2 : [Vector2](Vector2.html) )

Constructs a new line curve.

**v1**

The start point.

**v2**

The end point.

## Properties

### .[isLineCurve](#isLineCurve) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[v1](#v1) : [Vector2](Vector2.html)

The start point.

### .[v2](#v2) : [Vector2](Vector2.html)

The end point.

## Methods

### .[getPoint](#getPoint)( t : number, optionalTarget : [Vector2](Vector2.html) ) : [Vector2](Vector2.html)

Returns a point on the line.

**t**

A interpolation factor representing a position on the line. Must be in the range `[0,1]`.

**optionalTarget**

The optional target vector the result is written to.

**Overrides:** [Curve#getPoint](Curve.html#getPoint)

**Returns:** The position on the line.

## Source

[src/extras/curves/LineCurve.js](https://github.com/mrdoob/three.js/blob/master/src/extras/curves/LineCurve.js)