Title: XRHandModelFactory
Source URL: https://threejs.org/docs/pages/XRHandModelFactory.html

# XRHandModelFactory

Similar to [XRControllerModelFactory](XRControllerModelFactory.html), this class allows to create hand models for WebXR controllers that can be added as a visual representation to your scene.

## Code Example

```js
const handModelFactory = new XRHandModelFactory();
const hand = renderer.xr.getHand( 0 );
hand.add( handModelFactory.createHandModel( hand ) );
scene.add( hand );
```

## Import

XRHandModelFactory is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { XRHandModelFactory } from 'three/addons/webxr/XRHandModelFactory.js';
```

## Constructor

### new [XRHandModelFactory](#XRHandModelFactory)( gltfLoader : [GLTFLoader](GLTFLoader.html), onLoad : function )

Constructs a new XR hand model factory.

**gltfLoader**

A glTF loader that is used to load hand models.

Default is `null`.

**onLoad**

A callback that is executed when a hand model has been loaded.

Default is `null`.

## Properties

### .[gltfLoader](#gltfLoader) : [GLTFLoader](GLTFLoader.html)

A glTF loader that is used to load hand models.

Default is `null`.

### .[onLoad](#onLoad) : function

A callback that is executed when a hand model has been loaded.

Default is `null`.

### .[path](#path) : string

The path to the model repository.

Default is `null`.

## Methods

### .[createHandModel](#createHandModel)( controller : [Group](Group.html), profile : 'spheres' | 'boxes' | 'mesh' ) : [XRHandModel](XRHandModel.html)

Creates a controller model for the given WebXR hand controller.

**controller**

The hand controller.

**profile**

The model profile that defines the model type.

**Returns:** The XR hand model.

### .[setPath](#setPath)( path : string ) : [XRHandModelFactory](XRHandModelFactory.html)

Sets the path to the hand model repository.

**path**

The path to set.

**Returns:** A reference to this instance.

## Source

[examples/jsm/webxr/XRHandModelFactory.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/webxr/XRHandModelFactory.js)