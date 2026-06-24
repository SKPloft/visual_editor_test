Title: PixelationPassNode
Source URL: https://threejs.org/docs/pages/PixelationPassNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [TempNode](TempNode.html) → [PassNode](PassNode.html) →

# PixelationPassNode

A special render pass node that renders the scene with a pixelation effect.

## Import

PixelationPassNode is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { pixelationPass } from 'three/addons/tsl/display/PixelationPassNode.js';
```

## Constructor

### new [PixelationPassNode](#PixelationPassNode)( scene : [Scene](Scene.html), camera : [Camera](Camera.html), pixelSize : [Node](Node.html).<float> | number, normalEdgeStrength : [Node](Node.html).<float> | number, depthEdgeStrength : [Node](Node.html).<float> | number )

Constructs a new pixelation pass node.

**scene**

The scene to render.

**camera**

The camera to render the scene with.

**pixelSize**

The pixel size.

Default is `6`.

**normalEdgeStrength**

The normal edge strength.

Default is `0.3`.

**depthEdgeStrength**

The depth edge strength.

Default is `0.4`.

## Properties

### .[depthEdgeStrength](#depthEdgeStrength) : number

The depth edge strength.

Default is `0.4`.

### .[isPixelationPassNode](#isPixelationPassNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[normalEdgeStrength](#normalEdgeStrength) : number

The normal edge strength.

Default is `0.3`.

### .[pixelSize](#pixelSize) : number

The pixel size.

Default is `6`.

## Methods

### .[setSize](#setSize)( width : number, height : number )

Sets the size of the pass.

**width**

The width of the pass.

**height**

The height of the pass.

**Overrides:** [PassNode#setSize](PassNode.html#setSize)

### .[setup](#setup)( builder : [NodeBuilder](NodeBuilder.html) ) : [PixelationNode](PixelationNode.html)

This method is used to setup the effect's TSL code.

**builder**

The current node builder.

**Overrides:** [PassNode#setup](PassNode.html#setup)

## Source

[examples/jsm/tsl/display/PixelationPassNode.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/tsl/display/PixelationPassNode.js)