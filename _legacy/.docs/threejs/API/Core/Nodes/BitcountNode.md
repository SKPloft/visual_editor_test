Title: BitcountNode
Source URL: https://threejs.org/docs/pages/BitcountNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [TempNode](TempNode.html) → [MathNode](MathNode.html) →

# BitcountNode

This node represents an operation that counts the bits of a piece of shader data.

## Constructor

### new [BitcountNode](#BitcountNode)( method : 'countTrailingZeros' | 'countLeadingZeros' | 'countOneBits', aNode : [Node](Node.html) )

Constructs a new math node.

**method**

The method name.

**aNode**

The first input.

## Properties

### .[isBitcountNode](#isBitcountNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

## Source

[src/nodes/math/BitcountNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/math/BitcountNode.js)