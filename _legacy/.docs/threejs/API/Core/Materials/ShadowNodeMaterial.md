Title: ShadowNodeMaterial
Source URL: https://threejs.org/docs/pages/ShadowNodeMaterial.html

[EventDispatcher](EventDispatcher.html) → [Material](Material.html) → [NodeMaterial](NodeMaterial.html) →

# ShadowNodeMaterial

Node material version of [ShadowMaterial](ShadowMaterial.html).

## Constructor

### new [ShadowNodeMaterial](#ShadowNodeMaterial)( parameters : Object )

Constructs a new shadow node material.

**parameters**

The configuration parameter.

## Properties

### .[isShadowNodeMaterial](#isShadowNodeMaterial) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[lights](#lights) : boolean

Set to `true` because so it's possible to implement the shadow mask effect.

Default is `true`.

**Overrides:** [NodeMaterial#lights](NodeMaterial.html#lights)

### .[transparent](#transparent) : boolean

Overwritten since shadow materials are transparent by default.

Default is `true`.

**Overrides:** [NodeMaterial#transparent](NodeMaterial.html#transparent)

## Methods

### .[setupLightingModel](#setupLightingModel)() : [ShadowMaskModel](ShadowMaskModel.html)

Setups the lighting model.

**Overrides:** [NodeMaterial#setupLightingModel](NodeMaterial.html#setupLightingModel)

**Returns:** The lighting model.

## Source

[src/materials/nodes/ShadowNodeMaterial.js](https://github.com/mrdoob/three.js/blob/master/src/materials/nodes/ShadowNodeMaterial.js)