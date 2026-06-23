Title: AnaglyphEffect
Source URL: https://threejs.org/docs/pages/AnaglyphEffect.html

# AnaglyphEffect

A class that creates an anaglyph effect using physically-correct off-axis stereo projection.

This implementation uses CameraUtils.frameCorners() to align stereo camera frustums to a virtual screen plane, providing accurate depth perception with zero parallax at the plane distance.

Note that this class can only be used with [WebGLRenderer](WebGLRenderer.html). When using [WebGPURenderer](WebGPURenderer.html), use [AnaglyphPassNode](AnaglyphPassNode.html).

## Import

AnaglyphEffect is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { AnaglyphEffect } from 'three/addons/effects/AnaglyphEffect.js';
```

## Constructor

### new [AnaglyphEffect](#AnaglyphEffect)( renderer : [WebGLRenderer](WebGLRenderer.html), width : number, height : number )

Constructs a new anaglyph effect.

**renderer**

The renderer.

**width**

The width of the effect in physical pixels.

Default is `512`.

**height**

The height of the effect in physical pixels.

Default is `512`.

## Properties

### .[eyeSep](#eyeSep) : number

The interpupillary distance (eye separation) in world units. Typical human IPD is 0.064 meters (64mm).

Default is `0.064`.

### .[planeDistance](#planeDistance) : number

The distance in world units from the viewer to the virtual screen plane where zero parallax (screen depth) occurs. Objects at this distance appear at the screen surface. Objects closer appear in front of the screen (negative parallax). Objects further appear behind the screen (positive parallax).

The screen dimensions are derived from the camera's FOV and aspect ratio at this distance, ensuring the stereo view matches the camera's field of view.

Default is `0.5`.

## Methods

### .[dispose](#dispose)()

Frees internal resources. This method should be called when the effect is no longer required.

### .[render](#render)( scene : [Object3D](Object3D.html), camera : [Camera](Camera.html) )

When using this effect, this method should be called instead of the default [WebGLRenderer#render](WebGLRenderer.html#render).

**scene**

The scene to render.

**camera**

The camera.

### .[setSize](#setSize)( width : number, height : number )

Resizes the effect.

**width**

The width of the effect in logical pixels.

**height**

The height of the effect in logical pixels.

## Source

[examples/jsm/effects/AnaglyphEffect.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/effects/AnaglyphEffect.js)