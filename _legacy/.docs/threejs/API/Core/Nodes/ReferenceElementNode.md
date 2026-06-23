Title: ReferenceElementNode
Source URL: https://threejs.org/docs/pages/ReferenceElementNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [ArrayElementNode](ArrayElementNode.html) →

# ReferenceElementNode

This class is only relevant if the referenced property is array-like. In this case, `ReferenceElementNode` allows to refer to a specific element inside the data structure via an index.

## Constructor

### new [ReferenceElementNode](#ReferenceElementNode)( referenceNode : [ReferenceBaseNode](ReferenceBaseNode.html), indexNode : [Node](Node.html) )

Constructs a new reference element node.

**referenceNode**

The reference node.

**indexNode**

The index node that defines the element access.

## Properties

### .[isReferenceElementNode](#isReferenceElementNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[isReferenceElementNode](#isReferenceElementNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[referenceNode](#referenceNode) : [ReferenceBaseNode](ReferenceBaseNode.html)

Similar to [ReferenceBaseNode#reference](ReferenceBaseNode.html#reference), an additional property references to the current node.

Default is `null`.

### .[referenceNode](#referenceNode) : [ReferenceNode](ReferenceNode.html)

Similar to [ReferenceNode#reference](ReferenceNode.html#reference), an additional property references to the current node.

Default is `null`.

## Methods

### .[generateNodeType](#generateNodeType)() : string

This method is overwritten since the node type is inferred from the uniform type of the reference node.

**Overrides:** [ArrayElementNode#generateNodeType](ArrayElementNode.html#generateNodeType)

**Returns:** The node type.

### .[generateNodeType](#generateNodeType)() : string

This method is overwritten since the node type is inferred from the uniform type of the reference node.

**Overrides:** [ArrayElementNode#generateNodeType](ArrayElementNode.html#generateNodeType)

**Returns:** The node type.

## Source

[src/nodes/accessors/ReferenceBaseNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/accessors/ReferenceBaseNode.js)

This class is only relevant if the referenced property is array-like. In this case, `ReferenceElementNode` allows to refer to a specific element inside the data structure via an index.

## Constructor

### new [ReferenceElementNode](#ReferenceElementNode)( referenceNode : [ReferenceNode](ReferenceNode.html), indexNode : [Node](Node.html) )

Constructs a new reference element node.

**referenceNode**

The reference node.

**indexNode**

The index node that defines the element access.

## Properties

### .[isReferenceElementNode](#isReferenceElementNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[isReferenceElementNode](#isReferenceElementNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[referenceNode](#referenceNode) : [ReferenceBaseNode](ReferenceBaseNode.html)

Similar to [ReferenceBaseNode#reference](ReferenceBaseNode.html#reference), an additional property references to the current node.

Default is `null`.

### .[referenceNode](#referenceNode) : [ReferenceNode](ReferenceNode.html)

Similar to [ReferenceNode#reference](ReferenceNode.html#reference), an additional property references to the current node.

Default is `null`.

## Methods

### .[generateNodeType](#generateNodeType)() : string

This method is overwritten since the node type is inferred from the uniform type of the reference node.

**Overrides:** [ArrayElementNode#generateNodeType](ArrayElementNode.html#generateNodeType)

**Returns:** The node type.

### .[generateNodeType](#generateNodeType)() : string

This method is overwritten since the node type is inferred from the uniform type of the reference node.

**Overrides:** [ArrayElementNode#generateNodeType](ArrayElementNode.html#generateNodeType)

**Returns:** The node type.

## Source

[src/nodes/accessors/ReferenceNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/accessors/ReferenceNode.js)