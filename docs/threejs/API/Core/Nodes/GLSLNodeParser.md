Title: GLSLNodeParser
Source URL: https://threejs.org/docs/pages/GLSLNodeParser.html

[NodeParser](NodeParser.html) →

# GLSLNodeParser

A GLSL node parser.

## Constructor

### new [GLSLNodeParser](#GLSLNodeParser)()

## Methods

### .[parseFunction](#parseFunction)( source : string ) : [GLSLNodeFunction](GLSLNodeFunction.html)

The method parses the given GLSL code an returns a node function.

**source**

The GLSL code.

**Overrides:** [NodeParser#parseFunction](NodeParser.html#parseFunction)

**Returns:** A node function.

## Source

[src/nodes/parsers/GLSLNodeParser.js](https://github.com/mrdoob/three.js/blob/master/src/nodes/parsers/GLSLNodeParser.js)