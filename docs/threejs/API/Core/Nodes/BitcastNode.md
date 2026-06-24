Title: BitcastNode
Source URL: https://threejs.org/docs/pages/BitcastNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [TempNode](TempNode.html) →

# BitcastNode

This node represents an operation that reinterprets the bit representation of a value in one type as a value in another type.

## Constructor

### new [BitcastNode](#BitcastNode)( valueNode : [Node](Node.html), conversionType : string, inputType : string )

Constructs a new bitcast node.

**valueNode**

The value to convert.

**conversionType**

The type to convert to.

**inputType**

The expected input data type of the bitcast operation.

Default is `null`.

## Properties

### .[conversionType](#conversionType) : string

The type the value will be converted to.

### .[inputType](#inputType) : string

The expected input data type of the bitcast operation.

Default is `null`.

### .[isBitcastNode](#isBitcastNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[valueNode](#valueNode) : [Node](Node.html)

The data to bitcast to a new type.

## Source

[src/nodes/math/BitcastNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/math/BitcastNode.js)