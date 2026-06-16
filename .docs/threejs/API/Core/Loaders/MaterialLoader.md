Title: MaterialLoader
Source URL: https://threejs.org/docs/pages/MaterialLoader.html

[Loader](Loader.html) →

# MaterialLoader

Class for loading materials. The files are internally loaded via [FileLoader](FileLoader.html).

This loader does not support node materials. Use [NodeMaterialLoader](NodeMaterialLoader.html) instead.

## Code Example

```js
const loader = new THREE.MaterialLoader();
const material = await loader.loadAsync( 'material.json' );
```

## Constructor

### new [MaterialLoader](#MaterialLoader)( manager : [LoadingManager](LoadingManager.html) )

Constructs a new material loader.

**manager**

The loading manager.

## Properties

### .[textures](#textures) : Object.<string, [Texture](Texture.html)\>

A dictionary holding textures used by the material.

## Methods

### .[createMaterialFromType](#createMaterialFromType)( type : string ) : [Material](Material.html)

Creates a material for the given type.

**type**

The material type.

**Returns:** The new material.

### .[load](#load)( url : string, onLoad : function, onProgress : [onProgressCallback](global.html#onProgressCallback), onError : [onErrorCallback](global.html#onErrorCallback) )

Starts loading from the given URL and pass the loaded material to the `onLoad()` callback.

**url**

The path/URL of the file to be loaded. This can also be a data URI.

**onLoad**

Executed when the loading process has been finished.

**onProgress**

Executed while the loading is in progress.

**onError**

Executed when errors occur.

**Overrides:** [Loader#load](Loader.html#load)

### .[parse](#parse)( json : Object ) : [Material](Material.html)

Parses the given JSON object and returns a material.

**json**

The serialized material.

**Overrides:** [Loader#parse](Loader.html#parse)

**Returns:** The parsed material.

### .[setTextures](#setTextures)( value : Object ) : [MaterialLoader](MaterialLoader.html)

Textures are not embedded in the material JSON so they have to be injected before the loading process starts.

**value**

A dictionary holding textures for material properties.

**Returns:** A reference to this material loader.

## Static Methods

### .[createMaterialFromType](#.createMaterialFromType)( type : string ) : [Material](Material.html)

Creates a material for the given type.

**type**

The material type.

**Returns:** The new material.

## Source

[src/loaders/MaterialLoader.js](https://github.com/mrdoob/three.js/blob/master/src/loaders/MaterialLoader.js)