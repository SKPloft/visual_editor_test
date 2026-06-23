Title: NodeLoader
Source URL: https://threejs.org/docs/pages/NodeLoader.html

[Loader](Loader.html) →

# NodeLoader

A loader for loading node objects in the three.js JSON Object/Scene format.

## Constructor

### new [NodeLoader](#NodeLoader)( manager : [LoadingManager](LoadingManager.html) )

Constructs a new node loader.

**manager**

A reference to a loading manager.

## Properties

### .[nodes](#nodes) : Object.<string, Node.constructor>

Represents a dictionary of node types.

### .[textures](#textures) : Object.<string, [Texture](Texture.html)\>

Represents a dictionary of textures.

## Methods

### .[createNodeFromType](#createNodeFromType)( type : string ) : [Node](Node.html)

Creates a node object from the given type.

**type**

The node type.

**Returns:** The created node instance.

### .[load](#load)( url : string, onLoad : function, onProgress : function, onError : function )

Loads the node definitions from the given URL.

**url**

The path/URL of the file to be loaded.

**onLoad**

Will be called when load completes.

**onProgress**

Will be called while load progresses.

**onError**

Will be called when errors are thrown during the loading process.

**Overrides:** [Loader#load](Loader.html#load)

### .[parse](#parse)( json : Object ) : [Node](Node.html)

Parses the node from the given JSON.

**json**

The JSON definition

**type**

The node type.

**uuid**

The node UUID.

**nodes**

The node dependencies.

**meta**

The meta data.

**Overrides:** [Loader#parse](Loader.html#parse)

**Returns:** The parsed node.

### .[parseNodes](#parseNodes)( json : Array.<Object> ) : Object.<string, [Node](Node.html)\>

Parse the node dependencies for the loaded node.

**json**

The JSON definition

**Returns:** A dictionary with node dependencies.

### .[setNodes](#setNodes)( value : Object.<string, Node.constructor> ) : [NodeLoader](NodeLoader.html)

Defines the dictionary of node types.

**value**

The node library defined as `<classname,class>`.

**Returns:** A reference to this loader.

### .[setTextures](#setTextures)( value : Object.<string, [Texture](Texture.html)\> ) : [NodeLoader](NodeLoader.html)

Defines the dictionary of textures.

**value**

The texture library defines as `<uuid,texture>`.

**Returns:** A reference to this loader.

## Source

[src/loaders/nodes/NodeLoader.js](https://github.com/mrdoob/three.js/blob/master/src/loaders/nodes/NodeLoader.js)