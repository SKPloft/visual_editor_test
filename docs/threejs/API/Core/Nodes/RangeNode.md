Title: RangeNode
Source URL: https://threejs.org/docs/pages/RangeNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) →

# RangeNode

`RangeNode` generates random instanced attribute data in a defined range. An exemplary use case for this utility node is to generate random per-instance colors:

## Code Example

```js
const material = new MeshBasicNodeMaterial();
material.colorNode = range( new Color( 0x000000 ), new Color( 0xFFFFFF ) );
const mesh = new InstancedMesh( geometry, material, count );
```

## Constructor

### new [RangeNode](#RangeNode)( minNode : [Node](Node.html).<[any](global.html#any)\>, maxNode : [Node](Node.html).<[any](global.html#any)\> )

Constructs a new range node.

**minNode**

A node defining the lower bound of the range.

Default is `float()`.

**maxNode**

A node defining the upper bound of the range.

Default is `float()`.

## Properties

### .[maxNode](#maxNode) : [Node](Node.html).<[any](global.html#any)\>

A node defining the upper bound of the range.

Default is `float()`.

### .[minNode](#minNode) : [Node](Node.html).<[any](global.html#any)\>

A node defining the lower bound of the range.

Default is `float()`.

## Methods

### .[generateNodeType](#generateNodeType)( builder : [NodeBuilder](NodeBuilder.html) ) : string

This method is overwritten since the node type is inferred from range definition.

**builder**

The current node builder.

**Overrides:** [Node#generateNodeType](Node.html#generateNodeType)

**Returns:** The node type.

### .[getConstNode](#getConstNode)( node : [Node](Node.html) ) : [Node](Node.html)

Returns a constant node from the given node by traversing it.

**node**

The node to traverse.

**Returns:** The constant node, if found.

### .[getVectorLength](#getVectorLength)( builder : [NodeBuilder](NodeBuilder.html) ) : number

Returns the vector length which is computed based on the range definition.

**builder**

The current node builder.

**Returns:** The vector length.

## Source

[src/nodes/geometry/RangeNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/geometry/RangeNode.js)