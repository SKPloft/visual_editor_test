Title: SVGRenderer
Source URL: https://threejs.org/docs/pages/SVGRenderer.html

# SVGRenderer

This renderer an be used to render geometric data using SVG. The produced vector graphics are particular useful in the following use cases:

*   Animated logos or icons.
*   Interactive 2D/3D diagrams or graphs.
*   Interactive maps.
*   Complex or animated user interfaces.

`SVGRenderer` has various advantages. It produces crystal-clear and sharp output which is independent of the actual viewport resolution.SVG elements can be styled via CSS. And they have good accessibility since it's possible to add metadata like title or description (useful for search engines or screen readers).

There are, however, some important limitations:

*   No advanced shading.
*   No texture support.
*   No shadow support.

## Import

SVGRenderer is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { SVGRenderer } from 'three/addons/renderers/SVGRenderer.js';
```

## Constructor

### new [SVGRenderer](#SVGRenderer)()

Constructs a new SVG renderer.

## Properties

### .[autoClear](#autoClear) : boolean

Whether to automatically perform a clear before a render call or not.

Default is `true`.

### .[domElement](#domElement) : SVGSVGElement

The DOM where the renderer appends its child-elements.

### .[info](#info) : Object

Provides information about the number of rendered vertices and faces.

### .[outputColorSpace](#outputColorSpace) : [SRGBColorSpace](global.html#SRGBColorSpace) | [LinearSRGBColorSpace](global.html#LinearSRGBColorSpace)

The output color space.

Default is `SRGBColorSpace`.

### .[overdraw](#overdraw) : number

Number of fractional pixels to enlarge polygons in order to prevent anti-aliasing gaps. Range is `[0,1]`.

Default is `0.5`.

### .[sortElements](#sortElements) : boolean

Whether to sort elements or not.

Default is `true`.

### .[sortObjects](#sortObjects) : boolean

Whether to sort 3D objects or not.

Default is `true`.

## Methods

### .[clear](#clear)()

Performs a manual clear with the defined clear color.

### .[getSize](#getSize)() : Object

Returns an object containing the width and height of the renderer.

**Returns:** The size of the renderer.

### .[render](#render)( scene : [Object3D](Object3D.html), camera : [Camera](Camera.html) )

Renders the given scene using the given camera.

**scene**

A scene or any other type of 3D object.

**camera**

The camera.

### .[setClearColor](#setClearColor)( color : number | [Color](Color.html) | string )

Sets the clear color.

**color**

The clear color to set.

### .[setPrecision](#setPrecision)( precision : number )

Sets the precision of the data used to create a paths.

**precision**

The precision to set.

### .[setQuality](#setQuality)( quality : 'low' | 'high' )

Sets the render quality. Setting to `high` makes the browser improve SVG quality over rendering speed and geometric precision.

**quality**

The quality.

### .[setSize](#setSize)( width : number, height : number )

Resizes the renderer to the given width and height.

**width**

The width of the renderer.

**height**

The height of the renderer.

## Source

[examples/jsm/renderers/SVGRenderer.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/renderers/SVGRenderer.js)