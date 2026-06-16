Title: KTX2Loader
Source URL: https://threejs.org/docs/pages/KTX2Loader.html

[Loader](Loader.html) →

# KTX2Loader

A loader for KTX 2.0 GPU Texture containers.

KTX 2.0 is a container format for various GPU texture formats. The loader supports Basis Universal GPU textures, which can be quickly transcoded to a wide variety of GPU texture compression formats. While KTX 2.0 also allows other hardware-specific formats, this loader does not yet parse them.

This loader parses the KTX 2.0 container and transcodes to a supported GPU compressed texture format. The required WASM transcoder and JS wrapper are available from the `examples/jsm/libs/basis` directory.

This loader relies on Web Assembly which is not supported in older browsers.

References:

*   [KTX specification](http://github.khronos.org/KTX-Specification/)
*   [DFD](https://www.khronos.org/registry/DataFormat/specs/1.3/dataformat.1.3.html#basicdescriptor)
*   [BasisU HDR](https://github.com/BinomialLLC/basis_universal/wiki/UASTC-HDR-Texture-Specification-v1.0)

## Code Example

```js
const loader = new KTX2Loader();
loader.setTranscoderPath( 'examples/jsm/libs/basis/' );
loader.detectSupport( renderer );
const texture = loader.loadAsync( 'diffuse.ktx2' );
```

## Import

KTX2Loader is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';
```

## Constructor

### new [KTX2Loader](#KTX2Loader)( manager : [LoadingManager](LoadingManager.html) )

Constructs a new KTX2 loader.

**manager**

The loading manager.

## Methods

### .[detectSupport](#detectSupport)( renderer : [WebGPURenderer](WebGPURenderer.html) | [WebGLRenderer](WebGLRenderer.html) ) : [KTX2Loader](KTX2Loader.html)

Detects hardware support for available compressed texture formats, to determine the output format for the transcoder. Must be called before loading a texture.

**renderer**

The renderer.

**Returns:** A reference to this loader.

### .[detectSupportAsync](#detectSupportAsync)( renderer : [WebGPURenderer](WebGPURenderer.html) ) : Promise (async)

Async version of [KTX2Loader#detectSupport](KTX2Loader.html#detectSupport).

**renderer**

The renderer.

**Deprecated:** Yes

**Returns:** A Promise that resolves when the support has been detected.

### .[dispose](#dispose)()

Frees internal resources. This method should be called when the loader is no longer required.

### .[load](#load)( url : string, onLoad : function, onProgress : [onProgressCallback](global.html#onProgressCallback), onError : [onErrorCallback](global.html#onErrorCallback) )

Starts loading from the given URL and passes the loaded KTX2 texture to the `onLoad()` callback.

**url**

The path/URL of the file to be loaded. This can also be a data URI.

**onLoad**

Executed when the loading process has been finished.

**onProgress**

Executed while the loading is in progress.

**onError**

Executed when errors occur.

**Overrides:** [Loader#load](Loader.html#load)

### .[parse](#parse)( buffer : ArrayBuffer, onLoad : function, onError : [onErrorCallback](global.html#onErrorCallback) ) : Promise

Parses the given KTX2 data.

**buffer**

The raw KTX2 data as an array buffer.

**onLoad**

Executed when the loading/parsing process has been finished.

**onError**

Executed when errors occur.

**Overrides:** [Loader#parse](Loader.html#parse)

**Returns:** A Promise that resolves when the parsing has been finished.

### .[setTranscoderPath](#setTranscoderPath)( path : string ) : [KTX2Loader](KTX2Loader.html)

Sets the transcoder path.

The WASM transcoder and JS wrapper are available from the `examples/jsm/libs/basis` directory.

**path**

The transcoder path to set.

**Returns:** A reference to this loader.

### .[setWorkerLimit](#setWorkerLimit)( workerLimit : number ) : [KTX2Loader](KTX2Loader.html)

Sets the maximum number of Web Workers to be allocated by this instance.

**workerLimit**

The worker limit.

**Returns:** A reference to this loader.

## Source

[examples/jsm/loaders/KTX2Loader.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/KTX2Loader.js)