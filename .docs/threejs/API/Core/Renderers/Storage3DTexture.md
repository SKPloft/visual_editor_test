Title: Storage3DTexture
Source URL: https://threejs.org/docs/pages/Storage3DTexture.html

[EventDispatcher](EventDispatcher.html) → [Texture](Texture.html) →

# Storage3DTexture

This special type of texture is intended for compute shaders. It can be used to compute the data of a texture with a compute shader.

Note: This type of texture can only be used with `WebGPURenderer` and a WebGPU backend.

## Constructor

### new [Storage3DTexture](#Storage3DTexture)( width : number, height : number, depth : number )

Constructs a new storage texture.

**width**

The storage texture's width.

Default is `1`.

**height**

The storage texture's height.

Default is `1`.

**depth**

The storage texture's depth.

Default is `1`.

## Properties

### .[image](#image) : Object

The image object which just represents the texture's dimension.

**Overrides:** [Texture#image](Texture.html#image)

### .[is3DTexture](#is3DTexture) : boolean

Indicates whether this texture is a 3D texture.

### .[isStorageTexture](#isStorageTexture) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[magFilter](#magFilter) : number

The default `magFilter` for storage textures is `THREE.LinearFilter`.

**Overrides:** [Texture#magFilter](Texture.html#magFilter)

### .[minFilter](#minFilter) : number

The default `minFilter` for storage textures is `THREE.LinearFilter`.

**Overrides:** [Texture#minFilter](Texture.html#minFilter)

### .[wrapR](#wrapR) : number

This defines how the texture is wrapped in the depth direction and corresponds to _W_ in UVW mapping.

## Methods

### .[setSize](#setSize)( width : number, height : number, depth : number )

Sets the size of the storage 3d texture.

**width**

The new width of the storage texture.

**height**

The new height of the storage texture.

**depth**

The new depth of the storage texture.

## Source

[src/renderers/common/Storage3DTexture.js](https://github.com/mrdoob/three.js/blob/master/src/renderers/common/Storage3DTexture.js)