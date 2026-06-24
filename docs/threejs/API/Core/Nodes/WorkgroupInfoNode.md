Title: WorkgroupInfoNode
Source URL: https://threejs.org/docs/pages/WorkgroupInfoNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) →

# WorkgroupInfoNode

A node allowing the user to create a 'workgroup' scoped buffer within the context of a compute shader. Typically, workgroup scoped buffers are created to hold data that is transferred from a global storage scope into a local workgroup scope. For invocations within a workgroup, data access speeds on 'workgroup' scoped buffers can be significantly faster than similar access operations on globally accessible storage buffers.

This node can only be used with a WebGPU backend.

## Constructor

### new [WorkgroupInfoNode](#WorkgroupInfoNode)( scope : string, bufferType : string, bufferCount : number )

Constructs a new buffer scoped to type scope.

**scope**

TODO.

**bufferType**

The data type of a 'workgroup' scoped buffer element.

**bufferCount**

The number of elements in the buffer.

Default is `0`.

## Properties

### .[bufferCount](#bufferCount) : number

The buffer count.

Default is `0`.

### .[bufferType](#bufferType) : string

The buffer type.

### .[elementType](#elementType) : string

The data type of the array buffer.

### .[isWorkgroupInfoNode](#isWorkgroupInfoNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[name](#name) : string

The name of the workgroup scoped buffer.

Default is `''`.

**Overrides:** [Node#name](Node.html#name)

### .[scope](#scope) : string

TODO.

## Methods

### .[element](#element)( indexNode : [IndexNode](IndexNode.html) ) : [WorkgroupInfoElementNode](WorkgroupInfoElementNode.html)

This method can be used to access elements via an index node.

**indexNode**

indexNode.

**Returns:** A reference to an element.

### .[getElementType](#getElementType)() : string

The data type of the array buffer.

**Overrides:** [Node#getElementType](Node.html#getElementType)

**Returns:** The element type.

### .[getInputType](#getInputType)( builder : [NodeBuilder](NodeBuilder.html) ) : string

Overwrites the default implementation since the input type is inferred from the scope.

**builder**

The current node builder.

**Returns:** The input type.

### .[label](#label)( name : string ) : [WorkgroupInfoNode](WorkgroupInfoNode.html)

Sets the name/label of this node.

**name**

The name to set.

**Deprecated:** Yes

**Returns:** A reference to this node.

### .[setName](#setName)( name : string ) : [WorkgroupInfoNode](WorkgroupInfoNode.html)

Sets the name of this node.

**name**

The name to set.

**Returns:** A reference to this node.

### .[setScope](#setScope)( scope : string ) : [WorkgroupInfoNode](WorkgroupInfoNode.html)

Sets the scope of this node.

**scope**

The scope to set.

**Returns:** A reference to this node.

## Source

[src/nodes/gpgpu/WorkgroupInfoNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/gpgpu/WorkgroupInfoNode.js)