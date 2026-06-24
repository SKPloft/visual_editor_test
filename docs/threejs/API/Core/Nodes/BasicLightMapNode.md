Title: BasicLightMapNode
Source URL: https://threejs.org/docs/pages/BasicLightMapNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [LightingNode](LightingNode.html) →

# BasicLightMapNode

A specific version of [IrradianceNode](IrradianceNode.html) that is only relevant for [MeshBasicNodeMaterial](MeshBasicNodeMaterial.html). Since the material is unlit, it requires a special scaling factor for the light map.

## Constructor

### new [BasicLightMapNode](#BasicLightMapNode)( lightMapNode : [Node](Node.html).<vec3> )

Constructs a new basic light map node.

**lightMapNode**

The light map node.

Default is `null`.

## Properties

### .[lightMapNode](#lightMapNode) : [Node](Node.html).<vec3>

The light map node.

## Source

[src/nodes/lighting/BasicLightMapNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/lighting/BasicLightMapNode.js)