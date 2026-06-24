Title: AudioLoader
Source URL: https://threejs.org/docs/pages/AudioLoader.html

[Loader](Loader.html) →

# AudioLoader

Class for loading audio buffers. Audios are internally loaded via [FileLoader](FileLoader.html).

## Code Example

```js
const audioListener = new THREE.AudioListener();
const ambientSound = new THREE.Audio( audioListener );
const loader = new THREE.AudioLoader();
const audioBuffer = await loader.loadAsync( 'audio/ambient_ocean.ogg' );
ambientSound.setBuffer( audioBuffer );
ambientSound.play();
```

## Constructor

### new [AudioLoader](#AudioLoader)( manager : [LoadingManager](LoadingManager.html) )

Constructs a new audio loader.

**manager**

The loading manager.

## Methods

### .[load](#load)( url : string, onLoad : function, onProgress : [onProgressCallback](global.html#onProgressCallback), onError : [onErrorCallback](global.html#onErrorCallback) )

Starts loading from the given URL and passes the loaded audio buffer to the `onLoad()` callback.

**url**

The path/URL of the file to be loaded. This can also be a data URI.

**onLoad**

Executed when the loading process has been finished.

**onProgress**

Executed while the loading is in progress.

**onError**

Executed when errors occur.

**Overrides:** [Loader#load](Loader.html#load)

## Source

[src/loaders/AudioLoader.js](https://github.com/mrdoob/three.js/blob/master/src/loaders/AudioLoader.js)