Title: RenderTarget3D
Source URL: https://threejs.org/docs/pages/RenderTarget3D.html

[EventDispatcher](EventDispatcher.html) → [RenderTarget](RenderTarget.html) →

# RenderTarget3D

Represents a 3D render target.

## Constructor

### new [RenderTarget3D](#RenderTarget3D)( width : number, height : number, depth : number, options : [RenderTarget~Options](RenderTarget.html#~Options) )

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

### .[isRenderTarget3D](#isRenderTarget3D) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[texture](#texture) : [Data3DTexture](Data3DTexture.html)

Overwritten with a different texture type.

**Overrides:** [RenderTarget#texture](RenderTarget.html#texture)

## Source

[src/core/RenderTarget3D.js](https://github.com/mrdoob/three.js/blob/master/src/core/RenderTarget3D.js)