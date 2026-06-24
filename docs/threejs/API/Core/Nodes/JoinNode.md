Title: JoinNode
Source URL: https://threejs.org/docs/pages/JoinNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [TempNode](TempNode.html) →

# JoinNode

This module is part of the TSL core and usually not used in app level code. It represents a join operation during the shader generation process. For example in can compose/join two single floats into a `vec2` type.

## Constructor

### new [JoinNode](#JoinNode)( nodes : Array.<[Node](Node.html)\>, nodeType : string )

Constructs a new join node.

**nodes**

An array of nodes that should be joined.

**nodeType**

The node type.

Default is `null`.

## Properties

### .[nodes](#nodes) : Array.<[Node](Node.html)\>

An array of nodes that should be joined.

## Methods

### .[generateNodeType](#generateNodeType)( builder : [NodeBuilder](NodeBuilder.html) ) : string

This method is overwritten since the node type must be inferred from the joined data length if not explicitly defined.

**builder**

The current node builder.

**Overrides:** [TempNode#generateNodeType](TempNode.html#generateNodeType)

**Returns:** The node type.

## Source

[src/nodes/utils/JoinNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/utils/JoinNode.js)