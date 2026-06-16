Title: PVRLoader
Source URL: https://threejs.org/docs/pages/PVRLoader.html

[Loader](Loader.html) → [CompressedTextureLoader](CompressedTextureLoader.html) →

# PVRLoader

A loader for the PVRTC texture compression format.

## Code Example

```js
const loader = new PVRLoader();
const map = loader.load( 'textures/compressed/disturb_4bpp_rgb.pvr' );
map.colorSpace = THREE.SRGBColorSpace; // only for color textures
```

## Import

PVRLoader is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { PVRLoader } from 'three/addons/loaders/PVRLoader.js';
```

## Constructor

### new [PVRLoader](#PVRLoader)( manager : [LoadingManager](LoadingManager.html) )

Constructs a new PVR loader.

**manager**

The loading manager.

## Methods

### .[parse](#parse)( buffer : ArrayBuffer, loadMipmaps : boolean ) : [CompressedTextureLoader~TexData](CompressedTextureLoader.html#~TexData)

Parses the given PVRTC texture data.

**buffer**

The raw texture data.

**loadMipmaps**

Whether to load mipmaps or not. This option is not yet supported by the loader.

**Overrides:** [CompressedTextureLoader#parse](CompressedTextureLoader.html#parse)

**Returns:** An object representing the parsed texture data.

## Source

[examples/jsm/loaders/PVRLoader.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/PVRLoader.js)