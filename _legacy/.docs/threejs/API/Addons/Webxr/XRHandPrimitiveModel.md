Title: XRHandPrimitiveModel
Source URL: https://threejs.org/docs/pages/XRHandPrimitiveModel.html

# XRHandPrimitiveModel

Represents one of the hand model types [XRHandModelFactory](XRHandModelFactory.html) might produce depending on the selected profile. `XRHandPrimitiveModel` represents a hand with sphere or box primitives according to the selected `primitive` option.

## Import

XRHandPrimitiveModel is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { XRHandPrimitiveModel } from 'three/addons/webxr/XRHandPrimitiveModel.js';
```

## Constructor

### new [XRHandPrimitiveModel](#XRHandPrimitiveModel)( handModel : [XRHandModel](XRHandModel.html), controller : [Group](Group.html), path : string, handedness : XRHandedness, options : [XRHandPrimitiveModel~Options](XRHandPrimitiveModel.html#~Options) )

Constructs a new XR hand primitive model.

**handModel**

The hand model.

**controller**

The WebXR controller.

**path**

The model path.

**handedness**

The handedness of the XR input source.

**options**

The model options.

## Properties

### .[controller](#controller) : [Group](Group.html)

The WebXR controller.

### .[envMap](#envMap) : [Texture](Texture.html)

The model's environment map.

Default is `null`.

### .[handModel](#handModel) : [XRHandModel](XRHandModel.html)

The hand model.

## Methods

### .[updateMesh](#updateMesh)()

Updates the mesh based on the tracked XR joints data.

## Type Definitions

### .[Options](#~Options)

Constructor options of `XRHandPrimitiveModel`.

**primitive**  
'box' | 'sphere'

The primitive type.

## Source

[examples/jsm/webxr/XRHandPrimitiveModel.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/webxr/XRHandPrimitiveModel.js)