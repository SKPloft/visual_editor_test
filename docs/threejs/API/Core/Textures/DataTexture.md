Title: DataTexture
Source URL: https://threejs.org/docs/pages/DataTexture.html

[EventDispatcher](EventDispatcher.html) → [Texture](Texture.html) →

# DataTexture

Creates a texture directly from raw buffer data.

The interpretation of the data depends on type and format: If the type is `UnsignedByteType`, a `Uint8Array` will be useful for addressing the texel data. If the format is `RGBAFormat`, data needs four values for one texel; Red, Green, Blue and Alpha (typically the opacity).

## Constructor

### new [DataTexture](#DataTexture)( data : TypedArray, width : number, height : number, format : number, type : number, mapping : number, wrapS : number, wrapT : number, magFilter : number, minFilter : number, anisotropy : number, colorSpace : string )

Constructs a new data texture.

**data**

The buffer data.

Default is `null`.

**width**

The width of the texture.

Default is `1`.

**height**

The height of the texture.

Default is `1`.

**format**

The texture format.

Default is `RGBAFormat`.

**type**

The texture type.

Default is `UnsignedByteType`.

**mapping**

The texture mapping.

Default is `Texture.DEFAULT_MAPPING`.

**wrapS**

The wrapS value.

Default is `ClampToEdgeWrapping`.

**wrapT**

The wrapT value.

Default is `ClampToEdgeWrapping`.

**magFilter**

The mag filter value.

Default is `NearestFilter`.

**minFilter**

The min filter value.

Default is `NearestFilter`.

**anisotropy**

The anisotropy value.

Default is `Texture.DEFAULT_ANISOTROPY`.

**colorSpace**

The color space.

Default is `NoColorSpace`.

## Properties

### .[flipY](#flipY) : boolean

If set to `true`, the texture is flipped along the vertical axis when uploaded to the GPU.

Overwritten and set to `false` by default.

Default is `false`.

**Overrides:** [Texture#flipY](Texture.html#flipY)

### .[generateMipmaps](#generateMipmaps) : boolean

Whether to generate mipmaps (if possible) for a texture.

Overwritten and set to `false` by default.

Default is `false`.

**Overrides:** [Texture#generateMipmaps](Texture.html#generateMipmaps)

### .[image](#image) : Object

The image definition of a data texture.

**Overrides:** [Texture#image](Texture.html#image)

### .[isDataTexture](#isDataTexture) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[unpackAlignment](#unpackAlignment) : boolean

Specifies the alignment requirements for the start of each pixel row in memory.

Overwritten and set to `1` by default.

Default is `1`.

**Overrides:** [Texture#unpackAlignment](Texture.html#unpackAlignment)

## Source

[src/textures/DataTexture.js](https://github.com/mrdoob/three.js/blob/master/src/textures/DataTexture.js)