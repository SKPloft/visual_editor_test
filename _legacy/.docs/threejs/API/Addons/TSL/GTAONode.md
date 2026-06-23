Title: GTAONode
Source URL: https://threejs.org/docs/pages/GTAONode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [TempNode](TempNode.html) →

# GTAONode

Post processing node for applying Ground Truth Ambient Occlusion (GTAO) to a scene.

Reference: [Practical Real-Time Strategies for Accurate Indirect Occlusion](https://www.activision.com/cdn/research/Practical_Real_Time_Strategies_for_Accurate_Indirect_Occlusion_NEW%20VERSION_COLOR.pdf).

## Code Example

```js
const renderPipeline = new THREE.RenderPipeline( renderer );
const scenePass = pass( scene, camera );
scenePass.setMRT( mrt( {
	output: output,
	normal: normalView
} ) );
const scenePassColor = scenePass.getTextureNode( 'output' );
const scenePassNormal = scenePass.getTextureNode( 'normal' );
const scenePassDepth = scenePass.getTextureNode( 'depth' );
const aoPass = ao( scenePassDepth, scenePassNormal, camera );
const aoPassOutput = aoPass.getTextureNode();
renderPipeline.outputNode = scenePassColor.mul( vec4( vec3( aoPassOutput.r ), 1 ) );
```

## Import

GTAONode is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { ao } from 'three/addons/tsl/display/GTAONode.js';
```

## Constructor

### new [GTAONode](#GTAONode)( depthNode : [Node](Node.html).<float>, normalNode : [Node](Node.html).<vec3>, camera : [Camera](Camera.html) )

Constructs a new GTAO node.

**depthNode**

A node that represents the scene's depth.

**normalNode**

A node that represents the scene's normals.

**camera**

The camera the scene is rendered with.

## Properties

### .[depthNode](#depthNode) : [Node](Node.html).<float>

A node that represents the scene's depth.

### .[distanceExponent](#distanceExponent) : [UniformNode](UniformNode.html).<float>

Another option to tweak the occlusion. The recommended range is `[1,2]` for attenuating the AO.

### .[distanceFallOff](#distanceFallOff) : [UniformNode](UniformNode.html).<float>

The distance fall off value of the ambient occlusion. A lower value leads to a larger AO effect. The value should lie in the range `[0,1]`.

### .[normalNode](#normalNode) : [Node](Node.html).<vec3>

A node that represents the scene's normals. If no normals are passed to the constructor (because MRT is not available), normals can be automatically reconstructed from depth values in the shader.

### .[radius](#radius) : [UniformNode](UniformNode.html).<float>

The radius of the ambient occlusion.

### .[resolution](#resolution) : [UniformNode](UniformNode.html).<vec2>

The resolution of the effect. Can be scaled via `resolutionScale`.

### .[resolutionScale](#resolutionScale) : number

The resolution scale. By default the effect is rendered in full resolution for best quality but a value of `0.5` should be sufficient for most scenes.

Default is `1`.

### .[samples](#samples) : [UniformNode](UniformNode.html).<float>

How many samples are used to compute the AO. A higher value results in better quality but also in a more expensive runtime behavior.

### .[scale](#scale) : [UniformNode](UniformNode.html).<float>

The scale of the ambient occlusion.

### .[thickness](#thickness) : [UniformNode](UniformNode.html).<float>

The thickness of the ambient occlusion.

### .[updateBeforeType](#updateBeforeType) : string

The `updateBeforeType` is set to `NodeUpdateType.FRAME` since the node renders its effect once per frame in `updateBefore()`.

Default is `'frame'`.

**Overrides:** [TempNode#updateBeforeType](TempNode.html#updateBeforeType)

### .[useTemporalFiltering](#useTemporalFiltering) : boolean

Whether to use temporal filtering or not. Setting this property to `true` requires the usage of `TRAANode`. This will help to reduce noise although it introduces typical TAA artifacts like ghosting and temporal instabilities.

If setting this property to `false`, a manual denoise via `DenoiseNode` might be required.

Default is `false`.

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

[examples/jsm/tsl/display/GTAONode.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/tsl/display/GTAONode.js)