Title: ToneMappingNode
Source URL: https://threejs.org/docs/pages/ToneMappingNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [TempNode](TempNode.html) →

# ToneMappingNode

This node represents a tone mapping operation.

## Constructor

### new [ToneMappingNode](#ToneMappingNode)( toneMapping : number, exposureNode : [Node](Node.html), colorNode : [Node](Node.html) )

Constructs a new tone mapping node.

**toneMapping**

The tone mapping type.

**exposureNode**

The tone mapping exposure.

**colorNode**

The color node to process.

Default is `null`.

## Properties

### .[colorNode](#colorNode) : [Node](Node.html)

Represents the color to process.

Default is `null`.

### .[exposureNode](#exposureNode) : [Node](Node.html)

The tone mapping exposure.

Default is `null`.

## Methods

### .[customCacheKey](#customCacheKey)() : number

Overwrites the default `customCacheKey()` implementation by including the tone mapping type into the cache key.

**Overrides:** [TempNode#customCacheKey](TempNode.html#customCacheKey)

**Returns:** The hash.

### .[getToneMapping](#getToneMapping)() : number

Gets the tone mapping type.

**Returns:** The tone mapping type.

### .[setToneMapping](#setToneMapping)( value : number ) : [ToneMappingNode](ToneMappingNode.html)

Sets the tone mapping type.

**value**

The tone mapping type.

**Returns:** A reference to this node.

## Source

[src/nodes/display/ToneMappingNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/display/ToneMappingNode.js)