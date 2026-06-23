Title: TransitionNode
Source URL: https://threejs.org/docs/pages/TransitionNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [TempNode](TempNode.html) →

# TransitionNode

Post processing node for creating a transition effect between scenes.

## Import

TransitionNode is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { transition } from 'three/addons/tsl/display/TransitionNode.js';
```

## Constructor

### new [TransitionNode](#TransitionNode)( textureNodeA : [TextureNode](TextureNode.html), textureNodeB : [TextureNode](TextureNode.html), mixTextureNode : [TextureNode](TextureNode.html), mixRatioNode : [Node](Node.html).<float>, thresholdNode : [Node](Node.html).<float>, useTextureNode : [Node](Node.html).<float> )

Constructs a new transition node.

**textureNodeA**

A texture node that represents the beauty pass of the first scene.

**textureNodeB**

A texture node that represents the beauty pass of the second scene.

**mixTextureNode**

A texture node that defines how the transition effect should look like.

**mixRatioNode**

The interpolation factor that controls the mix.

**thresholdNode**

Can be used to tweak the linear interpolation.

**useTextureNode**

Whether `mixTextureNode` should influence the transition or not.

## Properties

### .[mixRatioNode](#mixRatioNode) : [Node](Node.html).<float>

The interpolation factor that controls the mix.

### .[mixTextureNode](#mixTextureNode) : [TextureNode](TextureNode.html)

A texture that defines how the transition effect should look like.

### .[textureNodeA](#textureNodeA) : [TextureNode](TextureNode.html)

A texture node that represents the beauty pass of the first scene.

### .[textureNodeB](#textureNodeB) : [TextureNode](TextureNode.html)

A texture node that represents the beauty pass of the second scene.

### .[thresholdNode](#thresholdNode) : [Node](Node.html).<float>

Can be used to tweak the linear interpolation.

### .[useTextureNode](#useTextureNode) : [Node](Node.html).<float>

Whether `mixTextureNode` should influence the transition or not.

## Methods

### .[setup](#setup)( builder : [NodeBuilder](NodeBuilder.html) ) : ShaderCallNodeInternal

This method is used to setup the effect's TSL code.

**builder**

The current node builder.

**Overrides:** [TempNode#setup](TempNode.html#setup)

## Source

[examples/jsm/tsl/display/TransitionNode.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/tsl/display/TransitionNode.js)