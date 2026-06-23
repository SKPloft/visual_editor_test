Title: Lut3DNode
Source URL: https://threejs.org/docs/pages/Lut3DNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [TempNode](TempNode.html) →

# Lut3DNode

A post processing node for color grading via lookup tables.

## Import

Lut3DNode is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { lut3D } from 'three/addons/tsl/display/Lut3DNode.js';
```

## Constructor

### new [Lut3DNode](#Lut3DNode)( inputNode : [Node](Node.html), lutNode : [TextureNode](TextureNode.html), size : number, intensityNode : [Node](Node.html).<float> )

Constructs a new LUT node.

**inputNode**

The node that represents the input of the effect.

**lutNode**

A texture node that represents the lookup table.

**size**

The size of the lookup table.

**intensityNode**

Controls the intensity of the effect.

## Properties

### .[inputNode](#inputNode) : [Node](Node.html)

The node that represents the input of the effect.

### .[intensityNode](#intensityNode) : [Node](Node.html).<float>

Controls the intensity of the effect.

### .[lutNode](#lutNode) : [TextureNode](TextureNode.html)

A texture node that represents the lookup table.

### .[size](#size) : [UniformNode](UniformNode.html).<float>

The size of the lookup table.

## Methods

### .[setup](#setup)( builder : [NodeBuilder](NodeBuilder.html) ) : ShaderCallNodeInternal

This method is used to setup the effect's TSL code.

**builder**

The current node builder.

**Overrides:** [TempNode#setup](TempNode.html#setup)

## Source

[examples/jsm/tsl/display/Lut3DNode.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/tsl/display/Lut3DNode.js)