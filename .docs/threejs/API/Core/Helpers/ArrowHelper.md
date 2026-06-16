Title: ArrowHelper
Source URL: https://threejs.org/docs/pages/ArrowHelper.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) →

# ArrowHelper

An 3D arrow object for visualizing directions.

## Code Example

```js
const dir = new THREE.Vector3( 1, 2, 0 );
//normalize the direction vector (convert to vector of length 1)
dir.normalize();
const origin = new THREE.Vector3( 0, 0, 0 );
const length = 1;
const hex = 0xffff00;
const arrowHelper = new THREE.ArrowHelper( dir, origin, length, hex );
scene.add( arrowHelper );
```

## Constructor

### new [ArrowHelper](#ArrowHelper)( dir : [Vector3](Vector3.html), origin : [Vector3](Vector3.html), length : number, color : number | [Color](Color.html) | string, headLength : number, headWidth : number )

Constructs a new arrow helper.

**dir**

The (normalized) direction vector.

Default is `(0, 0, 1)`.

**origin**

Point at which the arrow starts.

Default is `(0, 0, 0)`.

**length**

Length of the arrow in world units.

Default is `1`.

**color**

Color of the arrow.

Default is `0xffff00`.

**headLength**

The length of the head of the arrow.

Default is `length*0.2`.

**headWidth**

The width of the head of the arrow.

Default is `headLength*0.2`.

## Properties

### .[cone](#cone) : [Mesh](Mesh.html)

The cone part of the arrow helper.

### .[line](#line) : [Line](Line.html)

The line part of the arrow helper.

## Methods

### .[dispose](#dispose)()

Frees the GPU-related resources allocated by this instance. Call this method whenever this instance is no longer used in your app.

### .[setColor](#setColor)( color : number | [Color](Color.html) | string )

Sets the color of the helper.

**color**

The color to set.

### .[setDirection](#setDirection)( dir : [Vector3](Vector3.html) )

Sets the direction of the helper.

**dir**

The normalized direction vector.

### .[setLength](#setLength)( length : number, headLength : number, headWidth : number )

Sets the length of the helper.

**length**

Length of the arrow in world units.

**headLength**

The length of the head of the arrow.

Default is `length*0.2`.

**headWidth**

The width of the head of the arrow.

Default is `headLength*0.2`.

## Source

[src/helpers/ArrowHelper.js](https://github.com/mrdoob/three.js/blob/master/src/helpers/ArrowHelper.js)