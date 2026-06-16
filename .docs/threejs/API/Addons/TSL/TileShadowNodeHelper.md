Title: TileShadowNodeHelper
Source URL: https://threejs.org/docs/pages/TileShadowNodeHelper.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) → [Group](Group.html) →

# TileShadowNodeHelper

Helper class to manage and display debug visuals for TileShadowNode.

## Import

TileShadowNodeHelper is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { TileShadowNodeHelper } from 'three/addons/tsl/shadows/TileShadowNodeHelper.js';
```

## Constructor

### new [TileShadowNodeHelper](#TileShadowNodeHelper)( tileShadowNode : [TileShadowNode](TileShadowNode.html) )

**tileShadowNode**

The TileShadowNode instance to debug.

## Methods

### .[dispose](#dispose)()

Removes all debug objects (planes and helpers) from the scene.

### .[init](#init)()

Initializes the debug displays (planes and camera helpers). Should be called after TileShadowNode has initialized its lights and shadow nodes.

### .[update](#update)()

Updates the debug visuals (specifically camera helpers). Should be called within TileShadowNode's update method.

## Source

[examples/jsm/tsl/shadows/TileShadowNodeHelper.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/tsl/shadows/TileShadowNodeHelper.js)