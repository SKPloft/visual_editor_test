Title: BufferAttributeNode
Source URL: https://threejs.org/docs/pages/BufferAttributeNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [InputNode](InputNode.html) →

# BufferAttributeNode

In earlier `three.js` versions it was only possible to define attribute data on geometry level. With `BufferAttributeNode`, it is also possible to do this on the node level.

This new approach is especially interesting when geometry data are generated via compute shaders. The below line converts a storage buffer into an attribute node.

```js
material.positionNode = positionBuffer.toAttribute();
```

## Code Example

```js
const geometry = new THREE.PlaneGeometry();
const positionAttribute = geometry.getAttribute( 'position' );
const colors = [];
for ( let i = 0; i < position.count; i ++ ) {
	colors.push( 1, 0, 0 );
}
material.colorNode = bufferAttribute( new THREE.Float32BufferAttribute( colors, 3 ) );
```

## Constructor

### new [BufferAttributeNode](#BufferAttributeNode)( value : [BufferAttribute](BufferAttribute.html) | [InterleavedBuffer](InterleavedBuffer.html) | TypedArray, bufferType : string, bufferStride : number, bufferOffset : number )

Constructs a new buffer attribute node.

**value**

The attribute data.

**bufferType**

The buffer type (e.g. `'vec3'`).

Default is `null`.

**bufferStride**

The buffer stride.

Default is `0`.

**bufferOffset**

The buffer offset.

Default is `0`.

## Properties

### .[attribute](#attribute) : [BufferAttribute](BufferAttribute.html)

A reference to the buffer attribute.

Default is `null`.

### .[bufferOffset](#bufferOffset) : number

The buffer offset.

Default is `0`.

### .[bufferStride](#bufferStride) : number

The buffer stride.

Default is `0`.

### .[bufferType](#bufferType) : string

The buffer type (e.g. `'vec3'`).

Default is `null`.

### .[global](#global) : boolean

`BufferAttributeNode` sets this property to `true` by default.

Default is `true`.

**Overrides:** [InputNode#global](InputNode.html#global)

### .[instanced](#instanced) : boolean

Whether the attribute is instanced or not.

Default is `false`.

### .[isBufferNode](#isBufferNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[usage](#usage) : number

The usage property. Set this to `THREE.DynamicDrawUsage` via `.setUsage()`, if you are planning to update the attribute data per frame.

Default is `StaticDrawUsage`.

## Methods

### .[generate](#generate)( builder : [NodeBuilder](NodeBuilder.html) ) : string

Generates the code snippet of the buffer attribute node.

**builder**

The current node builder.

**Overrides:** [InputNode#generate](InputNode.html#generate)

**Returns:** The generated code snippet.

### .[generateNodeType](#generateNodeType)( builder : [NodeBuilder](NodeBuilder.html) ) : string

This method is overwritten since the node type is inferred from the buffer attribute.

**builder**

The current node builder.

**Overrides:** [InputNode#generateNodeType](InputNode.html#generateNodeType)

**Returns:** The node type.

### .[getHash](#getHash)( builder : [NodeBuilder](NodeBuilder.html) ) : string

This method is overwritten since the attribute data might be shared and thus the hash should be shared as well.

**builder**

The current node builder.

**Overrides:** [InputNode#getHash](InputNode.html#getHash)

**Returns:** The hash.

### .[getInputType](#getInputType)( builder : [NodeBuilder](NodeBuilder.html) ) : string

Overwrites the default implementation to return a fixed value `'bufferAttribute'`.

**builder**

The current node builder.

**Overrides:** [InputNode#getInputType](InputNode.html#getInputType)

**Returns:** The input type.

### .[setInstanced](#setInstanced)( value : boolean ) : [BufferAttributeNode](BufferAttributeNode.html)

Sets the `instanced` property to the given value.

**value**

The value to set.

**Returns:** A reference to this node.

### .[setUsage](#setUsage)( value : number ) : [BufferAttributeNode](BufferAttributeNode.html)

Sets the `usage` property to the given value.

**value**

The usage to set.

**Returns:** A reference to this node.

### .[setup](#setup)( builder : [NodeBuilder](NodeBuilder.html) )

Depending on which value was passed to the node, `setup()` behaves differently. If no instance of `BufferAttribute` was passed, the method creates an internal attribute and configures it respectively.

**builder**

The current node builder.

**Overrides:** [InputNode#setup](InputNode.html#setup)

## Source

[src/nodes/accessors/BufferAttributeNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/accessors/BufferAttributeNode.js)