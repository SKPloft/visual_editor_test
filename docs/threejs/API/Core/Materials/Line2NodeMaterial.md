Title: Line2NodeMaterial
Source URL: https://threejs.org/docs/pages/Line2NodeMaterial.html

[EventDispatcher](EventDispatcher.html) → [Material](Material.html) → [NodeMaterial](NodeMaterial.html) →

# Line2NodeMaterial

This node material can be used to render lines with a size larger than one by representing them as instanced meshes.

## Constructor

### new [Line2NodeMaterial](#Line2NodeMaterial)( parameters : Object )

Constructs a new node material for wide line rendering.

**parameters**

The configuration parameter.

Default is `{}`.

## Properties

### .[alphaToCoverage](#alphaToCoverage) : boolean

Whether alpha to coverage should be used or not.

Default is `true`.

**Overrides:** [NodeMaterial#alphaToCoverage](NodeMaterial.html#alphaToCoverage)

### .[blending](#blending) : number

Blending is set to `NoBlending` since transparency is not supported, yet.

Default is `0`.

**Overrides:** [NodeMaterial#blending](NodeMaterial.html#blending)

### .[dashOffset](#dashOffset) : number

The dash offset.

Default is `0`.

### .[dashScaleNode](#dashScaleNode) : [Node](Node.html).<float>

Defines the dash scale.

Default is `null`.

### .[dashSizeNode](#dashSizeNode) : [Node](Node.html).<float>

Defines the dash size.

Default is `null`.

### .[dashed](#dashed) : boolean

Whether the lines should be dashed or not.

Default is `false`.

### .[gapSizeNode](#gapSizeNode) : [Node](Node.html).<float>

Defines the gap size.

Default is `null`.

### .[isLine2NodeMaterial](#isLine2NodeMaterial) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[lineColorNode](#lineColorNode) : [Node](Node.html).<vec3>

Defines the lines color.

Default is `null`.

### .[offsetNode](#offsetNode) : [Node](Node.html).<float>

Defines the offset.

Default is `null`.

### .[vertexColors](#vertexColors) : boolean

Whether vertex colors should be used or not.

Default is `false`.

**Overrides:** [NodeMaterial#vertexColors](NodeMaterial.html#vertexColors)

### .[worldUnits](#worldUnits) : boolean

Whether the lines should sized in world units or not. When set to `false` the unit is pixel.

Default is `false`.

## Methods

### .[copy](#copy)( source : [Line2NodeMaterial](Line2NodeMaterial.html) ) : [Line2NodeMaterial](Line2NodeMaterial.html)

Copies the properties of the given material to this instance.

**source**

The material to copy.

**Overrides:** [NodeMaterial#copy](NodeMaterial.html#copy)

**Returns:** A reference to this material.

### .[setup](#setup)( builder : [NodeBuilder](NodeBuilder.html) )

Setups the vertex and fragment stage of this node material.

**builder**

The current node builder.

**Overrides:** [NodeMaterial#setup](NodeMaterial.html#setup)

## Source

[src/materials/nodes/Line2NodeMaterial.js](https://github.com/mrdoob/three.js/blob/master/src/materials/nodes/Line2NodeMaterial.js)