Title: Cylindrical
Source URL: https://threejs.org/docs/pages/Cylindrical.html

# Cylindrical

This class can be used to represent points in 3D space as [Cylindrical coordinates](https://en.wikipedia.org/wiki/Cylindrical_coordinate_system).

## Constructor

### new [Cylindrical](#Cylindrical)( radius : number, theta : number, y : number )

Constructs a new cylindrical.

**radius**

The distance from the origin to a point in the x-z plane.

Default is `1`.

**theta**

A counterclockwise angle in the x-z plane measured in radians from the positive z-axis.

Default is `0`.

**y**

The height above the x-z plane.

Default is `0`.

## Properties

### .[radius](#radius) : number

The distance from the origin to a point in the x-z plane.

Default is `1`.

### .[theta](#theta) : number

A counterclockwise angle in the x-z plane measured in radians from the positive z-axis.

Default is `0`.

### .[y](#y) : number

The height above the x-z plane.

Default is `0`.

## Methods

### .[clone](#clone)() : [Cylindrical](Cylindrical.html)

Returns a new cylindrical with copied values from this instance.

**Returns:** A clone of this instance.

### .[copy](#copy)( other : [Cylindrical](Cylindrical.html) ) : [Cylindrical](Cylindrical.html)

Copies the values of the given cylindrical to this instance.

**other**

The cylindrical to copy.

**Returns:** A reference to this cylindrical.

### .[set](#set)( radius : number, theta : number, y : number ) : [Cylindrical](Cylindrical.html)

Sets the cylindrical components by copying the given values.

**radius**

The radius.

**theta**

The theta angle.

**y**

The height value.

**Returns:** A reference to this cylindrical.

### .[setFromCartesianCoords](#setFromCartesianCoords)( x : number, y : number, z : number ) : [Cylindrical](Cylindrical.html)

Sets the cylindrical components from the given Cartesian coordinates.

**x**

The x value.

**y**

The x value.

**z**

The x value.

**Returns:** A reference to this cylindrical.

### .[setFromVector3](#setFromVector3)( v : [Vector3](Vector3.html) ) : [Cylindrical](Cylindrical.html)

Sets the cylindrical components from the given vector which is assumed to hold Cartesian coordinates.

**v**

The vector to set.

**Returns:** A reference to this cylindrical.

## Source

[src/math/Cylindrical.js](https://github.com/mrdoob/three.js/blob/master/src/math/Cylindrical.js)