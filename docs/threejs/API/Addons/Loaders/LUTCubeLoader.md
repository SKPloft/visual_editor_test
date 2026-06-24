Title: LUTCubeLoader
Source URL: https://threejs.org/docs/pages/LUTCubeLoader.html

[Loader](Loader.html) →

# LUTCubeLoader

A loader for the Cube LUT format.

References:

*   [Cube LUT Specification](https://web.archive.org/web/20220220033515/https://wwwimages2.adobe.com/content/dam/acom/en/products/speedgrade/cc/pdfs/cube-lut-specification-1.0.pdf)

## Code Example

```js
const loader = new LUTCubeLoader();
const map = loader.loadAsync( 'luts/Bourbon 64.CUBE' );
```

## Import

LUTCubeLoader is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { LUTCubeLoader } from 'three/addons/loaders/LUTCubeLoader.js';
```

## Constructor

### new [LUTCubeLoader](#LUTCubeLoader)( manager : [LoadingManager](LoadingManager.html) )

Constructs a new Cube LUT loader.

**manager**

The loading manager.

## Classes

[LUTCubeLoader](LUTCubeLoader.html)

## Properties

### .[type](#type) : [UnsignedByteType](global.html#UnsignedByteType) | [FloatType](global.html#FloatType)

The texture type.

Default is `UnsignedByteType`.

## Methods

### .[load](#load)( url : string, onLoad : function, onProgress : [onProgressCallback](global.html#onProgressCallback), onError : [onErrorCallback](global.html#onErrorCallback) )

Starts loading from the given URL and passes the loaded Cube LUT asset to the `onLoad()` callback.

**url**

The path/URL of the file to be loaded. This can also be a data URI.

**onLoad**

Executed when the loading process has been finished.

**onProgress**

Executed while the loading is in progress.

**onError**

Executed when errors occur.

**Overrides:** [Loader#load](Loader.html#load)

### .[parse](#parse)( input : string ) : Object

Parses the given Cube LUT data and returns the resulting 3D data texture.

**input**

The raw Cube LUT data as a string.

**Overrides:** [Loader#parse](Loader.html#parse)

**Returns:** The parsed Cube LUT.

### .[setType](#setType)( type : [UnsignedByteType](global.html#UnsignedByteType) | [FloatType](global.html#FloatType) ) : [LUTCubeLoader](LUTCubeLoader.html)

Sets the texture type.

**type**

The texture type to set.

**Returns:** A reference to this loader.

## Source

[examples/jsm/loaders/LUTCubeLoader.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/LUTCubeLoader.js)