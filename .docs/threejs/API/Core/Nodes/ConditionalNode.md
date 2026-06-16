Title: ConditionalNode
Source URL: https://threejs.org/docs/pages/ConditionalNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) →

# ConditionalNode

Represents a logical `if/else` statement. Can be used as an alternative to the `If()`/`Else()` syntax.

The corresponding TSL `select()` looks like so:

The `select()` method is called in a chaining fashion on a condition. The parameter nodes of `select()` determine the outcome of the entire statement.

## Code Example

```js
velocity = position.greaterThanEqual( limit ).select( velocity.negate(), velocity );
```

## Constructor

### new [ConditionalNode](#ConditionalNode)( condNode : [Node](Node.html), ifNode : [Node](Node.html), elseNode : [Node](Node.html) )

Constructs a new conditional node.

**condNode**

The node that defines the condition.

**ifNode**

The node that is evaluate when the condition ends up `true`.

**elseNode**

The node that is evaluate when the condition ends up `false`.

Default is `null`.

## Properties

### .[condNode](#condNode) : [Node](Node.html)

The node that defines the condition.

### .[elseNode](#elseNode) : [Node](Node.html)

The node that is evaluate when the condition ends up `false`.

Default is `null`.

### .[ifNode](#ifNode) : [Node](Node.html)

The node that is evaluate when the condition ends up `true`.

## Methods

### .[generateNodeType](#generateNodeType)( builder : [NodeBuilder](NodeBuilder.html) ) : string

This method is overwritten since the node type is inferred from the if/else nodes.

**builder**

The current node builder.

**Overrides:** [Node#generateNodeType](Node.html#generateNodeType)

**Returns:** The node type.

## Source

[src/nodes/math/ConditionalNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/math/ConditionalNode.js)