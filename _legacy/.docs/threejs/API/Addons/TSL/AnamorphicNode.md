Title: AnamorphicNode
Source URL: https://threejs.org/docs/pages/AnamorphicNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [TempNode](TempNode.html) →

# AnamorphicNode

Post processing node for adding an anamorphic flare effect.

## Import

AnamorphicNode is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { anamorphic } from 'three/addons/tsl/display/AnamorphicNode.js';
```

## Constructor

### new [AnamorphicNode](#AnamorphicNode)( textureNode : [TextureNode](TextureNode.html), thresholdNode : [Node](Node.html).<float>, scaleNode : [Node](Node.html).<float>, samples : number )

Constructs a new anamorphic node.

**textureNode**

The texture node that represents the input of the effect.

**thresholdNode**

The threshold is one option to control the intensity and size of the effect.

**scaleNode**

Defines the vertical scale of the flares.

**samples**

More samples result in larger flares and a more expensive runtime behavior.

## Properties

### .[colorNode](#colorNode) : [Node](Node.html).<vec3>

The color of the flares.

### .[resolution](#resolution) : [Vector2](Vector2.html)

The resolution scale.

Default is `{(1,1)}`.

**Deprecated:** Yes

### .[resolutionScale](#resolutionScale) : number

The resolution scale.

### .[samples](#samples) : [Node](Node.html).<float>

More samples result in larger flares and a more expensive runtime behavior.

### .[scaleNode](#scaleNode) : [Node](Node.html).<float>

Defines the vertical scale of the flares.

### .[textureNode](#textureNode) : [TextureNode](TextureNode.html)

The texture node that represents the input of the effect.

### .[thresholdNode](#thresholdNode) : [Node](Node.html).<float>

The threshold is one option to control the intensity and size of the effect.

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

[examples/jsm/tsl/display/AnamorphicNode.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/tsl/display/AnamorphicNode.js)