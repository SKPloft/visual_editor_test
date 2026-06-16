Title: Line2
Source URL: https://threejs.org/docs/pages/Line2.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) → [Mesh](Mesh.html) → [LineSegments2](LineSegments2.html) →

# Line2

A polyline drawn between vertices.

This adds functionality beyond [Line](Line.html), like arbitrary line width and changing width to be in world units.It extends [LineSegments2](LineSegments2.html), simplifying constructing segments from a chain of points.

This module can only be used with [WebGLRenderer](WebGLRenderer.html). When using [WebGPURenderer](WebGPURenderer.html), import the class from `lines/webgpu/Line2.js`.

## Code Example

```js
const geometry = new LineGeometry();
geometry.setPositions( positions );
geometry.setColors( colors );
const material = new LineMaterial( { linewidth: 5, vertexColors: true } };
const line = new Line2( geometry, material );
scene.add( line );
```

## Import

Line2 is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { Line2 } from 'three/addons/lines/Line2.js';
```

## Constructor

### new [Line2](#Line2)( geometry : [LineGeometry](LineGeometry.html), material : [LineMaterial](LineMaterial.html) )

Constructs a new wide line.

**geometry**

The line geometry.

**material**

The line material.

## Properties

### .[isLine2](#isLine2) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

## Source

[examples/jsm/lines/Line2.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/lines/Line2.js)