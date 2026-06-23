Title: TetrahedronGeometry
Source URL: https://threejs.org/docs/pages/TetrahedronGeometry.html

[EventDispatcher](EventDispatcher.html) → [BufferGeometry](BufferGeometry.html) → [PolyhedronGeometry](PolyhedronGeometry.html) →

# TetrahedronGeometry

A geometry class for representing an tetrahedron.

## Code Example

```js
const geometry = new THREE.TetrahedronGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const tetrahedron = new THREE.Mesh( geometry, material );
scene.add( tetrahedron );
```

## Constructor

### new [TetrahedronGeometry](#TetrahedronGeometry)( radius : number, detail : number )

Constructs a new tetrahedron geometry.

**radius**

Radius of the tetrahedron.

Default is `1`.

**detail**

Setting this to a value greater than `0` adds vertices making it no longer a tetrahedron.

Default is `0`.

## Properties

### .[parameters](#parameters) : Object

Holds the constructor parameters that have been used to generate the geometry. Any modification after instantiation does not change the geometry.

**Overrides:** [PolyhedronGeometry#parameters](PolyhedronGeometry.html#parameters)

## Static Methods

### .[fromJSON](#.fromJSON)( data : Object ) : [TetrahedronGeometry](TetrahedronGeometry.html)

Factory method for creating an instance of this class from the given JSON object.

**data**

A JSON object representing the serialized geometry.

**Returns:** A new instance.

## Source

[src/geometries/TetrahedronGeometry.js](https://github.com/mrdoob/three.js/blob/master/src/geometries/TetrahedronGeometry.js)