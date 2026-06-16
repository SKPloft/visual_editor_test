Title: ShapeGeometry
Source URL: https://threejs.org/docs/pages/ShapeGeometry.html

[EventDispatcher](EventDispatcher.html) → [BufferGeometry](BufferGeometry.html) →

# ShapeGeometry

Creates an one-sided polygonal geometry from one or more path shapes.

## Code Example

```js
const arcShape = new THREE.Shape()
	.moveTo( 5, 1 )
	.absarc( 1, 1, 4, 0, Math.PI * 2, false );
const geometry = new THREE.ShapeGeometry( arcShape );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00, side: THREE.DoubleSide } );
const mesh = new THREE.Mesh( geometry, material ) ;
scene.add( mesh );
```

## Constructor

### new [ShapeGeometry](#ShapeGeometry)( shapes : [Shape](Shape.html) | Array.<[Shape](Shape.html)\>, curveSegments : number )

Constructs a new shape geometry.

**shapes**

A shape or an array of shapes.

**curveSegments**

Number of segments per shape.

Default is `12`.

## Properties

### .[parameters](#parameters) : Object

Holds the constructor parameters that have been used to generate the geometry. Any modification after instantiation does not change the geometry.

## Static Methods

### .[fromJSON](#.fromJSON)( data : Object, shapes : Array.<[Shape](Shape.html)\> ) : [ShapeGeometry](ShapeGeometry.html)

Factory method for creating an instance of this class from the given JSON object.

**data**

A JSON object representing the serialized geometry.

**shapes**

An array of shapes.

**Returns:** A new instance.

## Source

[src/geometries/ShapeGeometry.js](https://github.com/mrdoob/three.js/blob/master/src/geometries/ShapeGeometry.js)