Title: Color
Source URL: https://threejs.org/docs/pages/Color.html

# Color

A Color instance is represented by RGB components in the linear _working color space_, which defaults to `LinearSRGBColorSpace`. Inputs conventionally using `SRGBColorSpace` (such as hexadecimals and CSS strings) are converted to the working color space automatically.

Source color spaces may be specified explicitly, to ensure correct conversions.

```js
// assumed already LinearSRGBColorSpace; no conversion
const color = new THREE.Color().setRGB( 0.5, 0.5, 0.5 );
// converted explicitly from SRGBColorSpace to LinearSRGBColorSpace
const color = new THREE.Color().setRGB( 0.5, 0.5, 0.5, SRGBColorSpace );
```

If THREE.ColorManagement is disabled, no conversions occur. For details, see _Color management_. Iterating through a Color instance will yield its components (r, g, b) in the corresponding order. A Color can be initialised in any of the following ways:

```js
//empty constructor - will default white
const color1 = new THREE.Color();
//Hexadecimal color (recommended)
const color2 = new THREE.Color( 0xff0000 );
//RGB string
const color3 = new THREE.Color("rgb(255, 0, 0)");
const color4 = new THREE.Color("rgb(100%, 0%, 0%)");
//X11 color name - all 140 color names are supported.
//Note the lack of CamelCase in the name
const color5 = new THREE.Color( 'skyblue' );
//HSL string
const color6 = new THREE.Color("hsl(0, 100%, 50%)");
//Separate RGB values between 0 and 1
const color7 = new THREE.Color( 1, 0, 0 );
```

## Code Example

```js
// converted automatically from SRGBColorSpace to LinearSRGBColorSpace
const color = new THREE.Color().setHex( 0x112233 );
```

## Constructor

### new [Color](#Color)( r : number | string | [Color](Color.html), g : number, b : number )

Constructs a new color.

Note that standard method of specifying color in three.js is with a hexadecimal triplet, and that method is used throughout the rest of the documentation.

**r**

The red component of the color. If `g` and `b` are not provided, it can be hexadecimal triplet, a CSS-style string or another `Color` instance.

**g**

The green component.

**b**

The blue component.

## Properties

### .[b](#b) : number

The blue component.

Default is `1`.

### .[g](#g) : number

The green component.

Default is `1`.

### .[isColor](#isColor) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[r](#r) : number

The red component.

Default is `1`.

### .[NAMES](#.NAMES) : Object

A dictionary with X11 color names.

Note that multiple words such as Dark Orange become the string 'darkorange'.

## Methods

### .[add](#add)( color : [Color](Color.html) ) : [Color](Color.html)

Adds the RGB values of the given color to the RGB values of this color.

**color**

The color to add.

**Returns:** A reference to this color.

### .[addColors](#addColors)( color1 : [Color](Color.html), color2 : [Color](Color.html) ) : [Color](Color.html)

Adds the RGB values of the given colors and stores the result in this instance.

**color1**

The first color.

**color2**

The second color.

**Returns:** A reference to this color.

### .[addScalar](#addScalar)( s : number ) : [Color](Color.html)

Adds the given scalar value to the RGB values of this color.

**s**

The scalar to add.

**Returns:** A reference to this color.

### .[applyMatrix3](#applyMatrix3)( m : [Matrix3](Matrix3.html) ) : [Color](Color.html)

Transforms this color with the given 3x3 matrix.

**m**

The matrix.

**Returns:** A reference to this color.

### .[clone](#clone)() : [Color](Color.html)

Returns a new color with copied values from this instance.

**Returns:** A clone of this instance.

### .[convertLinearToSRGB](#convertLinearToSRGB)() : [Color](Color.html)

Converts this color from `LinearSRGBColorSpace` to `SRGBColorSpace`.

**Returns:** A reference to this color.

### .[convertSRGBToLinear](#convertSRGBToLinear)() : [Color](Color.html)

Converts this color from `SRGBColorSpace` to `LinearSRGBColorSpace`.

**Returns:** A reference to this color.

### .[copy](#copy)( color : [Color](Color.html) ) : [Color](Color.html)

Copies the values of the given color to this instance.

**color**

The color to copy.

**Returns:** A reference to this color.

### .[copyLinearToSRGB](#copyLinearToSRGB)( color : [Color](Color.html) ) : [Color](Color.html)

Copies the given color into this color, and then converts this color from `LinearSRGBColorSpace` to `SRGBColorSpace`.

**color**

The color to copy/convert.

**Returns:** A reference to this color.

### .[copySRGBToLinear](#copySRGBToLinear)( color : [Color](Color.html) ) : [Color](Color.html)

Copies the given color into this color, and then converts this color from `SRGBColorSpace` to `LinearSRGBColorSpace`.

**color**

The color to copy/convert.

**Returns:** A reference to this color.

### .[equals](#equals)( c : [Color](Color.html) ) : boolean

Returns `true` if this color is equal with the given one.

**c**

The color to test for equality.

**Returns:** Whether this bounding color is equal with the given one.

### .[fromArray](#fromArray)( array : Array.<number>, offset : number ) : [Color](Color.html)

Sets this color's RGB components from the given array.

**array**

An array holding the RGB values.

**offset**

The offset into the array.

Default is `0`.

**Returns:** A reference to this color.

### .[fromBufferAttribute](#fromBufferAttribute)( attribute : [BufferAttribute](BufferAttribute.html), index : number ) : [Color](Color.html)

Sets the components of this color from the given buffer attribute.

**attribute**

The buffer attribute holding color data.

**index**

The index into the attribute.

**Returns:** A reference to this color.

### .[getHSL](#getHSL)( target : Object, colorSpace : string ) : Object

Converts the colors RGB values into the HSL format and stores them into the given target object.

**target**

The target object that is used to store the method's result.

**colorSpace**

The color space.

Default is `ColorManagement.workingColorSpace`.

**Returns:** The HSL representation of this color.

### .[getHex](#getHex)( colorSpace : string ) : number

Returns the hexadecimal value of this color.

**colorSpace**

The color space.

Default is `SRGBColorSpace`.

**Returns:** The hexadecimal value.

### .[getHexString](#getHexString)( colorSpace : string ) : string

Returns the hexadecimal value of this color as a string (for example, 'FFFFFF').

**colorSpace**

The color space.

Default is `SRGBColorSpace`.

**Returns:** The hexadecimal value as a string.

### .[getRGB](#getRGB)( target : [Color](Color.html), colorSpace : string ) : [Color](Color.html)

Returns the RGB values of this color and stores them into the given target object.

**target**

The target color that is used to store the method's result.

**colorSpace**

The color space.

Default is `ColorManagement.workingColorSpace`.

**Returns:** The RGB representation of this color.

### .[getStyle](#getStyle)( colorSpace : string ) : string

Returns the value of this color as a CSS style string. Example: `rgb(255,0,0)`.

**colorSpace**

The color space.

Default is `SRGBColorSpace`.

**Returns:** The CSS representation of this color.

### .[lerp](#lerp)( color : [Color](Color.html), alpha : number ) : [Color](Color.html)

Linearly interpolates this color's RGB values toward the RGB values of the given color. The alpha argument can be thought of as the ratio between the two colors, where `0.0` is this color and `1.0` is the first argument.

**color**

The color to converge on.

**alpha**

The interpolation factor in the closed interval `[0,1]`.

**Returns:** A reference to this color.

### .[lerpColors](#lerpColors)( color1 : [Color](Color.html), color2 : [Color](Color.html), alpha : number ) : [Color](Color.html)

Linearly interpolates between the given colors and stores the result in this instance. The alpha argument can be thought of as the ratio between the two colors, where `0.0` is the first and `1.0` is the second color.

**color1**

The first color.

**color2**

The second color.

**alpha**

The interpolation factor in the closed interval `[0,1]`.

**Returns:** A reference to this color.

### .[lerpHSL](#lerpHSL)( color : [Color](Color.html), alpha : number ) : [Color](Color.html)

Linearly interpolates this color's HSL values toward the HSL values of the given color. It differs from [Color#lerp](Color.html#lerp) by not interpolating straight from one color to the other, but instead going through all the hues in between those two colors. The alpha argument can be thought of as the ratio between the two colors, where 0.0 is this color and 1.0 is the first argument.

**color**

The color to converge on.

**alpha**

The interpolation factor in the closed interval `[0,1]`.

**Returns:** A reference to this color.

### .[multiply](#multiply)( color : [Color](Color.html) ) : [Color](Color.html)

Multiplies the RGB values of the given color with the RGB values of this color.

**color**

The color to multiply.

**Returns:** A reference to this color.

### .[multiplyScalar](#multiplyScalar)( s : number ) : [Color](Color.html)

Multiplies the given scalar value with the RGB values of this color.

**s**

The scalar to multiply.

**Returns:** A reference to this color.

### .[offsetHSL](#offsetHSL)( h : number, s : number, l : number ) : [Color](Color.html)

Adds the given HSL values to this color's values. Internally, this converts the color's RGB values to HSL, adds HSL and then converts the color back to RGB.

**h**

Hue value between `0.0` and `1.0`.

**s**

Saturation value between `0.0` and `1.0`.

**l**

Lightness value between `0.0` and `1.0`.

**Returns:** A reference to this color.

### .[set](#set)( r : number | string | [Color](Color.html), g : number, b : number ) : [Color](Color.html)

Sets the colors's components from the given values.

**r**

The red component of the color. If `g` and `b` are not provided, it can be hexadecimal triplet, a CSS-style string or another `Color` instance.

**g**

The green component.

**b**

The blue component.

**Returns:** A reference to this color.

### .[setColorName](#setColorName)( style : string, colorSpace : string ) : [Color](Color.html)

Sets this color from a color name. Faster than [Color#setStyle](Color.html#setStyle) if you don't need the other CSS-style formats.

For convenience, the list of names is exposed in `Color.NAMES` as a hash.

```js
Color.NAMES.aliceblue // returns 0xF0F8FF
```

**style**

The color name.

**colorSpace**

The color space.

Default is `SRGBColorSpace`.

**Returns:** A reference to this color.

### .[setFromVector3](#setFromVector3)( v : [Vector3](Vector3.html) ) : [Color](Color.html)

Sets the color's RGB components from the given 3D vector.

**v**

The vector to set.

**Returns:** A reference to this color.

### .[setHSL](#setHSL)( h : number, s : number, l : number, colorSpace : string ) : [Color](Color.html)

Sets this color from RGB values.

**h**

Hue value between `0.0` and `1.0`.

**s**

Saturation value between `0.0` and `1.0`.

**l**

Lightness value between `0.0` and `1.0`.

**colorSpace**

The color space.

Default is `ColorManagement.workingColorSpace`.

**Returns:** A reference to this color.

### .[setHex](#setHex)( hex : number, colorSpace : string ) : [Color](Color.html)

Sets this color from a hexadecimal value.

**hex**

The hexadecimal value.

**colorSpace**

The color space.

Default is `SRGBColorSpace`.

**Returns:** A reference to this color.

### .[setRGB](#setRGB)( r : number, g : number, b : number, colorSpace : string ) : [Color](Color.html)

Sets this color from RGB values.

**r**

Red channel value between `0.0` and `1.0`.

**g**

Green channel value between `0.0` and `1.0`.

**b**

Blue channel value between `0.0` and `1.0`.

**colorSpace**

The color space.

Default is `ColorManagement.workingColorSpace`.

**Returns:** A reference to this color.

### .[setScalar](#setScalar)( scalar : number ) : [Color](Color.html)

Sets the colors's components to the given scalar value.

**scalar**

The scalar value.

**Returns:** A reference to this color.

### .[setStyle](#setStyle)( style : string, colorSpace : string ) : [Color](Color.html)

Sets this color from a CSS-style string. For example, `rgb(250, 0,0)`, `rgb(100%, 0%, 0%)`, `hsl(0, 100%, 50%)`, `#ff0000`, `#f00`, or `red` ( or any [X11 color name](https://en.wikipedia.org/wiki/X11_color_names#Color_name_chart) - all 140 color names are supported).

**style**

Color as a CSS-style string.

**colorSpace**

The color space.

Default is `SRGBColorSpace`.

**Returns:** A reference to this color.

### .[sub](#sub)( color : [Color](Color.html) ) : [Color](Color.html)

Subtracts the RGB values of the given color from the RGB values of this color.

**color**

The color to subtract.

**Returns:** A reference to this color.

### .[toArray](#toArray)( array : Array.<number>, offset : number ) : Array.<number>

Writes the RGB components of this color to the given array. If no array is provided, the method returns a new instance.

**array**

The target array holding the color components.

Default is `[]`.

**offset**

Index of the first element in the array.

Default is `0`.

**Returns:** The color components.

### .[toJSON](#toJSON)() : number

This methods defines the serialization result of this class. Returns the color as a hexadecimal value.

**Returns:** The hexadecimal value.

## Source

[src/math/Color.js](https://github.com/mrdoob/three.js/blob/master/src/math/Color.js)