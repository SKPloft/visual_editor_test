Title: PointLightHelper
Source URL: https://threejs.org/docs/pages/PointLightHelper.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) → [Mesh](Mesh.html) →

# PointLightHelper

This displays a helper object consisting of a spherical mesh for visualizing an instance of [PointLight](PointLight.html).

## Code Example

```js
const pointLight = new THREE.PointLight( 0xff0000, 1, 100 );
pointLight.position.set( 10, 10, 10 );
scene.add( pointLight );
const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
scene.add( pointLightHelper );
```

## Constructor

### new [PointLightHelper](#PointLightHelper)( light : [PointLight](PointLight.html), sphereSize : number, color : number | [Color](Color.html) | string )

Constructs a new point light helper.

**light**

The light to be visualized.

**sphereSize**

The size of the sphere helper.

Default is `1`.

**color**

The helper's color. If not set, the helper will take the color of the light.

## Properties

### .[color](#color) : number | [Color](Color.html) | string

The color parameter passed in the constructor. If not set, the helper will take the color of the light.

### .[light](#light) : [PointLight](PointLight.html)

The light being visualized.

## Methods

### .[dispose](#dispose)()

Frees the GPU-related resources allocated by this instance. Call this method whenever this instance is no longer used in your app.

### .[update](#update)()

Updates the helper to match the position of the light being visualized.

## Source

[src/helpers/PointLightHelper.js](https://github.com/mrdoob/three.js/blob/master/src/helpers/PointLightHelper.js)