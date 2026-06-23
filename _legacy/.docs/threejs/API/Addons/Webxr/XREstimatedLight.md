Title: XREstimatedLight
Source URL: https://threejs.org/docs/pages/XREstimatedLight.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) → [Group](Group.html) →

# XREstimatedLight

This class can be used to represent the environmental light of a XR session. It relies on the WebXR Lighting Estimation API.

## Import

XREstimatedLight is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { XREstimatedLight } from 'three/addons/webxr/XREstimatedLight.js';
```

## Constructor

### new [XREstimatedLight](#XREstimatedLight)( renderer : [WebGLRenderer](WebGLRenderer.html), environmentEstimation : boolean )

Constructs a new light.

**renderer**

The renderer.

**environmentEstimation**

Whether to use environment estimation or not.

Default is `true`.

## Classes

[XREstimatedLight](XREstimatedLight.html)

## Properties

### .[directionalLight](#directionalLight) : [DirectionalLight](DirectionalLight.html)

Represents the primary light from the XR environment.

### .[environment](#environment) : [Texture](Texture.html)

Will be set to a cube map in the SessionLightProbe if environment estimation is available and requested.

Default is `null`.

### .[lightProbe](#lightProbe) : [LightProbe](LightProbe.html)

The light probe that represents the estimated light.

## Methods

### .[dispose](#dispose)()

Frees the GPU-related resources allocated by this instance. Call this method whenever this instance is no longer used in your app.

## Source

[examples/jsm/webxr/XREstimatedLight.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/webxr/XREstimatedLight.js)