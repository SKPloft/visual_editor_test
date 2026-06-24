Title: EXRLoader
Source URL: https://threejs.org/docs/pages/EXRLoader.html

[Loader](Loader.html) → [DataTextureLoader](DataTextureLoader.html) →

# EXRLoader

A loader for the OpenEXR texture format.

`EXRLoader` currently supports uncompressed, ZIP(S), RLE, PIZ, B44/A and DWA/B compression. Supports reading as UnsignedByte, HalfFloat and Float type data texture.

## Code Example

```js
const loader = new EXRLoader();
const texture = await loader.loadAsync( 'textures/memorial.exr' );
```

## Import

EXRLoader is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js';
```

## Constructor

### new [EXRLoader](#EXRLoader)( manager : [LoadingManager](LoadingManager.html) )

Constructs a new EXR loader.

**manager**

The loading manager.

## Properties

### .[outputFormat](#outputFormat) : [RGBAFormat](global.html#RGBAFormat) | [RGFormat](global.html#RGFormat) | [RedFormat](global.html#RedFormat)

Texture output format.

Default is `RGBAFormat`.

### .[part](#part) : number

For multi-part EXR files, the index of the part to load.

Default is `0`.

### .[type](#type) : [HalfFloatType](global.html#HalfFloatType) | [FloatType](global.html#FloatType)

The texture type.

Default is `HalfFloatType`.

## Methods

### .[parse](#parse)( buffer : ArrayBuffer ) : [DataTextureLoader~TexData](DataTextureLoader.html#~TexData)

Parses the given EXR texture data.

**buffer**

The raw texture data.

**Overrides:** [DataTextureLoader#parse](DataTextureLoader.html#parse)

**Returns:** An object representing the parsed texture data.

### .[setDataType](#setDataType)( value : [HalfFloatType](global.html#HalfFloatType) | [FloatType](global.html#FloatType) ) : [EXRLoader](EXRLoader.html)

Sets the texture type.

**value**

The texture type to set.

**Returns:** A reference to this loader.

### .[setOutputFormat](#setOutputFormat)( value : [RGBAFormat](global.html#RGBAFormat) | [RGFormat](global.html#RGFormat) | [RedFormat](global.html#RedFormat) ) : [EXRLoader](EXRLoader.html)

Sets texture output format. Defaults to `RGBAFormat`.

**value**

Texture output format.

**Returns:** A reference to this loader.

### .[setPart](#setPart)( value : number ) : [EXRLoader](EXRLoader.html)

For multi-part EXR files, sets which part to load.

**value**

The part index to load.

**Returns:** A reference to this loader.

## Source

[examples/jsm/loaders/EXRLoader.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/EXRLoader.js)