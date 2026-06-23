Title: CubeMapNode
Source URL: https://threejs.org/docs/pages/CubeMapNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [TempNode](TempNode.html) →

# CubeMapNode

This node can be used to automatically convert environment maps in the equirectangular format into the cube map format.

## Constructor

### new [CubeMapNode](#CubeMapNode)( envNode : [Node](Node.html) )

Constructs a new cube map node.

**envNode**

The node representing the environment map.

## Properties

### .[envNode](#envNode) : [Node](Node.html)

The node representing the environment map.

### .[updateBeforeType](#updateBeforeType) : string

The `updateBeforeType` is set to `NodeUpdateType.RENDER` since the node updates the texture once per render in its [CubeMapNode#updateBefore](CubeMapNode.html#updateBefore) method.

Default is `'render'`.

**Overrides:** [TempNode#updateBeforeType](TempNode.html#updateBeforeType)

## Source

[src/nodes/utils/CubeMapNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/utils/CubeMapNode.js)