Title: VaryingNode
Source URL: https://threejs.org/docs/pages/VaryingNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) →

# VaryingNode

Class for representing shader varyings as nodes. Varyings are create from existing nodes like the following:

## Code Example

```js
const positionLocal = positionGeometry.toVarying( 'vPositionLocal' );
```

## Constructor

### new [VaryingNode](#VaryingNode)( node : [Node](Node.html), name : string )

Constructs a new varying node.

**node**

The node for which a varying should be created.

**name**

The name of the varying in the shader.

Default is `null`.

## Properties

### .[global](#global) : boolean

This flag is used for global cache.

Default is `true`.

**Overrides:** [Node#global](Node.html#global)

### .[interpolationSampling](#interpolationSampling) : string

The interpolation sampling type of varying data.

Default is `null`.

### .[interpolationType](#interpolationType) : string

The interpolation type of the varying data.

Default is `null`.

### .[isVaryingNode](#isVaryingNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[name](#name) : string

The name of the varying in the shader. If no name is defined, the node system auto-generates one.

Default is `null`.

**Overrides:** [Node#name](Node.html#name)

### .[node](#node) : [Node](Node.html)

The node for which a varying should be created.

## Methods

### .[setInterpolation](#setInterpolation)( type : string, sampling : string ) : [VaryingNode](VaryingNode.html)

Defines the interpolation type of the varying.

**type**

The interpolation type.

**sampling**

The interpolation sampling type

Default is `null`.

**Returns:** A reference to this node.

### .[setupVarying](#setupVarying)( builder : [NodeBuilder](NodeBuilder.html) ) : [NodeVarying](NodeVarying.html)

This method performs the setup of a varying node with the current node builder.

**builder**

The current node builder.

**Returns:** The node varying from the node builder.

## Source

[src/nodes/core/VaryingNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/core/VaryingNode.js)