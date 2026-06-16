Title: VolumeSlice
Source URL: https://threejs.org/docs/pages/VolumeSlice.html

# VolumeSlice

This class has been made to hold a slice of a volume data.

## Import

VolumeSlice is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { VolumeSlice } from 'three/addons/misc/VolumeSlice.js';
```

## Constructor

### new [VolumeSlice](#VolumeSlice)( volume : [Volume](Volume.html), index : number, axis : 'x' | 'y' | 'z' )

Constructs a new volume slice.

**volume**

The associated volume.

**index**

The index of the slice.

Default is `0`.

**axis**

For now only 'x', 'y' or 'z' but later it will change to a normal vector.

Default is `'z'`.

See:

*   [Volume](Volume.html)

## Properties

### .[axis](#axis) : 'x' | 'y' | 'z'

The normal axis.

### .[canvas](#canvas) : HTMLCanvasElement

The final canvas used for the texture.

### .[canvasBuffer](#canvasBuffer) : HTMLCanvasElement

The intermediary canvas used to paint the data.

### .[ctx](#ctx) : CanvasRenderingContext2D

The rendering context of the canvas.

### .[ctxBuffer](#ctxBuffer) : CanvasRenderingContext2D

The rendering context of the canvas buffer,

### .[geometryNeedsUpdate](#geometryNeedsUpdate) : boolean

If set to `true`, `updateGeometry()` will be triggered at the next repaint.

Default is `true`.

### .[iLength](#iLength) : number

Width of slice in the original coordinate system, corresponds to the width of the buffer canvas.

Default is `0`.

### .[index](#index) : number

The index of the slice, if changed, will automatically call updateGeometry at the next repaint.

Default is `0`.

### .[jLength](#jLength) : number

Height of slice in the original coordinate system, corresponds to the height of the buffer canvas.

Default is `0`.

### .[mesh](#mesh) : [Mesh](Mesh.html)

The mesh ready to get used in the scene.

### .[sliceAccess](#sliceAccess) : function

Function that allow the slice to access right data.

See:

*   [Volume#extractPerpendicularPlane](Volume.html#extractPerpendicularPlane)

### .[volume](#volume) : [Volume](Volume.html)

The associated volume.

## Methods

### .[repaint](#repaint)()

Refresh the texture and the geometry if geometryNeedsUpdate is set to `true`.

### .[updateGeometry](#updateGeometry)()

Refresh the geometry according to axis and index.

See:

*   [Volume#extractPerpendicularPlane](Volume.html#extractPerpendicularPlane)

## Source

[examples/jsm/misc/VolumeSlice.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/misc/VolumeSlice.js)