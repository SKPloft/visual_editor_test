Title: SkinningNode
Source URL: https://threejs.org/docs/pages/SkinningNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) →

# SkinningNode

This node implements the vertex transformation shader logic which is required for skinning/skeletal animation.

## Constructor

### new [SkinningNode](#SkinningNode)( skinnedMesh : [SkinnedMesh](SkinnedMesh.html) )

Constructs a new skinning node.

**skinnedMesh**

The skinned mesh.

## Properties

### .[bindMatrixInverseNode](#bindMatrixInverseNode) : [Node](Node.html).<mat4>

The bind matrix inverse node.

### .[bindMatrixNode](#bindMatrixNode) : [Node](Node.html).<mat4>

The bind matrix node.

### .[boneMatricesNode](#boneMatricesNode) : [Node](Node.html)

The bind matrices as a uniform buffer node.

### .[positionNode](#positionNode) : [Node](Node.html).<vec3>

The current vertex position in local space.

### .[previousBoneMatricesNode](#previousBoneMatricesNode) : [Node](Node.html)

The previous bind matrices as a uniform buffer node. Required for computing motion vectors.

Default is `null`.

### .[skinIndexNode](#skinIndexNode) : [AttributeNode](AttributeNode.html)

The skin index attribute.

### .[skinWeightNode](#skinWeightNode) : [AttributeNode](AttributeNode.html)

The skin weight attribute.

### .[skinnedMesh](#skinnedMesh) : [SkinnedMesh](SkinnedMesh.html)

The skinned mesh.

### .[toPositionNode](#toPositionNode) : [Node](Node.html).<vec3>

The result of vertex position in local space.

### .[updateType](#updateType) : string

The update type overwritten since skinning nodes are updated per object.

**Overrides:** [Node#updateType](Node.html#updateType)

## Methods

### .[generate](#generate)( builder : [NodeBuilder](NodeBuilder.html), output : string ) : string

Generates the code snippet of the skinning node.

**builder**

The current node builder.

**output**

The current output.

**Overrides:** [Node#generate](Node.html#generate)

**Returns:** The generated code snippet.

### .[getPreviousSkinnedPosition](#getPreviousSkinnedPosition)( builder : [NodeBuilder](NodeBuilder.html) ) : [Node](Node.html).<vec3>

Computes the transformed/skinned vertex position of the previous frame.

**builder**

The current node builder.

**Returns:** The skinned position from the previous frame.

### .[getSkinnedNormalAndTangent](#getSkinnedNormalAndTangent)( boneMatrices : [Node](Node.html), normal : [Node](Node.html).<vec3>, tangent : [Node](Node.html).<vec3> ) : Object

Transforms the given vertex normal and tangent via skinning.

**boneMatrices**

The bone matrices

Default is `this.boneMatricesNode`.

**normal**

The vertex normal in local space.

Default is `normalLocal`.

**tangent**

The vertex tangent in local space.

Default is `tangentLocal`.

**Returns:** The transformed vertex normal and tangent.

### .[getSkinnedPosition](#getSkinnedPosition)( boneMatrices : [Node](Node.html), position : [Node](Node.html).<vec3> ) : [Node](Node.html).<vec3>

Transforms the given vertex position via skinning.

**boneMatrices**

The bone matrices

Default is `this.boneMatricesNode`.

**position**

The vertex position in local space.

Default is `this.positionNode`.

**Returns:** The transformed vertex position.

### .[setup](#setup)( builder : [NodeBuilder](NodeBuilder.html) ) : [Node](Node.html).<vec3>

Setups the skinning node by assigning the transformed vertex data to predefined node variables.

**builder**

The current node builder.

**Overrides:** [Node#setup](Node.html#setup)

**Returns:** The transformed vertex position.

### .[update](#update)( frame : [NodeFrame](NodeFrame.html) )

Updates the state of the skinned mesh by updating the skeleton once per frame.

**frame**

The current node frame.

**Overrides:** [Node#update](Node.html#update)

## Source

[src/nodes/accessors/SkinningNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/accessors/SkinningNode.js)