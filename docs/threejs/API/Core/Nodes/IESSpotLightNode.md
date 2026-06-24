Title: IESSpotLightNode
Source URL: https://threejs.org/docs/pages/IESSpotLightNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [LightingNode](LightingNode.html) → [AnalyticLightNode](AnalyticLightNode.html) → [SpotLightNode](SpotLightNode.html) →

# IESSpotLightNode

An IES version of the default spot light node.

## Constructor

### new [IESSpotLightNode](#IESSpotLightNode)()

## Methods

### .[getSpotAttenuation](#getSpotAttenuation)( builder : [NodeBuilder](NodeBuilder.html), angleCosine : [Node](Node.html).<float> ) : [Node](Node.html).<float>

Overwrites the default implementation to compute an IES conform spot attenuation.

**builder**

The node builder.

**angleCosine**

The angle to compute the spot attenuation for.

**Overrides:** [SpotLightNode#getSpotAttenuation](SpotLightNode.html#getSpotAttenuation)

**Returns:** The spot attenuation.

## Source

[src/nodes/lighting/IESSpotLightNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/lighting/IESSpotLightNode.js)