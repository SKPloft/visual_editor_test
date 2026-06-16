Title: MeshLambertMaterial
Source URL: https://threejs.org/docs/pages/MeshLambertMaterial.html

[EventDispatcher](EventDispatcher.html) → [Material](Material.html) →

# MeshLambertMaterial

A material for non-shiny surfaces, without specular highlights.

The material uses a non-physically based [Lambertian](https://en.wikipedia.org/wiki/Lambertian_reflectance) model for calculating reflectance. This can simulate some surfaces (such as untreated wood or stone) well, but cannot simulate shiny surfaces with specular highlights (such as varnished wood). `MeshLambertMaterial` uses per-fragment shading.

Due to the simplicity of the reflectance and illumination models, performance will be greater when using this material over the [MeshPhongMaterial](MeshPhongMaterial.html), [MeshStandardMaterial](MeshStandardMaterial.html) or [MeshPhysicalMaterial](MeshPhysicalMaterial.html), at the cost of some graphical accuracy.

## Constructor

### new [MeshLambertMaterial](#MeshLambertMaterial)( parameters : Object )

Constructs a new mesh lambert material.

**parameters**

An object with one or more properties defining the material's appearance. Any property of the material (including any property from inherited materials) can be passed in here. Color values can be passed any type of value accepted by [Color#set](Color.html#set).

## Properties

### .[alphaMap](#alphaMap) : [Texture](Texture.html)

The alpha map is a grayscale texture that controls the opacity across the surface (black: fully transparent; white: fully opaque).

Only the color of the texture is used, ignoring the alpha channel if one exists. For RGB and RGBA textures, the renderer will use the green channel when sampling this texture due to the extra bit of precision provided for green in DXT-compressed and uncompressed RGB 565 formats. Luminance-only and luminance/alpha textures will also still work as expected.

Default is `null`.

### .[aoMap](#aoMap) : [Texture](Texture.html)

The red channel of this texture is used as the ambient occlusion map. Requires a second set of UVs.

Default is `null`.

### .[aoMapIntensity](#aoMapIntensity) : number

Intensity of the ambient occlusion effect. Range is `[0,1]`, where `0` disables ambient occlusion. Where intensity is `1` and the AO map's red channel is also `1`, ambient light is fully occluded on a surface.

Default is `1`.

### .[bumpMap](#bumpMap) : [Texture](Texture.html)

The texture to create a bump map. The black and white values map to the perceived depth in relation to the lights. Bump doesn't actually affect the geometry of the object, only the lighting. If a normal map is defined this will be ignored.

Default is `null`.

### .[bumpScale](#bumpScale) : number

How much the bump map affects the material. Typical range is `[0,1]`.

Default is `1`.

### .[color](#color) : [Color](Color.html)

Color of the material.

Default is `(1,1,1)`.

### .[combine](#combine) : [MultiplyOperation](global.html#MultiplyOperation) | [MixOperation](global.html#MixOperation) | [AddOperation](global.html#AddOperation)

How to combine the result of the surface's color with the environment map, if any.

When set to `MixOperation`, the [MeshBasicMaterial#reflectivity](MeshBasicMaterial.html#reflectivity) is used to blend between the two colors.

Default is `MultiplyOperation`.

### .[displacementBias](#displacementBias) : number

The offset of the displacement map's values on the mesh's vertices. The bias is added to the scaled sample of the displacement map. Without a displacement map set, this value is not applied.

Default is `0`.

### .[displacementMap](#displacementMap) : [Texture](Texture.html)

The displacement map affects the position of the mesh's vertices. Unlike other maps which only affect the light and shade of the material the displaced vertices can cast shadows, block other objects, and otherwise act as real geometry. The displacement texture is an image where the value of each pixel (white being the highest) is mapped against, and repositions, the vertices of the mesh.

Default is `null`.

### .[displacementScale](#displacementScale) : number

How much the displacement map affects the mesh (where black is no displacement, and white is maximum displacement). Without a displacement map set, this value is not applied.

Default is `0`.

### .[emissive](#emissive) : [Color](Color.html)

Emissive (light) color of the material, essentially a solid color unaffected by other lighting.

Default is `(0,0,0)`.

### .[emissiveIntensity](#emissiveIntensity) : number

Intensity of the emissive light. Modulates the emissive color.

Default is `1`.

### .[emissiveMap](#emissiveMap) : [Texture](Texture.html)

Set emissive (glow) map. The emissive map color is modulated by the emissive color and the emissive intensity. If you have an emissive map, be sure to set the emissive color to something other than black.

Default is `null`.

### .[envMap](#envMap) : [Texture](Texture.html)

The environment map.

Default is `null`.

### .[envMapIntensity](#envMapIntensity) : number

Scales the effect of the environment map by multiplying its color.

Default is `1`.

### .[envMapRotation](#envMapRotation) : [Euler](Euler.html)

The rotation of the environment map in radians.

Default is `(0,0,0)`.

### .[flatShading](#flatShading) : boolean

Whether the material is rendered with flat shading or not.

Default is `false`.

### .[fog](#fog) : boolean

Whether the material is affected by fog or not.

Default is `true`.

### .[isMeshLambertMaterial](#isMeshLambertMaterial) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[lightMap](#lightMap) : [Texture](Texture.html)

The light map. Requires a second set of UVs.

Default is `null`.

### .[lightMapIntensity](#lightMapIntensity) : number

Intensity of the baked light.

Default is `1`.

### .[map](#map) : [Texture](Texture.html)

The color map. May optionally include an alpha channel, typically combined with [Material#transparent](Material.html#transparent) or [Material#alphaTest](Material.html#alphaTest). The texture map color is modulated by the diffuse `color`.

Default is `null`.

### .[normalMap](#normalMap) : [Texture](Texture.html)

The texture to create a normal map. The RGB values affect the surface normal for each pixel fragment and change the way the color is lit. Normal maps do not change the actual shape of the surface, only the lighting. In case the material has a normal map authored using the left handed convention, the `y` component of `normalScale` should be negated to compensate for the different handedness.

Default is `null`.

### .[normalMapType](#normalMapType) : [TangentSpaceNormalMap](global.html#TangentSpaceNormalMap) | [ObjectSpaceNormalMap](global.html#ObjectSpaceNormalMap)

The type of normal map.

Default is `TangentSpaceNormalMap`.

### .[normalScale](#normalScale) : [Vector2](Vector2.html)

How much the normal map affects the material. Typical value range is `[0,1]`.

Default is `(1,1)`.

### .[reflectivity](#reflectivity) : number

How much the environment map affects the surface. The valid range is between `0` (no reflections) and `1` (full reflections).

Default is `1`.

### .[refractionRatio](#refractionRatio) : number

The index of refraction (IOR) of air (approximately 1) divided by the index of refraction of the material. It is used with environment mapping modes [CubeRefractionMapping](global.html#CubeRefractionMapping) and [EquirectangularRefractionMapping](global.html#EquirectangularRefractionMapping). The refraction ratio should not exceed `1`.

Default is `0.98`.

### .[specularMap](#specularMap) : [Texture](Texture.html)

Specular map used by the material.

Default is `null`.

### .[wireframe](#wireframe) : boolean

Renders the geometry as a wireframe.

Default is `false`.

### .[wireframeLinecap](#wireframeLinecap) : 'round' | 'bevel' | 'miter'

Defines appearance of wireframe ends.

Can only be used with [SVGRenderer](SVGRenderer.html).

Default is `'round'`.

### .[wireframeLinejoin](#wireframeLinejoin) : 'round' | 'bevel' | 'miter'

Defines appearance of wireframe joints.

Can only be used with [SVGRenderer](SVGRenderer.html).

Default is `'round'`.

### .[wireframeLinewidth](#wireframeLinewidth) : number

Controls the thickness of the wireframe.

Can only be used with [SVGRenderer](SVGRenderer.html).

Default is `1`.

## Source

[src/materials/MeshLambertMaterial.js](https://github.com/mrdoob/three.js/blob/master/src/materials/MeshLambertMaterial.js)