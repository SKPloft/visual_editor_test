Title: SphericalHarmonics3
Source URL: https://threejs.org/docs/pages/SphericalHarmonics3.html

# SphericalHarmonics3

Represents a third-order spherical harmonics (SH). Light probes use this class to encode lighting information.

*   Primary reference: [https://graphics.stanford.edu/papers/envmap/envmap.pdf](https://graphics.stanford.edu/papers/envmap/envmap.pdf)
*   Secondary reference: [https://www.ppsloan.org/publications/StupidSH36.pdf](https://www.ppsloan.org/publications/StupidSH36.pdf)

## Constructor

### new [SphericalHarmonics3](#SphericalHarmonics3)()

Constructs a new spherical harmonics.

## Properties

### .[coefficients](#coefficients) : Array.<[Vector3](Vector3.html)\>

An array holding the (9) SH coefficients.

### .[isSphericalHarmonics3](#isSphericalHarmonics3) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

## Methods

### .[add](#add)( sh : [SphericalHarmonics3](SphericalHarmonics3.html) ) : [SphericalHarmonics3](SphericalHarmonics3.html)

Adds the given SH to this instance.

**sh**

The SH to add.

**Returns:** A reference to this spherical harmonics.

### .[addScaledSH](#addScaledSH)( sh : [SphericalHarmonics3](SphericalHarmonics3.html), s : number ) : [SphericalHarmonics3](SphericalHarmonics3.html)

A convenience method for performing [SphericalHarmonics3#add](SphericalHarmonics3.html#add) and [SphericalHarmonics3#scale](SphericalHarmonics3.html#scale) at once.

**sh**

The SH to add.

**s**

The scale factor.

**Returns:** A reference to this spherical harmonics.

### .[clone](#clone)() : [SphericalHarmonics3](SphericalHarmonics3.html)

Returns a new spherical harmonics with copied values from this instance.

**Returns:** A clone of this instance.

### .[copy](#copy)( sh : [SphericalHarmonics3](SphericalHarmonics3.html) ) : [SphericalHarmonics3](SphericalHarmonics3.html)

Copies the values of the given spherical harmonics to this instance.

**sh**

The spherical harmonics to copy.

**Returns:** A reference to this spherical harmonics.

### .[equals](#equals)( sh : [SphericalHarmonics3](SphericalHarmonics3.html) ) : boolean

Returns `true` if this spherical harmonics is equal with the given one.

**sh**

The spherical harmonics to test for equality.

**Returns:** Whether this spherical harmonics is equal with the given one.

### .[fromArray](#fromArray)( array : Array.<number>, offset : number ) : [SphericalHarmonics3](SphericalHarmonics3.html)

Sets the SH coefficients of this instance from the given array.

**array**

An array holding the SH coefficients.

**offset**

The array offset where to start copying.

Default is `0`.

**Returns:** A clone of this instance.

### .[getAt](#getAt)( normal : [Vector3](Vector3.html), target : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Returns the radiance in the direction of the given normal.

**normal**

The normal vector (assumed to be unit length)

**target**

The target vector that is used to store the method's result.

**Returns:** The radiance.

### .[getIrradianceAt](#getIrradianceAt)( normal : [Vector3](Vector3.html), target : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Returns the irradiance (radiance convolved with cosine lobe) in the direction of the given normal.

**normal**

The normal vector (assumed to be unit length)

**target**

The target vector that is used to store the method's result.

**Returns:** The irradiance.

### .[lerp](#lerp)( sh : [SphericalHarmonics3](SphericalHarmonics3.html), alpha : number ) : [SphericalHarmonics3](SphericalHarmonics3.html)

Linear interpolates between the given SH and this instance by the given alpha factor.

**sh**

The SH to interpolate with.

**alpha**

The alpha factor.

**Returns:** A reference to this spherical harmonics.

### .[scale](#scale)( s : number ) : [SphericalHarmonics3](SphericalHarmonics3.html)

Scales this SH by the given scale factor.

**s**

The scale factor.

**Returns:** A reference to this spherical harmonics.

### .[set](#set)( coefficients : Array.<[Vector3](Vector3.html)\> ) : [SphericalHarmonics3](SphericalHarmonics3.html)

Sets the given SH coefficients to this instance by copying the values.

**coefficients**

The SH coefficients.

**Returns:** A reference to this spherical harmonics.

### .[toArray](#toArray)( array : Array.<number>, offset : number ) : Array.<number>

Returns an array with the SH coefficients, or copies them into the provided array. The coefficients are represented as numbers.

**array**

The target array.

Default is `[]`.

**offset**

The array offset where to start copying.

Default is `0`.

**Returns:** An array with flat SH coefficients.

### .[zero](#zero)() : [SphericalHarmonics3](SphericalHarmonics3.html)

Sets all SH coefficients to `0`.

**Returns:** A reference to this spherical harmonics.

## Static Methods

### .[getBasisAt](#.getBasisAt)( normal : [Vector3](Vector3.html), shBasis : Array.<number> )

Computes the SH basis for the given normal vector.

**normal**

The normal.

**shBasis**

The target array holding the SH basis.

## Source

[src/math/SphericalHarmonics3.js](https://github.com/mrdoob/three.js/blob/master/src/math/SphericalHarmonics3.js)