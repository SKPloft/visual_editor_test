Title: GodraysNode
Source URL: https://threejs.org/docs/pages/GodraysNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [TempNode](TempNode.html) →

# GodraysNode

Post-Processing node for apply Screen-space raymarched godrays to a scene.

After the godrays have been computed, it's recommened to apply a Bilateral Blur to the result to mitigate raymarching and noise artifacts.

The composite with the scene pass is ideally done with `depthAwareBlend()`, which mitigates aliasing and light leaking.

Limitations:

*   Only point and directional lights are currently supported.
*   The effect requires a full shadow setup. Meaning shadows must be enabled in the renderer, 3D objects must cast and receive shadows and the main light must cast shadows.

Reference: This Node is a part of [three-good-godrays](https://github.com/Ameobea/three-good-godrays).

## Code Example

```js
const godraysPass = godrays( scenePassDepth, camera, light );
const blurPass = bilateralBlur( godraysPassColor ); // optional blur
const outputBlurred = depthAwareBlend( scenePassColor, blurPassColor, scenePassDepth, camera, { blendColor, edgeRadius, edgeStrength } ); // composite
```

## Import

GodraysNode is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { godrays } from 'three/addons/tsl/display/GodraysNode.js';
```

## Constructor

### new [GodraysNode](#GodraysNode)( depthNode : [TextureNode](TextureNode.html), camera : [Camera](Camera.html), light : [DirectionalLight](DirectionalLight.html) | [PointLight](PointLight.html) )

Constructs a new Godrays node.

**depthNode**

A texture node that represents the scene's depth.

**camera**

The camera the scene is rendered with.

**light**

The light the godrays are rendered for.

## Properties

### .[density](#density) : [UniformNode](UniformNode.html).<float>

The rate of accumulation for the godrays. Higher values roughly equate to more humid air/denser fog.

Default is `0.7`.

### .[depthNode](#depthNode) : [TextureNode](TextureNode.html)

A node that represents the beauty pass's depth.

### .[distanceAttenuation](#distanceAttenuation) : [UniformNode](UniformNode.html).<float>

Higher values decrease the accumulation of godrays the further away they are from the light source.

Default is `2`.

### .[maxDensity](#maxDensity) : [UniformNode](UniformNode.html).<float>

The maximum density of the godrays. Limits the maximum brightness of the godrays.

Default is `0.5`.

### .[raymarchSteps](#raymarchSteps) : [UniformNode](UniformNode.html).<uint>

The number of raymarching steps

Default is `60`.

### .[resolutionScale](#resolutionScale) : number

The resolution scale.

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

[examples/jsm/tsl/display/GodraysNode.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/tsl/display/GodraysNode.js)