Title: PackFloatNode
Source URL: https://threejs.org/docs/pages/PackFloatNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [TempNode](TempNode.html) →

# PackFloatNode

This node represents an operation that packs floating-point values of a vector into an unsigned 32-bit integer

## Constructor

### new [PackFloatNode](#PackFloatNode)( encoding : 'snorm' | 'unorm' | 'float16', vectorNode : [Node](Node.html) )

**encoding**

The numeric encoding that describes how the float values are mapped to the integer range.

**vectorNode**

The vector node to be packed

## Properties

### .[encoding](#encoding) : string

The numeric encoding.

### .[isPackFloatNode](#isPackFloatNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[vectorNode](#vectorNode) : [Node](Node.html)

The vector to be packed.

## Source

[src/nodes/math/PackFloatNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/math/PackFloatNode.js)