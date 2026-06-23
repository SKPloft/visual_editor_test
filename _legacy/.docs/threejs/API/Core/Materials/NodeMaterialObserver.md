Title: NodeMaterialObserver
Source URL: https://threejs.org/docs/pages/NodeMaterialObserver.html

# NodeMaterialObserver

This class is used by [WebGPURenderer](WebGPURenderer.html) as management component. It's primary purpose is to determine whether render objects require a refresh right before they are going to be rendered or not.

## Constructor

### new [NodeMaterialObserver](#NodeMaterialObserver)( builder : [NodeBuilder](NodeBuilder.html) )

Constructs a new node material observer.

**builder**

The node builder.

## Properties

### .[hasAnimation](#hasAnimation) : boolean

Whether the node builder's 3D object is animated or not.

### .[hasNode](#hasNode) : boolean

Whether the material uses node objects or not.

### .[refreshUniforms](#refreshUniforms) : Array.<string>

A list of all possible material uniforms

### .[renderId](#renderId) : number

Holds the current render ID from the node frame.

Default is `0`.

### .[renderObjects](#renderObjects) : WeakMap.<[RenderObject](RenderObject.html), Object>

A node material can be used by more than one render object so the monitor must maintain a list of render objects.

## Methods

### .[containsNode](#containsNode)( builder : [NodeBuilder](NodeBuilder.html) ) : boolean

Returns `true` if the node builder's material uses node properties.

**builder**

The current node builder.

**Returns:** Whether the node builder's material uses node properties or not.

### .[equals](#equals)( renderObject : [RenderObject](RenderObject.html), lightsData : Array.<[Light](Light.html)\>, renderId : number ) : boolean

Returns `true` if the given render object has not changed its state.

**renderObject**

The render object.

**lightsData**

The current material lights.

**renderId**

The current render ID.

**Returns:** Whether the given render object has changed its state or not.

### .[firstInitialization](#firstInitialization)( renderObject : [RenderObject](RenderObject.html) ) : boolean

Returns `true` if the given render object is verified for the first time of this observer.

**renderObject**

The render object.

**Returns:** Whether the given render object is verified for the first time of this observer.

### .[getAttributesData](#getAttributesData)( attributes : Object ) : Object

Returns an attribute data structure holding the attributes versions for monitoring.

**attributes**

The geometry attributes.

**Returns:** An object for monitoring the versions of attributes.

### .[getGeometryData](#getGeometryData)( geometry : [BufferGeometry](BufferGeometry.html) ) : Object

Returns a geometry data structure holding the geometry property values for monitoring.

**geometry**

The geometry.

**Returns:** An object for monitoring geometry properties.

### .[getLights](#getLights)( lightsNode : [LightsNode](LightsNode.html), renderId : number ) : Array.<Object>

Returns the lights for the given lights node and render ID.

**lightsNode**

The lights node.

**renderId**

The render ID.

**Returns:** The lights for the given lights node and render ID.

### .[getLightsData](#getLightsData)( materialLights : Array.<[Light](Light.html)\> ) : Array.<Object>

Returns the lights data for the given material lights.

**materialLights**

The material lights.

**Returns:** The lights data for the given material lights.

### .[getMaterialData](#getMaterialData)( material : [Material](Material.html) ) : Object

Returns a material data structure holding the material property values for monitoring.

**material**

The material.

**Returns:** An object for monitoring material properties.

### .[getRenderObjectData](#getRenderObjectData)( renderObject : [RenderObject](RenderObject.html) ) : Object

Returns monitoring data for the given render object.

**renderObject**

The render object.

**Returns:** The monitoring data.

### .[needsRefresh](#needsRefresh)( renderObject : [RenderObject](RenderObject.html), nodeFrame : [NodeFrame](NodeFrame.html) ) : boolean

Checks if the given render object requires a refresh.

**renderObject**

The render object.

**nodeFrame**

The current node frame.

**Returns:** Whether the given render object requires a refresh or not.

### .[needsVelocity](#needsVelocity)( renderer : [Renderer](Renderer.html) ) : boolean

Returns `true` if the current rendering produces motion vectors.

**renderer**

The renderer.

**Returns:** Whether the current rendering produces motion vectors or not.

## Source

[src/materials/nodes/manager/NodeMaterialObserver.js](https://github.com/mrdoob/three.js/blob/master/src/materials/nodes/manager/NodeMaterialObserver.js)