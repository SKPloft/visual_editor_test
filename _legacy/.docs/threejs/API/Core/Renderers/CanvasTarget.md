Title: CanvasTarget
Source URL: https://threejs.org/docs/pages/CanvasTarget.html

[EventDispatcher](EventDispatcher.html) →

# CanvasTarget

CanvasTarget is a class that represents the final output destination of the renderer.

## Constructor

### new [CanvasTarget](#CanvasTarget)( domElement : HTMLCanvasElement | OffscreenCanvas )

Constructs a new CanvasTarget.

**domElement**

The canvas element to render to.

## Properties

### .[colorTexture](#colorTexture) : [FramebufferTexture](FramebufferTexture.html)

The color texture of the default framebuffer.

### .[depthTexture](#depthTexture) : [DepthTexture](DepthTexture.html)

The depth texture of the default framebuffer.

### .[domElement](#domElement) : HTMLCanvasElement | OffscreenCanvas

A reference to the canvas element the renderer is drawing to. This value of this property will automatically be created by the renderer.

## Methods

### .[dispose](#dispose)()

Frees the GPU-related resources allocated by this instance. Call this method whenever this instance is no longer used in your app.

##### Fires:

*   RenderTarget#event:dispose

### .[getDrawingBufferSize](#getDrawingBufferSize)( target : [Vector2](Vector2.html) ) : [Vector2](Vector2.html)

Returns the drawing buffer size in physical pixels. This method honors the pixel ratio.

**target**

The method writes the result in this target object.

**Returns:** The drawing buffer size.

### .[getPixelRatio](#getPixelRatio)() : number

Returns the pixel ratio.

**Returns:** The pixel ratio.

### .[getScissor](#getScissor)( target : [Vector4](Vector4.html) ) : [Vector4](Vector4.html)

Returns the scissor rectangle.

**target**

The method writes the result in this target object.

**Returns:** The scissor rectangle.

### .[getScissorTest](#getScissorTest)() : boolean

Returns the scissor test value.

**Returns:** Whether the scissor test should be enabled or not.

### .[getSize](#getSize)( target : [Vector2](Vector2.html) ) : [Vector2](Vector2.html)

Returns the renderer's size in logical pixels. This method does not honor the pixel ratio.

**target**

The method writes the result in this target object.

**Returns:** The renderer's size in logical pixels.

### .[getViewport](#getViewport)( target : [Vector4](Vector4.html) ) : [Vector4](Vector4.html)

Returns the viewport definition.

**target**

The method writes the result in this target object.

**Returns:** The viewport definition.

### .[setDrawingBufferSize](#setDrawingBufferSize)( width : number, height : number, pixelRatio : number )

This method allows to define the drawing buffer size by specifying width, height and pixel ratio all at once. The size of the drawing buffer is computed with this formula:

```js
size.x = width * pixelRatio;
size.y = height * pixelRatio;
```

**width**

The width in logical pixels.

**height**

The height in logical pixels.

**pixelRatio**

The pixel ratio.

### .[setPixelRatio](#setPixelRatio)( value : number )

Sets the given pixel ratio and resizes the canvas if necessary.

**value**

The pixel ratio.

Default is `1`.

### .[setScissor](#setScissor)( x : number | [Vector4](Vector4.html), y : number, width : number, height : number )

Defines the scissor rectangle.

**x**

The horizontal coordinate for the lower left corner of the box in logical pixel unit. Instead of passing four arguments, the method also works with a single four-dimensional vector.

**y**

The vertical coordinate for the lower left corner of the box in logical pixel unit.

**width**

The width of the scissor box in logical pixel unit.

**height**

The height of the scissor box in logical pixel unit.

### .[setScissorTest](#setScissorTest)( boolean : boolean )

Defines the scissor test.

**boolean**

Whether the scissor test should be enabled or not.

### .[setSize](#setSize)( width : number, height : number, updateStyle : boolean )

Sets the size of the renderer.

**width**

The width in logical pixels.

**height**

The height in logical pixels.

**updateStyle**

Whether to update the `style` attribute of the canvas or not.

Default is `true`.

### .[setViewport](#setViewport)( x : number | [Vector4](Vector4.html), y : number, width : number, height : number, minDepth : number, maxDepth : number )

Defines the viewport.

**x**

The horizontal coordinate for the lower left corner of the viewport origin in logical pixel unit.

**y**

The vertical coordinate for the lower left corner of the viewport origin in logical pixel unit.

**width**

The width of the viewport in logical pixel unit.

**height**

The height of the viewport in logical pixel unit.

**minDepth**

The minimum depth value of the viewport. WebGPU only.

Default is `0`.

**maxDepth**

The maximum depth value of the viewport. WebGPU only.

Default is `1`.

## Source

[src/renderers/common/CanvasTarget.js](https://github.com/mrdoob/three.js/blob/master/src/renderers/common/CanvasTarget.js)