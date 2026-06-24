Title: MeshSSSNodeMaterial
Source URL: https://threejs.org/docs/pages/MeshSSSNodeMaterial.html

[EventDispatcher](EventDispatcher.html) → [Material](Material.html) → [NodeMaterial](NodeMaterial.html) → [MeshStandardNodeMaterial](MeshStandardNodeMaterial.html) → [MeshPhysicalNodeMaterial](MeshPhysicalNodeMaterial.html) →

# MeshSSSNodeMaterial

This node material is an experimental extension of [MeshPhysicalNodeMaterial](MeshPhysicalNodeMaterial.html) that implements a Subsurface scattering (SSS) term.

## Constructor

### new [MeshSSSNodeMaterial](#MeshSSSNodeMaterial)( parameters : Object )

Constructs a new mesh SSS node material.

**parameters**

The configuration parameter.

## Properties

### .[thicknessAmbientNode](#thicknessAmbientNode) : [Node](Node.html).<float>

Represents the thickness ambient factor.

### .[thicknessAttenuationNode](#thicknessAttenuationNode) : [Node](Node.html).<float>

Represents the thickness attenuation.

### .[thicknessColorNode](#thicknessColorNode) : [Node](Node.html).<vec3>

Represents the thickness color.

Default is `null`.

### .[thicknessDistortionNode](#thicknessDistortionNode) : [Node](Node.html).<float>

Represents the distortion factor.

### .[thicknessPowerNode](#thicknessPowerNode) : [Node](Node.html).<float>

Represents the thickness power.

### .[thicknessScaleNode](#thicknessScaleNode) : [Node](Node.html).<float>

Represents the thickness scale.

### .[useSSS](#useSSS) : boolean

Whether the lighting model should use SSS or not.

Default is `true`.

## Methods

### .[setupLightingModel](#setupLightingModel)() : [SSSLightingModel](SSSLightingModel.html)

Setups the lighting model.

**Overrides:** [MeshPhysicalNodeMaterial#setupLightingModel](MeshPhysicalNodeMaterial.html#setupLightingModel)

**Returns:** The lighting model.

## Source

[src/materials/nodes/MeshSSSNodeMaterial.js](https://github.com/mrdoob/three.js/blob/master/src/materials/nodes/MeshSSSNodeMaterial.js)