Title: CodeNode
Source URL: https://threejs.org/docs/pages/CodeNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) →

# CodeNode

This class represents native code sections. It is the base class for modules like [FunctionNode](FunctionNode.html) which allows to implement functions with native shader languages.

## Constructor

### new [CodeNode](#CodeNode)( code : string, includes : Array.<[Node](Node.html)\>, language : 'js' | 'wgsl' | 'glsl' )

Constructs a new code node.

**code**

The native code.

Default is `''`.

**includes**

An array of includes.

Default is `[]`.

**language**

The used language.

Default is `''`.

## Properties

### .[code](#code) : string

The native code.

Default is `''`.

### .[global](#global) : boolean

This flag is used for global cache.

Default is `true`.

**Overrides:** [Node#global](Node.html#global)

### .[includes](#includes) : Array.<[Node](Node.html)\>

An array of includes

Default is `[]`.

### .[isCodeNode](#isCodeNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[language](#language) : 'js' | 'wgsl' | 'glsl'

The used language.

Default is `''`.

## Methods

### .[getIncludes](#getIncludes)( builder : [NodeBuilder](NodeBuilder.html) ) : Array.<[Node](Node.html)\>

Returns the includes of this code node.

**builder**

The current node builder.

**Returns:** The includes.

### .[setIncludes](#setIncludes)( includes : Array.<[Node](Node.html)\> ) : [CodeNode](CodeNode.html)

Sets the includes of this code node.

**includes**

The includes to set.

**Returns:** A reference to this node.

## Source

[src/nodes/code/CodeNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/code/CodeNode.js)