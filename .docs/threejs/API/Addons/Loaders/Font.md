Title: Font
Source URL: https://threejs.org/docs/pages/Font.html

# Font

Class representing a font.

## Constructor

### new [Font](#Font)( data : Object )

Constructs a new font.

**data**

The font data as JSON.

## Properties

### .[data](#data) : Object

The font data as JSON.

### .[isFont](#isFont) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

## Methods

### .[generateShapes](#generateShapes)( text : string, size : number, direction : string ) : Array.<[Shape](Shape.html)\>

Generates geometry shapes from the given text and size. The result of this method should be used with [ShapeGeometry](ShapeGeometry.html) to generate the actual geometry data.

**text**

The text.

**size**

The text size.

Default is `100`.

**direction**

Char direction: ltr(left to right), rtl(right to left) & tb(top bottom).

Default is `'ltr'`.

**Returns:** An array of shapes representing the text.

## Source

[examples/jsm/loaders/FontLoader.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/FontLoader.js)