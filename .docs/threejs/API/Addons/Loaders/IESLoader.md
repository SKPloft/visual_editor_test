Title: IESLoader
Source URL: https://threejs.org/docs/pages/IESLoader.html

[Loader](Loader.html) →

# IESLoader

A loader for the IES format.

The loaded texture should be assigned to [IESSpotLight#map](IESSpotLight.html#map).

## Code Example

```js
const loader = new IESLoader();
const texture = await loader.loadAsync( 'ies/007cfb11e343e2f42e3b476be4ab684e.ies' );
const spotLight = new THREE.IESSpotLight( 0xff0000, 500 );
spotLight.iesMap = texture;
```

## Import

IESLoader is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { IESLoader } from 'three/addons/loaders/IESLoader.js';
```

## Constructor

### new [IESLoader](#IESLoader)( manager : [LoadingManager](LoadingManager.html) )

Constructs a new IES loader.

**manager**

The loading manager.

## Properties

### .[type](#type) : [HalfFloatType](global.html#HalfFloatType) | [FloatType](global.html#FloatType)

The texture type.

Default is `HalfFloatType`.

## Methods

### .[load](#load)( url : string, onLoad : function, onProgress : [onProgressCallback](global.html#onProgressCallback), onError : [onErrorCallback](global.html#onErrorCallback) )

Starts loading from the given URL and passes the loaded IES texture to the `onLoad()` callback.

**url**

The path/URL of the file to be loaded. This can also be a data URI.

**onLoad**

Executed when the loading process has been finished.

**onProgress**

Executed while the loading is in progress.

**onError**

Executed when errors occur.

**Overrides:** [Loader#load](Loader.html#load)

### .[parse](#parse)( text : string ) : [DataTexture](DataTexture.html)

Parses the given IES data.

**text**

The raw IES data.

**Overrides:** [Loader#parse](Loader.html#parse)

**Returns:** THE IES data as a texture.

## Source

[examples/jsm/loaders/IESLoader.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/IESLoader.js)