Title: InstancedMesh
Source URL: https://threejs.org/docs/pages/InstancedMesh.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) → [Mesh](Mesh.html) →

# InstancedMesh

A special version of a mesh with instanced rendering support. Use this class if you have to render a large number of objects with the same geometry and material(s) but with different world transformations. The usage of 'InstancedMesh' will help you to reduce the number of draw calls and thus improve the overall rendering performance in your application.

## Constructor

### new [InstancedMesh](#InstancedMesh)( geometry : [BufferGeometry](BufferGeometry.html), material : [Material](Material.html) | Array.<[Material](Material.html)\>, count : number )

Constructs a new instanced mesh.

**geometry**

The mesh geometry.

**material**

The mesh material.

**count**

The number of instances.

## Properties

### .[boundingBox](#boundingBox) : [Box3](Box3.html)

The bounding box of the instanced mesh. Can be computed via [InstancedMesh#computeBoundingBox](InstancedMesh.html#computeBoundingBox).

Default is `null`.

### .[boundingSphere](#boundingSphere) : [Sphere](Sphere.html)

The bounding sphere of the instanced mesh. Can be computed via [InstancedMesh#computeBoundingSphere](InstancedMesh.html#computeBoundingSphere).

Default is `null`.

### .[count](#count) : number

The number of instances.

**Overrides:** [Mesh#count](Mesh.html#count)

### .[instanceColor](#instanceColor) : [InstancedBufferAttribute](InstancedBufferAttribute.html)

Represents the color of all instances. You have to set its [BufferAttribute#needsUpdate](BufferAttribute.html#needsUpdate) flag to true if you modify instanced data via [InstancedMesh#setColorAt](InstancedMesh.html#setColorAt).

Default is `null`.

### .[instanceMatrix](#instanceMatrix) : [InstancedBufferAttribute](InstancedBufferAttribute.html)

Represents the local transformation of all instances. You have to set its [BufferAttribute#needsUpdate](BufferAttribute.html#needsUpdate) flag to true if you modify instanced data via [InstancedMesh#setMatrixAt](InstancedMesh.html#setMatrixAt).

### .[isInstancedMesh](#isInstancedMesh) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[morphTexture](#morphTexture) : [DataTexture](DataTexture.html)

Represents the morph target weights of all instances. You have to set its [Texture#needsUpdate](Texture.html#needsUpdate) flag to true if you modify instanced data via [InstancedMesh#setMorphAt](InstancedMesh.html#setMorphAt).

Default is `null`.

### .[previousInstanceMatrix](#previousInstanceMatrix) : [InstancedBufferAttribute](InstancedBufferAttribute.html)

Represents the local transformation of all instances of the previous frame. Required for computing velocity. Maintained in [InstanceNode](InstanceNode.html).

Default is `null`.

## Methods

### .[computeBoundingBox](#computeBoundingBox)()

Computes the bounding box of the instanced mesh, and updates [InstancedMesh#boundingBox](InstancedMesh.html#boundingBox). The bounding box is not automatically computed by the engine; this method must be called by your app. You may need to recompute the bounding box if an instance is transformed via [InstancedMesh#setMatrixAt](InstancedMesh.html#setMatrixAt).

### .[computeBoundingSphere](#computeBoundingSphere)()

Computes the bounding sphere of the instanced mesh, and updates [InstancedMesh#boundingSphere](InstancedMesh.html#boundingSphere) The engine automatically computes the bounding sphere when it is needed, e.g., for ray casting or view frustum culling. You may need to recompute the bounding sphere if an instance is transformed via [InstancedMesh#setMatrixAt](InstancedMesh.html#setMatrixAt).

### .[dispose](#dispose)()

Frees the GPU-related resources allocated by this instance. Call this method whenever this instance is no longer used in your app.

### .[getColorAt](#getColorAt)( index : number, color : [Color](Color.html) ) : [Color](Color.html)

Gets the color of the defined instance.

**index**

The instance index.

**color**

The target object that is used to store the method's result.

**Returns:** A reference to the target color.

### .[getMatrixAt](#getMatrixAt)( index : number, matrix : [Matrix4](Matrix4.html) ) : [Matrix4](Matrix4.html)

Gets the local transformation matrix of the defined instance.

**index**

The instance index.

**matrix**

The target object that is used to store the method's result.

**Returns:** A reference to the target matrix.

### .[getMorphAt](#getMorphAt)( index : number, object : [Mesh](Mesh.html) )

Gets the morph target weights of the defined instance.

**index**

The instance index.

**object**

The target object that is used to store the method's result.

### .[setColorAt](#setColorAt)( index : number, color : [Color](Color.html) ) : [InstancedMesh](InstancedMesh.html)

Sets the given color to the defined instance. Make sure you set the `needsUpdate` flag of [InstancedMesh#instanceColor](InstancedMesh.html#instanceColor) to `true` after updating all the colors.

**index**

The instance index.

**color**

The instance color.

**Returns:** A reference to this instanced mesh.

### .[setMatrixAt](#setMatrixAt)( index : number, matrix : [Matrix4](Matrix4.html) ) : [InstancedMesh](InstancedMesh.html)

Sets the given local transformation matrix to the defined instance. Make sure you set the `needsUpdate` flag of [InstancedMesh#instanceMatrix](InstancedMesh.html#instanceMatrix) to `true` after updating all the matrices.

**index**

The instance index.

**matrix**

The local transformation.

**Returns:** A reference to this instanced mesh.

### .[setMorphAt](#setMorphAt)( index : number, object : [Mesh](Mesh.html) ) : [InstancedMesh](InstancedMesh.html)

Sets the morph target weights to the defined instance. Make sure you set the `needsUpdate` flag of [InstancedMesh#morphTexture](InstancedMesh.html#morphTexture) to `true` after updating all the influences.

**index**

The instance index.

**object**

A mesh which `morphTargetInfluences` property containing the morph target weights of a single instance.

**Returns:** A reference to this instanced mesh.

## Source

[src/objects/InstancedMesh.js](https://github.com/mrdoob/three.js/blob/master/src/objects/InstancedMesh.js)