Title: WorkgroupInfoElementNode
Source URL: https://threejs.org/docs/pages/WorkgroupInfoElementNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [ArrayElementNode](ArrayElementNode.html) →

# WorkgroupInfoElementNode

Represents an element of a 'workgroup' scoped buffer.

## Constructor

### new [WorkgroupInfoElementNode](#WorkgroupInfoElementNode)( workgroupInfoNode : [Node](Node.html), indexNode : [Node](Node.html) )

Constructs a new workgroup info element node.

**workgroupInfoNode**

The workgroup info node.

**indexNode**

The index node that defines the element access.

## Properties

### .[isWorkgroupInfoElementNode](#isWorkgroupInfoElementNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

## Source

[src/nodes/gpgpu/WorkgroupInfoNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/gpgpu/WorkgroupInfoNode.js)