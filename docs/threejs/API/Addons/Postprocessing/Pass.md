Title: Pass
Source URL: https://threejs.org/docs/pages/Pass.html

# Pass

Abstract base class for all post processing passes.

This module is only relevant for post processing with [WebGLRenderer](WebGLRenderer.html).

## Import

Pass is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { Pass } from 'three/addons/postprocessing/Pass.js';
```

## Constructor

### new [Pass](#Pass)() (abstract)

Constructs a new pass.

## Properties

### .[clear](#clear) : boolean

If set to `true`, the pass clears its buffer before rendering

Default is `false`.

### .[enabled](#enabled) : boolean

If set to `true`, the pass is processed by the composer.

Default is `true`.

### .[isPass](#isPass) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[needsSwap](#needsSwap) : boolean

If set to `true`, the pass indicates to swap read and write buffer after rendering.

Default is `true`.

### .[renderToScreen](#renderToScreen) : boolean

If set to `true`, the result of the pass is rendered to screen. The last pass in the composers pass chain gets automatically rendered to screen, no matter how this property is configured.

Default is `false`.

## Methods

### .[dispose](#dispose)() (abstract)

Frees the GPU-related resources allocated by this instance. Call this method whenever the pass is no longer used in your app.

### .[render](#render)( renderer : [WebGLRenderer](WebGLRenderer.html), writeBuffer : [WebGLRenderTarget](WebGLRenderTarget.html), readBuffer : [WebGLRenderTarget](WebGLRenderTarget.html), deltaTime : number, maskActive : boolean ) (abstract)

This method holds the render logic of a pass. It must be implemented in all derived classes.

**renderer**

The renderer.

**writeBuffer**

The write buffer. This buffer is intended as the rendering destination for the pass.

**readBuffer**

The read buffer. The pass can access the result from the previous pass from this buffer.

**deltaTime**

The delta time in seconds.

**maskActive**

Whether masking is active or not.

### .[setSize](#setSize)( width : number, height : number ) (abstract)

Sets the size of the pass.

**width**

The width to set.

**height**

The height to set.

## Source

[examples/jsm/postprocessing/Pass.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/postprocessing/Pass.js)