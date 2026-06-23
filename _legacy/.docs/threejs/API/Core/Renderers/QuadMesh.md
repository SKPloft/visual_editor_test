Title: QuadMesh
Source URL: https://threejs.org/docs/pages/QuadMesh.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) → [Mesh](Mesh.html) →

# QuadMesh

This module is a helper for passes which need to render a full screen effect which is quite common in context of post processing.

The intended usage is to reuse a single quad mesh for rendering subsequent passes by just reassigning the `material` reference.

Note: This module can only be used with `WebGPURenderer`.

## Constructor

### new [QuadMesh](#QuadMesh)( material : [Material](Material.html) )

Constructs a new quad mesh.

**material**

The material to render the quad mesh with.

Default is `null`.

## Properties

### .[camera](#camera) : [OrthographicCamera](OrthographicCamera.html) (readonly)

The camera to render the quad mesh with.

### .[isQuadMesh](#isQuadMesh) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

## Methods

### .[render](#render)( renderer : [Renderer](Renderer.html) )

Renders the quad mesh

**renderer**

The renderer.

### .[renderAsync](#renderAsync)( renderer : [Renderer](Renderer.html) ) : Promise (async)

Async version of `render()`.

**renderer**

The renderer.

**Deprecated:** Yes

**Returns:** A Promise that resolves when the render has been finished.

## Source

[src/renderers/common/QuadMesh.js](https://github.com/mrdoob/three.js/blob/master/src/renderers/common/QuadMesh.js)