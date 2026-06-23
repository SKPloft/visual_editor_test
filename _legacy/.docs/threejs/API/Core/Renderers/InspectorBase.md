Title: InspectorBase
Source URL: https://threejs.org/docs/pages/InspectorBase.html

[EventDispatcher](EventDispatcher.html) →

# InspectorBase

### new [InspectorBase](#InspectorBase)()

InspectorBase is the base class for all inspectors.

## Properties

### .[currentFrame](#currentFrame) : Object

The current frame being processed.

### .[nodeFrame](#nodeFrame)

Returns the node frame for the current renderer.

## Methods

### .[begin](#begin)()

Called when a frame begins.

### .[beginCompute](#beginCompute)( uid : string, computeNode : [ComputeNode](ComputeNode.html) )

Called when a compute operation begins.

**uid**

A unique identifier for the render context.

**computeNode**

The compute node being executed.

### .[beginRender](#beginRender)( uid : string, scene : [Scene](Scene.html), camera : [Camera](Camera.html), renderTarget : [WebGLRenderTarget](WebGLRenderTarget.html) )

Called when a render operation begins.

**uid**

A unique identifier for the render context.

**scene**

The scene being rendered.

**camera**

The camera being used for rendering.

**renderTarget**

The render target, if any.

### .[computeAsync](#computeAsync)( computeNode : [ComputeNode](ComputeNode.html), dispatchSizeOrCount : number | Array.<number> )

When a compute operation is performed.

**computeNode**

The compute node being executed.

**dispatchSizeOrCount**

The dispatch size or count.

### .[copyFramebufferToTexture](#copyFramebufferToTexture)( framebufferTexture : [Texture](Texture.html) )

Called when a framebuffer copy operation is performed.

**framebufferTexture**

The texture associated with the framebuffer.

### .[copyTextureToTexture](#copyTextureToTexture)( srcTexture : [Texture](Texture.html), dstTexture : [Texture](Texture.html) )

Called when a texture copy operation is performed.

**srcTexture**

The source texture.

**dstTexture**

The destination texture.

### .[finish](#finish)()

Called when a frame ends.

### .[finishCompute](#finishCompute)( uid : string, computeNode : [ComputeNode](ComputeNode.html) )

Called when a compute operation ends.

**uid**

A unique identifier for the render context.

**computeNode**

The compute node being executed.

### .[finishRender](#finishRender)( uid : string )

Called when an animation loop ends.

**uid**

A unique identifier for the render context.

### .[getRenderer](#getRenderer)() : [WebGLRenderer](WebGLRenderer.html)

Returns the renderer associated with this inspector.

**Returns:** The associated renderer.

### .[init](#init)()

Initializes the inspector.

### .[inspect](#inspect)( node : [Node](Node.html) )

Inspects a node.

**node**

The node to inspect.

### .[setRenderer](#setRenderer)( renderer : [WebGLRenderer](WebGLRenderer.html) ) : [InspectorBase](InspectorBase.html)

Sets the renderer for this inspector.

**renderer**

The renderer to associate with this inspector.

**Returns:** This inspector instance.

## Source

[src/renderers/common/InspectorBase.js](https://github.com/mrdoob/three.js/blob/master/src/renderers/common/InspectorBase.js)

### new [InspectorBase](#InspectorBase)()

Creates a new InspectorBase.

## Properties

### .[currentFrame](#currentFrame) : Object

The current frame being processed.

### .[nodeFrame](#nodeFrame)

Returns the node frame for the current renderer.

## Methods

### .[begin](#begin)()

Called when a frame begins.

### .[beginCompute](#beginCompute)( uid : string, computeNode : [ComputeNode](ComputeNode.html) )

Called when a compute operation begins.

**uid**

A unique identifier for the render context.

**computeNode**

The compute node being executed.

### .[beginRender](#beginRender)( uid : string, scene : [Scene](Scene.html), camera : [Camera](Camera.html), renderTarget : [WebGLRenderTarget](WebGLRenderTarget.html) )

Called when a render operation begins.

**uid**

A unique identifier for the render context.

**scene**

The scene being rendered.

**camera**

The camera being used for rendering.

**renderTarget**

The render target, if any.

### .[computeAsync](#computeAsync)( computeNode : [ComputeNode](ComputeNode.html), dispatchSizeOrCount : number | Array.<number> )

When a compute operation is performed.

**computeNode**

The compute node being executed.

**dispatchSizeOrCount**

The dispatch size or count.

### .[copyFramebufferToTexture](#copyFramebufferToTexture)( framebufferTexture : [Texture](Texture.html) )

Called when a framebuffer copy operation is performed.

**framebufferTexture**

The texture associated with the framebuffer.

### .[copyTextureToTexture](#copyTextureToTexture)( srcTexture : [Texture](Texture.html), dstTexture : [Texture](Texture.html) )

Called when a texture copy operation is performed.

**srcTexture**

The source texture.

**dstTexture**

The destination texture.

### .[finish](#finish)()

Called when a frame ends.

### .[finishCompute](#finishCompute)( uid : string, computeNode : [ComputeNode](ComputeNode.html) )

Called when a compute operation ends.

**uid**

A unique identifier for the render context.

**computeNode**

The compute node being executed.

### .[finishRender](#finishRender)( uid : string )

Called when an animation loop ends.

**uid**

A unique identifier for the render context.

### .[getRenderer](#getRenderer)() : [WebGLRenderer](WebGLRenderer.html)

Returns the renderer associated with this inspector.

**Returns:** The associated renderer.

### .[init](#init)()

Initializes the inspector.

### .[inspect](#inspect)( node : [Node](Node.html) )

Inspects a node.

**node**

The node to inspect.

### .[setRenderer](#setRenderer)( renderer : [WebGLRenderer](WebGLRenderer.html) ) : [InspectorBase](InspectorBase.html)

Sets the renderer for this inspector.

**renderer**

The renderer to associate with this inspector.

**Returns:** This inspector instance.

## Source

[src/renderers/common/InspectorBase.js](https://github.com/mrdoob/three.js/blob/master/src/renderers/common/InspectorBase.js)