Title: PassTextureNode
Source URL: https://threejs.org/docs/pages/PassTextureNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [InputNode](InputNode.html) → [UniformNode](UniformNode.html) → [TextureNode](TextureNode.html) →

# PassTextureNode

Represents the texture of a pass node.

## Constructor

### new [PassTextureNode](#PassTextureNode)( passNode : [PassNode](PassNode.html), texture : [Texture](Texture.html) )

Constructs a new pass texture node.

**passNode**

The pass node.

**texture**

The output texture.

## Properties

### .[isPassTextureNode](#isPassTextureNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[passNode](#passNode) : [PassNode](PassNode.html)

A reference to the pass node.

## Source

[src/nodes/display/PassNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/display/PassNode.js)