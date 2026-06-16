Title: ComputeNode
Source URL: https://threejs.org/docs/pages/ComputeNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) →

# ComputeNode

Represents a compute shader node.

## Constructor

### new [ComputeNode](#ComputeNode)( computeNode : [Node](Node.html), workgroupSize : Array.<number> )

Constructs a new compute node.

**computeNode**

The node that defines the compute shader logic.

**workgroupSize**

An array defining the X, Y, and Z dimensions of the workgroup for compute shader execution.

## Properties

### .[computeNode](#computeNode) : [Node](Node.html)

The node that defines the compute shader logic.

### .[count](#count) : number | Array.<number>

The total number of threads (invocations) to execute. If it is a number, it will be used to automatically generate bounds checking against `instanceIndex`.

### .[countNode](#countNode) : [UniformNode](UniformNode.html)

A uniform node holding the dispatch count for bounds checking. Created automatically when `count` is a number.

### .[dispatchSize](#dispatchSize) : number | Array.<number>

The dispatch size for workgroups on X, Y, and Z axes. Used directly if `count` is not provided.

### .[isComputeNode](#isComputeNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[name](#name) : string

The name or label of the uniform.

Default is `''`.

**Overrides:** [Node#name](Node.html#name)

### .[onInitFunction](#onInitFunction) : function

A callback executed when the compute node finishes initialization.

### .[updateBeforeType](#updateBeforeType) : string

The `updateBeforeType` is set to `NodeUpdateType.OBJECT` since [ComputeNode#updateBefore](ComputeNode.html#updateBefore) is executed once per object by default.

Default is `'object'`.

**Overrides:** [Node#updateBeforeType](Node.html#updateBeforeType)

### .[version](#version) : number

The version of the node.

**Overrides:** [Node#version](Node.html#version)

### .[workgroupSize](#workgroupSize) : Array.<number>

An array defining the X, Y, and Z dimensions of the workgroup for compute shader execution.

Default is `[ 64 ]`.

## Methods

### .[dispose](#dispose)()

Executes the `dispose` event for this node.

**Overrides:** [Node#dispose](Node.html#dispose)

### .[label](#label)( name : string ) : [ComputeNode](ComputeNode.html)

Sets the [ComputeNode#name](ComputeNode.html#name) property.

**name**

The name of the uniform.

**Deprecated:** Yes

**Returns:** A reference to this node.

### .[onInit](#onInit)( callback : function ) : [ComputeNode](ComputeNode.html)

Sets the callback to run during initialization.

**callback**

The callback function.

**Returns:** A reference to this node.

### .[setName](#setName)( name : string ) : [ComputeNode](ComputeNode.html)

Sets the [ComputeNode#name](ComputeNode.html#name) property.

**name**

The name of the uniform.

**Returns:** A reference to this node.

### .[updateBefore](#updateBefore)( frame : [NodeFrame](NodeFrame.html) )

The method execute the compute for this node.

**frame**

A reference to the current node frame.

**Overrides:** [Node#updateBefore](Node.html#updateBefore)

## Source

[src/nodes/gpgpu/ComputeNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/gpgpu/ComputeNode.js)