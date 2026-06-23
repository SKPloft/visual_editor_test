Title: FirstPersonControls
Source URL: https://threejs.org/docs/pages/FirstPersonControls.html

[EventDispatcher](EventDispatcher.html) → [Controls](Controls.html) →

# FirstPersonControls

This class is an alternative implementation of [FlyControls](FlyControls.html).

## Import

FirstPersonControls is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
```

## Constructor

### new [FirstPersonControls](#FirstPersonControls)( object : [Object3D](Object3D.html), domElement : HTMLElement )

Constructs a new controls instance.

**object**

The object that is managed by the controls.

**domElement**

The HTML element used for event listeners.

Default is `null`.

## Properties

### .[autoForward](#autoForward) : boolean

Whether the camera is automatically moved forward or not.

Default is `false`.

### .[constrainVertical](#constrainVertical) : boolean

Whether or not looking around is vertically constrained by `verticalMin` and `verticalMax`.

Default is `false`.

### .[heightCoef](#heightCoef) : number

Determines how much faster the camera moves when it's y-component is near `heightMax`.

Default is `1`.

### .[heightMax](#heightMax) : number

Upper camera height limit used for movement speed adjustment.

Default is `1`.

### .[heightMin](#heightMin) : number

Lower camera height limit used for movement speed adjustment.

Default is `0`.

### .[heightSpeed](#heightSpeed) : boolean

Whether or not the camera's height influences the forward movement speed. Use the properties `heightCoef`, `heightMin` and `heightMax` for configuration.

Default is `false`.

### .[lookSpeed](#lookSpeed) : number

The look around speed.

Default is `0.005`.

### .[lookVertical](#lookVertical) : boolean

Whether it's possible to vertically look around or not.

Default is `true`.

### .[mouseDragOn](#mouseDragOn) : boolean (readonly)

Whether the mouse is pressed down or not.

Default is `false`.

### .[movementSpeed](#movementSpeed) : number

The movement speed.

Default is `1`.

### .[verticalMax](#verticalMax) : number

How far you can vertically look around, upper limit. Range is `0` to `Math.PI` in radians.

Default is `0`.

### .[verticalMin](#verticalMin) : number

How far you can vertically look around, lower limit. Range is `0` to `Math.PI` in radians.

Default is `0`.

## Methods

### .[handleResize](#handleResize)()

### .[lookAt](#lookAt)( x : number | [Vector3](Vector3.html), y : number, z : number ) : [FirstPersonControls](FirstPersonControls.html)

Rotates the camera towards the defined target position.

**x**

The x coordinate of the target position or alternatively a vector representing the target position.

**y**

The y coordinate of the target position.

**z**

The z coordinate of the target position.

**Returns:** A reference to this controls.

## Source

[examples/jsm/controls/FirstPersonControls.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/controls/FirstPersonControls.js)