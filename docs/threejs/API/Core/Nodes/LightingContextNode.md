Title: LightingContextNode
Source URL: https://threejs.org/docs/pages/LightingContextNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [ContextNode](ContextNode.html) →

# LightingContextNode

`LightingContextNode` represents an extension of the [ContextNode](ContextNode.html) module by adding lighting specific context data. It represents the runtime context of [LightsNode](LightsNode.html).

## Constructor

### new [LightingContextNode](#LightingContextNode)( lightsNode : [LightsNode](LightsNode.html), lightingModel : [LightingModel](LightingModel.html), backdropNode : [Node](Node.html).<vec3>, backdropAlphaNode : [Node](Node.html).<float> )

Constructs a new lighting context node.

**lightsNode**

The lights node.

**lightingModel**

The current lighting model.

Default is `null`.

**backdropNode**

A backdrop node.

Default is `null`.

**backdropAlphaNode**

A backdrop alpha node.

Default is `null`.

## Properties

### .[backdropAlphaNode](#backdropAlphaNode) : [Node](Node.html).<float>

A backdrop alpha node.

Default is `null`.

### .[backdropNode](#backdropNode) : [Node](Node.html).<vec3>

A backdrop node.

Default is `null`.

### .[lightingModel](#lightingModel) : [LightingModel](LightingModel.html)

The current lighting model.

Default is `null`.

## Methods

### .[getContext](#getContext)() : Object

Returns a lighting context object.

**Returns:** The lighting context object.

## Source

[src/nodes/lighting/LightingContextNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/lighting/LightingContextNode.js)