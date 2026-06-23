Title: SelectionHelper
Source URL: https://threejs.org/docs/pages/SelectionHelper.html

# SelectionHelper

A helper for [SelectionBox](SelectionBox.html).

It visualizes the current selection box with a `div` container element.

## Import

SelectionHelper is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { SelectionHelper } from 'three/addons/interactive/SelectionHelper.js';
```

## Constructor

### new [SelectionHelper](#SelectionHelper)( renderer : [WebGPURenderer](WebGPURenderer.html) | [WebGLRenderer](WebGLRenderer.html), cssClassName : string )

Constructs a new selection helper.

**renderer**

The renderer.

**cssClassName**

The CSS class name of the `div`.

## Properties

### .[element](#element) : HTMLDivElement

The visualization of the selection box.

### .[enabled](#enabled) : boolean

Whether helper is enabled or not.

Default is `true`.

### .[isDown](#isDown) : boolean

Whether the mouse or pointer is pressed down.

Default is `false`.

### .[renderer](#renderer) : [WebGPURenderer](WebGPURenderer.html) | [WebGLRenderer](WebGLRenderer.html)

A reference to the renderer.

## Methods

### .[dispose](#dispose)()

Call this method if you no longer want use to the controls. It frees all internal resources and removes all event listeners.

## Source

[examples/jsm/interactive/SelectionHelper.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/interactive/SelectionHelper.js)