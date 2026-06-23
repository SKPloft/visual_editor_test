Title: BumpMapNode
Source URL: https://threejs.org/docs/pages/BumpMapNode.html

[EventDispatcher](EventDispatcher.html) → [Node](Node.html) → [TempNode](TempNode.html) →

# BumpMapNode

This class can be used for applying bump maps to materials.

## Code Example

```js
material.normalNode = bumpMap( texture( bumpTex ) );
```

## Constructor

### new [BumpMapNode](#BumpMapNode)( textureNode : [Node](Node.html).<float>, scaleNode : [Node](Node.html).<float> )

Constructs a new bump map node.

**textureNode**

Represents the bump map data.

**scaleNode**

Controls the intensity of the bump effect.

Default is `null`.

## Properties

### .[scaleNode](#scaleNode) : [Node](Node.html).<float>

Controls the intensity of the bump effect.

Default is `null`.

### .[textureNode](#textureNode) : [Node](Node.html).<float>

Represents the bump map data.

## Source

[src/nodes/display/BumpMapNode.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/display/BumpMapNode.js)