Title: NRRDLoader
Source URL: https://threejs.org/docs/pages/NRRDLoader.html

[Loader](Loader.html) →

# NRRDLoader

A loader for the NRRD format.

## Code Example

```js
const loader = new NRRDLoader();
const volume = await loader.loadAsync( 'models/nrrd/I.nrrd' );
```

## Import

NRRDLoader is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { NRRDLoader } from 'three/addons/loaders/NRRDLoader.js';
```

## Constructor

### new [NRRDLoader](#NRRDLoader)( manager : [LoadingManager](LoadingManager.html) )

Constructs a new NRRD loader.

**manager**

The loading manager.

## Methods

### .[load](#load)( url : string, onLoad : function, onProgress : [onProgressCallback](global.html#onProgressCallback), onError : [onErrorCallback](global.html#onErrorCallback) )

Starts loading from the given URL and passes the loaded NRRD asset to the `onLoad()` callback.

**url**

The path/URL of the file to be loaded. This can also be a data URI.

**onLoad**

Executed when the loading process has been finished.

**onProgress**

Executed while the loading is in progress.

**onError**

Executed when errors occur.

**Overrides:** [Loader#load](Loader.html#load)

### .[parse](#parse)( data : ArrayBuffer ) : [Volume](Volume.html)

Parses the given NRRD data and returns the resulting volume data.

**data**

The raw NRRD data as an array buffer.

**Overrides:** [Loader#parse](Loader.html#parse)

**Returns:** The parsed volume.

### .[setSegmentation](#setSegmentation)( segmentation : boolean )

Toggles the segmentation mode.

**segmentation**

Whether to use segmentation mode or not.

## Source

[examples/jsm/loaders/NRRDLoader.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/NRRDLoader.js)