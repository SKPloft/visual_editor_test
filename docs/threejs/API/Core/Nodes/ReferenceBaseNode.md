Title: ReferenceBaseNode
Source URL: https://threejs.org/docs/pages/ReferenceBaseNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) →

# ReferenceBaseNode

Base class for nodes which establishes a reference to a property of another object. In this way, the value of the node is automatically linked to the value of referenced object. Reference nodes internally represent the linked value as a uniform.

## Constructor

### new [ReferenceBaseNode](#ReferenceBaseNode)( property : string, uniformType : string, object : Object, count : number )

Constructs a new reference base node.

**property**

The name of the property the node refers to.

**uniformType**

The uniform type that should be used to represent the property value.

**object**

The object the property belongs to.

Default is `null`.

**count**

When the linked property is an array-like, this parameter defines its length.

Default is `null`.

## Properties

### .[count](#count) : number

When the linked property is an array, this parameter defines its length.

Default is `null`.

### .[group](#group) : [UniformGroupNode](UniformGroupNode.html)

The uniform group of the internal uniform.

Default is `null`.

### .[node](#node) : [UniformNode](UniformNode.html)

The uniform node that holds the value of the reference node.

Default is `null`.

### .[object](#object) : Object

The object the property belongs to.

Default is `null`.

### .[properties](#properties) : Array.<string>

The property name might have dots so nested properties can be referred. The hierarchy of the names is stored inside this array.

### .[property](#property) : string

The name of the property the node refers to.

### .[reference](#reference) : Object

Points to the current referred object. This property exists next to [ReferenceNode#object](ReferenceNode.html#object) since the final reference might be updated from calling code.

Default is `null`.

### .[uniformType](#uniformType) : string

The uniform type that should be used to represent the property value.

### .[updateType](#updateType) : string

Overwritten since reference nodes are updated per object.

Default is `'object'`.

**Overrides:** [Node#updateType](Node.html#updateType)

## Methods

### .[element](#element)( indexNode : [IndexNode](IndexNode.html) ) : [ReferenceElementNode](ReferenceElementNode.html)

When the referred property is array-like, this method can be used to access elements via an index node.

**indexNode**

indexNode.

**Returns:** A reference to an element.

### .[generateNodeType](#generateNodeType)( builder : [NodeBuilder](NodeBuilder.html) ) : string

This method is overwritten since the node type is inferred from the type of the reference node.

**builder**

The current node builder.

**Overrides:** [Node#generateNodeType](Node.html#generateNodeType)

**Returns:** The node type.

### .[getValueFromReference](#getValueFromReference)( object : Object ) : [any](global.html#any)

Returns the property value from the given referred object.

**object**

The object to retrieve the property value from.

Default is `this.reference`.

**Returns:** The value.

### .[setGroup](#setGroup)( group : [UniformGroupNode](UniformGroupNode.html) ) : [ReferenceBaseNode](ReferenceBaseNode.html)

Sets the uniform group for this reference node.

**group**

The uniform group to set.

**Returns:** A reference to this node.

### .[setNodeType](#setNodeType)( uniformType : string )

Sets the node type which automatically defines the internal uniform type.

**uniformType**

The type to set.

### .[setup](#setup)() : [UniformNode](UniformNode.html)

The output of the reference node is the internal uniform node.

**Overrides:** [Node#setup](Node.html#setup)

**Returns:** The output node.

### .[update](#update)( frame : [NodeFrame](NodeFrame.html) )

Overwritten to update the internal uniform value.

**frame**

A reference to the current node frame.

**Overrides:** [Node#update](Node.html#update)

### .[updateReference](#updateReference)( state : [NodeFrame](NodeFrame.html) | [NodeBuilder](NodeBuilder.html) ) : Object

Allows to update the reference based on the given state. The state is only evaluated [ReferenceBaseNode#object](ReferenceBaseNode.html#object) is not set.

**state**

The current state.

**Overrides:** [Node#updateReference](Node.html#updateReference)

**Returns:** The updated reference.

### .[updateValue](#updateValue)()

Retrieves the value from the referred object property and uses it to updated the internal uniform.

## Source

[src/nodes/accessors/ReferenceBaseNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/accessors/ReferenceBaseNode.js)