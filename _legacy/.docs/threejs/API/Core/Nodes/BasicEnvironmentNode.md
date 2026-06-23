Title: BasicEnvironmentNode
Source URL: https://threejs.org/docs/pages/BasicEnvironmentNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [LightingNode](LightingNode.html) →

# BasicEnvironmentNode

Represents a basic model for Image-based lighting (IBL). The environment is defined via environment maps in the equirectangular or cube map format. `BasicEnvironmentNode` is intended for non-PBR materials like [MeshBasicNodeMaterial](MeshBasicNodeMaterial.html) or [MeshPhongNodeMaterial](MeshPhongNodeMaterial.html).

## Constructor

### new [BasicEnvironmentNode](#BasicEnvironmentNode)( envNode : [Node](Node.html) )

Constructs a new basic environment node.

**envNode**

A node representing the environment.

Default is `null`.

## Properties

### .[envNode](#envNode) : [Node](Node.html)

A node representing the environment.

Default is `null`.

## Source

[src/nodes/lighting/BasicEnvironmentNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/lighting/BasicEnvironmentNode.js)