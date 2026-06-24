Title: StereoEffect
Source URL: https://threejs.org/docs/pages/StereoEffect.html

# StereoEffect

A class that creates an stereo effect.

Note that this class can only be used with [WebGLRenderer](WebGLRenderer.html). When using [WebGPURenderer](WebGPURenderer.html), use [StereoPassNode](StereoPassNode.html).

## Import

StereoEffect is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { StereoEffect } from 'three/addons/effects/StereoEffect.js';
```

## Constructor

### new [StereoEffect](#StereoEffect)( renderer : [WebGLRenderer](WebGLRenderer.html) )

Constructs a new stereo effect.

**renderer**

The renderer.

## Methods

### .[render](#render)( scene : [Object3D](Object3D.html), camera : [Camera](Camera.html) )

When using this effect, this method should be called instead of the default [WebGLRenderer#render](WebGLRenderer.html#render).

**scene**

The scene to render.

**camera**

The camera.

### .[setEyeSeparation](#setEyeSeparation)( eyeSep : number )

Sets the given eye separation.

**eyeSep**

The eye separation to set.

### .[setSize](#setSize)( width : number, height : number )

Resizes the effect.

**width**

The width of the effect in logical pixels.

**height**

The height of the effect in logical pixels.

## Source

[examples/jsm/effects/StereoEffect.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/effects/StereoEffect.js)