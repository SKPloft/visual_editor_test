Title: AssignNode
Source URL: https://threejs.org/docs/pages/AssignNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [TempNode](TempNode.html) →

# AssignNode

These node represents an assign operation. Meaning a node is assigned to another node.

## Constructor

### new [AssignNode](#AssignNode)( targetNode : [Node](Node.html), sourceNode : [Node](Node.html) )

Constructs a new assign node.

**targetNode**

The target node.

**sourceNode**

The source type.

## Properties

### .[isAssignNode](#isAssignNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[sourceNode](#sourceNode) : [Node](Node.html)

The source node.

### .[targetNode](#targetNode) : [Node](Node.html)

The target node.

## Methods

### .[hasDependencies](#hasDependencies)() : boolean

Whether this node is used more than once in context of other nodes. This method is overwritten since it always returns `false` (assigns are unique).

**Overrides:** [TempNode#hasDependencies](TempNode.html#hasDependencies)

**Returns:** A flag that indicates if there is more than one dependency to other nodes. Always `false`.

### .[needsSplitAssign](#needsSplitAssign)( builder : [NodeBuilder](NodeBuilder.html) ) : boolean

Whether a split is required when assigning source to target. This can happen when the component length of target and source data type does not match.

**builder**

The current node builder.

**Returns:** Whether a split is required when assigning source to target.

## Source

[src/nodes/core/AssignNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/core/AssignNode.js)