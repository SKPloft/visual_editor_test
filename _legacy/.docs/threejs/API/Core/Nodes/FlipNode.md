Title: FlipNode
Source URL: https://threejs.org/docs/pages/FlipNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [TempNode](TempNode.html) →

# FlipNode

This module is part of the TSL core and usually not used in app level code. It represents a flip operation during the shader generation process meaning it flips normalized values with the following formula:

`FlipNode` is internally used to implement any `flipXYZW()`, `flipRGBA()` and `flipSTPQ()` method invocations on node objects. For example:

```js
uvNode = uvNode.flipY();
```

## Code Example

```
x = 1 - x;
```

## Constructor

### new [FlipNode](#FlipNode)( sourceNode : [Node](Node.html), components : string )

Constructs a new flip node.

**sourceNode**

The node which component(s) should be flipped.

**components**

The components that should be flipped e.g. `'x'` or `'xy'`.

## Properties

### .[components](#components) : string

The components that should be flipped e.g. `'x'` or `'xy'`.

### .[sourceNode](#sourceNode) : [Node](Node.html)

The node which component(s) should be flipped.

## Methods

### .[generateNodeType](#generateNodeType)( builder : [NodeBuilder](NodeBuilder.html) ) : string

This method is overwritten since the node type is inferred from the source node.

**builder**

The current node builder.

**Overrides:** [TempNode#generateNodeType](TempNode.html#generateNodeType)

**Returns:** The node type.

## Source

[src/nodes/utils/FlipNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/utils/FlipNode.js)