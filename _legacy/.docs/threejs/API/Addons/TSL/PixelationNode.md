Title: PixelationNode
Source URL: https://threejs.org/docs/pages/PixelationNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [TempNode](TempNode.html) →

# PixelationNode

A inner node definition that implements the actual pixelation TSL code.

## Constructor

### new [PixelationNode](#PixelationNode)( textureNode : [TextureNode](TextureNode.html), depthNode : [TextureNode](TextureNode.html), normalNode : [TextureNode](TextureNode.html), pixelSize : [Node](Node.html).<float>, normalEdgeStrength : [Node](Node.html).<float>, depthEdgeStrength : [Node](Node.html).<float> )

Constructs a new pixelation node.

**textureNode**

The texture node that represents the beauty pass.

**depthNode**

The texture that represents the beauty's depth.

**normalNode**

The texture that represents the beauty's normals.

**pixelSize**

The pixel size.

**normalEdgeStrength**

The normal edge strength.

**depthEdgeStrength**

The depth edge strength.

## Properties

### .[depthEdgeStrength](#depthEdgeStrength) : [Node](Node.html).<float>

The depth edge strength.

### .[depthNode](#depthNode) : [TextureNode](TextureNode.html)

The texture that represents the beauty's depth.

### .[normalEdgeStrength](#normalEdgeStrength) : [Node](Node.html).<float>

The pixel size.

### .[normalNode](#normalNode) : [TextureNode](TextureNode.html)

The texture that represents the beauty's normals.

### .[pixelSize](#pixelSize) : [Node](Node.html).<float>

The pixel size.

### .[textureNode](#textureNode) : [TextureNode](TextureNode.html)

The texture node that represents the beauty pass.

### .[updateType](#updateType) : string

The `updateType` is set to `NodeUpdateType.FRAME` since the node updates its internal uniforms once per frame in `updateBefore()`.

Default is `'frame'`.

**Overrides:** [TempNode#updateType](TempNode.html#updateType)

## Methods

### .[setup](#setup)( builder : [NodeBuilder](NodeBuilder.html) ) : ShaderCallNodeInternal

This method is used to setup the effect's TSL code.

**builder**

The current node builder.

**Overrides:** [TempNode#setup](TempNode.html#setup)

### .[update](#update)( frame : [NodeFrame](NodeFrame.html) )

This method is used to update uniforms once per frame.

**frame**

The current node frame.

**Overrides:** [TempNode#update](TempNode.html#update)

## Source

[examples/jsm/tsl/display/PixelationPassNode.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/tsl/display/PixelationPassNode.js)