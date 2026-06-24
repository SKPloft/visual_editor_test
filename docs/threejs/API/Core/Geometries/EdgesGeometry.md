Title: EdgesGeometry
Source URL: https://threejs.org/docs/pages/EdgesGeometry.html

[EventDispatcher](EventDispatcher.html) → [BufferGeometry](BufferGeometry.html) →

# EdgesGeometry

Can be used as a helper object to view the edges of a geometry.

Note: It is not yet possible to serialize/deserialize instances of this class.

## Code Example

```js
const geometry = new THREE.BoxGeometry();
const edges = new THREE.EdgesGeometry( geometry );
const line = new THREE.LineSegments( edges );
scene.add( line );
```

## Constructor

### new [EdgesGeometry](#EdgesGeometry)( geometry : [BufferGeometry](BufferGeometry.html), thresholdAngle : number )

Constructs a new edges geometry.

**geometry**

The geometry.

Default is `null`.

**thresholdAngle**

An edge is only rendered if the angle (in degrees) between the face normals of the adjoining faces exceeds this value.

Default is `1`.

## Properties

### .[parameters](#parameters) : Object

Holds the constructor parameters that have been used to generate the geometry. Any modification after instantiation does not change the geometry.

## Source

[src/geometries/EdgesGeometry.js](https://github.com/mrdoob/three.js/blob/master/src/geometries/EdgesGeometry.js)