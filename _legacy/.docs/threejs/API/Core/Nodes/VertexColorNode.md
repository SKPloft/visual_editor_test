Title: VertexColorNode
Source URL: https://threejs.org/docs/pages/VertexColorNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [AttributeNode](AttributeNode.html) →

# VertexColorNode

An attribute node for representing vertex colors.

## Constructor

### new [VertexColorNode](#VertexColorNode)( index : number )

Constructs a new vertex color node.

**index**

The attribute index.

## Properties

### .[index](#index) : number

The attribute index to enable more than one sets of vertex colors.

Default is `0`.

### .[isVertexColorNode](#isVertexColorNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

## Methods

### .[getAttributeName](#getAttributeName)( builder : [NodeBuilder](NodeBuilder.html) ) : string

Overwrites the default implementation by honoring the attribute index.

**builder**

The current node builder.

**Overrides:** [AttributeNode#getAttributeName](AttributeNode.html#getAttributeName)

**Returns:** The attribute name.

## Source

[src/nodes/accessors/VertexColorNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/accessors/VertexColorNode.js)