Title: CubeRenderTarget
Source URL: https://threejs.org/docs/pages/CubeRenderTarget.html

[EventDispatcher](EventDispatcher.html) → [RenderTarget](RenderTarget.html) →

# CubeRenderTarget

This class represents a cube render target. It is a special version of `WebGLCubeRenderTarget` which is compatible with `WebGPURenderer`.

## Constructor

### new [CubeRenderTarget](#CubeRenderTarget)( size : number, options : [RenderTarget~Options](RenderTarget.html#~Options) )

Constructs a new cube render target.

**size**

The size of the render target.

Default is `1`.

**options**

The configuration object.

## Properties

### .[isCubeRenderTarget](#isCubeRenderTarget) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[texture](#texture) : [DataArrayTexture](DataArrayTexture.html)

Overwritten with a different texture type.

**Overrides:** [RenderTarget#texture](RenderTarget.html#texture)

## Methods

### .[clear](#clear)( renderer : [Renderer](Renderer.html), color : boolean, depth : boolean, stencil : boolean )

Clears this cube render target.

**renderer**

The renderer.

**color**

Whether the color buffer should be cleared or not.

Default is `true`.

**depth**

Whether the depth buffer should be cleared or not.

Default is `true`.

**stencil**

Whether the stencil buffer should be cleared or not.

Default is `true`.

### .[fromEquirectangularTexture](#fromEquirectangularTexture)( renderer : [Renderer](Renderer.html), texture : [Texture](Texture.html) ) : [CubeRenderTarget](CubeRenderTarget.html)

Converts the given equirectangular texture to a cube map.

**renderer**

The renderer.

**texture**

The equirectangular texture.

**Returns:** A reference to this cube render target.

## Source

[src/renderers/common/CubeRenderTarget.js](https://github.com/mrdoob/three.js/blob/master/src/renderers/common/CubeRenderTarget.js)