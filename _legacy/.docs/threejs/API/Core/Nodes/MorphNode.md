Title: MorphNode
Source URL: https://threejs.org/docs/pages/MorphNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) →

# MorphNode

This node implements the vertex transformation shader logic which is required for morph target animation.

## Constructor

### new [MorphNode](#MorphNode)( mesh : [Mesh](Mesh.html) )

Constructs a new morph node.

**mesh**

The mesh holding the morph targets.

## Properties

### .[mesh](#mesh) : [Mesh](Mesh.html)

The mesh holding the morph targets.

### .[morphBaseInfluence](#morphBaseInfluence) : [UniformNode](UniformNode.html).<float>

A uniform node which represents the morph base influence value.

### .[updateType](#updateType) : string

The update type overwritten since morph nodes are updated per object.

**Overrides:** [Node#updateType](Node.html#updateType)

## Methods

### .[setup](#setup)( builder : [NodeBuilder](NodeBuilder.html) )

Setups the morph node by assigning the transformed vertex data to predefined node variables.

**builder**

The current node builder.

**Overrides:** [Node#setup](Node.html#setup)

### .[update](#update)( frame : [NodeFrame](NodeFrame.html) )

Updates the state of the morphed mesh by updating the base influence.

**frame**

The current node frame.

**Overrides:** [Node#update](Node.html#update)

## Source

[src/nodes/accessors/MorphNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/accessors/MorphNode.js)