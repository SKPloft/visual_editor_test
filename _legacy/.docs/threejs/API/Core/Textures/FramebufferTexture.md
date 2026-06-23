Title: FramebufferTexture
Source URL: https://threejs.org/docs/pages/FramebufferTexture.html

[EventDispatcher](EventDispatcher.html) → [Texture](Texture.html) →

# FramebufferTexture

This class can only be used in combination with `copyFramebufferToTexture()` methods of renderers. It extracts the contents of the current bound framebuffer and provides it as a texture for further usage.

## Code Example

```js
const pixelRatio = window.devicePixelRatio;
const textureSize = 128 * pixelRatio;
const frameTexture = new FramebufferTexture( textureSize, textureSize );
// calculate start position for copying part of the frame data
const vector = new Vector2();
vector.x = ( window.innerWidth * pixelRatio / 2 ) - ( textureSize / 2 );
vector.y = ( window.innerHeight * pixelRatio / 2 ) - ( textureSize / 2 );
renderer.render( scene, camera );
// copy part of the rendered frame into the framebuffer texture
renderer.copyFramebufferToTexture( frameTexture, vector );
```

## Constructor

### new [FramebufferTexture](#FramebufferTexture)( width : number, height : number )

Constructs a new framebuffer texture.

**width**

The width of the texture.

**height**

The height of the texture.

## Properties

### .[generateMipmaps](#generateMipmaps) : boolean

Whether to generate mipmaps (if possible) for a texture.

Overwritten and set to `false` by default.

Default is `false`.

**Overrides:** [Texture#generateMipmaps](Texture.html#generateMipmaps)

### .[isFramebufferTexture](#isFramebufferTexture) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[magFilter](#magFilter) : [NearestFilter](global.html#NearestFilter) | [NearestMipmapNearestFilter](global.html#NearestMipmapNearestFilter) | [NearestMipmapLinearFilter](global.html#NearestMipmapLinearFilter) | [LinearFilter](global.html#LinearFilter) | [LinearMipmapNearestFilter](global.html#LinearMipmapNearestFilter) | [LinearMipmapLinearFilter](global.html#LinearMipmapLinearFilter)

How the texture is sampled when a texel covers more than one pixel.

Overwritten and set to `NearestFilter` by default to disable filtering.

Default is `NearestFilter`.

**Overrides:** [Texture#magFilter](Texture.html#magFilter)

### .[minFilter](#minFilter) : [NearestFilter](global.html#NearestFilter) | [NearestMipmapNearestFilter](global.html#NearestMipmapNearestFilter) | [NearestMipmapLinearFilter](global.html#NearestMipmapLinearFilter) | [LinearFilter](global.html#LinearFilter) | [LinearMipmapNearestFilter](global.html#LinearMipmapNearestFilter) | [LinearMipmapLinearFilter](global.html#LinearMipmapLinearFilter)

How the texture is sampled when a texel covers less than one pixel.

Overwritten and set to `NearestFilter` by default to disable filtering.

Default is `NearestFilter`.

**Overrides:** [Texture#minFilter](Texture.html#minFilter)

## Source

[src/textures/FramebufferTexture.js](https://github.com/mrdoob/three.js/blob/master/src/textures/FramebufferTexture.js)