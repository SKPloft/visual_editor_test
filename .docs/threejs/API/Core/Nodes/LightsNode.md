Title: LightsNode
Source URL: https://threejs.org/docs/pages/LightsNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) →

# LightsNode

This node represents the scene's lighting and manages the lighting model's life cycle for the current build 3D object. It is responsible for computing the total outgoing light in a given lighting context.

## Constructor

### new [LightsNode](#LightsNode)()

Constructs a new lights node.

## Properties

### .[global](#global) : boolean

`LightsNode` sets this property to `true` by default.

Default is `true`.

**Overrides:** [Node#global](Node.html#global)

### .[hasLights](#hasLights) : boolean

Whether the scene has lights or not.

### .[outgoingLightNode](#outgoingLightNode) : [Node](Node.html).<vec3>

A node representing the outgoing light.

### .[totalDiffuseNode](#totalDiffuseNode) : [Node](Node.html).<vec3>

A node representing the total diffuse light.

### .[totalSpecularNode](#totalSpecularNode) : [Node](Node.html).<vec3>

A node representing the total specular light.

## Methods

### .[customCacheKey](#customCacheKey)() : number

Overwrites the default [Node#customCacheKey](Node.html#customCacheKey) implementation by including light data into the cache key.

**Overrides:** [Node#customCacheKey](Node.html#customCacheKey)

**Returns:** The custom cache key.

### .[getHash](#getHash)( builder : [NodeBuilder](NodeBuilder.html) ) : string

Computes a hash value for identifying the current light nodes setup.

**builder**

A reference to the current node builder.

**Overrides:** [Node#getHash](Node.html#getHash)

**Returns:** The computed hash.

### .[getLights](#getLights)() : Array.<[Light](Light.html)\>

Returns an array of the scene's lights.

**Returns:** The scene's lights.

### .[setLights](#setLights)( lights : Array.<[Light](Light.html)\> ) : [LightsNode](LightsNode.html)

Configures this node with an array of lights.

**lights**

An array of lights.

**Returns:** A reference to this node.

### .[setup](#setup)( builder : [NodeBuilder](NodeBuilder.html) ) : [Node](Node.html).<vec3>

The implementation makes sure that for each light in the scene there is a corresponding light node. By building the light nodes and evaluating the lighting model the outgoing light is computed.

**builder**

A reference to the current node builder.

**Overrides:** [Node#setup](Node.html#setup)

**Returns:** A node representing the outgoing light.

### .[setupDirectLight](#setupDirectLight)( builder : Object, lightNode : Object, lightData : Object )

Sets up a direct light in the lighting model.

**builder**

The builder object containing the context and stack.

**lightNode**

The light node.

**lightData**

The light object containing color and direction properties.

### .[setupLights](#setupLights)( builder : [NodeBuilder](NodeBuilder.html), lightNodes : Array.<[LightingNode](LightingNode.html)\> )

Setups the internal lights by building all respective light nodes.

**builder**

A reference to the current node builder.

**lightNodes**

An array of lighting nodes.

### .[setupLightsNode](#setupLightsNode)( builder : [NodeBuilder](NodeBuilder.html) )

Creates lighting nodes for each scene light. This makes it possible to further process lights in the node system.

**builder**

A reference to the current node builder.

## Source

[src/nodes/lighting/LightsNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/lighting/LightsNode.js)