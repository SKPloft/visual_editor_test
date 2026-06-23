Title: ViewportDepthTextureNode
Source URL: https://threejs.org/docs/pages/ViewportDepthTextureNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [InputNode](InputNode.html) → [UniformNode](UniformNode.html) → [TextureNode](TextureNode.html) → [ViewportTextureNode](ViewportTextureNode.html) →

# ViewportDepthTextureNode

Represents the depth of the current viewport as a texture. This module can be used in combination with viewport texture to achieve effects that require depth evaluation.

## Constructor

### new [ViewportDepthTextureNode](#ViewportDepthTextureNode)( uvNode : [Node](Node.html), levelNode : [Node](Node.html), depthTexture : [DepthTexture](DepthTexture.html) )

Constructs a new viewport depth texture node.

**uvNode**

The uv node.

Default is `screenUV`.

**levelNode**

The level node.

Default is `null`.

**depthTexture**

A depth texture. If not provided, uses a shared depth texture.

Default is `null`.

## Source

[src/nodes/display/ViewportDepthTextureNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/display/ViewportDepthTextureNode.js)