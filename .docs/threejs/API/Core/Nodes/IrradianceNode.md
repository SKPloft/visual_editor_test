Title: IrradianceNode
Source URL: https://threejs.org/docs/pages/IrradianceNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [LightingNode](LightingNode.html) →

# IrradianceNode

A generic class that can be used by nodes which contribute irradiance to the scene. E.g. a light map node can be used as input for this module. Used in [NodeMaterial](NodeMaterial.html).

## Constructor

### new [IrradianceNode](#IrradianceNode)( node : [Node](Node.html).<vec3> )

Constructs a new irradiance node.

**node**

A node contributing irradiance.

## Properties

### .[node](#node) : [Node](Node.html).<vec3>

A node contributing irradiance.

## Source

[src/nodes/lighting/IrradianceNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/lighting/IrradianceNode.js)