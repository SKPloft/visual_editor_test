Title: Points
Source URL: https://threejs.org/docs/pages/Points.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) →

# Points

A class for displaying points or point clouds.

## Constructor

### new [Points](#Points)( geometry : [BufferGeometry](BufferGeometry.html), material : [Material](Material.html) | Array.<[Material](Material.html)\> )

Constructs a new point cloud.

**geometry**

The points geometry.

**material**

The points material.

## Properties

### .[geometry](#geometry) : [BufferGeometry](BufferGeometry.html)

The points geometry.

### .[isPoints](#isPoints) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[material](#material) : [Material](Material.html) | Array.<[Material](Material.html)\>

The line material.

Default is `PointsMaterial`.

### .[morphTargetDictionary](#morphTargetDictionary) : Object.<string, number> | undefined

A dictionary representing the morph targets in the geometry. The key is the morph targets name, the value its attribute index. This member is `undefined` by default and only set when morph targets are detected in the geometry.

Default is `undefined`.

### .[morphTargetInfluences](#morphTargetInfluences) : Array.<number> | undefined

An array of weights typically in the range `[0,1]` that specify how much of the morph is applied. This member is `undefined` by default and only set when morph targets are detected in the geometry.

Default is `undefined`.

## Methods

### .[raycast](#raycast)( raycaster : [Raycaster](Raycaster.html), intersects : Array.<Object> )

Computes intersection points between a casted ray and this point cloud.

**raycaster**

The raycaster.

**intersects**

The target array that holds the intersection points.

**Overrides:** [Object3D#raycast](Object3D.html#raycast)

### .[updateMorphTargets](#updateMorphTargets)()

Sets the values of [Points#morphTargetDictionary](Points.html#morphTargetDictionary) and [Points#morphTargetInfluences](Points.html#morphTargetInfluences) to make sure existing morph targets can influence this 3D object.

## Source

[src/objects/Points.js](https://github.com/mrdoob/three.js/blob/master/src/objects/Points.js)