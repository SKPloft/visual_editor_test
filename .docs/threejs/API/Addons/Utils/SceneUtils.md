Title: module-SceneUtils
Source URL: https://threejs.org/docs/pages/module-SceneUtils.html

# SceneUtils

## Import

SceneUtils is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import * as SceneUtils from 'three/addons/utils/SceneUtils.js';
```

## Methods

### .[createMeshesFromInstancedMesh](#~createMeshesFromInstancedMesh)( instancedMesh : [InstancedMesh](InstancedMesh.html) ) : [Group](Group.html) (inner)

This function creates a mesh for each instance of the given instanced mesh and adds it to a group. Each mesh will honor the current 3D transformation of its corresponding instance.

**instancedMesh**

The instanced mesh.

**Returns:** A group of meshes.

### .[createMeshesFromMultiMaterialMesh](#~createMeshesFromMultiMaterialMesh)( mesh : [Mesh](Mesh.html) ) : [Group](Group.html) (inner)

This function creates a mesh for each geometry-group of the given multi-material mesh and adds it to a group.

**mesh**

The multi-material mesh.

**Returns:** A group of meshes.

### .[createMultiMaterialObject](#~createMultiMaterialObject)( geometry : [BufferGeometry](BufferGeometry.html), materials : Array.<[Material](Material.html)\> ) : [Group](Group.html) (inner)

This function represents an alternative way to create 3D objects with multiple materials. Normally, [BufferGeometry#groups](BufferGeometry.html#groups) are used which might introduce issues e.g. when exporting the object to a 3D format. This function accepts a geometry and an array of materials and creates for each material a mesh that is added to a group.

**geometry**

The geometry.

**materials**

An array of materials.

**Returns:** A group representing a multi-material object.

### .[reduceVertices](#~reduceVertices)( object : [Object3D](Object3D.html), func : function, initialValue : [any](global.html#any) ) : [any](global.html#any) (inner)

Executes a reducer function for each vertex of the given 3D object. `reduceVertices()` returns a single value: the function's accumulated result.

**object**

The 3D object that should be processed. It must have a geometry with a `position` attribute.

**func**

The reducer function. First argument is the current value, second argument the current vertex.

**initialValue**

The initial value.

**Returns:** The result.

### .[sortInstancedMesh](#~sortInstancedMesh)( mesh : [InstancedMesh](InstancedMesh.html), compareFn : function ) (inner)

Sorts the instances of the given instanced mesh.

**mesh**

The instanced mesh to sort.

**compareFn**

A custom compare function for the sort.

### .[traverseAncestorsGenerator](#~traverseAncestorsGenerator)( object : [Object3D](Object3D.html) ) : [Object3D](Object3D.html) (generator, inner)

Generator based alternative to [Object3D#traverseAncestors](Object3D.html#traverseAncestors).

**object**

Object to traverse.

##### Yields:

Objects that passed the filter condition.

### .[traverseGenerator](#~traverseGenerator)( object : [Object3D](Object3D.html) ) : [Object3D](Object3D.html) (generator, inner)

Generator based alternative to [Object3D#traverse](Object3D.html#traverse).

**object**

Object to traverse.

##### Yields:

Objects that passed the filter condition.

### .[traverseVisibleGenerator](#~traverseVisibleGenerator)( object : [Object3D](Object3D.html) ) : [Object3D](Object3D.html) (generator, inner)

Generator based alternative to [Object3D#traverseVisible](Object3D.html#traverseVisible).

**object**

Object to traverse.

##### Yields:

Objects that passed the filter condition.

## Source

[examples/jsm/utils/SceneUtils.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/utils/SceneUtils.js)