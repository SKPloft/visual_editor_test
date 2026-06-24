Title: FontLoader
Source URL: https://threejs.org/docs/pages/FontLoader.html

[Loader](Loader.html) →

# FontLoader

A loader for loading fonts.

You can convert fonts online using [facetype.js](https://gero3.github.io/facetype.js/).

## Code Example

```js
const loader = new FontLoader();
const font = await loader.loadAsync( 'fonts/helvetiker_regular.typeface.json' );
```

## Import

FontLoader is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
```

## Constructor

### new [FontLoader](#FontLoader)( manager : [LoadingManager](LoadingManager.html) )

Constructs a new font loader.

**manager**

The loading manager.

## Methods

### .[load](#load)( url : string, onLoad : function, onProgress : [onProgressCallback](global.html#onProgressCallback), onError : [onErrorCallback](global.html#onErrorCallback) )

Starts loading from the given URL and passes the loaded font to the `onLoad()` callback.

**url**

The path/URL of the file to be loaded. This can also be a data URI.

**onLoad**

Executed when the loading process has been finished.

**onProgress**

Executed while the loading is in progress.

**onError**

Executed when errors occur.

**Overrides:** [Loader#load](Loader.html#load)

### .[parse](#parse)( json : Object ) : [Font](Font.html)

Parses the given font data and returns the resulting font.

**json**

The raw font data as a JSON object.

**Overrides:** [Loader#parse](Loader.html#parse)

**Returns:** The font.

## Source

[examples/jsm/loaders/FontLoader.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/FontLoader.js)