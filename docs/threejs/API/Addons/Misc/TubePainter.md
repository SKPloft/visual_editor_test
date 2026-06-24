Title: TubePainter
Source URL: https://threejs.org/docs/pages/TubePainter.html

# TubePainter

This module can be used to paint tube-like meshes along a sequence of points. This module is used in a XR painter demo.

## Code Example

```js
const painter = new TubePainter();
scene.add( painter.mesh );
```

## Import

TubePainter is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { TubePainter } from 'three/addons/misc/TubePainter.js';
```

## Constructor

### new [TubePainter](#TubePainter)()

## Properties

### .[mesh](#mesh) : [Mesh](Mesh.html)

The "painted" tube mesh. Must be added to the scene.

## Methods

### .[lineTo](#lineTo)( position : [Vector3](Vector3.html) )

Draw a stroke from the current position to the given one. This method extends the tube while drawing with the XR controllers.

**position**

The destination position.

### .[moveTo](#moveTo)( position : [Vector3](Vector3.html) )

Moves the current painting position to the given value.

**position**

The new painting position.

### .[setColor](#setColor)( color : [Color](Color.html) )

Sets the color of newly rendered tube segments.

**color**

The color.

### .[setSize](#setSize)( size : number )

Sets the size of newly rendered tube segments.

**size**

The size.

### .[update](#update)()

Updates the internal geometry buffers so the new painted segments are rendered.

## Source

[examples/jsm/misc/TubePainter.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/misc/TubePainter.js)