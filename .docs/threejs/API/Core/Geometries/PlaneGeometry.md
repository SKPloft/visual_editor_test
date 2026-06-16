Title: PlaneGeometry
Source URL: https://threejs.org/docs/pages/PlaneGeometry.html

[EventDispatcher](EventDispatcher.html) → [BufferGeometry](BufferGeometry.html) →

# PlaneGeometry

A geometry class for representing a plane.

## Code Example

```js
const geometry = new THREE.PlaneGeometry( 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00, side: THREE.DoubleSide } );
const plane = new THREE.Mesh( geometry, material );
scene.add( plane );
```

## Constructor

### new [PlaneGeometry](#PlaneGeometry)( width : number, height : number, widthSegments : number, heightSegments : number )

Constructs a new plane geometry.

**width**

The width along the X axis.

Default is `1`.

**height**

The height along the Y axis

Default is `1`.

**widthSegments**

The number of segments along the X axis.

Default is `1`.

**heightSegments**

The number of segments along the Y axis.

Default is `1`.

## Properties

### .[parameters](#parameters) : Object

Holds the constructor parameters that have been used to generate the geometry. Any modification after instantiation does not change the geometry.

## Static Methods

### .[fromJSON](#.fromJSON)( data : Object ) : [PlaneGeometry](PlaneGeometry.html)

Factory method for creating an instance of this class from the given JSON object.

**data**

A JSON object representing the serialized geometry.

**Returns:** A new instance.

## Source

[src/geometries/PlaneGeometry.js](https://github.com/mrdoob/three.js/blob/master/src/geometries/PlaneGeometry.js)