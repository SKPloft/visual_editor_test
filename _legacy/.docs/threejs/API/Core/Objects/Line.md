Title: Line
Source URL: https://threejs.org/docs/pages/Line.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) →

# Line

A continuous line. The line are rendered by connecting consecutive vertices with straight lines.

## Code Example

```js
const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
const points = [];
points.push( new THREE.Vector3( - 10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );
const geometry = new THREE.BufferGeometry().setFromPoints( points );
const line = new THREE.Line( geometry, material );
scene.add( line );
```

## Constructor

### new [Line](#Line)( geometry : [BufferGeometry](BufferGeometry.html), material : [Material](Material.html) | Array.<[Material](Material.html)\> )

Constructs a new line.

**geometry**

The line geometry.

**material**

The line material.

## Properties

### .[geometry](#geometry) : [BufferGeometry](BufferGeometry.html)

The line geometry.

### .[isLine](#isLine) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[material](#material) : [Material](Material.html) | Array.<[Material](Material.html)\>

The line material.

Default is `LineBasicMaterial`.

### .[morphTargetDictionary](#morphTargetDictionary) : Object.<string, number> | undefined

A dictionary representing the morph targets in the geometry. The key is the morph targets name, the value its attribute index. This member is `undefined` by default and only set when morph targets are detected in the geometry.

Default is `undefined`.

### .[morphTargetInfluences](#morphTargetInfluences) : Array.<number> | undefined

An array of weights typically in the range `[0,1]` that specify how much of the morph is applied. This member is `undefined` by default and only set when morph targets are detected in the geometry.

Default is `undefined`.

## Methods

### .[computeLineDistances](#computeLineDistances)() : [Line](Line.html)

Computes an array of distance values which are necessary for rendering dashed lines. For each vertex in the geometry, the method calculates the cumulative length from the current point to the very beginning of the line.

**Returns:** A reference to this line.

### .[raycast](#raycast)( raycaster : [Raycaster](Raycaster.html), intersects : Array.<Object> )

Computes intersection points between a casted ray and this line.

**raycaster**

The raycaster.

**intersects**

The target array that holds the intersection points.

**Overrides:** [Object3D#raycast](Object3D.html#raycast)

### .[updateMorphTargets](#updateMorphTargets)()

Sets the values of [Line#morphTargetDictionary](Line.html#morphTargetDictionary) and [Line#morphTargetInfluences](Line.html#morphTargetInfluences) to make sure existing morph targets can influence this 3D object.

## Source

[src/objects/Line.js](https://github.com/mrdoob/three.js/blob/master/src/objects/Line.js)