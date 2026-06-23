Title: DirectionalLightHelper
Source URL: https://threejs.org/docs/pages/DirectionalLightHelper.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) →

# DirectionalLightHelper

Helper object to assist with visualizing a [DirectionalLight](DirectionalLight.html)'s effect on the scene. This consists of a plane and a line representing the light's position and direction.

When the directional light or its target are transformed or light properties are changed, it's necessary to call the `update()` method of the respective helper.

## Code Example

```js
const light = new THREE.DirectionalLight( 0xFFFFFF );
scene.add( light );
const helper = new THREE.DirectionalLightHelper( light, 5 );
scene.add( helper );
```

## Constructor

### new [DirectionalLightHelper](#DirectionalLightHelper)( light : [DirectionalLight](DirectionalLight.html), size : number, color : number | [Color](Color.html) | string )

Constructs a new directional light helper.

**light**

The light to be visualized.

**size**

The dimensions of the plane.

Default is `1`.

**color**

The helper's color. If not set, the helper will take the color of the light.

## Properties

### .[color](#color) : number | [Color](Color.html) | string

The color parameter passed in the constructor. If not set, the helper will take the color of the light.

### .[light](#light) : [DirectionalLight](DirectionalLight.html)

The light being visualized.

### .[lightPlane](#lightPlane) : [Line](Line.html)

Contains the line showing the location of the directional light.

### .[targetLine](#targetLine) : [Line](Line.html)

Represents the target line of the directional light.

## Methods

### .[dispose](#dispose)()

Frees the GPU-related resources allocated by this instance. Call this method whenever this instance is no longer used in your app.

### .[update](#update)()

Updates the helper to match the position and direction of the light being visualized.

## Source

[src/helpers/DirectionalLightHelper.js](https://github.com/mrdoob/three.js/blob/master/src/helpers/DirectionalLightHelper.js)