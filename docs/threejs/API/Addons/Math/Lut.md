Title: Lut
Source URL: https://threejs.org/docs/pages/Lut.html

# Lut

Represents a lookup table for colormaps. It is used to determine the color values from a range of data values.

## Code Example

```js
const lut = new Lut( 'rainbow', 512 );
const color = lut.getColor( 0.5 );
```

## Import

Lut is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { Lut } from 'three/addons/math/Lut.js';
```

## Constructor

### new [Lut](#Lut)( colormap : 'rainbow' | 'cooltowarm' | 'blackbody' | 'grayscale', count : number )

Constructs a new Lut.

**colormap**

Sets a colormap from predefined list of colormaps.

Default is `'rainbow'`.

**count**

Sets the number of colors used to represent the data array.

Default is `32`.

## Properties

### .[isLut](#isLut) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[lut](#lut) : Array.<[Color](Color.html)\>

The lookup table for the selected color map

### .[map](#map) : Array.<Array.<number>>

The currently selected color map.

### .[maxV](#maxV) : number

The maximum value to be represented with the lookup table.

Default is `1`.

### .[minV](#minV) : number

The minimum value to be represented with the lookup table.

Default is `0`.

### .[n](#n) : number

The number of colors of the current selected color map.

Default is `32`.

## Methods

### .[addColorMap](#addColorMap)( name : string, arrayOfColors : Array.<Array.<number>> ) : [Lut](Lut.html)

Adds a color map to this Lut instance.

**name**

The name of the color map.

**arrayOfColors**

An array of color values. Each value is an array holding a threshold and the actual color value as a hexadecimal number.

**Returns:** A reference to this LUT.

### .[copy](#copy)( lut : [Lut](Lut.html) ) : [Lut](Lut.html)

Copies the given lut.

**lut**

The LUT to copy.

**Returns:** A reference to this LUT.

### .[createCanvas](#createCanvas)() : HTMLCanvasElement

Creates a canvas in order to visualize the lookup table as a texture.

**Returns:** The created canvas.

### .[getColor](#getColor)( alpha : number ) : [Color](Color.html)

Returns an instance of Color for the given data value.

**alpha**

The value to lookup.

**Returns:** The color from the LUT.

### .[set](#set)( value : [Lut](Lut.html) ) : [Lut](Lut.html)

Sets the given LUT.

**value**

The LUT to set.

**Returns:** A reference to this LUT.

### .[setColorMap](#setColorMap)( colormap : string, count : number ) : [Lut](Lut.html)

Configure the lookup table for the given color map and number of colors.

**colormap**

The name of the color map.

**count**

The number of colors.

Default is `32`.

**Returns:** A reference to this LUT.

### .[setMax](#setMax)( max : number ) : [Lut](Lut.html)

Sets the maximum value to be represented with this LUT.

**max**

The maximum value to be represented with the lookup table.

**Returns:** A reference to this LUT.

### .[setMin](#setMin)( min : number ) : [Lut](Lut.html)

Sets the minimum value to be represented with this LUT.

**min**

The minimum value to be represented with the lookup table.

**Returns:** A reference to this LUT.

### .[updateCanvas](#updateCanvas)( canvas : HTMLCanvasElement ) : HTMLCanvasElement

Updates the given canvas with the Lut's data.

**canvas**

The canvas to update.

**Returns:** The updated canvas.

## Source

[examples/jsm/math/Lut.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/math/Lut.js)