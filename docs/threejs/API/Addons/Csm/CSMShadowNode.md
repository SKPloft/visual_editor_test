Title: CSMShadowNode
Source URL: https://threejs.org/docs/pages/CSMShadowNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [ShadowBaseNode](ShadowBaseNode.html) →

# CSMShadowNode

An implementation of Cascade Shadow Maps (CSM).

This module can only be used with [WebGPURenderer](WebGPURenderer.html). When using [WebGLRenderer](WebGLRenderer.html), use [CSM](CSM.html) instead.

## Import

CSMShadowNode is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { CSMShadowNode } from 'three/addons/csm/CSMShadowNode.js';
```

## Constructor

### new [CSMShadowNode](#CSMShadowNode)( light : [DirectionalLight](DirectionalLight.html), data : [CSMShadowNode~Data](CSMShadowNode.html#~Data) )

Constructs a new CSM shadow node.

**light**

The CSM light.

**data**

The CSM data.

Default is `{}`.

## Properties

### .[breaks](#breaks) : Array.<number>

An array of numbers in the range `[0,1]` the defines how the mainCSM frustum should be split up.

### .[camera](#camera) : [Camera](Camera.html)

The scene's camera.

Default is `null`.

### .[cascades](#cascades) : number

The number of cascades.

Default is `3`.

### .[customSplitsCallback](#customSplitsCallback) : function

Custom split callback when using `mode='custom'`.

### .[fade](#fade) : boolean

Whether to fade between cascades or not.

Default is `false`.

### .[frustums](#frustums) : Array.<[CSMFrustum](CSMFrustum.html)\>

An array of frustums representing the cascades.

### .[lightMargin](#lightMargin) : number

The light margin.

Default is `200`.

### .[lights](#lights) : Array.<[DirectionalLight](DirectionalLight.html)\>

An array of directional lights which cast the shadows for the different cascades. There is one directional light for each cascade.

### .[mainFrustum](#mainFrustum) : [CSMFrustum](CSMFrustum.html)

The main frustum.

Default is `null`.

### .[maxFar](#maxFar) : number

The maximum far value.

Default is `100000`.

### .[mode](#mode) : 'practical' | 'uniform' | 'logarithmic' | 'custom'

The frustum split mode.

Default is `'practical'`.

## Methods

### .[dispose](#dispose)()

Frees the GPU-related resources allocated by this instance. Call this method whenever this instance is no longer used in your app.

**Overrides:** [ShadowBaseNode#dispose](ShadowBaseNode.html#dispose)

### .[updateFrustums](#updateFrustums)()

Applications must call this method every time they change camera or CSM settings.

## Type Definitions

### .[Data](#~Data)

Constructor data of `CSMShadowNode`.

**cascades**  
number

The number of cascades.

Default is `3`.

**maxFar**  
number

The maximum far value.

Default is `100000`.

**mode**  
'practical' | 'uniform' | 'logarithmic' | 'custom'

The frustum split mode.

Default is `'practical'`.

**customSplitsCallback**  
function

Custom split callback when using `mode='custom'`.

**lightMargin**  
number

The light margin.

Default is `200`.

## Source

[examples/jsm/csm/CSMShadowNode.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/csm/CSMShadowNode.js)