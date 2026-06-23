Title: NodeObjectLoader
Source URL: https://threejs.org/docs/pages/NodeObjectLoader.html

[Loader](Loader.html) → [ObjectLoader](ObjectLoader.html) →

# NodeObjectLoader

A special type of object loader for loading 3D objects using node materials.

## Constructor

### new [NodeObjectLoader](#NodeObjectLoader)( manager : [LoadingManager](LoadingManager.html) )

Constructs a new node object loader.

**manager**

A reference to a loading manager.

## Properties

### .[nodeMaterials](#nodeMaterials) : Object.<string, NodeMaterial.constructor>

Represents a dictionary of node material types.

### .[nodes](#nodes) : Object.<string, Node.constructor>

Represents a dictionary of node types.

## Methods

### .[parse](#parse)( json : Object, onLoad : function ) : [Object3D](Object3D.html)

Parses the node objects from the given JSON.

**json**

The JSON definition

**onLoad**

The onLoad callback function.

**Overrides:** [ObjectLoader#parse](ObjectLoader.html#parse)

**Returns:** . The parsed 3D object.

### .[parseAsync](#parseAsync)( json : Object ) : Promise.<[Object3D](Object3D.html)\> (async)

Async version of [NodeObjectLoader#parse](NodeObjectLoader.html#parse).

**json**

The JSON definition

**Overrides:** [ObjectLoader#parseAsync](ObjectLoader.html#parseAsync)

**Returns:** A Promise that resolves with the parsed 3D object.

### .[parseMaterials](#parseMaterials)( json : Object, textures : Object.<string, [Texture](Texture.html)\> ) : Object.<string, [NodeMaterial](NodeMaterial.html)\>

Parses the node objects from the given JSON and textures.

**json**

The JSON definition

**textures**

The texture library.

**Returns:** . The parsed materials.

### .[parseNodes](#parseNodes)( json : Array.<Object>, textures : Object.<string, [Texture](Texture.html)\> ) : Object.<string, [Node](Node.html)\>

Parses the node objects from the given JSON and textures.

**json**

The JSON definition

**textures**

The texture library.

**Returns:** . The parsed nodes.

### .[setNodeMaterials](#setNodeMaterials)( value : Object.<string, NodeMaterial.constructor> ) : [NodeObjectLoader](NodeObjectLoader.html)

Defines the dictionary of node material types.

**value**

The node material library defined as `<classname,class>`.

**Returns:** A reference to this loader.

### .[setNodes](#setNodes)( value : Object.<string, Node.constructor> ) : [NodeObjectLoader](NodeObjectLoader.html)

Defines the dictionary of node types.

**value**

The node library defined as `<classname,class>`.

**Returns:** A reference to this loader.

## Source

[src/loaders/nodes/NodeObjectLoader.js](https://github.com/mrdoob/three.js/blob/master/src/loaders/nodes/NodeObjectLoader.js)