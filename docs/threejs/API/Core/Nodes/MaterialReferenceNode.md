Title: MaterialReferenceNode
Source URL: https://threejs.org/docs/pages/MaterialReferenceNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [ReferenceNode](ReferenceNode.html) →

# MaterialReferenceNode

This node is a special type of reference node which is intended for linking material properties with node values.

When changing `material.opacity`, the node value of `opacityNode` will automatically be updated.

## Code Example

```js
const opacityNode = materialReference( 'opacity', 'float', material );
```

## Constructor

### new [MaterialReferenceNode](#MaterialReferenceNode)( property : string, inputType : string, material : [Material](Material.html) )

Constructs a new material reference node.

**property**

The name of the property the node refers to.

**inputType**

The uniform type that should be used to represent the property value.

**material**

The material the property belongs to. When no material is set, the node refers to the material of the current rendered object.

Default is `null`.

## Properties

### .[isMaterialReferenceNode](#isMaterialReferenceNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[material](#material) : [Material](Material.html)

The material the property belongs to. When no material is set, the node refers to the material of the current rendered object.

Default is `null`.

## Methods

### .[updateReference](#updateReference)( state : [NodeFrame](NodeFrame.html) | [NodeBuilder](NodeBuilder.html) ) : Object

Updates the reference based on the given state. The state is only evaluated [MaterialReferenceNode#material](MaterialReferenceNode.html#material) is not set.

**state**

The current state.

**Overrides:** [ReferenceNode#updateReference](ReferenceNode.html#updateReference)

**Returns:** The updated reference.

## Source

[src/nodes/accessors/MaterialReferenceNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/accessors/MaterialReferenceNode.js)