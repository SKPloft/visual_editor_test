Title: LineGeometry
Source URL: https://threejs.org/docs/pages/LineGeometry.html

[InstancedBufferGeometry](InstancedBufferGeometry.html) → [LineSegmentsGeometry](LineSegmentsGeometry.html) →

# LineGeometry

A chain of vertices, forming a polyline.

This is used in [Line2](Line2.html) to describe the shape.

## Code Example

```js
const points = [
	new THREE.Vector3( - 10, 0, 0 ),
	new THREE.Vector3( 0, 5, 0 ),
	new THREE.Vector3( 10, 0, 0 ),
];
const geometry = new LineGeometry();
geometry.setFromPoints( points );
```

## Import

LineGeometry is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { LineLineGeometry2 } from 'three/addons/lines/LineGeometry.js';
```

## Constructor

### new [LineGeometry](#LineGeometry)()

Constructs a new line geometry.

## Properties

### .[isLineGeometry](#isLineGeometry) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

## Methods

### .[fromLine](#fromLine)( line : [Line](Line.html) ) : [LineGeometry](LineGeometry.html)

Setups this line segments geometry from the given line.

**line**

The line that should be used as a data source for this geometry.

**Returns:** A reference to this geometry.

### .[setColors](#setColors)( array : Float32Array | Array.<number> ) : [LineGeometry](LineGeometry.html)

Sets the given line colors for this geometry.

**array**

The position data to set.

**Overrides:** [LineSegmentsGeometry#setColors](LineSegmentsGeometry.html#setColors)

**Returns:** A reference to this geometry.

### .[setFromPoints](#setFromPoints)( points : Array.<([Vector3](Vector3.html)|[Vector2](Vector2.html))> ) : [LineGeometry](LineGeometry.html)

Setups this line segments geometry from the given sequence of points.

**points**

An array of points in 2D or 3D space.

**Returns:** A reference to this geometry.

### .[setPositions](#setPositions)( array : Float32Array | Array.<number> ) : [LineGeometry](LineGeometry.html)

Sets the given line positions for this geometry.

**array**

The position data to set.

**Overrides:** [LineSegmentsGeometry#setPositions](LineSegmentsGeometry.html#setPositions)

**Returns:** A reference to this geometry.

## Source

[examples/jsm/lines/LineGeometry.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/lines/LineGeometry.js)