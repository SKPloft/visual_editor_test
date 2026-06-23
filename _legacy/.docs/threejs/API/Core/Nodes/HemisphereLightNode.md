Title: HemisphereLightNode
Source URL: https://threejs.org/docs/pages/HemisphereLightNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [LightingNode](LightingNode.html) → [AnalyticLightNode](AnalyticLightNode.html) →

# HemisphereLightNode

Module for representing hemisphere lights as nodes.

## Constructor

### new [HemisphereLightNode](#HemisphereLightNode)( light : [HemisphereLight](HemisphereLight.html) )

Constructs a new hemisphere light node.

**light**

The hemisphere light source.

Default is `null`.

## Properties

### .[groundColorNode](#groundColorNode) : [UniformNode](UniformNode.html).<vec3>

Uniform node representing the light's ground color.

### .[lightDirectionNode](#lightDirectionNode) : [Node](Node.html).<vec3>

A node representing the light's direction.

### .[lightPositionNode](#lightPositionNode) : [UniformNode](UniformNode.html).<vec3>

Uniform node representing the light's position.

## Methods

### .[update](#update)( frame : [NodeFrame](NodeFrame.html) )

Overwritten to updated hemisphere light specific uniforms.

**frame**

A reference to the current node frame.

**Overrides:** [AnalyticLightNode#update](AnalyticLightNode.html#update)

## Source

[src/nodes/lighting/HemisphereLightNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/lighting/HemisphereLightNode.js)