Title: BVHLoader
Source URL: https://threejs.org/docs/pages/BVHLoader.html

[Loader](Loader.html) →

# BVHLoader

A loader for the BVH format.

Imports BVH files and outputs a single [Skeleton](Skeleton.html) and [AnimationClip](AnimationClip.html). The loader only supports BVH files containing a single root right now.

## Code Example

```js
const loader = new BVHLoader();
const result = await loader.loadAsync( 'models/bvh/pirouette.bvh' );
// visualize skeleton
const skeletonHelper = new THREE.SkeletonHelper( result.skeleton.bones[ 0 ] );
scene.add( result.skeleton.bones[ 0 ] );
scene.add( skeletonHelper );
// play animation clip
mixer = new THREE.AnimationMixer( result.skeleton.bones[ 0 ] );
mixer.clipAction( result.clip ).play();
```

## Import

BVHLoader is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { BVHLoader } from 'three/addons/loaders/BVHLoader.js';
```

## Constructor

### new [BVHLoader](#BVHLoader)( manager : [LoadingManager](LoadingManager.html) )

Constructs a new BVH loader.

**manager**

The loading manager.

## Properties

### .[animateBonePositions](#animateBonePositions) : boolean

Whether to animate bone positions or not.

Default is `true`.

### .[animateBoneRotations](#animateBoneRotations) : boolean

Whether to animate bone rotations or not.

Default is `true`.

## Methods

### .[load](#load)( url : string, onLoad : function, onProgress : [onProgressCallback](global.html#onProgressCallback), onError : [onErrorCallback](global.html#onErrorCallback) )

Starts loading from the given URL and passes the loaded BVH asset to the `onLoad()` callback.

**url**

The path/URL of the file to be loaded. This can also be a data URI.

**onLoad**

Executed when the loading process has been finished.

**onProgress**

Executed while the loading is in progress.

**onError**

Executed when errors occur.

**Overrides:** [Loader#load](Loader.html#load)

### .[parse](#parse)( text : string ) : Object

Parses the given BVH data and returns the resulting data.

**text**

The raw BVH data as a string.

**Overrides:** [Loader#parse](Loader.html#parse)

**Returns:** An object representing the parsed asset.

## Source

[examples/jsm/loaders/BVHLoader.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/BVHLoader.js)