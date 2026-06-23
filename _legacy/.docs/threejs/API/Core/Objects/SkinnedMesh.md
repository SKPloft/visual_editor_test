Title: SkinnedMesh
Source URL: https://threejs.org/docs/pages/SkinnedMesh.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) → [Mesh](Mesh.html) →

# SkinnedMesh

A mesh that has a [Skeleton](Skeleton.html) that can then be used to animate the vertices of the geometry with skinning/skeleton animation.

Next to a valid skeleton, the skinned mesh requires skin indices and weights as buffer attributes in its geometry. These attribute define which bones affect a single vertex to a certain extend.

Typically skinned meshes are not created manually but loaders like [GLTFLoader](GLTFLoader.html) or [FBXLoader](FBXLoader.html) import respective models.

## Constructor

### new [SkinnedMesh](#SkinnedMesh)( geometry : [BufferGeometry](BufferGeometry.html), material : [Material](Material.html) | Array.<[Material](Material.html)\> )

Constructs a new skinned mesh.

**geometry**

The mesh geometry.

**material**

The mesh material.

## Properties

### .[bindMatrix](#bindMatrix) : [Matrix4](Matrix4.html)

The base matrix that is used for the bound bone transforms.

### .[bindMatrixInverse](#bindMatrixInverse) : [Matrix4](Matrix4.html)

The base matrix that is used for resetting the bound bone transforms.

### .[bindMode](#bindMode) : [AttachedBindMode](global.html#AttachedBindMode) | [DetachedBindMode](global.html#DetachedBindMode)

`AttachedBindMode` means the skinned mesh shares the same world space as the skeleton. This is not true when using `DetachedBindMode` which is useful when sharing a skeleton across multiple skinned meshes.

Default is `AttachedBindMode`.

### .[boundingBox](#boundingBox) : [Box3](Box3.html)

The bounding box of the skinned mesh. Can be computed via [SkinnedMesh#computeBoundingBox](SkinnedMesh.html#computeBoundingBox).

Default is `null`.

### .[boundingSphere](#boundingSphere) : [Sphere](Sphere.html)

The bounding sphere of the skinned mesh. Can be computed via [SkinnedMesh#computeBoundingSphere](SkinnedMesh.html#computeBoundingSphere).

Default is `null`.

### .[isSkinnedMesh](#isSkinnedMesh) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

## Methods

### .[applyBoneTransform](#applyBoneTransform)( index : number, target : [Vector3](Vector3.html) | [Vector4](Vector4.html) ) : [Vector3](Vector3.html) | [Vector4](Vector4.html)

Applies the bone transform associated with the given index to the given vector. Can be used to transform positions or direction vectors by providing a Vector4 with 1 or 0 in the w component respectively. Returns the updated vector.

**index**

The vertex index.

**target**

The target object that is used to store the method's result.

**Returns:** The updated vertex attribute data.

### .[bind](#bind)( skeleton : [Skeleton](Skeleton.html), bindMatrix : [Matrix4](Matrix4.html) )

Binds the given skeleton to the skinned mesh.

**skeleton**

The skeleton to bind.

**bindMatrix**

The bind matrix. If no bind matrix is provided, the skinned mesh's world matrix will be used instead.

### .[computeBoundingBox](#computeBoundingBox)()

Computes the bounding box of the skinned mesh, and updates [SkinnedMesh#boundingBox](SkinnedMesh.html#boundingBox). The bounding box is not automatically computed by the engine; this method must be called by your app. If the skinned mesh is animated, the bounding box should be recomputed per frame in order to reflect the current animation state.

### .[computeBoundingSphere](#computeBoundingSphere)()

Computes the bounding sphere of the skinned mesh, and updates [SkinnedMesh#boundingSphere](SkinnedMesh.html#boundingSphere). The bounding sphere is automatically computed by the engine once when it is needed, e.g., for ray casting and view frustum culling. If the skinned mesh is animated, the bounding sphere should be recomputed per frame in order to reflect the current animation state.

### .[normalizeSkinWeights](#normalizeSkinWeights)()

Normalizes the skin weights which are defined as a buffer attribute in the skinned mesh's geometry.

### .[pose](#pose)()

This method sets the skinned mesh in the rest pose).

## Source

[src/objects/SkinnedMesh.js](https://github.com/mrdoob/three.js/blob/master/src/objects/SkinnedMesh.js)