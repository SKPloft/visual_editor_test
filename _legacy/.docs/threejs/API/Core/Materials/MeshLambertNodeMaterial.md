Title: MeshLambertNodeMaterial
Source URL: https://threejs.org/docs/pages/MeshLambertNodeMaterial.html

[EventDispatcher](EventDispatcher.html) → [Material](Material.html) → [NodeMaterial](NodeMaterial.html) →

# MeshLambertNodeMaterial

Node material version of [MeshLambertMaterial](MeshLambertMaterial.html).

## Constructor

### new [MeshLambertNodeMaterial](#MeshLambertNodeMaterial)( parameters : Object )

Constructs a new mesh lambert node material.

**parameters**

The configuration parameter.

## Properties

### .[isMeshLambertNodeMaterial](#isMeshLambertNodeMaterial) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[lights](#lights) : boolean

Set to `true` because lambert materials react on lights.

Default is `true`.

**Overrides:** [NodeMaterial#lights](NodeMaterial.html#lights)

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

## Source

[src/materials/nodes/MeshLambertNodeMaterial.js](https://github.com/mrdoob/three.js/blob/master/src/materials/nodes/MeshLambertNodeMaterial.js)