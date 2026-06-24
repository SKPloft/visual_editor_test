Title: WebGL3DRenderTarget
Source URL: https://threejs.org/docs/pages/WebGL3DRenderTarget.html

[EventDispatcher](EventDispatcher.html) → [RenderTarget](RenderTarget.html) → [WebGLRenderTarget](WebGLRenderTarget.html) →

# WebGL3DRenderTarget

A 3D render target used in context of [WebGLRenderer](WebGLRenderer.html).

## Constructor

### new [WebGL3DRenderTarget](#WebGL3DRenderTarget)( width : number, height : number, depth : number, options : [RenderTarget~Options](RenderTarget.html#~Options) )

Constructs a new 3D render target.

**width**

The width of the render target.

Default is `1`.

**height**

The height of the render target.

Default is `1`.

**depth**

The height of the render target.

Default is `1`.

**options**

The configuration object.

## Properties

### .[isWebGL3DRenderTarget](#isWebGL3DRenderTarget) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[texture](#texture) : [Data3DTexture](Data3DTexture.html)

Overwritten with a different texture type.

**Overrides:** [WebGLRenderTarget#texture](WebGLRenderTarget.html#texture)

## Source

[src/renderers/WebGL3DRenderTarget.js](https://github.com/mrdoob/three.js/blob/master/src/renderers/WebGL3DRenderTarget.js)