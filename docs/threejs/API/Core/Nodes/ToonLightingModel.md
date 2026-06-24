Title: ToonLightingModel
Source URL: https://threejs.org/docs/pages/ToonLightingModel.html

[LightingModel](LightingModel.html) →

# ToonLightingModel

Represents the lighting model for a toon material. Used in [MeshToonNodeMaterial](MeshToonNodeMaterial.html).

## Constructor

### new [ToonLightingModel](#ToonLightingModel)()

## Methods

### .[direct](#direct)( lightData : Object, builder : [NodeBuilder](NodeBuilder.html) )

Implements the direct lighting. Instead of using a conventional smooth irradiance, the irradiance is reduced to a small number of discrete shades to create a comic-like, flat look.

**lightData**

The light data.

**builder**

The current node builder.

**Overrides:** [LightingModel#direct](LightingModel.html#direct)

### .[indirect](#indirect)( builder : [NodeBuilder](NodeBuilder.html) )

Implements the indirect lighting.

**builder**

The current node builder.

**Overrides:** [LightingModel#indirect](LightingModel.html#indirect)

## Source

[src/nodes/functions/ToonLightingModel.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/functions/ToonLightingModel.js)