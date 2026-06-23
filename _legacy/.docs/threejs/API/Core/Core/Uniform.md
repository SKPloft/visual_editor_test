Title: Uniform
Source URL: https://threejs.org/docs/pages/Uniform.html

# Uniform

Represents a uniform which is a global shader variable. They are passed to shader programs.

When declaring a uniform of a [ShaderMaterial](ShaderMaterial.html), it is declared by value or by object.

Since this class can only be used in context of [ShaderMaterial](ShaderMaterial.html), it is only supported in [WebGLRenderer](WebGLRenderer.html).

## Code Example

```js
uniforms: {
	time: { value: 1.0 },
	resolution: new Uniform( new Vector2() )
};
```

## Constructor

### new [Uniform](#Uniform)( value : [any](global.html#any) )

Constructs a new uniform.

**value**

The uniform value.

## Properties

### .[boundary](#boundary) : number

Used to build the uniform buffer according to the STD140 layout. Derived uniforms will set this property to a data type specific value.

### .[index](#index) : number

This property is set by [UniformsGroup](UniformsGroup.html) and marks the index position in the uniform array.

### .[itemSize](#itemSize) : number

The item size. Derived uniforms will set this property to a data type specific value.

### .[name](#name) : string

The uniform's name.

### .[offset](#offset) : number

This property is set by [UniformsGroup](UniformsGroup.html) and marks the start position in the uniform buffer.

### .[value](#value) : [any](global.html#any)

The uniform value.

### .[value](#value) : [any](global.html#any)

The uniform's value.

## Methods

### .[clone](#clone)() : [Uniform](Uniform.html)

Returns a new uniform with copied values from this instance. If the value has a `clone()` method, the value is cloned as well.

**Returns:** A clone of this instance.

### .[getValue](#getValue)() : [any](global.html#any)

Returns the uniform's value.

**Returns:** The value.

### .[setValue](#setValue)( value : [any](global.html#any) )

Sets the uniform's value.

**value**

The value to set.

## Source

[src/core/Uniform.js](https://github.com/mrdoob/three.js/blob/master/src/core/Uniform.js)