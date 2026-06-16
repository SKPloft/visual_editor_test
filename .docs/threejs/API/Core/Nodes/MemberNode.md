Title: MemberNode
Source URL: https://threejs.org/docs/pages/MemberNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) →

# MemberNode

Base class for representing member access on an object-like node data structures.

## Constructor

### new [MemberNode](#MemberNode)( structNode : [Node](Node.html), property : string )

Constructs a member node.

**structNode**

The struct node.

**property**

The property name.

## Properties

### .[isMemberNode](#isMemberNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[property](#property) : [Node](Node.html)

The property name.

### .[structNode](#structNode) : [Node](Node.html)

The struct node.

## Source

[src/nodes/utils/MemberNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/utils/MemberNode.js)