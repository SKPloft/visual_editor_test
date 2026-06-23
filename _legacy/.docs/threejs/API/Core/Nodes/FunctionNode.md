Title: FunctionNode
Source URL: https://threejs.org/docs/pages/FunctionNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [CodeNode](CodeNode.html) →

# FunctionNode

This class represents a native shader function. It can be used to implement certain aspects of a node material with native shader code. There are two predefined TSL functions for easier usage.

*   `wgslFn`: Creates a WGSL function node.
*   `glslFn`: Creates a GLSL function node.

A basic example with one include looks like so:

## Code Example

```js
const desaturateWGSLFn = wgslFn( `
	fn desaturate( color:vec3<f32> ) -> vec3<f32> {
		let lum = vec3<f32>( 0.299, 0.587, 0.114 );
		return vec3<f32>( dot( lum, color ) );
	}`
);
const someWGSLFn = wgslFn( `
	fn someFn( color:vec3<f32> ) -> vec3<f32> {
		return desaturate( color );
	}
`, [ desaturateWGSLFn ] );
material.colorNode = someWGSLFn( { color: texture( map ) } );
```

## Constructor

### new [FunctionNode](#FunctionNode)( code : string, includes : Array.<[Node](Node.html)\>, language : 'js' | 'wgsl' | 'glsl' )

Constructs a new function node.

**code**

The native code.

Default is `''`.

**includes**

An array of includes.

Default is `[]`.

**language**

The used language.

Default is `''`.

## Methods

### .[generateNodeType](#generateNodeType)( builder : [NodeBuilder](NodeBuilder.html) ) : string

Returns the type of this function node.

**builder**

The current node builder.

**Overrides:** [CodeNode#generateNodeType](CodeNode.html#generateNodeType)

**Returns:** The type.

### .[getInputs](#getInputs)( builder : [NodeBuilder](NodeBuilder.html) ) : Array.<[NodeFunctionInput](NodeFunctionInput.html)\>

Returns the inputs of this function node.

**builder**

The current node builder.

**Returns:** The inputs.

### .[getMemberType](#getMemberType)( builder : [NodeBuilder](NodeBuilder.html), name : string ) : string

Returns the type of a member of this function node.

**builder**

The current node builder.

**name**

The name of the member.

**Overrides:** [CodeNode#getMemberType](CodeNode.html#getMemberType)

**Returns:** The type of the member.

### .[getNodeFunction](#getNodeFunction)( builder : [NodeBuilder](NodeBuilder.html) ) : [NodeFunction](NodeFunction.html)

Returns the node function for this function node.

**builder**

The current node builder.

**Returns:** The node function.

## Source

[src/nodes/code/FunctionNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/code/FunctionNode.js)