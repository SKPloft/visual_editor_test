Title: SubBuildNode
Source URL: https://threejs.org/docs/pages/SubBuildNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) →

# SubBuildNode

This node is used to build a sub-build in the node system.

## Constructor

### new [SubBuildNode](#SubBuildNode)( node : [Node](Node.html), name : string, nodeType : string )

**node**

The node to be built in the sub-build.

**name**

The name of the sub-build.

**nodeType**

The type of the node, if known.

Default is `null`.

## Properties

### .[isSubBuildNode](#isSubBuildNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[name](#name) : string

The name of the sub-build.

**Overrides:** [Node#name](Node.html#name)

### .[node](#node) : [Node](Node.html)

The node to be built in the sub-build.

## Source

[src/nodes/core/SubBuildNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/core/SubBuildNode.js)