Title: MaterialNode
Source URL: https://threejs.org/docs/pages/MaterialNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) →

# MaterialNode

This class should simplify the node access to material properties. It internal uses reference nodes to make sure changes to material properties are automatically reflected to predefined TSL objects like e.g. `materialColor`.

## Constructor

### new [MaterialNode](#MaterialNode)( scope : string )

Constructs a new material node.

**scope**

The scope defines what kind of material property is referred by the node.

## Properties

### .[scope](#scope) : string

The scope defines what material property is referred by the node.

## Methods

### .[getCache](#getCache)( property : string, type : string ) : [MaterialReferenceNode](MaterialReferenceNode.html)

Returns a cached reference node for the given property and type.

**property**

The name of the material property.

**type**

The uniform type of the property.

**Returns:** A material reference node representing the property access.

### .[getColor](#getColor)( property : string ) : [MaterialReferenceNode](MaterialReferenceNode.html).<color>

Returns a color-typed material reference node for the given property name.

**property**

The name of the material property.

**Returns:** A material reference node representing the property access.

### .[getFloat](#getFloat)( property : string ) : [MaterialReferenceNode](MaterialReferenceNode.html).<float>

Returns a float-typed material reference node for the given property name.

**property**

The name of the material property.

**Returns:** A material reference node representing the property access.

### .[getTexture](#getTexture)( property : string ) : [MaterialReferenceNode](MaterialReferenceNode.html)

Returns a texture-typed material reference node for the given property name.

**property**

The name of the material property.

**Returns:** A material reference node representing the property access.

### .[setup](#setup)( builder : [NodeBuilder](NodeBuilder.html) ) : [Node](Node.html)

The node setup is done depending on the selected scope. Multiple material properties might be grouped into a single node composition if they logically belong together.

**builder**

The current node builder.

**Overrides:** [Node#setup](Node.html#setup)

**Returns:** The node representing the selected scope.

## Source

[src/nodes/accessors/MaterialNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/accessors/MaterialNode.js)