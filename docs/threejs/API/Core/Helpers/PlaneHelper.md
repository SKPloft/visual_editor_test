Title: PlaneHelper
Source URL: https://threejs.org/docs/pages/PlaneHelper.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) → [Line](Line.html) →

# PlaneHelper

A helper object to visualize an instance of [Plane](Plane.html).

## Code Example

```js
const plane = new THREE.Plane( new THREE.Vector3( 1, 1, 0.2 ), 3 );
const helper = new THREE.PlaneHelper( plane, 1, 0xffff00 );
scene.add( helper );
```

## Constructor

### new [PlaneHelper](#PlaneHelper)( plane : [Plane](Plane.html), size : number, hex : number | [Color](Color.html) | string )

Constructs a new plane helper.

**plane**

The plane to be visualized.

**size**

The side length of plane helper.

Default is `1`.

**hex**

The helper's color.

Default is `0xffff00`.

## Properties

### .[plane](#plane) : [Plane](Plane.html)

The plane being visualized.

### .[size](#size) : number

The side length of plane helper.

Default is `1`.

## Methods

### .[dispose](#dispose)()

Updates the helper to match the position and direction of the light being visualized.

## Source

[src/helpers/PlaneHelper.js](https://github.com/mrdoob/three.js/blob/master/src/helpers/PlaneHelper.js)