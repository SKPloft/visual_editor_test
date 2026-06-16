Title: OutputStructNode
Source URL: https://threejs.org/docs/pages/OutputStructNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) →

# OutputStructNode

This node can be used to define multiple outputs in a shader programs.

## Constructor

### new [OutputStructNode](#OutputStructNode)( …members : [Node](Node.html) )

Constructs a new output struct node. The constructor can be invoked with an arbitrary number of nodes representing the members.

**members**

A parameter list of nodes.

## Properties

### .[isOutputStructNode](#isOutputStructNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[members](#members) : Array.<[Node](Node.html)\>

An array of nodes which defines the output.

## Source

[src/nodes/core/OutputStructNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/core/OutputStructNode.js)