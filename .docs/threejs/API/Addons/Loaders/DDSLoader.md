Title: DDSLoader
Source URL: https://threejs.org/docs/pages/DDSLoader.html

[Loader](Loader.html) → [CompressedTextureLoader](CompressedTextureLoader.html) →

# DDSLoader

A loader for the S3TC texture compression format.

## Code Example

```js
const loader = new DDSLoader();
const map = loader.load( 'textures/compressed/disturb_dxt1_nomip.dds' );
map.colorSpace = THREE.SRGBColorSpace; // only for color textures
```

## Import

DDSLoader is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { DDSLoader } from 'three/addons/loaders/DDSLoader.js';
```

## Constructor

### new [DDSLoader](#DDSLoader)( manager : [LoadingManager](LoadingManager.html) )

Constructs a new DDS loader.

**manager**

The loading manager.

## Methods

### .[parse](#parse)( buffer : ArrayBuffer, loadMipmaps : boolean ) : [CompressedTextureLoader~TexData](CompressedTextureLoader.html#~TexData)

Parses the given S3TC texture data.

**buffer**

The raw texture data.

**loadMipmaps**

Whether to load mipmaps or not.

**Overrides:** [CompressedTextureLoader#parse](CompressedTextureLoader.html#parse)

**Returns:** An object representing the parsed texture data.

## Source

[examples/jsm/loaders/DDSLoader.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/DDSLoader.js)