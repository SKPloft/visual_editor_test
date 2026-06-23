Title: WGSLNodeParser
Source URL: https://threejs.org/docs/pages/WGSLNodeParser.html

[NodeParser](NodeParser.html) →

# WGSLNodeParser

A WGSL node parser.

## Constructor

### new [WGSLNodeParser](#WGSLNodeParser)()

## Methods

### .[parseFunction](#parseFunction)( source : string ) : [WGSLNodeFunction](WGSLNodeFunction.html)

The method parses the given WGSL code an returns a node function.

**source**

The WGSL code.

**Overrides:** [NodeParser#parseFunction](NodeParser.html#parseFunction)

**Returns:** A node function.

## Source

[src/renderers/webgpu/nodes/WGSLNodeParser.js](https://github.com/mrdoob/three.js/blob/master/src/renderers/webgpu/nodes/WGSLNodeParser.js)