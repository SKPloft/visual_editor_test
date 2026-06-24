Title: SpotLightNode
Source URL: https://threejs.org/docs/pages/SpotLightNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [LightingNode](LightingNode.html) → [AnalyticLightNode](AnalyticLightNode.html) →

# SpotLightNode

Module for representing spot lights as nodes.

## Constructor

### new [SpotLightNode](#SpotLightNode)( light : [SpotLight](SpotLight.html) )

Constructs a new spot light node.

**light**

The spot light source.

Default is `null`.

## Properties

### .[colorNode](#colorNode) : [UniformNode](UniformNode.html).<[Color](Color.html)\>

Uniform node representing the light color.

**Overrides:** [AnalyticLightNode#colorNode](AnalyticLightNode.html#colorNode)

### .[coneCosNode](#coneCosNode) : [UniformNode](UniformNode.html).<float>

Uniform node representing the cone cosine.

### .[cutoffDistanceNode](#cutoffDistanceNode) : [UniformNode](UniformNode.html).<float>

Uniform node representing the cutoff distance.

### .[decayExponentNode](#decayExponentNode) : [UniformNode](UniformNode.html).<float>

Uniform node representing the decay exponent.

### .[penumbraCosNode](#penumbraCosNode) : [UniformNode](UniformNode.html).<float>

Uniform node representing the penumbra cosine.

## Methods

### .[getSpotAttenuation](#getSpotAttenuation)( builder : [NodeBuilder](NodeBuilder.html), angleCosine : [Node](Node.html).<float> ) : [Node](Node.html).<float>

Computes the spot attenuation for the given angle.

**builder**

The node builder.

**angleCosine**

The angle to compute the spot attenuation for.

**Returns:** The spot attenuation.

### .[update](#update)( frame : [NodeFrame](NodeFrame.html) )

Overwritten to updated spot light specific uniforms.

**frame**

A reference to the current node frame.

**Overrides:** [AnalyticLightNode#update](AnalyticLightNode.html#update)

## Source

[src/nodes/lighting/SpotLightNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/lighting/SpotLightNode.js)