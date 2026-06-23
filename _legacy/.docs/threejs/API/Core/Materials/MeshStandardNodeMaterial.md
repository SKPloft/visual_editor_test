Title: MeshStandardNodeMaterial
Source URL: https://threejs.org/docs/pages/MeshStandardNodeMaterial.html

[EventDispatcher](EventDispatcher.html) → [Material](Material.html) → [NodeMaterial](NodeMaterial.html) →

# MeshStandardNodeMaterial

Node material version of [MeshStandardMaterial](MeshStandardMaterial.html).

## Constructor

### new [MeshStandardNodeMaterial](#MeshStandardNodeMaterial)( parameters : Object )

Constructs a new mesh standard node material.

**parameters**

The configuration parameter.

## Properties

### .[emissiveNode](#emissiveNode) : [Node](Node.html).<vec3>

The emissive color of standard materials is by default inferred from the `emissive`, `emissiveIntensity` and `emissiveMap` properties. This node property allows to overwrite the default and define the emissive color with a node instead.

If you don't want to overwrite the emissive color but modify the existing value instead, use [materialEmissive](TSL.html#materialEmissive).

Default is `null`.

### .[isMeshStandardNodeMaterial](#isMeshStandardNodeMaterial) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[lights](#lights) : boolean

Set to `true` because standard materials react on lights.

Default is `true`.

**Overrides:** [NodeMaterial#lights](NodeMaterial.html#lights)

### .[metalnessNode](#metalnessNode) : [Node](Node.html).<float>

The metalness of standard materials is by default inferred from the `metalness`, and `metalnessMap` properties. This node property allows to overwrite the default and define the metalness with a node instead.

If you don't want to overwrite the metalness but modify the existing value instead, use [materialMetalness](TSL.html#materialMetalness).

Default is `null`.

### .[roughnessNode](#roughnessNode) : [Node](Node.html).<float>

The roughness of standard materials is by default inferred from the `roughness`, and `roughnessMap` properties. This node property allows to overwrite the default and define the roughness with a node instead.

If you don't want to overwrite the roughness but modify the existing value instead, use [materialRoughness](TSL.html#materialRoughness).

Default is `null`.

## Methods

### .[setupEnvironment](#setupEnvironment)( builder : [NodeBuilder](NodeBuilder.html) ) : [EnvironmentNode](EnvironmentNode.html).<vec3>

Overwritten since this type of material uses [EnvironmentNode](EnvironmentNode.html) to implement the PBR (PMREM based) environment mapping. Besides, the method honors `Scene.environment`.

**builder**

The current node builder.

**Overrides:** [NodeMaterial#setupEnvironment](NodeMaterial.html#setupEnvironment)

**Returns:** The environment node.

### .[setupLightingModel](#setupLightingModel)() : [PhysicalLightingModel](PhysicalLightingModel.html)

Setups the lighting model.

**Overrides:** [NodeMaterial#setupLightingModel](NodeMaterial.html#setupLightingModel)

**Returns:** The lighting model.

### .[setupSpecular](#setupSpecular)()

Setups the specular related node variables.

### .[setupVariants](#setupVariants)( builder : [NodeBuilder](NodeBuilder.html) )

Setups the standard specific node variables.

**builder**

The current node builder.

**Overrides:** [NodeMaterial#setupVariants](NodeMaterial.html#setupVariants)

## Source

[src/materials/nodes/MeshStandardNodeMaterial.js](https://github.com/mrdoob/three.js/blob/master/src/materials/nodes/MeshStandardNodeMaterial.js)