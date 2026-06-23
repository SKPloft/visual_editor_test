Title: UserDataNode
Source URL: https://threejs.org/docs/pages/UserDataNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [ReferenceNode](ReferenceNode.html) →

# UserDataNode

A special type of reference node that allows to link values in `userData` fields to node objects.

Since `UserDataNode` is extended from [ReferenceNode](ReferenceNode.html), the node value will automatically be updated when the `rotation` user data field changes.

## Code Example

```js
sprite.userData.rotation = 1; // stores individual rotation per sprite
const material = new THREE.SpriteNodeMaterial();
material.rotationNode = userData( 'rotation', 'float' );
```

## Constructor

### new [UserDataNode](#UserDataNode)( property : string, inputType : string, userData : Object )

Constructs a new user data node.

**property**

The property name that should be referenced by the node.

**inputType**

The node data type of the reference.

**userData**

A reference to the `userData` object. If not provided, the `userData` property of the 3D object that uses the node material is evaluated.

Default is `null`.

## Properties

### .[userData](#userData) : Object

A reference to the `userData` object. If not provided, the `userData` property of the 3D object that uses the node material is evaluated.

Default is `null`.

## Methods

### .[updateReference](#updateReference)( state : [NodeFrame](NodeFrame.html) | [NodeBuilder](NodeBuilder.html) ) : Object

Overwritten to make sure [ReferenceNode#reference](ReferenceNode.html#reference) points to the correct `userData` field.

**state**

The current state to evaluate.

**Overrides:** [ReferenceNode#updateReference](ReferenceNode.html#updateReference)

**Returns:** A reference to the `userData` field.

## Source

[src/nodes/accessors/UserDataNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/accessors/UserDataNode.js)