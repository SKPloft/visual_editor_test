Title: TiledLighting
Source URL: https://threejs.org/docs/pages/TiledLighting.html

[Lighting](Lighting.html) →

# TiledLighting

A custom lighting implementation based on Tiled-Lighting that overwrites the default implementation in [WebGPURenderer](WebGPURenderer.html).

## Code Example

```js
const lighting = new TiledLighting();
renderer.lighting = lighting; // set lighting system
```

## Import

TiledLighting is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { TiledLighting } from 'three/addons/lighting/TiledLighting.js';
```

## Constructor

### new [TiledLighting](#TiledLighting)()

Constructs a new lighting system.

## Classes

[TiledLighting](TiledLighting.html)

## Methods

### .[createNode](#createNode)( lights : Array.<[Light](Light.html)\> ) : [TiledLightsNode](TiledLightsNode.html)

Creates a new tiled lights node for the given array of lights.

This method is called internally by the renderer and must be overwritten by all custom lighting implementations.

**lights**

The render object.

**Overrides:** [Lighting#createNode](Lighting.html#createNode)

**Returns:** The tiled lights node.

## Source

[examples/jsm/lighting/TiledLighting.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/lighting/TiledLighting.js)