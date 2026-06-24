Title: IcosahedronGeometry
Source URL: https://threejs.org/docs/pages/IcosahedronGeometry.html

[EventDispatcher](EventDispatcher.html) → [BufferGeometry](BufferGeometry.html) → [PolyhedronGeometry](PolyhedronGeometry.html) →

# IcosahedronGeometry

A geometry class for representing an icosahedron.

## Code Example

```js
const geometry = new THREE.IcosahedronGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const icosahedron = new THREE.Mesh( geometry, material );
scene.add( icosahedron );
```

## Constructor

### new [IcosahedronGeometry](#IcosahedronGeometry)( radius : number, detail : number )

Constructs a new icosahedron geometry.

**radius**

Radius of the icosahedron.

Default is `1`.

**detail**

Setting this to a value greater than `0` adds vertices making it no longer a icosahedron.

Default is `0`.

## Properties

### .[parameters](#parameters) : Object

Holds the constructor parameters that have been used to generate the geometry. Any modification after instantiation does not change the geometry.

**Overrides:** [PolyhedronGeometry#parameters](PolyhedronGeometry.html#parameters)

## Static Methods

### .[fromJSON](#.fromJSON)( data : Object ) : [IcosahedronGeometry](IcosahedronGeometry.html)

Factory method for creating an instance of this class from the given JSON object.

**data**

A JSON object representing the serialized geometry.

**Returns:** A new instance.

## Source

[src/geometries/IcosahedronGeometry.js](https://github.com/mrdoob/three.js/blob/master/src/geometries/IcosahedronGeometry.js)