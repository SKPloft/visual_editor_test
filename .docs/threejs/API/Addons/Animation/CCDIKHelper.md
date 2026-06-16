Title: CCDIKHelper
Source URL: https://threejs.org/docs/pages/CCDIKHelper.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) →

# CCDIKHelper

Helper for visualizing IK bones.

## Import

CCDIKHelper is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { CCDIKHelper } from 'three/addons/animation/CCDIKSolver.js';
```

## Constructor

### new [CCDIKHelper](#CCDIKHelper)( mesh : [SkinnedMesh](SkinnedMesh.html), iks : Array.<[CCDIKSolver~IK](CCDIKSolver.html#~IK)\>, sphereSize : number )

**mesh**

The skinned mesh.

**iks**

The IK objects.

Default is `[]`.

**sphereSize**

The sphere size.

Default is `0.25`.

## Properties

### .[effectorSphereMaterial](#effectorSphereMaterial) : [MeshBasicMaterial](MeshBasicMaterial.html)

The material for the effector spheres.

### .[iks](#iks) : Array.<[CCDIKSolver~IK](CCDIKSolver.html#~IK)\>

The IK objects.

### .[lineMaterial](#lineMaterial) : [LineBasicMaterial](LineBasicMaterial.html)

A global line material.

### .[linkSphereMaterial](#linkSphereMaterial) : [MeshBasicMaterial](MeshBasicMaterial.html)

The material for the link spheres.

### .[root](#root) : [SkinnedMesh](SkinnedMesh.html)

The skinned mesh this helper refers to.

### .[sphereGeometry](#sphereGeometry) : [SphereGeometry](SphereGeometry.html)

The helpers sphere geometry.

### .[targetSphereMaterial](#targetSphereMaterial) : [MeshBasicMaterial](MeshBasicMaterial.html)

The material for the target spheres.

## Methods

### .[dispose](#dispose)()

Frees the GPU-related resources allocated by this instance. Call this method whenever this instance is no longer used in your app.

## Source

[examples/jsm/animation/CCDIKSolver.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/animation/CCDIKSolver.js)