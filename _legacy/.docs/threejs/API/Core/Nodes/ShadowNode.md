Title: ShadowNode
Source URL: https://threejs.org/docs/pages/ShadowNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [ShadowBaseNode](ShadowBaseNode.html) →

# ShadowNode

Represents the default shadow implementation for lighting nodes.

## Constructor

### new [ShadowNode](#ShadowNode)( light : [Light](Light.html), shadow : [LightShadow](LightShadow.html) )

Constructs a new shadow node.

**light**

The shadow casting light.

**shadow**

An optional light shadow.

Default is `null`.

## Properties

### .[depthLayer](#depthLayer) : number (readonly)

This index can be used when overriding setupRenderTarget with a RenderTarget Array to specify the depth layer.

Default is `true`.

### .[isShadowNode](#isShadowNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[shadow](#shadow) : [LightShadow](LightShadow.html)

The light shadow which defines the properties light's shadow.

Default is `null`.

### .[shadowMap](#shadowMap) : [RenderTarget](RenderTarget.html)

A reference to the shadow map which is a render target.

Default is `null`.

### .[vsmMaterialHorizontal](#vsmMaterialHorizontal) : [NodeMaterial](NodeMaterial.html)

Only relevant for VSM shadows. Node material which is used to render the second VSM pass.

Default is `null`.

### .[vsmMaterialVertical](#vsmMaterialVertical) : [NodeMaterial](NodeMaterial.html)

Only relevant for VSM shadows. Node material which is used to render the first VSM pass.

Default is `null`.

### .[vsmShadowMapHorizontal](#vsmShadowMapHorizontal) : [RenderTarget](RenderTarget.html)

Only relevant for VSM shadows. Render target for the second VSM render pass.

Default is `null`.

### .[vsmShadowMapVertical](#vsmShadowMapVertical) : [RenderTarget](RenderTarget.html)

Only relevant for VSM shadows. Render target for the first VSM render pass.

Default is `null`.

## Methods

### .[dispose](#dispose)()

Frees the internal resources of this shadow node.

**Overrides:** [ShadowBaseNode#dispose](ShadowBaseNode.html#dispose)

### .[getShadowFilterFn](#getShadowFilterFn)( type : number ) : function

Returns the shadow filtering function for the given shadow type.

**type**

The shadow type.

**Returns:** The filtering function.

### .[renderShadow](#renderShadow)( frame : [NodeFrame](NodeFrame.html) )

Renders the shadow. The logic of this function could be included into [ShadowNode#updateShadow](ShadowNode.html#updateShadow) however more specialized shadow nodes might require a custom shadow map rendering. By having a dedicated method, it's easier to overwrite the default behavior.

**frame**

A reference to the current node frame.

### .[setup](#setup)( builder : [NodeBuilder](NodeBuilder.html) ) : ShaderCallNodeInternal

The implementation performs the setup of the output node. An output is only produces if shadow mapping is globally enabled in the renderer.

**builder**

A reference to the current node builder.

**Overrides:** [ShadowBaseNode#setup](ShadowBaseNode.html#setup)

**Returns:** The output node.

### .[setupShadow](#setupShadow)( builder : [NodeBuilder](NodeBuilder.html) ) : [Node](Node.html).<vec3>

Setups the shadow output node.

**builder**

A reference to the current node builder.

**Returns:** The shadow output node.

### .[setupShadowCoord](#setupShadowCoord)( builder : [NodeBuilder](NodeBuilder.html), shadowPosition : [Node](Node.html).<vec3> ) : [Node](Node.html).<vec3>

Setups the shadow coordinates.

**builder**

A reference to the current node builder.

**shadowPosition**

A node representing the shadow position.

**Returns:** The shadow coordinates.

### .[setupShadowFilter](#setupShadowFilter)( builder : [NodeBuilder](NodeBuilder.html), inputs : Object ) : [Node](Node.html).<float>

Setups the shadow filtering.

**builder**

A reference to the current node builder.

**inputs**

A configuration object that defines the shadow filtering.

**filterFn**

This function defines the filtering type of the shadow map e.g. PCF.

**depthTexture**

A reference to the shadow map's texture data.

**shadowCoord**

Shadow coordinates which are used to sample from the shadow map.

**shadow**

The light shadow.

**Returns:** The result node of the shadow filtering.

### .[updateBefore](#updateBefore)( frame : [NodeFrame](NodeFrame.html) )

The implementation performs the update of the shadow map if necessary.

**frame**

A reference to the current node frame.

**Overrides:** [ShadowBaseNode#updateBefore](ShadowBaseNode.html#updateBefore)

### .[updateShadow](#updateShadow)( frame : [NodeFrame](NodeFrame.html) )

Updates the shadow.

**frame**

A reference to the current node frame.

### .[vsmPass](#vsmPass)( renderer : [Renderer](Renderer.html) )

For VSM additional render passes are required.

**renderer**

A reference to the current renderer.

## Source

[src/nodes/lighting/ShadowNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/lighting/ShadowNode.js)