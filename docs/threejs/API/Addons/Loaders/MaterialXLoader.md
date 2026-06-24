Title: MaterialXLoader
Source URL: https://threejs.org/docs/pages/MaterialXLoader.html

[Loader](Loader.html) →

# MaterialXLoader

A loader for the MaterialX format.

The node materials loaded with this loader can only be used with [WebGPURenderer](WebGPURenderer.html).

## Code Example

```js
const loader = new MaterialXLoader().setPath( SAMPLE_PATH );
const materials = await loader.loadAsync( 'standard_surface_brass_tiled.mtlx' );
```

## Import

MaterialXLoader is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { MaterialXLoader } from 'three/addons/loaders/MaterialXLoader.js';
```

## Constructor

### new [MaterialXLoader](#MaterialXLoader)( manager : [LoadingManager](LoadingManager.html) )

Constructs a new MaterialX loader.

**manager**

The loading manager.

## Methods

### .[load](#load)( url : string, onLoad : function, onProgress : [onProgressCallback](global.html#onProgressCallback), onError : [onErrorCallback](global.html#onErrorCallback) ) : [MaterialXLoader](MaterialXLoader.html)

Starts loading from the given URL and passes the loaded MaterialX asset to the `onLoad()` callback.

**url**

The path/URL of the file to be loaded. This can also be a data URI.

**onLoad**

Executed when the loading process has been finished.

**onProgress**

Executed while the loading is in progress.

**onError**

Executed when errors occur.

**Overrides:** [Loader#load](Loader.html#load)

**Returns:** A reference to this loader.

### .[parse](#parse)( text : string ) : Object.<string, [NodeMaterial](NodeMaterial.html)\>

Parses the given MaterialX data and returns the resulting materials.

Supported standard\_surface inputs:

*   base, base\_color: Base color/albedo
*   opacity: Alpha/transparency
*   specular\_roughness: Surface roughness
*   metalness: Metallic property
*   specular: Specular reflection intensity
*   specular\_color: Specular reflection color
*   ior: Index of refraction
*   specular\_anisotropy, specular\_rotation: Anisotropic reflection
*   transmission, transmission\_color: Transmission properties
*   thin\_film\_thickness, thin\_film\_ior: Thin film interference
*   sheen, sheen\_color, sheen\_roughness: Sheen properties
*   normal: Normal map
*   coat, coat\_roughness, coat\_color: Clearcoat properties
*   emission, emissionColor: Emission properties

**text**

The raw MaterialX data as a string.

**Overrides:** [Loader#parse](Loader.html#parse)

**Returns:** A dictionary holding the parse node materials.

## Source

[examples/jsm/loaders/MaterialXLoader.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/MaterialXLoader.js)