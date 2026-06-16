Title: HDRCubeTextureLoader
Source URL: https://threejs.org/docs/pages/HDRCubeTextureLoader.html

[Loader](Loader.html) →

# HDRCubeTextureLoader

A loader for loading HDR cube textures.

## Code Example

```js
const loader = new HDRCubeTextureLoader();
loader.setPath( 'textures/cube/pisaHDR/' );
const cubeTexture = await loader.loadAsync( [ 'px.hdr', 'nx.hdr', 'py.hdr', 'ny.hdr', 'pz.hdr', 'nz.hdr' ] );
scene.background = cubeTexture;
scene.environment = cubeTexture;
```

## Import

HDRCubeTextureLoader is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { HDRCubeTextureLoader } from 'three/addons/loaders/HDRCubeTextureLoader.js';
```

## Constructor

### new [HDRCubeTextureLoader](#HDRCubeTextureLoader)( manager : [LoadingManager](LoadingManager.html) )

Constructs a new HDR cube texture loader.

**manager**

The loading manager.

## Properties

### .[hdrLoader](#hdrLoader) : [HDRLoader](HDRLoader.html)

The internal HDR loader that loads the individual textures for each cube face.

### .[type](#type) : [HalfFloatType](global.html#HalfFloatType) | [FloatType](global.html#FloatType)

The texture type.

Default is `HalfFloatType`.

## Methods

### .[load](#load)( urls : Array.<string>, onLoad : function, onProgress : [onProgressCallback](global.html#onProgressCallback), onError : [onErrorCallback](global.html#onErrorCallback) ) : [CubeTexture](CubeTexture.html)

Starts loading from the given URLs and passes the loaded HDR cube texture to the `onLoad()` callback.

**urls**

The paths/URLs of the files to be loaded. This can also be a data URIs.

**onLoad**

Executed when the loading process has been finished.

**onProgress**

Executed while the loading is in progress.

**onError**

Executed when errors occur.

**Overrides:** [Loader#load](Loader.html#load)

**Returns:** The HDR cube texture.

### .[setDataType](#setDataType)( value : [HalfFloatType](global.html#HalfFloatType) | [FloatType](global.html#FloatType) ) : [HDRCubeTextureLoader](HDRCubeTextureLoader.html)

Sets the texture type.

**value**

The texture type to set.

**Returns:** A reference to this loader.

## Source

[examples/jsm/loaders/HDRCubeTextureLoader.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/HDRCubeTextureLoader.js)