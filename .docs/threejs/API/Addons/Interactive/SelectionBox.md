Title: SelectionBox
Source URL: https://threejs.org/docs/pages/SelectionBox.html

# SelectionBox

This class can be used to select 3D objects in a scene with a selection box. It is recommended to visualize the selected area with the help of [SelectionHelper](SelectionHelper.html).

## Code Example

```js
const selectionBox = new SelectionBox( camera, scene );
const selectedObjects = selectionBox.select( startPoint, endPoint );
```

## Import

SelectionBox is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { SelectionBox } from 'three/addons/interactive/SelectionBox.js';
```

## Constructor

### new [SelectionBox](#SelectionBox)( camera : [Camera](Camera.html), scene : [Scene](Scene.html), deep : number )

Constructs a new selection box.

**camera**

The camera the scene is rendered with.

**scene**

The scene.

**deep**

How deep the selection frustum of perspective cameras should extend.

Default is `Number.MAX_VALUE`.

## Properties

### .[batches](#batches) : Object

The selected batches of batched meshes.

### .[camera](#camera) : [Camera](Camera.html)

The camera the scene is rendered with.

### .[collection](#collection) : Array.<[Object3D](Object3D.html)\>

The selected 3D objects.

### .[deep](#deep) : number

How deep the selection frustum of perspective cameras should extend.

Default is `Number.MAX_VALUE`.

### .[endPoint](#endPoint) : [Vector3](Vector3.html)

The end point of the selection.

### .[instances](#instances) : Object

The selected instance IDs of instanced meshes.

### .[scene](#scene) : [Scene](Scene.html)

The camera the scene is rendered with.

### .[startPoint](#startPoint) : [Vector3](Vector3.html)

The start point of the selection.

## Methods

### .[select](#select)( startPoint : [Vector3](Vector3.html), endPoint : [Vector3](Vector3.html) ) : Array.<[Object3D](Object3D.html)\>

This method selects 3D objects in the scene based on the given start and end point. If no parameters are provided, the method uses the start and end values of the respective members.

**startPoint**

The start point.

**endPoint**

The end point.

**Returns:** The selected 3D objects.

## Source

[examples/jsm/interactive/SelectionBox.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/interactive/SelectionBox.js)