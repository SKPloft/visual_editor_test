Title: AttributeNode
Source URL: https://threejs.org/docs/pages/AttributeNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) →

# AttributeNode

Base class for representing shader attributes as nodes.

## Constructor

### new [AttributeNode](#AttributeNode)( attributeName : string, nodeType : string )

Constructs a new attribute node.

**attributeName**

The name of the attribute.

**nodeType**

The node type.

Default is `null`.

## Properties

### .[global](#global) : boolean

`AttributeNode` sets this property to `true` by default.

Default is `true`.

**Overrides:** [Node#global](Node.html#global)

## Methods

### .[getAttributeName](#getAttributeName)( builder : [NodeBuilder](NodeBuilder.html) ) : string

Returns the attribute name of this node. The method can be overwritten in derived classes if the final name must be computed analytically.

**builder**

The current node builder.

**Returns:** The attribute name.

### .[setAttributeName](#setAttributeName)( attributeName : string ) : [AttributeNode](AttributeNode.html)

Sets the attribute name to the given value. The method can be overwritten in derived classes if the final name must be computed analytically.

**attributeName**

The name of the attribute.

**Returns:** A reference to this node.

## Source

[src/nodes/core/AttributeNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/core/AttributeNode.js)