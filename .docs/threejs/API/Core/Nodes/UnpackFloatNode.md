Title: UnpackFloatNode
Source URL: https://threejs.org/docs/pages/UnpackFloatNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [TempNode](TempNode.html) →

# UnpackFloatNode

This node represents an operation that unpacks values from a 32-bit unsigned integer, reinterpreting the results as a floating-point vector

## Constructor

### new [UnpackFloatNode](#UnpackFloatNode)( encoding : 'snorm' | 'unorm' | 'float16', uintNode : [Node](Node.html) )

**encoding**

The numeric encoding that describes how the integer values are mapped to the float range

**uintNode**

The uint node to be unpacked

## Properties

### .[encoding](#encoding) : string

The numeric encoding.

### .[isUnpackFloatNode](#isUnpackFloatNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[uintNode](#uintNode) : [Node](Node.html)

The unsigned integer to be unpacked.

## Source

[src/nodes/math/UnpackFloatNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/math/UnpackFloatNode.js)