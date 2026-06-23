Title: RectAreaLightHelper
Source URL: https://threejs.org/docs/pages/RectAreaLightHelper.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) → [Line](Line.html) →

# RectAreaLightHelper

Creates a visual aid for rect area lights.

`RectAreaLightHelper` must be added as a child of the light.

## Code Example

```js
const light = new THREE.RectAreaLight( 0xffffbb, 1.0, 5, 5 );
const helper = new RectAreaLightHelper( light );
light.add( helper );
```

## Import

RectAreaLightHelper is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
```

## Constructor

### new [RectAreaLightHelper](#RectAreaLightHelper)( light : [RectAreaLight](RectAreaLight.html), color : number | [Color](Color.html) | string )

Constructs a new rect area light helper.

**light**

The light to visualize.

**color**

The helper's color. If this is not the set, the helper will take the color of the light.

## Properties

### .[color](#color) : number | [Color](Color.html) | string | undefined

The helper's color. If `undefined`, the helper will take the color of the light.

### .[light](#light) : [RectAreaLight](RectAreaLight.html)

The light to visualize.

## Methods

### .[dispose](#dispose)()

Frees the GPU-related resources allocated by this instance. Call this method whenever this instance is no longer used in your app.

## Source

[examples/jsm/helpers/RectAreaLightHelper.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/helpers/RectAreaLightHelper.js)