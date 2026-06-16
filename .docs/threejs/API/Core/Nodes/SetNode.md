Title: SetNode
Source URL: https://threejs.org/docs/pages/SetNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [TempNode](TempNode.html) →

# SetNode

This module is part of the TSL core and usually not used in app level code. `SetNode` represents a set operation which means it is used to implement any `setXYZW()`, `setRGBA()` and `setSTPQ()` method invocations on node objects. For example:

## Code Example

```js
materialLine.colorNode = color( 0, 0, 0 ).setR( float( 1 ) );
```

## Constructor

### new [SetNode](#SetNode)( sourceNode : [Node](Node.html), components : string, targetNode : [Node](Node.html) )

Constructs a new set node.

**sourceNode**

The node that should be updated.

**components**

The components that should be updated.

**targetNode**

The value node.

## Properties

### .[components](#components) : string

The components that should be updated.

### .[sourceNode](#sourceNode) : [Node](Node.html)

The node that should be updated.

### .[targetNode](#targetNode) : [Node](Node.html)

The value node.

## Methods

### .[generateNodeType](#generateNodeType)( builder : [NodeBuilder](NodeBuilder.html) ) : string

This method is overwritten since the node type is inferred from [SetNode#sourceNode](SetNode.html#sourceNode).

**builder**

The current node builder.

**Overrides:** [TempNode#generateNodeType](TempNode.html#generateNodeType)

**Returns:** The node type.

## Source

[src/nodes/utils/SetNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/utils/SetNode.js)