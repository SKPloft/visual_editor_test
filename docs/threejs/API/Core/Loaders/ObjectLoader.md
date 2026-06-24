Title: ObjectLoader
Source URL: https://threejs.org/docs/pages/ObjectLoader.html

[Loader](Loader.html) →

# ObjectLoader

A loader for loading a JSON resource in the [JSON Object/Scene format](https://github.com/mrdoob/three.js/wiki/JSON-Object-Scene-format-4). The files are internally loaded via [FileLoader](FileLoader.html).

## Code Example

```js
const loader = new THREE.ObjectLoader();
const obj = await loader.loadAsync( 'models/json/example.json' );
scene.add( obj );
// Alternatively, to parse a previously loaded JSON structure
const object = await loader.parseAsync( a_json_object );
scene.add( object );
```

## Constructor

### new [ObjectLoader](#ObjectLoader)( manager : [LoadingManager](LoadingManager.html) )

Constructs a new object loader.

**manager**

The loading manager.

## Methods

### .[load](#load)( url : string, onLoad : function, onProgress : [onProgressCallback](global.html#onProgressCallback), onError : [onErrorCallback](global.html#onErrorCallback) )

Starts loading from the given URL and pass the loaded 3D object to the `onLoad()` callback.

**url**

The path/URL of the file to be loaded. This can also be a data URI.

**onLoad**

Executed when the loading process has been finished.

**onProgress**

Executed while the loading is in progress.

**onError**

Executed when errors occur.

**Overrides:** [Loader#load](Loader.html#load)

### .[loadAsync](#loadAsync)( url : string, onProgress : [onProgressCallback](global.html#onProgressCallback) ) : Promise.<[Object3D](Object3D.html)\> (async)

Async version of [ObjectLoader#load](ObjectLoader.html#load).

**url**

The path/URL of the file to be loaded. This can also be a data URI.

**onProgress**

Executed while the loading is in progress.

**Overrides:** [Loader#loadAsync](Loader.html#loadAsync)

**Returns:** A Promise that resolves with the loaded 3D object.

### .[parse](#parse)( json : Object, onLoad : onLoad ) : [Object3D](Object3D.html)

Parses the given JSON. This is used internally by [ObjectLoader#load](ObjectLoader.html#load) but can also be used directly to parse a previously loaded JSON structure.

**json**

The serialized 3D object.

**onLoad**

Executed when all resources (e.g. textures) have been fully loaded.

**Overrides:** [Loader#parse](Loader.html#parse)

**Returns:** The parsed 3D object.

### .[parseAsync](#parseAsync)( json : Object ) : Promise.<[Object3D](Object3D.html)\> (async)

Async version of [ObjectLoader#parse](ObjectLoader.html#parse).

**json**

The serialized 3D object.

**Returns:** A Promise that resolves with the parsed 3D object.

## Static Methods

### .[registerGeometry](#.registerGeometry)( type : string, geometryClass : BufferGeometry.constructor )

Registers the given geometry at the internal geometry library.

**type**

The geometry type.

**geometryClass**

The geometry class.

## Source

[src/loaders/ObjectLoader.js](https://github.com/mrdoob/three.js/blob/master/src/loaders/ObjectLoader.js)