Title: NodeMaterialLoader
Source URL: https://threejs.org/docs/pages/NodeMaterialLoader.html

[Loader](Loader.html) → [MaterialLoader](MaterialLoader.html) →

# NodeMaterialLoader

A special type of material loader for loading node materials.

## Constructor

### new [NodeMaterialLoader](#NodeMaterialLoader)( manager : [LoadingManager](LoadingManager.html) )

Constructs a new node material loader.

**manager**

A reference to a loading manager.

## Properties

### .[nodeMaterials](#nodeMaterials) : Object.<string, NodeMaterial.constructor>

Represents a dictionary of node material types.

### .[nodes](#nodes) : Object.<string, Node.constructor>

Represents a dictionary of node types.

## Methods

### .[createMaterialFromType](#createMaterialFromType)( type : string ) : [Node](Node.html)

Creates a node material from the given type.

**type**

The node material type.

**Overrides:** [MaterialLoader#createMaterialFromType](MaterialLoader.html#createMaterialFromType)

**Returns:** The created node material instance.

### .[parse](#parse)( json : Object ) : [NodeMaterial](NodeMaterial.html)

Parses the node material from the given JSON.

**json**

The JSON definition

**Overrides:** [MaterialLoader#parse](MaterialLoader.html#parse)

**Returns:** . The parsed material.

### .[setNodeMaterials](#setNodeMaterials)( value : Object.<string, NodeMaterial.constructor> ) : [NodeLoader](NodeLoader.html)

Defines the dictionary of node material types.

**value**

The node material library defined as `<classname,class>`.

**Returns:** A reference to this loader.

### .[setNodes](#setNodes)( value : Object.<string, Node.constructor> ) : [NodeLoader](NodeLoader.html)

Defines the dictionary of node types.

**value**

The node library defined as `<classname,class>`.

**Returns:** A reference to this loader.

## Source

[src/loaders/nodes/NodeMaterialLoader.js](https://github.com/mrdoob/three.js/blob/master/src/loaders/nodes/NodeMaterialLoader.js)