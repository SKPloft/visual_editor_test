Title: ReflectorForSSRPass
Source URL: https://threejs.org/docs/pages/ReflectorForSSRPass.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) → [Mesh](Mesh.html) →

# ReflectorForSSRPass

A special version of [Reflector](Reflector.html) for usage with [SSRPass](SSRPass.html).

## Import

ReflectorForSSRPass is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { ReflectorForSSRPass } from 'three/addons/objects/ReflectorForSSRPass.js';
```

## Constructor

### new [ReflectorForSSRPass](#ReflectorForSSRPass)( geometry : [BufferGeometry](BufferGeometry.html), options : [ReflectorForSSRPass~Options](ReflectorForSSRPass.html#~Options) )

Constructs a new reflector.

**geometry**

The reflector's geometry.

**options**

The configuration options.

## Methods

### .[dispose](#dispose)()

Frees the GPU-related resources allocated by this instance. Call this method whenever this instance is no longer used in your app.

### .[getRenderTarget](#getRenderTarget)() : [WebGLRenderTarget](WebGLRenderTarget.html)

Returns the reflector's internal render target.

**Returns:** The internal render target

## Type Definitions

### .[Options](#~Options)

Constructor options of `ReflectorForSSRPass`.

**color**  
number | [Color](Color.html) | string

The reflector's color.

Default is `0x7F7F7F`.

**textureWidth**  
number

The texture width. A higher value results in more clear reflections but is also more expensive.

Default is `512`.

**textureHeight**  
number

The texture height. A higher value results in more clear reflections but is also more expensive.

Default is `512`.

**clipBias**  
number

The clip bias.

Default is `0`.

**shader**  
Object

Can be used to pass in a custom shader that defines how the reflective view is projected onto the reflector's geometry.

**useDepthTexture**  
boolean

Whether to store depth values in a texture or not.

Default is `true`.

**resolution**  
[Vector2](Vector2.html)

Resolution for the Reflector Pass.

## Source

[examples/jsm/objects/ReflectorForSSRPass.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/objects/ReflectorForSSRPass.js)