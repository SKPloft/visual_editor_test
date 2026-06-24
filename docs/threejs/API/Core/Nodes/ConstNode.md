Title: ConstNode
Source URL: https://threejs.org/docs/pages/ConstNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [InputNode](InputNode.html) →

# ConstNode

Class for representing a constant value in the shader.

## Constructor

### new [ConstNode](#ConstNode)( value : [any](global.html#any), nodeType : string )

Constructs a new input node.

**value**

The value of this node. Usually a JS primitive or three.js object (vector, matrix, color).

**nodeType**

The node type. If no explicit type is defined, the node tries to derive the type from its value.

Default is `null`.

## Properties

### .[isConstNode](#isConstNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

## Methods

### .[generateConst](#generateConst)( builder : [NodeBuilder](NodeBuilder.html) ) : string

Generates the shader string of the value with the current node builder.

**builder**

The current node builder.

**Returns:** The generated value as a shader string.

## Source

[src/nodes/core/ConstNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/core/ConstNode.js)