Title: InstanceNode
Source URL: https://threejs.org/docs/pages/InstanceNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) →

# InstanceNode

This node implements the vertex shader logic which is required when rendering 3D objects via instancing. The code makes sure vertex positions, normals and colors can be modified via instanced data.

## Constructor

### new [InstanceNode](#InstanceNode)( count : number, instanceMatrix : [InstancedBufferAttribute](InstancedBufferAttribute.html) | [StorageInstancedBufferAttribute](StorageInstancedBufferAttribute.html), instanceColor : [InstancedBufferAttribute](InstancedBufferAttribute.html) | [StorageInstancedBufferAttribute](StorageInstancedBufferAttribute.html) )

Constructs a new instance node.

**count**

The number of instances.

**instanceMatrix**

Instanced buffer attribute representing the instance transformations.

**instanceColor**

Instanced buffer attribute representing the instance colors.

Default is `null`.

## Properties

### .[buffer](#buffer) : [InstancedInterleavedBuffer](InstancedInterleavedBuffer.html)

A reference to a buffer that is used by `instanceMatrixNode`.

### .[bufferColor](#bufferColor) : [InstancedBufferAttribute](InstancedBufferAttribute.html)

A reference to a buffer that is used by `instanceColorNode`.

### .[count](#count) : number

The number of instances.

### .[instanceColor](#instanceColor) : [InstancedBufferAttribute](InstancedBufferAttribute.html)

Instanced buffer attribute representing the color of instances.

### .[instanceColorNode](#instanceColorNode) : [Node](Node.html)

The node that represents the instance color data.

Default is `null`.

### .[instanceMatrix](#instanceMatrix) : [InstancedBufferAttribute](InstancedBufferAttribute.html)

Instanced buffer attribute representing the transformation of instances.

### .[instanceMatrixNode](#instanceMatrixNode) : [Node](Node.html)

The node that represents the instance matrix data.

### .[isStorageColor](#isStorageColor) : boolean

Tracks whether the color data is provided via a storage buffer.

### .[isStorageMatrix](#isStorageMatrix) : boolean

Tracks whether the matrix data is provided via a storage buffer.

### .[previousInstanceMatrixNode](#previousInstanceMatrixNode) : [Node](Node.html)

The previous instance matrices. Required for computing motion vectors.

Default is `null`.

### .[updateType](#updateType) : string

The update type is set to `frame` since an update of instanced buffer data must be checked per frame.

Default is `'frame'`.

**Overrides:** [Node#updateType](Node.html#updateType)

## Methods

### .[getPreviousInstancedPosition](#getPreviousInstancedPosition)( builder : [NodeBuilder](NodeBuilder.html) ) : [Node](Node.html).<vec3>

Computes the transformed/instanced vertex position of the previous frame.

**builder**

The current node builder.

**Returns:** The instanced position from the previous frame.

### .[setup](#setup)( builder : [NodeBuilder](NodeBuilder.html) )

Setups the internal buffers and nodes and assigns the transformed vertex data to predefined node variables for accumulation. That follows the same patterns like with morph and skinning nodes.

**builder**

The current node builder.

**Overrides:** [Node#setup](Node.html#setup)

### .[update](#update)( frame : [NodeFrame](NodeFrame.html) )

Checks if the internal buffers require an update.

**frame**

The current node frame.

**Overrides:** [Node#update](Node.html#update)

## Source

[src/nodes/accessors/InstanceNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/accessors/InstanceNode.js)