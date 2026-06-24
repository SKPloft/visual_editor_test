Title: CameraHelper
Source URL: https://threejs.org/docs/pages/CameraHelper.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) → [Line](Line.html) → [LineSegments](LineSegments.html) →

# CameraHelper

This helps with visualizing what a camera contains in its frustum. It visualizes the frustum of a camera using a line segments.

Based on frustum visualization in [lightgl.js shadowmap example](https://github.com/evanw/lightgl.js/blob/master/tests/shadowmap.html).

`CameraHelper` must be a child of the scene.

When the camera is transformed or its projection matrix is changed, it's necessary to call the `update()` method of the respective helper.

## Code Example

```js
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const helper = new THREE.CameraHelper( camera );
scene.add( helper );
```

## Constructor

### new [CameraHelper](#CameraHelper)( camera : [Camera](Camera.html) )

Constructs a new arrow helper.

**camera**

The camera to visualize.

## Properties

### .[camera](#camera) : [Camera](Camera.html)

The camera being visualized.

### .[pointMap](#pointMap) : Object.<string, Array.<number>>

This contains the points used to visualize the camera.

## Methods

### .[dispose](#dispose)()

Frees the GPU-related resources allocated by this instance. Call this method whenever this instance is no longer used in your app.

### .[setColors](#setColors)( frustum : [Color](Color.html), cone : [Color](Color.html), up : [Color](Color.html), target : [Color](Color.html), cross : [Color](Color.html) ) : [CameraHelper](CameraHelper.html)

Defines the colors of the helper.

**frustum**

The frustum line color.

**cone**

The cone line color.

**up**

The up line color.

**target**

The target line color.

**cross**

The cross line color.

**Returns:** A reference to this helper.

### .[update](#update)()

Updates the helper based on the projection matrix of the camera.

## Source

[src/helpers/CameraHelper.js](https://github.com/mrdoob/three.js/blob/master/src/helpers/CameraHelper.js)