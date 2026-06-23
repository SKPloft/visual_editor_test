Title: KMZLoader
Source URL: https://threejs.org/docs/pages/KMZLoader.html

[Loader](Loader.html) →

# KMZLoader

A loader for the KMZ format.

## Code Example

```js
const loader = new KMZLoader();
const kmz = await loader.loadAsync( './models/kmz/Box.kmz' );
scene.add( kmz.scene );
```

## Import

KMZLoader is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { KMZLoader } from 'three/addons/loaders/KMZLoader.js';
```

## Constructor

### new [KMZLoader](#KMZLoader)( manager : [LoadingManager](LoadingManager.html) )

Constructs a new KMZ loader.

**manager**

The loading manager.

## Methods

### .[load](#load)( url : string, onLoad : function, onProgress : [onProgressCallback](global.html#onProgressCallback), onError : [onErrorCallback](global.html#onErrorCallback) )

Starts loading from the given URL and passes the loaded KMZ asset to the `onLoad()` callback.

**url**

The path/URL of the file to be loaded. This can also be a data URI.

**onLoad**

Executed when the loading process has been finished.

**onProgress**

Executed while the loading is in progress.

**onError**

Executed when errors occur.

**Overrides:** [Loader#load](Loader.html#load)

### .[parse](#parse)( data : ArrayBuffer ) : Object

Parses the given KMZ data and returns an object holding the scene.

**data**

The raw KMZ data as an array buffer.

**Overrides:** [Loader#parse](Loader.html#parse)

**Returns:** The parsed KMZ asset.

## Source

[examples/jsm/loaders/KMZLoader.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/KMZLoader.js)