Title: DragControls
Source URL: https://threejs.org/docs/pages/DragControls.html

[EventDispatcher](EventDispatcher.html) → [Controls](Controls.html) →

# DragControls

This class can be used to provide a drag'n'drop interaction.

## Code Example

```js
const controls = new DragControls( objects, camera, renderer.domElement );
// add event listener to highlight dragged objects
controls.addEventListener( 'dragstart', function ( event ) {
	event.object.material.emissive.set( 0xaaaaaa );
} );
controls.addEventListener( 'dragend', function ( event ) {
	event.object.material.emissive.set( 0x000000 );
} );
```

## Import

DragControls is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { DragControls } from 'three/addons/controls/DragControls.js';
```

## Constructor

### new [DragControls](#DragControls)( objects : Array.<[Object3D](Object3D.html)\>, camera : [Camera](Camera.html), domElement : HTMLElement )

Constructs a new controls instance.

**objects**

An array of draggable 3D objects.

**camera**

The camera of the rendered scene.

**domElement**

The HTML DOM element used for event listeners.

Default is `null`.

## Properties

### .[objects](#objects) : Array.<[Object3D](Object3D.html)\>

An array of draggable 3D objects.

### .[raycaster](#raycaster) : [Raycaster](Raycaster.html)

The raycaster used for detecting 3D objects.

### .[recursive](#recursive) : boolean

Whether children of draggable objects can be dragged independently from their parent.

Default is `true`.

### .[rotateSpeed](#rotateSpeed) : number

The speed at which the object will rotate when dragged in `rotate` mode. The higher the number the faster the rotation.

Default is `1`.

### .[transformGroup](#transformGroup) : boolean

This option only works if the `objects` array contains a single draggable group object. If set to `true`, the controls does not transform individual objects but the entire group.

Default is `false`.

## Events

### .[drag](#event:drag)

Fires when the user drags a 3D object.

##### Type:

*   Object

### .[dragend](#event:dragend)

Fires when the user has finished dragging a 3D object.

##### Type:

*   Object

### .[hoveroff](#event:hoveroff)

Fires when the pointer is moved out of a 3D object.

##### Type:

*   Object

### .[hoveron](#event:hoveron)

Fires when the pointer is moved onto a 3D object, or onto one of its children.

##### Type:

*   Object

## Source

[examples/jsm/controls/DragControls.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/controls/DragControls.js)