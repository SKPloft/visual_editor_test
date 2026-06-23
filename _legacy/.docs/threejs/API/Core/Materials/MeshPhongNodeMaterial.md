Title: MeshPhongNodeMaterial
Source URL: https://threejs.org/docs/pages/MeshPhongNodeMaterial.html

[EventDispatcher](EventDispatcher.html) → [Material](Material.html) → [NodeMaterial](NodeMaterial.html) →

# MeshPhongNodeMaterial

Node material version of [MeshPhongMaterial](MeshPhongMaterial.html).

## Constructor

### new [MeshPhongNodeMaterial](#MeshPhongNodeMaterial)( parameters : Object )

Constructs a new mesh lambert node material.

**parameters**

The configuration parameter.

## Properties

### .[isMeshPhongNodeMaterial](#isMeshPhongNodeMaterial) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[lights](#lights) : boolean

Set to `true` because phong materials react on lights.

Default is `true`.

**Overrides:** [NodeMaterial#lights](NodeMaterial.html#lights)

### .[shininessNode](#shininessNode) : [Node](Node.html).<float>

The shininess of phong materials is by default inferred from the `shininess` property. This node property allows to overwrite the default and define the shininess with a node instead.

If you don't want to overwrite the shininess but modify the existing value instead, use [materialShininess](TSL.html#materialShininess).

Default is `null`.

### .[specularNode](#specularNode) : [Node](Node.html).<vec3>

The specular color of phong materials is by default inferred from the `specular` property. This node property allows to overwrite the default and define the specular color with a node instead.

If you don't want to overwrite the specular color but modify the existing value instead, use [materialSpecular](TSL.html#materialSpecular).

Default is `null`.

## Methods

### .[setupEnvironment](#setupEnvironment)( builder : [NodeBuilder](NodeBuilder.html) ) : [BasicEnvironmentNode](BasicEnvironmentNode.html).<vec3>

Overwritten since this type of material uses [BasicEnvironmentNode](BasicEnvironmentNode.html) to implement the default environment mapping.

**builder**

The current node builder.

**Overrides:** [NodeMaterial#setupEnvironment](NodeMaterial.html#setupEnvironment)

**Returns:** The environment node.

### .[setupLightingModel](#setupLightingModel)() : [PhongLightingModel](PhongLightingModel.html)

Setups the lighting model.

**Overrides:** [NodeMaterial#setupLightingModel](NodeMaterial.html#setupLightingModel)

**Returns:** The lighting model.

### .[setupVariants](#setupVariants)( builder : [NodeBuilder](NodeBuilder.html) )

Setups the phong specific node variables.

**builder**

The current node builder.

**Overrides:** [NodeMaterial#setupVariants](NodeMaterial.html#setupVariants)

## Source

[src/materials/nodes/MeshPhongNodeMaterial.js](https://github.com/mrdoob/three.js/blob/master/src/materials/nodes/MeshPhongNodeMaterial.js)