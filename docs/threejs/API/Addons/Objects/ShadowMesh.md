Title: ShadowMesh
Source URL: https://threejs.org/docs/pages/ShadowMesh.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) → [Mesh](Mesh.html) →

# ShadowMesh

A Shadow Mesh that follows a shadow-casting mesh in the scene, but is confined to a single plane. This technique can be used as a very performant alternative to classic shadow mapping. However, it has serious limitations like:

*   Shadows can only be casted on flat planes.
*   No soft shadows support.

## Code Example

```js
const cubeShadow = new ShadowMesh( cube );
scene.add( cubeShadow );
```

## Import

ShadowMesh is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { ShadowMesh } from 'three/addons/objects/ShadowMesh.js';
```

## Constructor

### new [ShadowMesh](#ShadowMesh)( mesh : [Mesh](Mesh.html) )

Constructs a new shadow mesh.

**mesh**

The shadow-casting reference mesh.

## Properties

### .[frustumCulled](#frustumCulled) : boolean

Overwritten to disable view-frustum culling by default.

Default is `false`.

**Overrides:** [Mesh#frustumCulled](Mesh.html#frustumCulled)

### .[isShadowMesh](#isShadowMesh) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[matrixAutoUpdate](#matrixAutoUpdate) : boolean

Overwritten to disable automatic matrix update. The local matrix is computed manually in [ShadowMesh#update](ShadowMesh.html#update).

Default is `false`.

**Overrides:** [Mesh#matrixAutoUpdate](Mesh.html#matrixAutoUpdate)

### .[meshMatrix](#meshMatrix) : [Matrix4](Matrix4.html)

Represent the world matrix of the reference mesh.

## Methods

### .[update](#update)( plane : [Plane](Plane.html), lightPosition4D : [Vector4](Vector4.html) )

Updates the shadow mesh so it follows its shadow-casting reference mesh.

**plane**

The plane onto the shadow mesh is projected.

**lightPosition4D**

The light position.

## Source

[examples/jsm/objects/ShadowMesh.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/objects/ShadowMesh.js)