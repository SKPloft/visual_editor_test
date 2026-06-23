Title: SubgroupFunctionNode
Source URL: https://threejs.org/docs/pages/SubgroupFunctionNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [TempNode](TempNode.html) →

# SubgroupFunctionNode

This class represents a set of built in WGSL shader functions that sync synchronously execute an operation across a subgroup, or 'warp', of compute or fragment shader invocations within a workgroup. Typically, these functions will synchronously execute an operation using data from all active invocations within the subgroup, then broadcast that result to all active invocations. In other graphics APIs, subgroup functions are also referred to as wave intrinsics (DirectX/HLSL) or warp intrinsics (CUDA).

## Constructor

### new [SubgroupFunctionNode](#SubgroupFunctionNode)( method : string, aNode : [Node](Node.html), bNode : [Node](Node.html) )

Constructs a new function node.

**method**

The subgroup/wave intrinsic method to construct.

**aNode**

The method's first argument.

Default is `null`.

**bNode**

The method's second argument.

Default is `null`.

## Properties

### .[aNode](#aNode) : [Node](Node.html)

The method's first argument.

### .[bNode](#bNode) : [Node](Node.html)

The method's second argument.

### .[method](#method) : string

The subgroup/wave intrinsic method to construct.

## Source

[src/nodes/gpgpu/SubgroupFunctionNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/gpgpu/SubgroupFunctionNode.js)