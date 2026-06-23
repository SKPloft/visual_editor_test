Title: MD2Loader
Source URL: https://threejs.org/docs/pages/MD2Loader.html

[Loader](Loader.html) →

# MD2Loader

A loader for the MD2 format.

The loader represents the animations of the MD2 asset as an array of animation clips and stores them in the `animations` property of the geometry.

## Code Example

```js
const loader = new MD2Loader();
const geometry = await loader.loadAsync( './models/md2/ogro/ogro.md2' );
const animations = geometry.animations;
```

## Import

MD2Loader is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { MD2Loader } from 'three/addons/loaders/MD2Loader.js';
```

## Constructor

### new [MD2Loader](#MD2Loader)( manager : [LoadingManager](LoadingManager.html) )

Constructs a new MD2 loader.

**manager**

The loading manager.

## Methods

### .[load](#load)( url : string, onLoad : function, onProgress : [onProgressCallback](global.html#onProgressCallback), onError : [onErrorCallback](global.html#onErrorCallback) )

Starts loading from the given URL and passes the loaded MD2 asset to the `onLoad()` callback.

**url**

The path/URL of the file to be loaded. This can also be a data URI.

**onLoad**

Executed when the loading process has been finished.

**onProgress**

Executed while the loading is in progress.

**onError**

Executed when errors occur.

**Overrides:** [Loader#load](Loader.html#load)

### .[parse](#parse)( buffer : ArrayBuffer ) : [BufferGeometry](BufferGeometry.html)

Parses the given MD2 data and returns a geometry.

**buffer**

The raw MD2 data as an array buffer.

**Overrides:** [Loader#parse](Loader.html#parse)

**Returns:** The parsed geometry data.

## Source

[examples/jsm/loaders/MD2Loader.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/MD2Loader.js)