Title: RotateNode
Source URL: https://threejs.org/docs/pages/RotateNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [TempNode](TempNode.html) →

# RotateNode

Applies a rotation to the given position node.

## Constructor

### new [RotateNode](#RotateNode)( positionNode : [Node](Node.html), rotationNode : [Node](Node.html) )

Constructs a new rotate node.

**positionNode**

The position node.

**rotationNode**

Represents the rotation that is applied to the position node. Depending on whether the position data are 2D or 3D, the rotation is expressed a single float value or an Euler value.

## Properties

### .[positionNode](#positionNode) : [Node](Node.html)

The position node.

### .[rotationNode](#rotationNode) : [Node](Node.html)

Represents the rotation that is applied to the position node. Depending on whether the position data are 2D or 3D, the rotation is expressed a single float value or an Euler value.

## Methods

### .[generateNodeType](#generateNodeType)( builder : [NodeBuilder](NodeBuilder.html) ) : string

The type of the [RotateNode#positionNode](RotateNode.html#positionNode) defines the node's type.

**builder**

The current node builder.

**Overrides:** [TempNode#generateNodeType](TempNode.html#generateNodeType)

**Returns:** The node's type.

## Source

[src/nodes/utils/RotateNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/utils/RotateNode.js)