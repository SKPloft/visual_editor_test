Title: UniformArrayNode
Source URL: https://threejs.org/docs/pages/UniformArrayNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [InputNode](InputNode.html) → [UniformNode](UniformNode.html) → [BufferNode](BufferNode.html) →

# UniformArrayNode

Similar to [BufferNode](BufferNode.html) this module represents array-like data as uniform buffers. Unlike [BufferNode](BufferNode.html), it can handle more common data types in the array (e.g `three.js` primitives) and automatically manage buffer padding. It should be the first choice when working with uniforms buffers.

## Code Example

```js
const tintColors = uniformArray( [
	new Color( 1, 0, 0 ),
	new Color( 0, 1, 0 ),
	new Color( 0, 0, 1 )
], 'color' );
const redColor = tintColors.element( 0 );
```

## Constructor

### new [UniformArrayNode](#UniformArrayNode)( value : Array.<[any](global.html#any)\>, elementType : string )

Constructs a new uniform array node.

**value**

Array holding the buffer data.

**elementType**

The data type of a buffer element.

Default is `null`.

## Properties

### .[array](#array) : Array.<[any](global.html#any)\>

Array holding the buffer data. Unlike [BufferNode](BufferNode.html), the array can hold number primitives as well as three.js objects like vectors, matrices or colors.

### .[elementType](#elementType) : string

The data type of an array element.

### .[isArrayBufferNode](#isArrayBufferNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[paddedType](#paddedType) : string

The padded type. Uniform buffers must conform to a certain buffer layout so a separate type is computed to ensure correct buffer size.

### .[updateType](#updateType) : string

Overwritten since uniform array nodes are updated per render.

Default is `'render'`.

**Overrides:** [BufferNode#updateType](BufferNode.html#updateType)

## Methods

### .[element](#element)( indexNode : [IndexNode](IndexNode.html) ) : [UniformArrayElementNode](UniformArrayElementNode.html)

Overwrites the default `element()` method to provide element access based on [UniformArrayNode](UniformArrayNode.html).

**indexNode**

The index node.

### .[generateNodeType](#generateNodeType)( builder : [NodeBuilder](NodeBuilder.html) ) : string

This method is overwritten since the node type is inferred from the [UniformArrayNode#paddedType](UniformArrayNode.html#paddedType).

**builder**

The current node builder.

**Overrides:** [BufferNode#generateNodeType](BufferNode.html#generateNodeType)

**Returns:** The node type.

### .[getElementType](#getElementType)( builder : [NodeBuilder](NodeBuilder.html) ) : string

The data type of the array elements.

**builder**

The current node builder.

**Overrides:** [BufferNode#getElementType](BufferNode.html#getElementType)

**Returns:** The element type.

### .[getPaddedType](#getPaddedType)() : string

Returns the padded type based on the element type.

**Returns:** The padded type.

### .[setup](#setup)( builder : [NodeBuilder](NodeBuilder.html) ) : null

Implement the value buffer creation based on the array data.

**builder**

A reference to the current node builder.

**Overrides:** [BufferNode#setup](BufferNode.html#setup)

### .[update](#update)( frame : [NodeFrame](NodeFrame.html) )

The update makes sure to correctly transfer the data from the (complex) objects in the array to the internal, correctly padded value buffer.

**frame**

A reference to the current node frame.

**Overrides:** [BufferNode#update](BufferNode.html#update)

## Source

[src/nodes/accessors/UniformArrayNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/accessors/UniformArrayNode.js)