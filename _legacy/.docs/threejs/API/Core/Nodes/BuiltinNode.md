Title: BuiltinNode
Source URL: https://threejs.org/docs/pages/BuiltinNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) →

# BuiltinNode

The node allows to set values for built-in shader variables. That is required for features like hardware-accelerated vertex clipping.

## Constructor

### new [BuiltinNode](#BuiltinNode)( name : string )

Constructs a new builtin node.

**name**

The name of the built-in shader variable.

## Properties

### .[isBuiltinNode](#isBuiltinNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[name](#name) : string

The name of the built-in shader variable.

**Overrides:** [Node#name](Node.html#name)

## Methods

### .[generate](#generate)( builder : [NodeBuilder](NodeBuilder.html) ) : string

Generates the code snippet of the builtin node.

**builder**

The current node builder.

**Overrides:** [Node#generate](Node.html#generate)

**Returns:** The generated code snippet.

## Source

[src/nodes/accessors/BuiltinNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/accessors/BuiltinNode.js)