Title: PointLightNode
Source URL: https://threejs.org/docs/pages/PointLightNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [LightingNode](LightingNode.html) → [AnalyticLightNode](AnalyticLightNode.html) →

# PointLightNode

Module for representing point lights as nodes.

## Constructor

### new [PointLightNode](#PointLightNode)( light : [PointLight](PointLight.html) )

Constructs a new point light node.

**light**

The point light source.

Default is `null`.

## Properties

### .[cutoffDistanceNode](#cutoffDistanceNode) : [UniformNode](UniformNode.html).<float>

Uniform node representing the cutoff distance.

### .[decayExponentNode](#decayExponentNode) : [UniformNode](UniformNode.html).<float>

Uniform node representing the decay exponent.

## Methods

### .[setupShadowNode](#setupShadowNode)() : [PointShadowNode](PointShadowNode.html)

Overwritten to setup point light specific shadow.

**Overrides:** [AnalyticLightNode#setupShadowNode](AnalyticLightNode.html#setupShadowNode)

### .[update](#update)( frame : [NodeFrame](NodeFrame.html) )

Overwritten to updated point light specific uniforms.

**frame**

A reference to the current node frame.

**Overrides:** [AnalyticLightNode#update](AnalyticLightNode.html#update)

## Source

[src/nodes/lighting/PointLightNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/lighting/PointLightNode.js)