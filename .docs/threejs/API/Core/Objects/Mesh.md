Title: mesh
Source URL: https://threejs.org/docs/pages/Mesh.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) →

# Mesh

Class representing triangular polygon mesh based objects.

## Code Example

```js
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );
```

## Constructor

### new [Mesh](#Mesh)( geometry : [BufferGeometry](BufferGeometry.html), material : [Material](Material.html) | Array.<[Material](Material.html)\> )

Constructs a new mesh.

**geometry**

The mesh geometry.

**material**

The mesh material.

## Properties

### .[count](#count) : number

The number of instances of this mesh. Can only be used with [WebGPURenderer](WebGPURenderer.html).

Default is `1`.

### .[geometry](#geometry) : [BufferGeometry](BufferGeometry.html)

The mesh geometry.

### .[isMesh](#isMesh) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[material](#material) : [Material](Material.html) | Array.<[Material](Material.html)\>

The mesh material.

Default is `MeshBasicMaterial`.

### .[morphTargetDictionary](#morphTargetDictionary) : Object.<string, number> | undefined

A dictionary representing the morph targets in the geometry. The key is the morph targets name, the value its attribute index. This member is `undefined` by default and only set when morph targets are detected in the geometry.

Default is `undefined`.

### .[morphTargetInfluences](#morphTargetInfluences) : Array.<number> | undefined

An array of weights typically in the range `[0,1]` that specify how much of the morph is applied. This member is `undefined` by default and only set when morph targets are detected in the geometry.

Default is `undefined`.

## Methods

### .[getVertexPosition](#getVertexPosition)( index : number, target : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Returns the local-space position of the vertex at the given index, taking into account the current animation state of both morph targets and skinning.

**index**

The vertex index.

**target**

The target object that is used to store the method's result.

**Returns:** The vertex position in local space.

### .[raycast](#raycast)( raycaster : [Raycaster](Raycaster.html), intersects : Array.<Object> )

Computes intersection points between a casted ray and this line.

**raycaster**

The raycaster.

**intersects**

The target array that holds the intersection points.

**Overrides:** [Object3D#raycast](Object3D.html#raycast)

### .[updateMorphTargets](#updateMorphTargets)()

Sets the values of [Mesh#morphTargetDictionary](Mesh.html#morphTargetDictionary) and [Mesh#morphTargetInfluences](Mesh.html#morphTargetInfluences) to make sure existing morph targets can influence this 3D object.

## Source

[src/objects/Mesh.js](https://github.com/mrdoob/three.js/blob/master/src/objects/Mesh.js)