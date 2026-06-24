Title: TextureSizeNode
Source URL: https://threejs.org/docs/pages/TextureSizeNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) →

# TextureSizeNode

A node that represents the dimensions of a texture. The texture size is retrieved in the shader via built-in shader functions like `textureDimensions()` or `textureSize()`.

## Constructor

### new [TextureSizeNode](#TextureSizeNode)( textureNode : [TextureNode](TextureNode.html), levelNode : [Node](Node.html).<int> )

Constructs a new texture size node.

**textureNode**

A texture node which size should be retrieved.

**levelNode**

A level node which defines the requested mip.

Default is `null`.

## Properties

### .[isTextureSizeNode](#isTextureSizeNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[levelNode](#levelNode) : [Node](Node.html).<int>

A level node which defines the requested mip.

Default is `null`.

### .[textureNode](#textureNode) : [TextureNode](TextureNode.html)

A texture node which size should be retrieved.

## Source

[src/nodes/accessors/TextureSizeNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/accessors/TextureSizeNode.js)