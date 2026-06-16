Title: LensflareNode
Source URL: https://threejs.org/docs/pages/LensflareNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [TempNode](TempNode.html) →

# LensflareNode

Post processing node for adding a bloom-based lens flare effect. This effect requires that you extract the bloom of the scene via a bloom pass first.

References:

*   [https://john-chapman-graphics.blogspot.com/2013/02/pseudo-lens-flare.html](https://john-chapman-graphics.blogspot.com/2013/02/pseudo-lens-flare.html).
*   [https://john-chapman.github.io/2017/11/05/pseudo-lens-flare.html](https://john-chapman.github.io/2017/11/05/pseudo-lens-flare.html).

## Import

LensflareNode is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { lensflare } from 'three/addons/tsl/display/LensflareNode.js';
```

## Constructor

### new [LensflareNode](#LensflareNode)( textureNode : [TextureNode](TextureNode.html), params : Object )

Constructs a new lens flare node.

**textureNode**

The texture node that represents the scene's bloom.

**params**

The parameter object for configuring the effect.

**ghostTint**

Defines the tint of the flare/ghosts.

Default is `vec3(1, 1, 1)`.

**threshold**

Controls the size and strength of the effect. A higher threshold results in smaller flares.

Default is `float(0.5)`.

**ghostSamples**

Represents the number of flares/ghosts per bright spot which pivot around the center.

Default is `float(4)`.

**ghostSpacing**

Defines the spacing of the flares/ghosts.

Default is `float(0.25)`.

**ghostAttenuationFactor**

Defines the attenuation factor of flares/ghosts.

Default is `float(25)`.

**downSampleRatio**

Defines how downsampling since the effect is usually not rendered at full resolution.

Default is `4`.

## Properties

### .[downSampleRatio](#downSampleRatio) : number

Defines how downsampling since the effect is usually not rendered at full resolution.

### .[ghostAttenuationFactorNode](#ghostAttenuationFactorNode) : [Node](Node.html).<float>

Defines the attenuation factor of flares/ghosts.

### .[ghostSamplesNode](#ghostSamplesNode) : [Node](Node.html).<float>

Represents the number of flares/ghosts per bright spot which pivot around the center.

### .[ghostSpacingNode](#ghostSpacingNode) : [Node](Node.html).<float>

Defines the spacing of the flares/ghosts.

### .[ghostTintNode](#ghostTintNode) : [Node](Node.html).<vec3>

Defines the tint of the flare/ghosts.

### .[textureNode](#textureNode) : [TextureNode](TextureNode.html)

The texture node that represents the scene's bloom.

### .[thresholdNode](#thresholdNode) : [Node](Node.html).<float>

Controls the size and strength of the effect. A higher threshold results in smaller flares.

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

Sets the size of the effect.

**width**

The width of the effect.

**height**

The height of the effect.

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

[examples/jsm/tsl/display/LensflareNode.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/tsl/display/LensflareNode.js)