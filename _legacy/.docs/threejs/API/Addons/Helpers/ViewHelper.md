Title: ViewHelper
Source URL: https://threejs.org/docs/pages/ViewHelper.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) →

# ViewHelper

A special type of helper that visualizes the camera's transformation in a small viewport area as an axes helper. Such a helper is often wanted in 3D modeling tools or scene editors like the [three.js editor](https://threejs.org/editor).

The helper allows to click on the X, Y and Z axes which animates the camera so it looks along the selected axis.

## Import

ViewHelper is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { ViewHelper } from 'three/addons/helpers/ViewHelper.js';
```

## Constructor

### new [ViewHelper](#ViewHelper)( camera : [Camera](Camera.html), domElement : HTMLElement )

Constructs a new view helper.

**camera**

The camera whose transformation should be visualized.

**domElement**

The DOM element that is used to render the view.

## Properties

### .[animating](#animating) : boolean (readonly)

Whether the helper is currently animating or not.

Default is `false`.

### .[center](#center) : [Vector3](Vector3.html)

The helper's center point.

### .[isViewHelper](#isViewHelper) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[location](#location) : Object

Controls the position of the helper in the viewport. Use `top`/`bottom` for vertical positioning and `left`/`right` for horizontal. If `left` is `null`, `right` is used. If `top` is `null`, `bottom` is used.

## Methods

### .[dispose](#dispose)()

Frees the GPU-related resources allocated by this instance. Call this method whenever this instance is no longer used in your app.

### .[handleClick](#handleClick)( event : PointerEvent ) : boolean

This method should be called when a click or pointer event has happened in the app.

**event**

The event to process.

**Returns:** Whether an intersection with the helper has been detected or not.

### .[render](#render)( renderer : [WebGLRenderer](WebGLRenderer.html) | [WebGPURenderer](WebGPURenderer.html) )

Renders the helper in a separate view in the viewport. Position is controlled by the `location` property.

**renderer**

The renderer.

### .[setLabelStyle](#setLabelStyle)( font : string, color : string, radius : number )

Sets the label style. Has no effect when the axes are unlabeled.

**font**

The label font.

Default is `'24px Arial'`.

**color**

The label color.

Default is `'#000000'`.

**radius**

The label radius.

Default is `14`.

### .[setLabels](#setLabels)( labelX : string | undefined, labelY : string | undefined, labelZ : string | undefined )

Sets labels for each axis. By default, they are unlabeled.

**labelX**

The label for the x-axis.

**labelY**

The label for the y-axis.

**labelZ**

The label for the z-axis.

### .[update](#update)( delta : number )

Updates the helper. This method should be called in the app's animation loop.

**delta**

The delta time in seconds.

## Source

[examples/jsm/helpers/ViewHelper.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/helpers/ViewHelper.js)