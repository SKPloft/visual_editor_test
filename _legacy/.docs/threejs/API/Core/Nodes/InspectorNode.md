Title: InspectorNode
Source URL: https://threejs.org/docs/pages/InspectorNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) →

# InspectorNode

InspectorNode is a wrapper node that allows inspection of node values during rendering. It can be used to debug or analyze node outputs in the rendering pipeline.

## Constructor

### new [InspectorNode](#InspectorNode)( node : [Node](Node.html), name : string, callback : function | null )

Creates an InspectorNode.

**node**

The node to inspect.

**name**

Optional name for the inspector node.

Default is `''`.

**callback**

Optional callback to modify the node during setup.

Default is `null`.

## Properties

### .[type](#.type)

Returns the type of the node.

## Methods

### .[generateNodeType](#generateNodeType)( builder : [NodeBuilder](NodeBuilder.html) ) : string

Returns the type of the wrapped node.

**builder**

The node builder.

**Overrides:** [Node#generateNodeType](Node.html#generateNodeType)

### .[getName](#getName)() : string

Returns the name of the inspector node.

### .[setup](#setup)( builder : [NodeBuilder](NodeBuilder.html) ) : [Node](Node.html)

Sets up the inspector node.

**builder**

The node builder.

**Overrides:** [Node#setup](Node.html#setup)

**Returns:** The setup node.

### .[update](#update)( frame : [NodeFrame](NodeFrame.html) )

Updates the inspector node, allowing inspection of the wrapped node.

**frame**

A reference to the current node frame.

**Overrides:** [Node#update](Node.html#update)

## Source

[src/nodes/core/InspectorNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/core/InspectorNode.js)