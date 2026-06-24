Title: CubeTexturePass
Source URL: https://threejs.org/docs/pages/CubeTexturePass.html

[Pass](Pass.html) →

# CubeTexturePass

This pass can be used to render a cube texture over the entire screen.

## Code Example

```js
const cubeMap = new THREE.CubeTextureLoader().load( urls );
const cubeTexturePass = new CubeTexturePass( camera, cubemap );
composer.addPass( cubeTexturePass );
```

## Import

CubeTexturePass is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { CubeTexturePass } from 'three/addons/postprocessing/CubeTexturePass.js';
```

## Constructor

### new [CubeTexturePass](#CubeTexturePass)( camera : [PerspectiveCamera](PerspectiveCamera.html), tCube : [CubeTexture](CubeTexture.html), opacity : number )

Constructs a new cube texture pass.

**camera**

The camera.

**tCube**

The cube texture to render.

**opacity**

The opacity.

Default is `1`.

## Properties

### .[camera](#camera) : [PerspectiveCamera](PerspectiveCamera.html)

The camera.

### .[needsSwap](#needsSwap) : boolean

Overwritten to disable the swap.

Default is `false`.

**Overrides:** [Pass#needsSwap](Pass.html#needsSwap)

### .[opacity](#opacity) : number

The opacity.

Default is `1`.

### .[tCube](#tCube) : [CubeTexture](CubeTexture.html)

The cube texture to render.

## Methods

### .[dispose](#dispose)()

Frees the GPU-related resources allocated by this instance. Call this method whenever the pass is no longer used in your app.

**Overrides:** [Pass#dispose](Pass.html#dispose)

### .[render](#render)( renderer : [WebGLRenderer](WebGLRenderer.html), writeBuffer : [WebGLRenderTarget](WebGLRenderTarget.html), readBuffer : [WebGLRenderTarget](WebGLRenderTarget.html), deltaTime : number, maskActive : boolean )

Performs the cube texture pass.

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

[examples/jsm/postprocessing/CubeTexturePass.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/postprocessing/CubeTexturePass.js)