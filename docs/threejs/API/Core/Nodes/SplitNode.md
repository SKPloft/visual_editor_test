Title: SplitNode
Source URL: https://threejs.org/docs/pages/SplitNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) →

# SplitNode

This module is part of the TSL core and usually not used in app level code. `SplitNode` represents a property access operation which means it is used to implement any `.xyzw`, `.rgba` and `stpq` usage on node objects. For example:

## Code Example

```js
const redValue = color.r;
```

## Constructor

### new [SplitNode](#SplitNode)( node : [Node](Node.html), components : string )

Constructs a new split node.

**node**

The node that should be accessed.

**components**

The components that should be accessed.

Default is `'x'`.

## Properties

### .[components](#components) : string

The components that should be accessed.

### .[isSplitNode](#isSplitNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[node](#node) : [Node](Node.html)

The node that should be accessed.

## Methods

### .[generateNodeType](#generateNodeType)( builder : [NodeBuilder](NodeBuilder.html) ) : string

This method is overwritten since the node type is inferred from requested components.

**builder**

The current node builder.

**Overrides:** [Node#generateNodeType](Node.html#generateNodeType)

**Returns:** The node type.

### .[getComponentType](#getComponentType)( builder : [NodeBuilder](NodeBuilder.html) ) : string

Returns the component type of the node's type.

**builder**

The current node builder.

**Returns:** The component type.

### .[getScope](#getScope)() : [Node](Node.html)

Returns the scope of the node.

**Overrides:** [Node#getScope](Node.html#getScope)

**Returns:** The scope of the node.

### .[getVectorLength](#getVectorLength)() : number

Returns the vector length which is computed based on the requested components.

**Returns:** The vector length.

## Source

[src/nodes/utils/SplitNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/utils/SplitNode.js)