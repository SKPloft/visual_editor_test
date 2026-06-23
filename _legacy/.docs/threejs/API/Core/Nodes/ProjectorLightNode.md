Title: ProjectorLightNode
Source URL: https://threejs.org/docs/pages/ProjectorLightNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [LightingNode](LightingNode.html) → [AnalyticLightNode](AnalyticLightNode.html) → [SpotLightNode](SpotLightNode.html) →

# ProjectorLightNode

An implementation of a projector light node.

## Constructor

### new [ProjectorLightNode](#ProjectorLightNode)()

## Methods

### .[getSpotAttenuation](#getSpotAttenuation)( builder : [NodeBuilder](NodeBuilder.html) ) : [Node](Node.html).<float>

Overwrites the default implementation to compute projection attenuation.

**builder**

The node builder.

**Overrides:** [SpotLightNode#getSpotAttenuation](SpotLightNode.html#getSpotAttenuation)

**Returns:** The spot attenuation.

## Source

[src/nodes/lighting/ProjectorLightNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/lighting/ProjectorLightNode.js)