Title: InterleavedBufferAttribute
Source URL: https://threejs.org/docs/pages/InterleavedBufferAttribute.html

# InterleavedBufferAttribute

An alternative version of a buffer attribute with interleaved data. Interleaved attributes share a common interleaved data storage ([InterleavedBuffer](InterleavedBuffer.html)) and refer with different offsets into the buffer.

## Constructor

### new [InterleavedBufferAttribute](#InterleavedBufferAttribute)( interleavedBuffer : [InterleavedBuffer](InterleavedBuffer.html), itemSize : number, offset : number, normalized : boolean )

Constructs a new interleaved buffer attribute.

**interleavedBuffer**

The buffer holding the interleaved data.

**itemSize**

The item size.

**offset**

The attribute offset into the buffer.

**normalized**

Whether the data are normalized or not.

Default is `false`.

## Properties

### .[array](#array) : TypedArray

The array holding the interleaved buffer attribute data.

### .[count](#count) : number (readonly)

The item count of this buffer attribute.

### .[data](#data) : [InterleavedBuffer](InterleavedBuffer.html)

The buffer holding the interleaved data.

### .[isInterleavedBufferAttribute](#isInterleavedBufferAttribute) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[itemSize](#itemSize) : number

The item size, see [BufferAttribute#itemSize](BufferAttribute.html#itemSize).

### .[name](#name) : string

The name of the buffer attribute.

### .[needsUpdate](#needsUpdate) : number

Flag to indicate that this attribute has changed and should be re-sent to the GPU. Set this to `true` when you modify the value of the array.

Default is `false`.

### .[normalized](#normalized) : [InterleavedBuffer](InterleavedBuffer.html)

Whether the data are normalized or not, see [BufferAttribute#normalized](BufferAttribute.html#normalized)

### .[offset](#offset) : number

The attribute offset into the buffer.

## Methods

### .[applyMatrix4](#applyMatrix4)( m : [Matrix4](Matrix4.html) ) : [InterleavedBufferAttribute](InterleavedBufferAttribute.html)

Applies the given 4x4 matrix to the given attribute. Only works with item size `3`.

**m**

The matrix to apply.

**Returns:** A reference to this instance.

### .[applyNormalMatrix](#applyNormalMatrix)( m : [Matrix3](Matrix3.html) ) : [InterleavedBufferAttribute](InterleavedBufferAttribute.html)

Applies the given 3x3 normal matrix to the given attribute. Only works with item size `3`.

**m**

The normal matrix to apply.

**Returns:** A reference to this instance.

### .[clone](#clone)( data : Object ) : [BufferAttribute](BufferAttribute.html) | [InterleavedBufferAttribute](InterleavedBufferAttribute.html)

Returns a new buffer attribute with copied values from this instance.

If no parameter is provided, cloning an interleaved buffer attribute will de-interleave buffer data.

**data**

An object with interleaved buffers that allows to retain the interleaved property.

**Returns:** A clone of this instance.

### .[getComponent](#getComponent)( index : number, component : number ) : number

Returns the given component of the vector at the given index.

**index**

The index into the buffer attribute.

**component**

The component index.

**Returns:** The returned value.

### .[getW](#getW)( index : number ) : number

Returns the w component of the vector at the given index.

**index**

The index into the buffer attribute.

**Returns:** The w component.

### .[getX](#getX)( index : number ) : number

Returns the x component of the vector at the given index.

**index**

The index into the buffer attribute.

**Returns:** The x component.

### .[getY](#getY)( index : number ) : number

Returns the y component of the vector at the given index.

**index**

The index into the buffer attribute.

**Returns:** The y component.

### .[getZ](#getZ)( index : number ) : number

Returns the z component of the vector at the given index.

**index**

The index into the buffer attribute.

**Returns:** The z component.

### .[setComponent](#setComponent)( index : number, component : number, value : number ) : [InterleavedBufferAttribute](InterleavedBufferAttribute.html)

Sets the given value to the given component of the vector at the given index.

**index**

The index into the buffer attribute.

**component**

The component index.

**value**

The value to set.

**Returns:** A reference to this instance.

### .[setW](#setW)( index : number, w : number ) : [InterleavedBufferAttribute](InterleavedBufferAttribute.html)

Sets the w component of the vector at the given index.

**index**

The index into the buffer attribute.

**w**

The value to set.

**Returns:** A reference to this instance.

### .[setX](#setX)( index : number, x : number ) : [InterleavedBufferAttribute](InterleavedBufferAttribute.html)

Sets the x component of the vector at the given index.

**index**

The index into the buffer attribute.

**x**

The value to set.

**Returns:** A reference to this instance.

### .[setXY](#setXY)( index : number, x : number, y : number ) : [InterleavedBufferAttribute](InterleavedBufferAttribute.html)

Sets the x and y component of the vector at the given index.

**index**

The index into the buffer attribute.

**x**

The value for the x component to set.

**y**

The value for the y component to set.

**Returns:** A reference to this instance.

### .[setXYZ](#setXYZ)( index : number, x : number, y : number, z : number ) : [InterleavedBufferAttribute](InterleavedBufferAttribute.html)

Sets the x, y and z component of the vector at the given index.

**index**

The index into the buffer attribute.

**x**

The value for the x component to set.

**y**

The value for the y component to set.

**z**

The value for the z component to set.

**Returns:** A reference to this instance.

### .[setXYZW](#setXYZW)( index : number, x : number, y : number, z : number, w : number ) : [InterleavedBufferAttribute](InterleavedBufferAttribute.html)

Sets the x, y, z and w component of the vector at the given index.

**index**

The index into the buffer attribute.

**x**

The value for the x component to set.

**y**

The value for the y component to set.

**z**

The value for the z component to set.

**w**

The value for the w component to set.

**Returns:** A reference to this instance.

### .[setY](#setY)( index : number, y : number ) : [InterleavedBufferAttribute](InterleavedBufferAttribute.html)

Sets the y component of the vector at the given index.

**index**

The index into the buffer attribute.

**y**

The value to set.

**Returns:** A reference to this instance.

### .[setZ](#setZ)( index : number, z : number ) : [InterleavedBufferAttribute](InterleavedBufferAttribute.html)

Sets the z component of the vector at the given index.

**index**

The index into the buffer attribute.

**z**

The value to set.

**Returns:** A reference to this instance.

### .[toJSON](#toJSON)( data : Object ) : Object

Serializes the buffer attribute into JSON.

If no parameter is provided, cloning an interleaved buffer attribute will de-interleave buffer data.

**data**

An optional value holding meta information about the serialization.

**Returns:** A JSON object representing the serialized buffer attribute.

### .[transformDirection](#transformDirection)( m : [Matrix4](Matrix4.html) ) : [InterleavedBufferAttribute](InterleavedBufferAttribute.html)

Applies the given 4x4 matrix to the given attribute. Only works with item size `3` and with direction vectors.

**m**

The matrix to apply.

**Returns:** A reference to this instance.

## Source

[src/core/InterleavedBufferAttribute.js](https://github.com/mrdoob/three.js/blob/master/src/core/InterleavedBufferAttribute.js)