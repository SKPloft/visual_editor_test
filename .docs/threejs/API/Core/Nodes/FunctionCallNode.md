Title: FunctionCallNode
Source URL: https://threejs.org/docs/pages/FunctionCallNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [TempNode](TempNode.html) →

# FunctionCallNode

This module represents the call of a [FunctionNode](FunctionNode.html). Developers are usually not confronted with this module since they use the predefined TSL syntax `wgslFn` and `glslFn` which encapsulate this logic.

## Constructor

### new [FunctionCallNode](#FunctionCallNode)( functionNode : [FunctionNode](FunctionNode.html), parameters : Object.<string, [Node](Node.html)\> )

Constructs a new function call node.

**functionNode**

The function node.

Default is `null`.

**parameters**

The parameters for the function call.

Default is `{}`.

## Properties

### .[functionNode](#functionNode) : [FunctionNode](FunctionNode.html)

The function node.

Default is `null`.

### .[parameters](#parameters) : Object.<string, [Node](Node.html)\>

The parameters of the function call.

Default is `{}`.

## Methods

### .[generateNodeType](#generateNodeType)( builder : [NodeBuilder](NodeBuilder.html) ) : string

Returns the type of this function call node.

**builder**

The current node builder.

**Overrides:** [TempNode#generateNodeType](TempNode.html#generateNodeType)

**Returns:** The type of this node.

### .[getMemberType](#getMemberType)( builder : [NodeBuilder](NodeBuilder.html), name : string ) : string

Returns the function node of this function call node.

**builder**

The current node builder.

**name**

The name of the member.

**Overrides:** [TempNode#getMemberType](TempNode.html#getMemberType)

**Returns:** The type of the member.

### .[getParameters](#getParameters)() : Object.<string, [Node](Node.html)\>

Returns the parameters of the function call node.

**Returns:** The parameters of this node.

### .[setParameters](#setParameters)( parameters : Object.<string, [Node](Node.html)\> ) : [FunctionCallNode](FunctionCallNode.html)

Sets the parameters of the function call node.

**parameters**

The parameters to set.

**Returns:** A reference to this node.

## Source

[src/nodes/code/FunctionCallNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/code/FunctionCallNode.js)