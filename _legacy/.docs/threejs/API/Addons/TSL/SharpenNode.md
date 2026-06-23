Title: SharpenNode
Source URL: https://threejs.org/docs/pages/SharpenNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [TempNode](TempNode.html) →

# SharpenNode

Post processing node for contrast-adaptive sharpening (RCAS).

Reference: [https://gpuopen.com/fidelityfx-superresolution/](https://gpuopen.com/fidelityfx-superresolution/).

## Import

SharpenNode is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { sharpen } from 'three/addons/tsl/display/SharpenNode.js';
```

## Constructor

### new [SharpenNode](#SharpenNode)( textureNode : [TextureNode](TextureNode.html), sharpness : [Node](Node.html).<float>, denoise : [Node](Node.html).<bool> )

Constructs a new sharpen node.

**textureNode**

The texture node that represents the input of the effect.

**sharpness**

Sharpening strength. 0 = maximum sharpening, 2 = no sharpening.

Default is `0.2`.

**denoise**

Whether to attenuate sharpening in noisy areas.

Default is `false`.

## Properties

### .[denoise](#denoise) : [Node](Node.html).<bool>

Whether to attenuate sharpening in noisy areas.

Default is `false`.

### .[isSharpenNode](#isSharpenNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[sharpness](#sharpness) : [Node](Node.html).<float>

Sharpening strength. 0 = maximum, 2 = none.

Default is `0.2`.

### .[textureNode](#textureNode) : [TextureNode](TextureNode.html)

The texture node that represents the input of the effect.

### .[updateBeforeType](#updateBeforeType) : string

The `updateBeforeType` is set to `NodeUpdateType.FRAME` since the node renders its effect once per frame in `updateBefore()`.

Default is `'frame'`.

**Overrides:** [TempNode#updateBeforeType](TempNode.html#updateBeforeType)

## Methods

### .[dispose](#dispose)()

Frees internal resources. This method should be called when the effect is no longer required.

**Overrides:** [TempNode#dispose](TempNode.html#dispose)

### .[getTextureNode](#getTextureNode)() : [PassTextureNode](PassTextureNode.html)

Returns the result of the effect as a texture node.

**Returns:** A texture node that represents the result of the effect.

### .[setSize](#setSize)( width : number, height : number )

Sets the output size of the effect.

**width**

The width in pixels.

**height**

The height in pixels.

### .[setup](#setup)( builder : [NodeBuilder](NodeBuilder.html) ) : [PassTextureNode](PassTextureNode.html)

This method is used to setup the effect's TSL code.

**builder**

The current node builder.

**Overrides:** [TempNode#setup](TempNode.html#setup)

### .[updateBefore](#updateBefore)( frame : [NodeFrame](NodeFrame.html) )

This method is used to render the effect once per frame.

**frame**

The current node frame.

**Overrides:** [TempNode#updateBefore](TempNode.html#updateBefore)

## Source

[examples/jsm/tsl/display/SharpenNode.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/tsl/display/SharpenNode.js)