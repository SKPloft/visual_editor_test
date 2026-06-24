Title: AxesHelper
Source URL: https://threejs.org/docs/pages/AxesHelper.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) → [Line](Line.html) → [LineSegments](LineSegments.html) →

# AxesHelper

An axis object to visualize the 3 axes in a simple way. The X axis is red. The Y axis is green. The Z axis is blue.

## Code Example

```js
const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );
```

## Constructor

### new [AxesHelper](#AxesHelper)( size : number )

Constructs a new axes helper.

**size**

Size of the lines representing the axes.

Default is `1`.

## Methods

### .[dispose](#dispose)()

Frees the GPU-related resources allocated by this instance. Call this method whenever this instance is no longer used in your app.

### .[setColors](#setColors)( xAxisColor : number | [Color](Color.html) | string, yAxisColor : number | [Color](Color.html) | string, zAxisColor : number | [Color](Color.html) | string ) : [AxesHelper](AxesHelper.html)

Defines the colors of the axes helper.

**xAxisColor**

The color for the x axis.

**yAxisColor**

The color for the y axis.

**zAxisColor**

The color for the z axis.

**Returns:** A reference to this axes helper.

## Source

[src/helpers/AxesHelper.js](https://github.com/mrdoob/three.js/blob/master/src/helpers/AxesHelper.js)