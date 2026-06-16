Title: RendererReferenceNode
Source URL: https://threejs.org/docs/pages/RendererReferenceNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [ReferenceBaseNode](ReferenceBaseNode.html) →

# RendererReferenceNode

This node is a special type of reference node which is intended for linking renderer properties with node values.

When changing `renderer.toneMappingExposure`, the node value of `exposureNode` will automatically be updated.

## Code Example

```js
const exposureNode = rendererReference( 'toneMappingExposure', 'float', renderer );
```

## Constructor

### new [RendererReferenceNode](#RendererReferenceNode)( property : string, inputType : string, renderer : [Renderer](Renderer.html) )

Constructs a new renderer reference node.

**property**

The name of the property the node refers to.

**inputType**

The uniform type that should be used to represent the property value.

**renderer**

The renderer the property belongs to. When no renderer is set, the node refers to the renderer of the current state.

Default is `null`.

## Properties

### .[renderer](#renderer) : [Renderer](Renderer.html)

The renderer the property belongs to. When no renderer is set, the node refers to the renderer of the current state.

Default is `null`.

## Methods

### .[updateReference](#updateReference)( state : [NodeFrame](NodeFrame.html) | [NodeBuilder](NodeBuilder.html) ) : Object

Updates the reference based on the given state. The state is only evaluated [RendererReferenceNode#renderer](RendererReferenceNode.html#renderer) is not set.

**state**

The current state.

**Overrides:** [ReferenceBaseNode#updateReference](ReferenceBaseNode.html#updateReference)

**Returns:** The updated reference.

## Source

[src/nodes/accessors/RendererReferenceNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/accessors/RendererReferenceNode.js)