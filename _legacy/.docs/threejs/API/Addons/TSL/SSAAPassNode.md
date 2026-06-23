Title: SSAAPassNode
Source URL: https://threejs.org/docs/pages/SSAAPassNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [TempNode](TempNode.html) → [PassNode](PassNode.html) →

# SSAAPassNode

A special render pass node that renders the scene with SSAA (Supersampling Anti-Aliasing). This manual SSAA approach re-renders the scene ones for each sample with camera jitter and accumulates the results.

This node produces a high-quality anti-aliased output but is also extremely expensive because of its brute-force approach of re-rendering the entire scene multiple times.

Reference: [https://en.wikipedia.org/wiki/Supersampling](https://en.wikipedia.org/wiki/Supersampling)

## Import

SSAAPassNode is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { ssaaPass } from 'three/addons/tsl/display/SSAAPassNode.js';
```

## Constructor

### new [SSAAPassNode](#SSAAPassNode)( scene : [Scene](Scene.html), camera : [Camera](Camera.html) )

Constructs a new SSAA pass node.

**scene**

The scene to render.

**camera**

The camera to render the scene with.

## Properties

### .[clearAlpha](#clearAlpha) : number

The clear alpha of the pass.

Default is `0`.

### .[clearColor](#clearColor) : [Color](Color.html)

The clear color of the pass.

Default is `0x000000`.

### .[isSSAAPassNode](#isSSAAPassNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[sampleLevel](#sampleLevel) : number

The sample level specified as n, where the number of samples is 2^n, so sampleLevel = 4, is 2^4 samples, 16.

Default is `4`.

### .[sampleWeight](#sampleWeight) : [UniformNode](UniformNode.html).<float>

A uniform node representing the sample weight.

Default is `1`.

### .[unbiased](#unbiased) : boolean

Whether rounding errors should be mitigated or not.

Default is `true`.

## Methods

### .[dispose](#dispose)()

Frees internal resources. This method should be called when the pass is no longer required.

**Overrides:** [PassNode#dispose](PassNode.html#dispose)

### .[setup](#setup)( builder : [NodeBuilder](NodeBuilder.html) ) : [PassTextureNode](PassTextureNode.html)

This method is used to setup the effect's MRT configuration and quad mesh.

**builder**

The current node builder.

**Overrides:** [PassNode#setup](PassNode.html#setup)

### .[updateBefore](#updateBefore)( frame : [NodeFrame](NodeFrame.html) )

This method is used to render the SSAA effect once per frame.

**frame**

The current node frame.

**Overrides:** [PassNode#updateBefore](PassNode.html#updateBefore)

## Source

[examples/jsm/tsl/display/SSAAPassNode.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/tsl/display/SSAAPassNode.js)