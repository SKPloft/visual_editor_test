Title: TrackballControls
Source URL: https://threejs.org/docs/pages/TrackballControls.html

[EventDispatcher](EventDispatcher.html) → [Controls](Controls.html) →

# TrackballControls

This class is similar to [OrbitControls](OrbitControls.html). However, it does not maintain a constant camera `up` vector. That means if the camera orbits over the “north” and “south” poles, it does not flip to stay "right side up".

## Import

TrackballControls is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
```

## Constructor

### new [TrackballControls](#TrackballControls)( object : [Object3D](Object3D.html), domElement : HTMLElement )

Constructs a new controls instance.

**object**

The object that is managed by the controls.

**domElement**

The HTML element used for event listeners.

Default is `null`.

## Properties

### .[dynamicDampingFactor](#dynamicDampingFactor) : number

Defines the intensity of damping. Only considered if `staticMoving` is set to `false`.

Default is `0.2`.

### .[keys](#keys) : Array.<string>

This array holds keycodes for controlling interactions.

*   When the first defined key is pressed, all mouse interactions (left, middle, right) performs orbiting.
*   When the second defined key is pressed, all mouse interactions (left, middle, right) performs zooming.
*   When the third defined key is pressed, all mouse interactions (left, middle, right) performs panning.

Default is _KeyA, KeyS, KeyD_ which represents A, S, D.

**Overrides:** [Controls#keys](Controls.html#keys)

### .[maxDistance](#maxDistance) : number

How far you can dolly out (perspective camera only).

Default is `Infinity`.

### .[maxZoom](#maxZoom) : number

How far you can zoom out (orthographic camera only).

Default is `Infinity`.

### .[minDistance](#minDistance) : number

How far you can dolly in (perspective camera only).

Default is `0`.

### .[minZoom](#minZoom) : number

How far you can zoom in (orthographic camera only).

Default is `0`.

### .[mouseButtons](#mouseButtons) : Object

This object contains references to the mouse actions used by the controls.

```js
controls.mouseButtons = {
	LEFT: THREE.MOUSE.ROTATE,
	MIDDLE: THREE.MOUSE.DOLLY,
	RIGHT: THREE.MOUSE.PAN
}
```

**Overrides:** [Controls#mouseButtons](Controls.html#mouseButtons)

### .[noPan](#noPan) : boolean

Whether panning is disabled or not.

Default is `false`.

### .[noRotate](#noRotate) : boolean

Whether rotation is disabled or not.

Default is `false`.

### .[noZoom](#noZoom) : boolean

Whether zooming is disabled or not.

Default is `false`.

### .[panSpeed](#panSpeed) : number

The pan speed.

Default is `0.3`.

### .[rotateSpeed](#rotateSpeed) : number

The rotation speed.

Default is `1`.

### .[screen](#screen) : Object (readonly)

Represents the properties of the screen. Automatically set when `handleResize()` is called.

### .[staticMoving](#staticMoving) : boolean

Whether damping is disabled or not.

Default is `false`.

### .[target](#target) : [Vector3](Vector3.html)

The focus point of the controls.

### .[zoomSpeed](#zoomSpeed) : number

The zoom speed.

Default is `1.2`.

## Methods

### .[handleResize](#handleResize)()

Must be called if the application window is resized.

### .[reset](#reset)()

Resets the controls to its initial state.

## Events

### .[change](#event:change)

Fires when the camera has been transformed by the controls.

##### Type:

*   Object

### .[end](#event:end)

Fires when an interaction has finished.

##### Type:

*   Object

### .[start](#event:start)

Fires when an interaction was initiated.

##### Type:

*   Object

## Source

[examples/jsm/controls/TrackballControls.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/controls/TrackballControls.js)