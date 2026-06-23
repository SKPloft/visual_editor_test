Title: OperatorNode
Source URL: https://threejs.org/docs/pages/OperatorNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [TempNode](TempNode.html) →

# OperatorNode

This node represents basic mathematical and logical operations like addition, subtraction or comparisons (e.g. `equal()`).

## Constructor

### new [OperatorNode](#OperatorNode)( op : string, aNode : [Node](Node.html), bNode : [Node](Node.html), …params : [Node](Node.html) )

Constructs a new operator node.

**op**

The operator.

**aNode**

The first input.

**bNode**

The second input.

**params**

Additional input parameters.

## Properties

### .[aNode](#aNode) : [Node](Node.html)

The first input.

### .[bNode](#bNode) : [Node](Node.html)

The second input.

### .[isOperatorNode](#isOperatorNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[op](#op) : string

The operator.

## Methods

### .[generateNodeType](#generateNodeType)( builder : [NodeBuilder](NodeBuilder.html), output : string ) : string

This method is overwritten since the node type is inferred from the operator and the input node types.

**builder**

The current node builder.

**output**

The output type.

Default is `null`.

**Overrides:** [TempNode#generateNodeType](TempNode.html#generateNodeType)

**Returns:** The node type.

### .[getOperatorMethod](#getOperatorMethod)( builder : [NodeBuilder](NodeBuilder.html), output : string ) : string

Returns the operator method name.

**builder**

The current node builder.

**output**

The output type.

**Returns:** The operator method name.

## Source

[src/nodes/math/OperatorNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/math/OperatorNode.js)