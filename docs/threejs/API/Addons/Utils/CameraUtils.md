Title: module-CameraUtils
Source URL: https://threejs.org/docs/pages/module-CameraUtils.html

# CameraUtils

## Import

CameraUtils is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import * as CameraUtils from 'three/addons/utils/CameraUtils.js';
```

## Methods

### .[frameCorners](#~frameCorners)( camera : [PerspectiveCamera](PerspectiveCamera.html), bottomLeftCorner : [Vector3](Vector3.html), bottomRightCorner : [Vector3](Vector3.html), topLeftCorner : [Vector3](Vector3.html), estimateViewFrustum : boolean ) (inner)

Set projection matrix and the orientation of a perspective camera to exactly frame the corners of an arbitrary rectangle. NOTE: This function ignores the standard parameters; do not call `updateProjectionMatrix()` after this.

**camera**

The camera.

**bottomLeftCorner**

The bottom-left corner point.

**bottomRightCorner**

The bottom-right corner point.

**topLeftCorner**

The top-left corner point.

**estimateViewFrustum**

If set to `true`, the function tries to estimate the camera's FOV.

Default is `false`.

## Source

[examples/jsm/utils/CameraUtils.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/utils/CameraUtils.js)