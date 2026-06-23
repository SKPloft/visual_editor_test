Title: ComputeBuiltinNode
Source URL: https://threejs.org/docs/pages/ComputeBuiltinNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) →

# ComputeBuiltinNode

`ComputeBuiltinNode` represents a compute-scope builtin value that expose information about the currently running dispatch and/or the device it is running on.

This node can only be used with a WebGPU backend.

## Constructor

### new [ComputeBuiltinNode](#ComputeBuiltinNode)( builtinName : string, nodeType : string )

Constructs a new compute builtin node.

**builtinName**

The built-in name.

**nodeType**

The node type.

## Methods

### .[generateNodeType](#generateNodeType)( builder : [NodeBuilder](NodeBuilder.html) ) : string

This method is overwritten since the node type is simply derived from `nodeType`..

**builder**

The current node builder.

**Overrides:** [Node#generateNodeType](Node.html#generateNodeType)

**Returns:** The node type.

### .[getBuiltinName](#getBuiltinName)( builder : [NodeBuilder](NodeBuilder.html) ) : string

Returns the builtin name.

**builder**

The current node builder.

**Returns:** The builtin name.

### .[getHash](#getHash)( builder : [NodeBuilder](NodeBuilder.html) ) : string

This method is overwritten since hash is derived from the built-in name.

**builder**

The current node builder.

**Overrides:** [Node#getHash](Node.html#getHash)

**Returns:** The hash.

### .[hasBuiltin](#hasBuiltin)( builder : [NodeBuilder](NodeBuilder.html) ) : boolean

Whether the current node builder has the builtin or not.

**builder**

The current node builder.

**Returns:** Whether the builder has the builtin or not.

### .[setBuiltinName](#setBuiltinName)( builtinName : string ) : [ComputeBuiltinNode](ComputeBuiltinNode.html)

Sets the builtin name.

**builtinName**

The built-in name.

**Returns:** A reference to this node.

## Source

[src/nodes/gpgpu/ComputeBuiltinNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/gpgpu/ComputeBuiltinNode.js)