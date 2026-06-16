Title: Node
Source URL: https://threejs.org/docs/pages/Node.html

[EventDispatcher](EventDispatcher.html) →

# Node

Base class for all nodes.

## Constructor

### new [Node](#Node)( nodeType : string )

Constructs a new node.

**nodeType**

The node type.

Default is `null`.

## Properties

### .[global](#global) : boolean

Whether this node is global or not. This property is relevant for the internal node caching system. All nodes which should be declared just once should set this flag to `true` (a typical example is [AttributeNode](AttributeNode.html)).

Default is `false`.

### .[id](#id) : number (readonly)

The unique ID of the node.

### .[isNode](#isNode) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[name](#name) : string

The name of the node.

Default is `''`.

### .[needsUpdate](#needsUpdate) : boolean

Set this property to `true` when the node should be regenerated.

Default is `false`.

### .[nodeType](#nodeType) : string

The node type. This represents the result type of the node (e.g. `float` or `vec3`).

Default is `null`.

### .[parents](#parents) : boolean

Create a list of parents for this node during the build process.

Default is `false`.

### .[stackTrace](#stackTrace) : string

The stack trace of the node for debugging purposes.

Default is `null`.

### .[type](#type) : string (readonly)

The type of the class. The value is usually the constructor name.

### .[updateAfterType](#updateAfterType) : string

The update type of the node's [Node#updateAfter](Node.html#updateAfter) method. Possible values are listed in [NodeUpdateType](global.html#NodeUpdateType).

Default is `'none'`.

### .[updateBeforeType](#updateBeforeType) : string

The update type of the node's [Node#updateBefore](Node.html#updateBefore) method. Possible values are listed in [NodeUpdateType](global.html#NodeUpdateType).

Default is `'none'`.

### .[updateType](#updateType) : string

The update type of the node's [Node#update](Node.html#update) method. Possible values are listed in [NodeUpdateType](global.html#NodeUpdateType).

Default is `'none'`.

### .[uuid](#uuid) : string (readonly)

The UUID of the node.

### .[version](#version) : number (readonly)

The version of the node. The version automatically is increased when [Node#needsUpdate](Node.html#needsUpdate) is set to `true`.

Default is `0`.

### .[captureStackTrace](#.captureStackTrace) : boolean

Enables or disables the automatic capturing of stack traces for nodes.

Default is `false`.

## Methods

### .[analyze](#analyze)( builder : [NodeBuilder](NodeBuilder.html), output : [Node](Node.html) )

Represents the analyze stage which is the second step of the build process, see [Node#build](Node.html#build) method. This stage analyzes the node hierarchy and ensures descendent nodes are built.

**builder**

The current node builder.

**output**

The target output node.

Default is `null`.

### .[build](#build)( builder : [NodeBuilder](NodeBuilder.html), output : string | [Node](Node.html) ) : [Node](Node.html) | string

This method performs the build of a node. The behavior and return value depend on the current build stage:

*   **setup**: Prepares the node and its children for the build process. This process can also create new nodes. Returns the node itself or a variant.
*   **analyze**: Analyzes the node hierarchy for optimizations in the code generation stage. Returns `null`.
*   **generate**: Generates the shader code for the node. Returns the generated shader string.

**builder**

The current node builder.

**output**

Can be used to define the output type.

Default is `null`.

**Returns:** The result of the build process, depending on the build stage.

### .[customCacheKey](#customCacheKey)() : number

Generate a custom cache key for this node.

**Returns:** The cache key of the node.

### .[deserialize](#deserialize)( json : Object )

Deserializes the node from the given JSON.

**json**

The JSON object.

### .[dispose](#dispose)()

Calling this method dispatches the `dispose` event. This event can be used to register event listeners for clean up tasks.

### .[generate](#generate)( builder : [NodeBuilder](NodeBuilder.html), output : string ) : string

Represents the generate stage which is the third step of the build process, see [Node#build](Node.html#build) method. This state builds the output node and returns the resulting shader string.

**builder**

The current node builder.

**output**

Can be used to define the output type.

**Returns:** The generated shader string.

### .[generateNodeType](#generateNodeType)( builder : [NodeBuilder](NodeBuilder.html), output : string ) : string

Returns the node's type.

**builder**

The current node builder.

**output**

The output of the node.

Default is `null`.

**Returns:** The type of the node.

### .[getArrayCount](#getArrayCount)( builder : [NodeBuilder](NodeBuilder.html) ) : number

Returns the number of elements in the node array.

**builder**

The current node builder.

**Returns:** The number of elements in the node array.

### .[getCacheKey](#getCacheKey)( force : boolean, ignores : Set.<[Node](Node.html)\> ) : number

Returns the cache key for this node.

**force**

When set to `true`, a recomputation of the cache key is forced.

Default is `false`.

**ignores**

A set of nodes to ignore during the computation of the cache key.

Default is `null`.

**Returns:** The cache key of the node.

### .[getChildren](#getChildren)() : [Node](Node.html) (generator)

Generator function that can be used to iterate over the child nodes.

##### Yields:

A child node.

### .[getElementType](#getElementType)( builder : [NodeBuilder](NodeBuilder.html) ) : string

Certain types are composed of multiple elements. For example a `vec3` is composed of three `float` values. This method returns the type of these elements.

**builder**

The current node builder.

**Returns:** The type of the node.

### .[getHash](#getHash)( builder : [NodeBuilder](NodeBuilder.html) ) : string

Returns the hash of the node which is used to identify the node. By default it's the [Node#uuid](Node.html#uuid) however derived node classes might have to overwrite this method depending on their implementation.

**builder**

The current node builder.

**Returns:** The hash.

### .[getMemberType](#getMemberType)( builder : [NodeBuilder](NodeBuilder.html), name : string ) : string

Returns the node member type for the given name.

**builder**

The current node builder.

**name**

The name of the member.

**Returns:** The type of the node.

### .[getNodeType](#getNodeType)( builder : [NodeBuilder](NodeBuilder.html), output : string ) : string

Returns the node's type.

**builder**

The current node builder.

**output**

The output of the node.

Default is `null`.

**Returns:** The type of the node.

### .[getScope](#getScope)() : [Node](Node.html)

Returns the references to this node which is by default `this`.

**Returns:** A reference to this node.

### .[getSerializeChildren](#getSerializeChildren)() : Generator.<Object>

Returns the child nodes as a JSON object.

**Returns:** An iterable list of serialized child objects as JSON.

### .[getShared](#getShared)( builder : [NodeBuilder](NodeBuilder.html) ) : [Node](Node.html)

This method is used during the build process of a node and ensures equal nodes are not built multiple times but just once. For example if `attribute( 'uv' )` is used multiple times by the user, the build process makes sure to process just the first node.

**builder**

The current node builder.

**Returns:** The shared node if possible. Otherwise `this` is returned.

### .[getUpdateAfterType](#getUpdateAfterType)() : [NodeUpdateType](global.html#NodeUpdateType)

Returns the update type of [Node#updateAfter](Node.html#updateAfter).

**Returns:** The update type.

### .[getUpdateBeforeType](#getUpdateBeforeType)() : [NodeUpdateType](global.html#NodeUpdateType)

Returns the update type of [Node#updateBefore](Node.html#updateBefore).

**Returns:** The update type.

### .[getUpdateType](#getUpdateType)() : [NodeUpdateType](global.html#NodeUpdateType)

Returns the update type of [Node#update](Node.html#update).

**Returns:** The update type.

### .[isGlobal](#isGlobal)( builder : [NodeBuilder](NodeBuilder.html) ) : boolean

By default this method returns the value of the [Node#global](Node.html#global) flag. This method can be overwritten in derived classes if an analytical way is required to determine the global cache referring to the current shader-stage.

**builder**

The current node builder.

**Returns:** Whether this node is global or not.

### .[onFrameUpdate](#onFrameUpdate)( callback : function ) : [Node](Node.html)

Convenient method for defining [Node#update](Node.html#update). Similar to [Node#onUpdate](Node.html#onUpdate), but this method automatically sets the update type to `FRAME`.

**callback**

The update method.

**Returns:** A reference to this node.

### .[onObjectUpdate](#onObjectUpdate)( callback : function ) : [Node](Node.html)

Convenient method for defining [Node#update](Node.html#update). Similar to [Node#onUpdate](Node.html#onUpdate), but this method automatically sets the update type to `OBJECT`.

**callback**

The update method.

**Returns:** A reference to this node.

### .[onReference](#onReference)( callback : function ) : [Node](Node.html)

Convenient method for defining [Node#updateReference](Node.html#updateReference).

**callback**

The update method.

**Returns:** A reference to this node.

### .[onRenderUpdate](#onRenderUpdate)( callback : function ) : [Node](Node.html)

Convenient method for defining [Node#update](Node.html#update). Similar to [Node#onUpdate](Node.html#onUpdate), but this method automatically sets the update type to `RENDER`.

**callback**

The update method.

**Returns:** A reference to this node.

### .[onUpdate](#onUpdate)( callback : function, updateType : string ) : [Node](Node.html)

Convenient method for defining [Node#update](Node.html#update).

**callback**

The update method.

**updateType**

The update type.

**Returns:** A reference to this node.

### .[serialize](#serialize)( json : Object )

Serializes the node to JSON.

**json**

The output JSON object.

### .[setup](#setup)( builder : [NodeBuilder](NodeBuilder.html) ) : [Node](Node.html)

Represents the setup stage which is the first step of the build process, see [Node#build](Node.html#build) method. This method is often overwritten in derived modules to prepare the node which is used as a node's output/result. If an output node is prepared, then it must be returned in the `return` statement of the derived module's setup function.

**builder**

The current node builder.

**Returns:** The output node.

### .[toJSON](#toJSON)( meta : Object ) : Object

Serializes the node into the three.js JSON Object/Scene format.

**meta**

An optional JSON object that already holds serialized data from other scene objects.

**Returns:** The serialized node.

### .[traverse](#traverse)( callback : [traverseCallback](global.html#traverseCallback) )

Can be used to traverse through the node's hierarchy.

**callback**

A callback that is executed per node.

### .[update](#update)( frame : [NodeFrame](NodeFrame.html) ) : boolean (abstract)

The method can be implemented to update the node's internal state when it is used to render an object. The [Node#updateType](Node.html#updateType) property defines how often the update is executed.

**frame**

A reference to the current node frame.

**Returns:** An optional bool that indicates whether the implementation actually performed an update or not (e.g. due to caching).

### .[updateAfter](#updateAfter)( frame : [NodeFrame](NodeFrame.html) ) : boolean (abstract)

The method can be implemented to update the node's internal state after it was used to render an object. The [Node#updateAfterType](Node.html#updateAfterType) property defines how often the update is executed.

**frame**

A reference to the current node frame.

**Returns:** An optional bool that indicates whether the implementation actually performed an update or not (e.g. due to caching).

### .[updateBefore](#updateBefore)( frame : [NodeFrame](NodeFrame.html) ) : boolean (abstract)

The method can be implemented to update the node's internal state before it is used to render an object. The [Node#updateBeforeType](Node.html#updateBeforeType) property defines how often the update is executed.

**frame**

A reference to the current node frame.

**Returns:** An optional bool that indicates whether the implementation actually performed an update or not (e.g. due to caching).

### .[updateReference](#updateReference)( state : [any](global.html#any) ) : [any](global.html#any)

Nodes might refer to other objects like materials. This method allows to dynamically update the reference to such objects based on a given state (e.g. the current node frame or builder).

**state**

This method can be invocated in different contexts so `state` can refer to any object type.

**Returns:** The updated reference.

## Source

[src/nodes/core/Node.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/core/Node.js)