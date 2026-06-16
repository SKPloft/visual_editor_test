Title: ClearPass
Source URL: https://threejs.org/docs/pages/ClearPass.html

[Pass](Pass.html) →

# ClearPass

This class can be used to force a clear operation for the current read or default framebuffer (when rendering to screen).

## Code Example

```js
const clearPass = new ClearPass();
composer.addPass( clearPass );
```

## Import

ClearPass is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { ClearPass } from 'three/addons/postprocessing/ClearPass.js';
```

## Constructor

### new [ClearPass](#ClearPass)( clearColor : number | [Color](Color.html) | string, clearAlpha : number )

Constructs a new clear pass.

**clearColor**

The clear color.

Default is `0x000000`.

**clearAlpha**

The clear alpha.

Default is `0`.

## Properties

### .[clearAlpha](#clearAlpha) : number

The clear alpha.

Default is `0`.

### .[clearColor](#clearColor) : number | [Color](Color.html) | string

The clear color.

Default is `0x000000`.

### .[needsSwap](#needsSwap) : boolean

Overwritten to disable the swap.

Default is `false`.

**Overrides:** [Pass#needsSwap](Pass.html#needsSwap)

## Methods

### .[render](#render)( renderer : [WebGLRenderer](WebGLRenderer.html), writeBuffer : [WebGLRenderTarget](WebGLRenderTarget.html), readBuffer : [WebGLRenderTarget](WebGLRenderTarget.html), deltaTime : number, maskActive : boolean )

Performs the clear operation. This affects the current read or the default framebuffer.

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

**Overrides:** [Pass#render](Pass.html#render)

## Source

[examples/jsm/postprocessing/ClearPass.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/postprocessing/ClearPass.js)