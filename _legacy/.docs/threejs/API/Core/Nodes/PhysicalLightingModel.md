Title: PhysicalLightingModel
Source URL: https://threejs.org/docs/pages/PhysicalLightingModel.html

[LightingModel](LightingModel.html) →

# PhysicalLightingModel

Represents the lighting model for a PBR material.

## Constructor

### new [PhysicalLightingModel](#PhysicalLightingModel)( clearcoat : boolean, sheen : boolean, iridescence : boolean, anisotropy : boolean, transmission : boolean, dispersion : boolean )

Constructs a new physical lighting model.

**clearcoat**

Whether clearcoat is supported or not.

Default is `false`.

**sheen**

Whether sheen is supported or not.

Default is `false`.

**iridescence**

Whether iridescence is supported or not.

Default is `false`.

**anisotropy**

Whether anisotropy is supported or not.

Default is `false`.

**transmission**

Whether transmission is supported or not.

Default is `false`.

**dispersion**

Whether dispersion is supported or not.

Default is `false`.

## Properties

### .[anisotropy](#anisotropy) : boolean

Whether anisotropy is supported or not.

Default is `false`.

### .[clearcoat](#clearcoat) : boolean

Whether clearcoat is supported or not.

Default is `false`.

### .[clearcoatRadiance](#clearcoatRadiance) : [Node](Node.html)

The clear coat radiance.

Default is `null`.

### .[clearcoatSpecularDirect](#clearcoatSpecularDirect) : [Node](Node.html)

The clear coat specular direct.

Default is `null`.

### .[clearcoatSpecularIndirect](#clearcoatSpecularIndirect) : [Node](Node.html)

The clear coat specular indirect.

Default is `null`.

### .[dispersion](#dispersion) : boolean

Whether dispersion is supported or not.

Default is `false`.

### .[iridescence](#iridescence) : boolean

Whether iridescence is supported or not.

Default is `false`.

### .[iridescenceF0](#iridescenceF0) : [Node](Node.html)

The iridescence F0.

Default is `null`.

### .[iridescenceF0Dielectric](#iridescenceF0Dielectric) : [Node](Node.html)

The iridescence F0 dielectric.

Default is `null`.

### .[iridescenceF0Metallic](#iridescenceF0Metallic) : [Node](Node.html)

The iridescence F0 metallic.

Default is `null`.

### .[iridescenceFresnel](#iridescenceFresnel) : [Node](Node.html)

The iridescence Fresnel.

Default is `null`.

### .[sheen](#sheen) : boolean

Whether sheen is supported or not.

Default is `false`.

### .[sheenSpecularDirect](#sheenSpecularDirect) : [Node](Node.html)

The sheen specular direct.

Default is `null`.

### .[sheenSpecularIndirect](#sheenSpecularIndirect) : [Node](Node.html)

The sheen specular indirect.

Default is `null`.

### .[transmission](#transmission) : boolean

Whether transmission is supported or not.

Default is `false`.

## Methods

### .[ambientOcclusion](#ambientOcclusion)( builder : [NodeBuilder](NodeBuilder.html) )

Implements the ambient occlusion term.

**builder**

The current node builder.

**Overrides:** [LightingModel#ambientOcclusion](LightingModel.html#ambientOcclusion)

### .[direct](#direct)( lightData : Object, builder : [NodeBuilder](NodeBuilder.html) )

Implements the direct light.

**lightData**

The light data.

**builder**

The current node builder.

**Overrides:** [LightingModel#direct](LightingModel.html#direct)

### .[directRectArea](#directRectArea)( input : Object, builder : [NodeBuilder](NodeBuilder.html) )

This method is intended for implementing the direct light term for rect area light nodes.

**input**

The input data.

**builder**

The current node builder.

**Overrides:** [LightingModel#directRectArea](LightingModel.html#directRectArea)

### .[finish](#finish)( builder : [NodeBuilder](NodeBuilder.html) )

Used for final lighting accumulations depending on the requested features.

**builder**

The current node builder.

**Overrides:** [LightingModel#finish](LightingModel.html#finish)

### .[indirect](#indirect)( builder : [NodeBuilder](NodeBuilder.html) )

Implements the indirect lighting.

**builder**

The current node builder.

**Overrides:** [LightingModel#indirect](LightingModel.html#indirect)

### .[indirectDiffuse](#indirectDiffuse)( builder : [NodeBuilder](NodeBuilder.html) )

Implements the indirect diffuse term.

**builder**

The current node builder.

### .[indirectSpecular](#indirectSpecular)( builder : [NodeBuilder](NodeBuilder.html) )

Implements the indirect specular term.

**builder**

The current node builder.

### .[start](#start)( builder : [NodeBuilder](NodeBuilder.html) )

Depending on what features are requested, the method prepares certain node variables which are later used for lighting computations.

**builder**

The current node builder.

**Overrides:** [LightingModel#start](LightingModel.html#start)

## Source

[src/nodes/functions/PhysicalLightingModel.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/functions/PhysicalLightingModel.js)