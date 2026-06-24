Title: NodeCache
Source URL: https://threejs.org/docs/pages/NodeCache.html

# NodeCache

This utility class is used in [NodeBuilder](NodeBuilder.html) as an internal cache data structure for node data.

## Constructor

### new [NodeCache](#NodeCache)( parent : [NodeCache](NodeCache.html) )

Constructs a new node cache.

**parent**

A reference to a parent cache.

Default is `null`.

## Properties

### .[id](#id) : number (readonly)

The id of the cache.

### .[nodesData](#nodesData) : WeakMap.<[Node](Node.html), Object>

A weak map for managing node data.

### .[parent](#parent) : [NodeCache](NodeCache.html)

Reference to a parent node cache.

Default is `null`.

## Methods

### .[getData](#getData)( node : [Node](Node.html) ) : Object

Returns the data for the given node.

**node**

The node.

**Returns:** The data for the node.

### .[setData](#setData)( node : [Node](Node.html), data : Object )

Sets the data for a given node.

**node**

The node.

**data**

The data that should be cached.

## Source

[src/nodes/core/NodeCache.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/core/NodeCache.js)