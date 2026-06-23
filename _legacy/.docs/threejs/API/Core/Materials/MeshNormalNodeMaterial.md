Title: MeshNormalNodeMaterial
Source URL: https://threejs.org/docs/pages/MeshNormalNodeMaterial.html

[EventDispatcher](EventDispatcher.html) → [Material](Material.html) → [NodeMaterial](NodeMaterial.html) →

# MeshNormalNodeMaterial

Node material version of [MeshNormalMaterial](MeshNormalMaterial.html).

## Constructor

### new [MeshNormalNodeMaterial](#MeshNormalNodeMaterial)( parameters : Object )

Constructs a new mesh normal node material.

**parameters**

The configuration parameter.

## Properties

### .[isMeshNormalNodeMaterial](#isMeshNormalNodeMaterial) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

## Methods

### .[setupDiffuseColor](#setupDiffuseColor)()

Overwrites the default implementation by computing the diffuse color based on the normal data.

**Overrides:** [NodeMaterial#setupDiffuseColor](NodeMaterial.html#setupDiffuseColor)

## Source

[src/materials/nodes/MeshNormalNodeMaterial.js](https://github.com/mrdoob/three.js/blob/master/src/materials/nodes/MeshNormalNodeMaterial.js)