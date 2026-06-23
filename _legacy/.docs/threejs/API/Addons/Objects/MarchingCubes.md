Title: MarchingCubes
Source URL: https://threejs.org/docs/pages/MarchingCubes.html

# MarchingCubes

A marching cubes implementation.

Port of: [http://webglsamples.org/blob/blob.html](http://webglsamples.org/blob/blob.html)

## Import

MarchingCubes is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { MarchingCubes } from 'three/addons/objects/MarchingCubes.js';
```

## Constructor

### new [MarchingCubes](#MarchingCubes)( resolution : number, material : [Material](Material.html), enableUvs : boolean, enableColors : boolean, maxPolyCount : number )

Constructs a new marching cubes instance.

**resolution**

The effect's resolution.

**material**

The cube's material.

**enableUvs**

Whether texture coordinates should be animated or not.

Default is `false`.

**enableColors**

Whether colors should be animated or not.

Default is `false`.

**maxPolyCount**

The maximum size of the geometry buffers.

Default is `10000`.

## Properties

### .[enableColors](#enableColors) : boolean

Whether colors should be animated or not.

Default is `false`.

### .[enableUvs](#enableUvs) : boolean

Whether texture coordinates should be animated or not.

Default is `false`.

### .[isMarchingCubes](#isMarchingCubes) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

## Methods

### .[addBall](#addBall)( ballx : number, bally : number, ballz : number, strength : number, subtract : number, colors : [Color](Color.html) )

Adds a reciprocal ball (nice and blobby) that, to be fast, fades to zero after a fixed distance, determined by strength and subtract.

**ballx**

The x-coordinate of the ball.

**bally**

The y-coordinate of the ball.

**ballz**

The z-coordinate of the ball.

**strength**

The strength factor.

**subtract**

The subtract factor.

**colors**

The color.

### .[addPlaneX](#addPlaneX)( strength : number, subtract : number )

Adds a plane along the x-axis.

**strength**

The strength factor.

**subtract**

The subtract factor.

### .[addPlaneY](#addPlaneY)( strength : number, subtract : number )

Adds a plane along the y-axis.

**strength**

The strength factor.

**subtract**

The subtract factor.

### .[addPlaneZ](#addPlaneZ)( strength : number, subtract : number )

Adds a plane along the z-axis.

**strength**

The strength factor.

**subtract**

The subtract factor.

### .[blur](#blur)( intensity : number )

Applies a blur with the given intensity.

**intensity**

The intensity of the blur.

Default is `1`.

### .[getCell](#getCell)( x : number, y : number, z : number ) : number

Returns the cell value for the given coordinates.

**x**

The x value.

**y**

The y value.

**z**

The z value.

**Returns:** The value.

### .[reset](#reset)()

Resets the effect.

### .[setCell](#setCell)( x : number, y : number, z : number, value : number )

Sets the cell value for the given coordinates.

**x**

The x value.

**y**

The y value.

**z**

The z value.

**value**

The value to set.

### .[update](#update)()

Updates the effect.

## Source

[examples/jsm/objects/MarchingCubes.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/objects/MarchingCubes.js)