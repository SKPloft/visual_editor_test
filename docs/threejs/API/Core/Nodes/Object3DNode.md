Title: Object3DNode
Source URL: https://threejs.org/docs/pages/Object3DNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) →

# Object3DNode

This node can be used to access transformation related metrics of 3D objects. Depending on the selected scope, a different metric is represented as a uniform in the shader. The following scopes are supported:

*   `POSITION`: The object's position in world space.
*   `VIEW_POSITION`: The object's position in view/camera space.
*   `DIRECTION`: The object's direction in world space.
*   `SCALE`: The object's scale in world space.
*   `WORLD_MATRIX`: The object's matrix in world space.

## Constructor

### new [Object3DNode](#Object3DNode)( scope : 'position' | 'viewPosition' | 'direction' | 'scale' | 'worldMatrix', object3d : [Object3D](Object3D.html) )

Constructs a new object 3D node.

**scope**

The node represents a different type of transformation depending on the scope.

**object3d**

The 3D object.

Default is `null`.

## Properties

### .[object3d](#object3d) : [Object3D](Object3D.html)

The 3D object.

Default is `null`.

### .[scope](#scope) : 'position' | 'viewPosition' | 'direction' | 'scale' | 'worldMatrix'

The node reports a different type of transformation depending on the scope.

### .[uniformNode](#uniformNode) : [UniformNode](UniformNode.html)

Holds the value of the node as a uniform.

### .[updateType](#updateType) : string

Overwritten since this type of node is updated per object.

Default is `'object'`.

**Overrides:** [Node#updateType](Node.html#updateType)

## Methods

### .[generate](#generate)( builder : [NodeBuilder](NodeBuilder.html) ) : string

Generates the code snippet of the uniform node. The node type of the uniform node also depends on the selected scope.

**builder**

The current node builder.

**Overrides:** [Node#generate](Node.html#generate)

**Returns:** The generated code snippet.

### .[generateNodeType](#generateNodeType)() : 'mat4' | 'vec3' | 'float'

Overwritten since the node type is inferred from the scope.

**Overrides:** [Node#generateNodeType](Node.html#generateNodeType)

**Returns:** The node type.

### .[update](#update)( frame : [NodeFrame](NodeFrame.html) )

Updates the uniform value depending on the scope.

**frame**

The current node frame.

**Overrides:** [Node#update](Node.html#update)

## Source

[src/nodes/accessors/Object3DNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/accessors/Object3DNode.js)