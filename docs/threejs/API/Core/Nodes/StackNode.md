Title: StackNode
Source URL: https://threejs.org/docs/pages/StackNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) →

# StackNode

Stack is a helper for Nodes that need to produce stack-based code instead of continuous flow. They are usually needed in cases like `If`, `Else`.

## Constructor

### new [StackNode](#StackNode)( parent : [StackNode](StackNode.html) )

Constructs a new stack node.

**parent**

The parent stack node.

Default is `null`.

## Properties

### .[isStackNode](#isStackNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[nodes](#nodes) : Array.<[Node](Node.html)\>

List of nodes.

### .[outputNode](#outputNode) : [Node](Node.html)

The output node.

Default is `null`.

### .[parent](#parent) : [StackNode](StackNode.html)

The parent stack node.

Default is `null`.

## Methods

### .[Case](#Case)( …params : [any](global.html#any) ) : [StackNode](StackNode.html)

Represents a `case` statement in TSL. The TSL version accepts an arbitrary numbers of values. The last parameter must be the callback method that should be executed in the `true` case.

**params**

The values of the `Case()` statement as well as the callback method.

**Returns:** A reference to this stack node.

### .[Default](#Default)( method : function ) : [StackNode](StackNode.html)

Represents the default code block of a Switch/Case statement.

**method**

TSL code which is executed in the `else` case.

**Returns:** A reference to this stack node.

### .[Else](#Else)( method : function ) : [StackNode](StackNode.html)

Represent an `else` statement in TSL.

**method**

TSL code which is executed in the `else` case.

**Returns:** A reference to this stack node.

### .[ElseIf](#ElseIf)( boolNode : [Node](Node.html), method : function ) : [StackNode](StackNode.html)

Represent an `elseif` statement in TSL.

**boolNode**

Represents the condition.

**method**

TSL code which is executed if the condition evaluates to `true`.

**Returns:** A reference to this stack node.

### .[If](#If)( boolNode : [Node](Node.html), method : function ) : [StackNode](StackNode.html)

Represent an `if` statement in TSL.

**boolNode**

Represents the condition.

**method**

TSL code which is executed if the condition evaluates to `true`.

**Returns:** A reference to this stack node.

### .[Switch](#Switch)( expression : [any](global.html#any), method : function ) : [StackNode](StackNode.html)

Represents a `switch` statement in TSL.

**expression**

Represents the expression.

**method**

TSL code which is executed if the condition evaluates to `true`.

**Returns:** A reference to this stack node.

### .[addToStack](#addToStack)( node : [Node](Node.html), index : number ) : [StackNode](StackNode.html)

Adds a node to this stack.

**node**

The node to add.

**index**

The index where the node should be added.

Default is `this.nodes.length`.

**Returns:** A reference to this stack node.

### .[addToStackBefore](#addToStackBefore)( node : [Node](Node.html) ) : [StackNode](StackNode.html)

Adds a node to the stack before the current node.

**node**

The node to add.

**Returns:** A reference to this stack node.

## Source

[src/nodes/core/StackNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/core/StackNode.js)