Title: VolumeNodeMaterial
Source URL: https://threejs.org/docs/pages/VolumeNodeMaterial.html

[EventDispatcher](EventDispatcher.html) → [Material](Material.html) → [NodeMaterial](NodeMaterial.html) →

# VolumeNodeMaterial

Volume node material.

## Constructor

### new [VolumeNodeMaterial](#VolumeNodeMaterial)( parameters : Object )

Constructs a new volume node material.

**parameters**

The configuration parameter.

## Properties

### .[isVolumeNodeMaterial](#isVolumeNodeMaterial) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[offsetNode](#offsetNode) : [Node](Node.html).<float>

Offsets the distance a ray has been traveled through a volume. Can be used to implement dithering to reduce banding.

Default is `null`.

### .[scatteringNode](#scatteringNode) : function | [FunctionNode](FunctionNode.html).<vec4>

Node used for scattering calculations.

Default is `null`.

### .[steps](#steps) : number

Number of steps used for raymarching.

Default is `25`.

## Source

[src/materials/nodes/VolumeNodeMaterial.js](https://github.com/mrdoob/three.js/blob/master/src/materials/nodes/VolumeNodeMaterial.js)