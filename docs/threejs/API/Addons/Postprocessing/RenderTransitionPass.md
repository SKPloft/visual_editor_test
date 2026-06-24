Title: RenderTransitionPass
Source URL: https://threejs.org/docs/pages/RenderTransitionPass.html

[Pass](Pass.html) →

# RenderTransitionPass

A special type of render pass for implementing transition effects. When active, the pass will transition from scene A to scene B.

## Code Example

```js
const renderTransitionPass = new RenderTransitionPass( fxSceneA.scene, fxSceneA.camera, fxSceneB.scene, fxSceneB.camera );
renderTransitionPass.setTexture( textures[ 0 ] );
composer.addPass( renderTransitionPass );
```

## Import

RenderTransitionPass is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { RenderTransitionPass } from 'three/addons/postprocessing/RenderTransitionPass.js';
```

## Constructor

### new [RenderTransitionPass](#RenderTransitionPass)( sceneA : [Scene](Scene.html), cameraA : [Camera](Camera.html), sceneB : [Scene](Scene.html), cameraB : [Camera](Camera.html) )

Constructs a render transition pass.

**sceneA**

The first scene.

**cameraA**

The camera of the first scene.

**sceneB**

The second scene.

**cameraB**

The camera of the second scene.

## Properties

### .[cameraA](#cameraA) : [Camera](Camera.html)

The camera of the first scene.

### .[cameraB](#cameraB) : [Camera](Camera.html)

The camera of the second scene.

### .[material](#material) : [ShaderMaterial](ShaderMaterial.html)

The pass material.

### .[sceneA](#sceneA) : [Scene](Scene.html)

The first scene.

### .[sceneB](#sceneB) : [Scene](Scene.html)

The second scene.

## Methods

### .[dispose](#dispose)()

Frees the GPU-related resources allocated by this instance. Call this method whenever the pass is no longer used in your app.

**Overrides:** [Pass#dispose](Pass.html#dispose)

### .[render](#render)( renderer : [WebGLRenderer](WebGLRenderer.html), writeBuffer : [WebGLRenderTarget](WebGLRenderTarget.html), readBuffer : [WebGLRenderTarget](WebGLRenderTarget.html), deltaTime : number, maskActive : boolean )

Performs the transition pass.

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

### .[setSize](#setSize)( width : number, height : number )

Sets the size of the pass.

**width**

The width to set.

**height**

The height to set.

**Overrides:** [Pass#setSize](Pass.html#setSize)

### .[setTexture](#setTexture)( value : [Texture](Texture.html) )

Sets the effect texture.

**value**

The effect texture.

### .[setTextureThreshold](#setTextureThreshold)( value : boolean | number )

Sets the texture threshold. This value defines how strong the texture effects the transition. Must be in the range `[0,1]` (0 means full effect, 1 means no effect).

**value**

The threshold value.

### .[setTransition](#setTransition)( value : boolean | number )

Sets the transition factor. Must be in the range `[0,1]`. This value determines to what degree both scenes are mixed.

**value**

The transition factor.

### .[useTexture](#useTexture)( value : boolean )

Toggles the usage of a texture for the effect.

**value**

Whether to use a texture for the transition effect or not.

## Source

[examples/jsm/postprocessing/RenderTransitionPass.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/postprocessing/RenderTransitionPass.js)