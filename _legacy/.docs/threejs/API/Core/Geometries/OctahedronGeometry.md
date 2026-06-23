Title: OctahedronGeometry
Source URL: https://threejs.org/docs/pages/OctahedronGeometry.html

[EventDispatcher](EventDispatcher.html) → [BufferGeometry](BufferGeometry.html) → [PolyhedronGeometry](PolyhedronGeometry.html) →

# OctahedronGeometry

A geometry class for representing an octahedron.

## Code Example

```js
const geometry = new THREE.OctahedronGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const octahedron = new THREE.Mesh( geometry, material );
scene.add( octahedron );
```

## Constructor

### new [OctahedronGeometry](#OctahedronGeometry)( radius : number, detail : number )

Constructs a new octahedron geometry.

**radius**

Radius of the octahedron.

Default is `1`.

**detail**

Setting this to a value greater than `0` adds vertices making it no longer a octahedron.

Default is `0`.

## Properties

### .[parameters](#parameters) : Object

Holds the constructor parameters that have been used to generate the geometry. Any modification after instantiation does not change the geometry.

**Overrides:** [PolyhedronGeometry#parameters](PolyhedronGeometry.html#parameters)

## Static Methods

### .[fromJSON](#.fromJSON)( data : Object ) : [OctahedronGeometry](OctahedronGeometry.html)

Factory method for creating an instance of this class from the given JSON object.

**data**

A JSON object representing the serialized geometry.

**Returns:** A new instance.

## Source

[src/geometries/OctahedronGeometry.js](https://github.com/mrdoob/three.js/blob/master/src/geometries/OctahedronGeometry.js)