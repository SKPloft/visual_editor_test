Title: BufferGeometryLoader
Source URL: https://threejs.org/docs/pages/BufferGeometryLoader.html

[Loader](Loader.html) →

# BufferGeometryLoader

Class for loading geometries. The files are internally loaded via [FileLoader](FileLoader.html).

## Code Example

```js
const loader = new THREE.BufferGeometryLoader();
const geometry = await loader.loadAsync( 'models/json/pressure.json' );
const material = new THREE.MeshBasicMaterial( { color: 0xF5F5F5 } );
const object = new THREE.Mesh( geometry, material );
scene.add( object );
```

## Constructor

### new [BufferGeometryLoader](#BufferGeometryLoader)( manager : [LoadingManager](LoadingManager.html) )

Constructs a new geometry loader.

**manager**

The loading manager.

## Methods

### .[load](#load)( url : string, onLoad : function, onProgress : [onProgressCallback](global.html#onProgressCallback), onError : [onErrorCallback](global.html#onErrorCallback) )

Starts loading from the given URL and pass the loaded geometry to the `onLoad()` callback.

**url**

The path/URL of the file to be loaded. This can also be a data URI.

**onLoad**

Executed when the loading process has been finished.

**onProgress**

Executed while the loading is in progress.

**onError**

Executed when errors occur.

**Overrides:** [Loader#load](Loader.html#load)

### .[parse](#parse)( json : Object ) : [BufferGeometry](BufferGeometry.html)

Parses the given JSON object and returns a geometry.

**json**

The serialized geometry.

**Overrides:** [Loader#parse](Loader.html#parse)

**Returns:** The parsed geometry.

## Source

[src/loaders/BufferGeometryLoader.js](https://github.com/mrdoob/three.js/blob/master/src/loaders/BufferGeometryLoader.js)