Title: MathNode
Source URL: https://threejs.org/docs/pages/MathNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [TempNode](TempNode.html) →

# MathNode

This node represents a variety of mathematical methods available in shaders. They are divided into three categories:

*   Methods with one input like `sin`, `cos` or `normalize`.
*   Methods with two inputs like `dot`, `cross` or `pow`.
*   Methods with three inputs like `mix`, `clamp` or `smoothstep`.

## Constructor

### new [MathNode](#MathNode)( method : string, aNode : [Node](Node.html), bNode : [Node](Node.html), cNode : [Node](Node.html) )

Constructs a new math node.

**method**

The method name.

**aNode**

The first input.

**bNode**

The second input.

Default is `null`.

**cNode**

The third input.

Default is `null`.

## Properties

### .[aNode](#aNode) : [Node](Node.html)

The first input.

### .[bNode](#bNode) : [Node](Node.html)

The second input.

Default is `null`.

### .[cNode](#cNode) : [Node](Node.html)

The third input.

Default is `null`.

### .[isMathNode](#isMathNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[method](#method) : string

The method name.

## Methods

### .[generateNodeType](#generateNodeType)( builder : [NodeBuilder](NodeBuilder.html) ) : string

The selected method as well as the input type determine the node type of this node.

**builder**

The current node builder.

**Overrides:** [TempNode#generateNodeType](TempNode.html#generateNodeType)

**Returns:** The node type.

### .[getInputType](#getInputType)( builder : [NodeBuilder](NodeBuilder.html) ) : string

The input type is inferred from the node types of the input nodes.

**builder**

The current node builder.

**Returns:** The input type.

## Source

[src/nodes/math/MathNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/math/MathNode.js)