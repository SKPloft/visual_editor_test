Title: BlendMode
Source URL: https://threejs.org/docs/pages/BlendMode.html

# BlendMode

Represents blending configuration.

This class encapsulates all blending-related properties that control how a material's colors are combined with the colors already in the frame buffer.

## Constructor

### new [BlendMode](#BlendMode)( blending : [NoBlending](global.html#NoBlending) | [NormalBlending](global.html#NormalBlending) | [AdditiveBlending](global.html#AdditiveBlending) | [SubtractiveBlending](global.html#SubtractiveBlending) | [MultiplyBlending](global.html#MultiplyBlending) | [CustomBlending](global.html#CustomBlending) | [MaterialBlending](global.html#MaterialBlending) )

Constructs a new blending configuration.

**blending**

The blending mode.

Default is `NormalBlending`.

## Properties

### .[blendDst](#blendDst) : [ZeroFactor](global.html#ZeroFactor) | [OneFactor](global.html#OneFactor) | [SrcColorFactor](global.html#SrcColorFactor) | [OneMinusSrcColorFactor](global.html#OneMinusSrcColorFactor) | [SrcAlphaFactor](global.html#SrcAlphaFactor) | [OneMinusSrcAlphaFactor](global.html#OneMinusSrcAlphaFactor) | [DstAlphaFactor](global.html#DstAlphaFactor) | [OneMinusDstAlphaFactor](global.html#OneMinusDstAlphaFactor) | [DstColorFactor](global.html#DstColorFactor) | [OneMinusDstColorFactor](global.html#OneMinusDstColorFactor) | [SrcAlphaSaturateFactor](global.html#SrcAlphaSaturateFactor) | [ConstantColorFactor](global.html#ConstantColorFactor) | [OneMinusConstantColorFactor](global.html#OneMinusConstantColorFactor) | [ConstantAlphaFactor](global.html#ConstantAlphaFactor) | [OneMinusConstantAlphaFactor](global.html#OneMinusConstantAlphaFactor)

Defines the blending destination factor.

This determines how the destination (existing) fragment color in the frame buffer is factored before being combined with the source (incoming) fragment color.

Default is `OneMinusSrcAlphaFactor`.

### .[blendDstAlpha](#blendDstAlpha) : [ZeroFactor](global.html#ZeroFactor) | [OneFactor](global.html#OneFactor) | [SrcColorFactor](global.html#SrcColorFactor) | [OneMinusSrcColorFactor](global.html#OneMinusSrcColorFactor) | [SrcAlphaFactor](global.html#SrcAlphaFactor) | [OneMinusSrcAlphaFactor](global.html#OneMinusSrcAlphaFactor) | [DstAlphaFactor](global.html#DstAlphaFactor) | [OneMinusDstAlphaFactor](global.html#OneMinusDstAlphaFactor) | [DstColorFactor](global.html#DstColorFactor) | [OneMinusDstColorFactor](global.html#OneMinusDstColorFactor) | [SrcAlphaSaturateFactor](global.html#SrcAlphaSaturateFactor) | [ConstantColorFactor](global.html#ConstantColorFactor) | [OneMinusConstantColorFactor](global.html#OneMinusConstantColorFactor) | [ConstantAlphaFactor](global.html#ConstantAlphaFactor) | [OneMinusConstantAlphaFactor](global.html#OneMinusConstantAlphaFactor)

Defines the blending destination alpha factor.

When set, this allows separate control of the alpha channel's destination blending factor. If `null`, [BlendMode#blendDst](BlendMode.html#blendDst) is used for the alpha channel as well.

Default is `null`.

### .[blendEquation](#blendEquation) : [AddEquation](global.html#AddEquation) | [SubtractEquation](global.html#SubtractEquation) | [ReverseSubtractEquation](global.html#ReverseSubtractEquation) | [MinEquation](global.html#MinEquation) | [MaxEquation](global.html#MaxEquation)

Defines the blending equation.

This determines how the source and destination colors are combined.

Default is `AddEquation`.

### .[blendEquationAlpha](#blendEquationAlpha) : [AddEquation](global.html#AddEquation) | [SubtractEquation](global.html#SubtractEquation) | [ReverseSubtractEquation](global.html#ReverseSubtractEquation) | [MinEquation](global.html#MinEquation) | [MaxEquation](global.html#MaxEquation)

Defines the blending equation of the alpha channel.

When set, this allows separate control of the alpha channel's blending equation. If `null`, [BlendMode#blendEquation](BlendMode.html#blendEquation) is used for the alpha channel as well.

Default is `null`.

### .[blendSrc](#blendSrc) : [ZeroFactor](global.html#ZeroFactor) | [OneFactor](global.html#OneFactor) | [SrcColorFactor](global.html#SrcColorFactor) | [OneMinusSrcColorFactor](global.html#OneMinusSrcColorFactor) | [SrcAlphaFactor](global.html#SrcAlphaFactor) | [OneMinusSrcAlphaFactor](global.html#OneMinusSrcAlphaFactor) | [DstAlphaFactor](global.html#DstAlphaFactor) | [OneMinusDstAlphaFactor](global.html#OneMinusDstAlphaFactor) | [DstColorFactor](global.html#DstColorFactor) | [OneMinusDstColorFactor](global.html#OneMinusDstColorFactor) | [SrcAlphaSaturateFactor](global.html#SrcAlphaSaturateFactor) | [ConstantColorFactor](global.html#ConstantColorFactor) | [OneMinusConstantColorFactor](global.html#OneMinusConstantColorFactor) | [ConstantAlphaFactor](global.html#ConstantAlphaFactor) | [OneMinusConstantAlphaFactor](global.html#OneMinusConstantAlphaFactor)

Defines the blending source factor.

This determines how the source (incoming) fragment color is factored before being added to the destination (existing) fragment color in the frame buffer.

Default is `SrcAlphaFactor`.

### .[blendSrcAlpha](#blendSrcAlpha) : [ZeroFactor](global.html#ZeroFactor) | [OneFactor](global.html#OneFactor) | [SrcColorFactor](global.html#SrcColorFactor) | [OneMinusSrcColorFactor](global.html#OneMinusSrcColorFactor) | [SrcAlphaFactor](global.html#SrcAlphaFactor) | [OneMinusSrcAlphaFactor](global.html#OneMinusSrcAlphaFactor) | [DstAlphaFactor](global.html#DstAlphaFactor) | [OneMinusDstAlphaFactor](global.html#OneMinusDstAlphaFactor) | [DstColorFactor](global.html#DstColorFactor) | [OneMinusDstColorFactor](global.html#OneMinusDstColorFactor) | [SrcAlphaSaturateFactor](global.html#SrcAlphaSaturateFactor) | [ConstantColorFactor](global.html#ConstantColorFactor) | [OneMinusConstantColorFactor](global.html#OneMinusConstantColorFactor) | [ConstantAlphaFactor](global.html#ConstantAlphaFactor) | [OneMinusConstantAlphaFactor](global.html#OneMinusConstantAlphaFactor)

Defines the blending source alpha factor.

When set, this allows separate control of the alpha channel's source blending factor. If `null`, [BlendMode#blendSrc](BlendMode.html#blendSrc) is used for the alpha channel as well.

Default is `null`.

### .[blending](#blending) : [NoBlending](global.html#NoBlending) | [NormalBlending](global.html#NormalBlending) | [AdditiveBlending](global.html#AdditiveBlending) | [SubtractiveBlending](global.html#SubtractiveBlending) | [MultiplyBlending](global.html#MultiplyBlending) | [CustomBlending](global.html#CustomBlending) | [MaterialBlending](global.html#MaterialBlending)

Defines the blending type.

It must be set to `CustomBlending` if custom blending properties like [BlendMode#blendSrc](BlendMode.html#blendSrc), [BlendMode#blendDst](BlendMode.html#blendDst) or [BlendMode#blendEquation](BlendMode.html#blendEquation) should have any effect.

Default is `NormalBlending`.

### .[premultiplyAlpha](#premultiplyAlpha) : boolean

Defines whether to premultiply the alpha (transparency) value.

If `true`, the RGB color of the texture or material is multiplied by its alpha value. This is useful for transparent textures/materials where the color data should already include the transparency information.

Default is `false`.

## Methods

### .[clone](#clone)() : [BlendMode](BlendMode.html)

Returns a clone of this blending configuration.

**Returns:** A new Blending instance with the same properties.

### .[copy](#copy)( source : [BlendMode](BlendMode.html) ) : [BlendMode](BlendMode.html)

Copies the blending properties from the given source to this instance.

**source**

The blending configuration to copy from.

**Returns:** A reference to this instance.

## Source

[src/renderers/common/BlendMode.js](https://github.com/mrdoob/three.js/blob/master/src/renderers/common/BlendMode.js)