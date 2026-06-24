Title: PassMultipleTextureNode
Source URL: https://threejs.org/docs/pages/PassMultipleTextureNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [InputNode](InputNode.html) → [UniformNode](UniformNode.html) → [TextureNode](TextureNode.html) → [PassTextureNode](PassTextureNode.html) →

# PassMultipleTextureNode

An extension of `PassTextureNode` which allows to manage more than one internal texture. Relevant for the `getPreviousTexture()` related API.

## Constructor

### new [PassMultipleTextureNode](#PassMultipleTextureNode)( passNode : [PassNode](PassNode.html), textureName : string, previousTexture : boolean )

Constructs a new pass texture node.

**passNode**

The pass node.

**textureName**

The output texture name.

**previousTexture**

Whether previous frame data should be used or not.

Default is `false`.

## Properties

### .[isPassMultipleTextureNode](#isPassMultipleTextureNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[previousTexture](#previousTexture) : boolean

Whether previous frame data should be used or not.

### .[textureName](#textureName) : string

The output texture name.

## Methods

### .[updateTexture](#updateTexture)()

Updates the texture reference of this node.

## Source

[src/nodes/display/PassNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/display/PassNode.js)