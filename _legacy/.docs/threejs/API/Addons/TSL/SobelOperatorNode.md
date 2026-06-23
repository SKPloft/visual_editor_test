Title: SobelOperatorNode
Source URL: https://threejs.org/docs/pages/SobelOperatorNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [TempNode](TempNode.html) →

# SobelOperatorNode

Post processing node for detecting edges with a sobel filter. A sobel filter should be applied after tone mapping and output color space conversion.

## Import

SobelOperatorNode is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { sobel } from 'three/addons/tsl/display/SobelOperatorNode.js';
```

## Constructor

### new [SobelOperatorNode](#SobelOperatorNode)( textureNode : [TextureNode](TextureNode.html) )

Constructs a new sobel operator node.

**textureNode**

The texture node that represents the input of the effect.

## Properties

### .[textureNode](#textureNode) : [TextureNode](TextureNode.html)

The texture node that represents the input of the effect.

### .[updateBeforeType](#updateBeforeType) : string

The `updateBeforeType` is set to `NodeUpdateType.FRAME` since the node updates its internal uniforms once per frame in `updateBefore()`.

Default is `'frame'`.

**Overrides:** [TempNode#updateBeforeType](TempNode.html#updateBeforeType)

## Methods

### .[setup](#setup)( builder : [NodeBuilder](NodeBuilder.html) ) : ShaderCallNodeInternal

This method is used to setup the effect's TSL code.

**builder**

The current node builder.

**Overrides:** [TempNode#setup](TempNode.html#setup)

### .[updateBefore](#updateBefore)( frame : [NodeFrame](NodeFrame.html) )

This method is used to update the effect's uniforms once per frame.

**frame**

The current node frame.

**Overrides:** [TempNode#updateBefore](TempNode.html#updateBefore)

## Source

[examples/jsm/tsl/display/SobelOperatorNode.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/tsl/display/SobelOperatorNode.js)