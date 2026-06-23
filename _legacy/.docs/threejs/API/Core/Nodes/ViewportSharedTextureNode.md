Title: ViewportSharedTextureNode
Source URL: https://threejs.org/docs/pages/ViewportSharedTextureNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [InputNode](InputNode.html) → [UniformNode](UniformNode.html) → [TextureNode](TextureNode.html) → [ViewportTextureNode](ViewportTextureNode.html) →

# ViewportSharedTextureNode

`ViewportTextureNode` creates an internal texture for each node instance. This module shares a texture across all instances of `ViewportSharedTextureNode`. It should be the first choice when using data of the default/screen framebuffer for performance reasons.

## Constructor

### new [ViewportSharedTextureNode](#ViewportSharedTextureNode)( uvNode : [Node](Node.html), levelNode : [Node](Node.html) )

Constructs a new viewport shared texture node.

**uvNode**

The uv node.

Default is `screenUV`.

**levelNode**

The level node.

Default is `null`.

## Methods

### .[getTextureForReference](#getTextureForReference)() : [FramebufferTexture](FramebufferTexture.html)

Overwritten so the method always returns the unique shared framebuffer texture.

**Overrides:** [ViewportTextureNode#getTextureForReference](ViewportTextureNode.html#getTextureForReference)

**Returns:** The shared framebuffer texture.

## Source

[src/nodes/display/ViewportSharedTextureNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/display/ViewportSharedTextureNode.js)