Title: LightProbeNode
Source URL: https://threejs.org/docs/pages/LightProbeNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [LightingNode](LightingNode.html) → [AnalyticLightNode](AnalyticLightNode.html) →

# LightProbeNode

Module for representing light probes as nodes.

## Constructor

### new [LightProbeNode](#LightProbeNode)( light : [LightProbe](LightProbe.html) )

Constructs a new light probe node.

**light**

The light probe.

Default is `null`.

## Properties

### .[lightProbe](#lightProbe) : [UniformArrayNode](UniformArrayNode.html)

Light probe represented as a uniform of spherical harmonics.

## Methods

### .[update](#update)( frame : [NodeFrame](NodeFrame.html) )

Overwritten to updated light probe specific uniforms.

**frame**

A reference to the current node frame.

**Overrides:** [AnalyticLightNode#update](AnalyticLightNode.html#update)

## Source

[src/nodes/lighting/LightProbeNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/lighting/LightProbeNode.js)