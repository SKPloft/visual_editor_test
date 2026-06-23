Title: TextureNode
Source URL: https://threejs.org/docs/pages/TextureNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [InputNode](InputNode.html) → [UniformNode](UniformNode.html) →

# TextureNode

This type of uniform node represents a 2D texture.

## Constructor

### new [TextureNode](#TextureNode)( value : [Texture](Texture.html), uvNode : [Node](Node.html).<(vec2|vec3)>, levelNode : [Node](Node.html).<int>, biasNode : [Node](Node.html).<float> )

Constructs a new texture node.

**value**

The texture.

Default is `EmptyTexture`.

**uvNode**

The uv node.

Default is `null`.

**levelNode**

The level node.

Default is `null`.

**biasNode**

The bias node.

Default is `null`.

## Properties

### .[biasNode](#biasNode) : [Node](Node.html).<float>

Represents the bias to be applied during level-of-detail computation.

Default is `null`.

### .[compareNode](#compareNode) : [Node](Node.html).<float>

Represents a reference value a texture sample is compared to.

Default is `null`.

### .[depthNode](#depthNode) : [Node](Node.html).<int>

When using texture arrays, the depth node defines the layer to select.

Default is `null`.

### .[gradNode](#gradNode) : Array.<[Node](Node.html).<vec2>>

When defined, a texture is sampled using explicit gradients.

Default is `null`.

### .[isTextureNode](#isTextureNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[levelNode](#levelNode) : [Node](Node.html).<int>

Represents the mip level that should be selected.

Default is `null`.

### .[offsetNode](#offsetNode) : [Node](Node.html).<(ivec2|ivec3)>

Represents the optional texel offset applied to the unnormalized texture coordinate before sampling the texture.

Default is `null`.

### .[referenceNode](#referenceNode) : [Node](Node.html)

The reference node.

Default is `null`.

### .[sampler](#sampler) : boolean

Whether texture values should be sampled or fetched.

Default is `true`.

### .[updateMatrix](#updateMatrix) : boolean

Whether the uv transformation matrix should be automatically updated or not. Use `setUpdateMatrix()` if you want to change the value of the property.

Default is `false`.

### .[updateType](#updateType) : string

By default the `update()` method is not executed. Depending on whether a uv transformation matrix and/or flipY is applied, `update()` is executed per object.

Default is `'none'`.

**Overrides:** [UniformNode#updateType](UniformNode.html#updateType)

### .[uvNode](#uvNode) : [Node](Node.html).<(vec2|vec3)>

Represents the texture coordinates.

Default is `null`.

### .[value](#value) : [Texture](Texture.html)

The texture value.

**Overrides:** [UniformNode#value](UniformNode.html#value)

## Methods

### .[bias](#bias)( biasNode : [Node](Node.html).<float> ) : [TextureNode](TextureNode.html)

Samples the texture with the given bias.

**biasNode**

The bias node.

**Returns:** A texture node representing the texture sample.

### .[blur](#blur)( amountNode : [Node](Node.html).<float> ) : [TextureNode](TextureNode.html)

Samples a blurred version of the texture by defining an internal bias.

**amountNode**

How blurred the texture should be.

**Returns:** A texture node representing the texture sample.

### .[clone](#clone)() : [TextureNode](TextureNode.html)

Clones the texture node.

**Returns:** The cloned texture node.

### .[compare](#compare)( compareNode : [Node](Node.html).<float> ) : [TextureNode](TextureNode.html)

Samples the texture by executing a compare operation.

**compareNode**

The node that defines the compare value.

**Returns:** A texture node representing the texture sample.

### .[depth](#depth)( depthNode : [Node](Node.html).<int> ) : [TextureNode](TextureNode.html)

Samples the texture by defining a depth node.

**depthNode**

The depth node.

**Returns:** A texture node representing the texture sample.

### .[generate](#generate)( builder : [NodeBuilder](NodeBuilder.html), output : string ) : string

Generates the code snippet of the texture node.

**builder**

The current node builder.

**output**

The current output.

**Overrides:** [UniformNode#generate](UniformNode.html#generate)

**Returns:** The generated code snippet.

### .[generateNodeType](#generateNodeType)( builder : [NodeBuilder](NodeBuilder.html) ) : string

Overwritten since the node type is inferred from the texture type.

**builder**

The current node builder.

**Overrides:** [UniformNode#generateNodeType](UniformNode.html#generateNodeType)

**Returns:** The node type.

### .[generateOffset](#generateOffset)( builder : [NodeBuilder](NodeBuilder.html), offsetNode : [Node](Node.html) ) : string

Generates the offset code snippet.

**builder**

The current node builder.

**offsetNode**

The offset node to generate code for.

**Returns:** The generated code snippet.

### .[generateSnippet](#generateSnippet)( builder : [NodeBuilder](NodeBuilder.html), textureProperty : string, uvSnippet : string, levelSnippet : string, biasSnippet : string, depthSnippet : string, compareSnippet : string, gradSnippet : Array.<string>, offsetSnippet : string ) : string

Generates the snippet for the texture sampling.

**builder**

The current node builder.

**textureProperty**

The texture property.

**uvSnippet**

The uv snippet.

**levelSnippet**

The level snippet.

**biasSnippet**

The bias snippet.

**depthSnippet**

The depth snippet.

**compareSnippet**

The compare snippet.

**gradSnippet**

The grad snippet.

**offsetSnippet**

The offset snippet.

**Returns:** The generated code snippet.

### .[generateUV](#generateUV)( builder : [NodeBuilder](NodeBuilder.html), uvNode : [Node](Node.html) ) : string

Generates the uv code snippet.

**builder**

The current node builder.

**uvNode**

The uv node to generate code for.

**Returns:** The generated code snippet.

### .[getBase](#getBase)() : [TextureNode](TextureNode.html)

Returns the base texture of this node.

**Returns:** The base texture node.

### .[getDefaultUV](#getDefaultUV)() : [AttributeNode](AttributeNode.html).<vec2>

Returns a default uvs based on the current texture's channel.

**Returns:** The default uvs.

### .[getInputType](#getInputType)( builder : [NodeBuilder](NodeBuilder.html) ) : string

Overwrites the default implementation to return a fixed value `'texture'`.

**builder**

The current node builder.

**Overrides:** [UniformNode#getInputType](UniformNode.html#getInputType)

**Returns:** The input type.

### .[getSampler](#getSampler)() : boolean

Returns the sampler value.

**Returns:** The sampler value.

### .[getTransformedUV](#getTransformedUV)( uvNode : [Node](Node.html) ) : [Node](Node.html)

Transforms the given uv node with the texture transformation matrix.

**uvNode**

The uv node to transform.

**Returns:** The transformed uv node.

### .[getUniformHash](#getUniformHash)( builder : [NodeBuilder](NodeBuilder.html) ) : string

Overwritten since the uniform hash is defined by the texture's UUID.

**builder**

The current node builder.

**Overrides:** [UniformNode#getUniformHash](UniformNode.html#getUniformHash)

**Returns:** The uniform hash.

### .[grad](#grad)( gradNodeX : [Node](Node.html).<vec2>, gradNodeY : [Node](Node.html).<vec2> ) : [TextureNode](TextureNode.html)

Samples the texture using an explicit gradient.

**gradNodeX**

The gradX node.

**gradNodeY**

The gradY node.

**Returns:** A texture node representing the texture sample.

### .[level](#level)( levelNode : [Node](Node.html).<int> ) : [TextureNode](TextureNode.html)

Samples a specific mip of the texture.

**levelNode**

The mip level to sample.

**Returns:** A texture node representing the texture sample.

### .[load](#load)( uvNode : [Node](Node.html).<uvec2> ) : [TextureNode](TextureNode.html)

TSL function for creating a texture node that fetches/loads texels without interpolation.

**uvNode**

The uv node.

**Returns:** A texture node representing the texture load.

### .[offset](#offset)( offsetNode : [Node](Node.html).<ivec2> ) : [TextureNode](TextureNode.html)

Samples the texture by defining an offset node.

**offsetNode**

The offset node.

**Returns:** A texture node representing the texture sample.

### .[sample](#sample)( uvNode : [Node](Node.html) ) : [TextureNode](TextureNode.html)

Samples the texture with the given uv node.

**uvNode**

The uv node.

**Returns:** A texture node representing the texture sample.

### .[setSampler](#setSampler)( value : boolean ) : [TextureNode](TextureNode.html)

Sets the sampler value.

**value**

The sampler value to set.

**Returns:** A reference to this texture node.

### .[setUpdateMatrix](#setUpdateMatrix)( value : boolean ) : [TextureNode](TextureNode.html)

Defines whether the uv transformation matrix should automatically be updated or not.

**value**

The update toggle.

**Returns:** A reference to this node.

### .[setup](#setup)( builder : [NodeBuilder](NodeBuilder.html) )

Setups texture node by preparing the internal nodes for code generation.

**builder**

The current node builder.

**Overrides:** [UniformNode#setup](UniformNode.html#setup)

### .[setupUV](#setupUV)( builder : [NodeBuilder](NodeBuilder.html), uvNode : [Node](Node.html) ) : [Node](Node.html)

Setups the uv node. Depending on the backend as well as texture's image and type, it might be necessary to modify the uv node for correct sampling.

**builder**

The current node builder.

**uvNode**

The uv node to setup.

**Returns:** The updated uv node.

### .[size](#size)( levelNode : [Node](Node.html).<int> ) : [TextureSizeNode](TextureSizeNode.html)

Returns the texture size of the requested level.

**levelNode**

The level to compute the size for.

**Returns:** The texture size.

### .[update](#update)()

The update is used to implement the update of the uv transformation matrix.

**Overrides:** [UniformNode#update](UniformNode.html#update)

### .[updateReference](#updateReference)( state : [any](global.html#any) ) : [Texture](Texture.html)

Overwritten to always return the texture reference of the node.

**state**

This method can be invocated in different contexts so `state` can refer to any object type.

**Overrides:** [UniformNode#updateReference](UniformNode.html#updateReference)

**Returns:** The texture reference.

## Source

[src/nodes/accessors/TextureNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/accessors/TextureNode.js)