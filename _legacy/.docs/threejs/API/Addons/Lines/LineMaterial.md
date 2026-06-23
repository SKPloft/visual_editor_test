Title: LineMaterial
Source URL: https://threejs.org/docs/pages/LineMaterial.html

[EventDispatcher](EventDispatcher.html) → [Material](Material.html) → [ShaderMaterial](ShaderMaterial.html) →

# LineMaterial

A material for drawing wireframe-style geometries.

Unlike [LineBasicMaterial](LineBasicMaterial.html), it supports arbitrary line widths and allows using world units instead of screen space units. This material is used with [LineSegments2](LineSegments2.html) and [Line2](Line2.html).

This module can only be used with [WebGLRenderer](WebGLRenderer.html). When using [WebGPURenderer](WebGPURenderer.html), use [Line2NodeMaterial](Line2NodeMaterial.html).

## Import

LineMaterial is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
```

## Constructor

### new [LineMaterial](#LineMaterial)( parameters : Object )

Constructs a new line segments geometry.

**parameters**

An object with one or more properties defining the material's appearance. Any property of the material (including any property from inherited materials) can be passed in here. Color values can be passed any type of value accepted by [Color#set](Color.html#set).

## Properties

### .[alphaToCoverage](#alphaToCoverage) : boolean

Whether to use alphaToCoverage or not. When enabled, this can improve the anti-aliasing of line edges when using MSAA.

**Overrides:** [ShaderMaterial#alphaToCoverage](ShaderMaterial.html#alphaToCoverage)

### .[color](#color) : [Color](Color.html)

The material's color.

Default is `(1,1,1)`.

### .[dashOffset](#dashOffset) : number

Where in the dash cycle the dash starts.

Default is `0`.

### .[dashScale](#dashScale) : number

The scale of the dashes and gaps.

Default is `1`.

### .[dashSize](#dashSize) : number

The size of the dash.

Default is `1`.

### .[dashed](#dashed) : boolean

Whether the line is dashed, or solid.

Default is `false`.

### .[gapSize](#gapSize) : number

The size of the gap.

Default is `0`.

### .[isLineMaterial](#isLineMaterial) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[linewidth](#linewidth) : number

Controls line thickness in CSS pixel units when `worldUnits` is `false` (default), or in world units when `worldUnits` is `true`.

Default is `1`.

**Overrides:** [ShaderMaterial#linewidth](ShaderMaterial.html#linewidth)

### .[opacity](#opacity) : number

The opacity.

Default is `1`.

**Overrides:** [ShaderMaterial#opacity](ShaderMaterial.html#opacity)

### .[resolution](#resolution) : [Vector2](Vector2.html)

The size of the viewport, in screen pixels. This must be kept updated to make screen-space rendering accurate. The `LineSegments2.onBeforeRender` callback performs the update for visible objects.

### .[worldUnits](#worldUnits) : boolean

Whether the material's sizes (width, dash gaps) are in world units.

Default is `false`.

## Source

[examples/jsm/lines/LineMaterial.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/lines/LineMaterial.js)