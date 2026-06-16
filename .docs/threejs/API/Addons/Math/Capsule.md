Title: Capsule
Source URL: https://threejs.org/docs/pages/Capsule.html

# Capsule

A capsule is essentially a cylinder with hemispherical caps at both ends. It can be thought of as a swept sphere, where a sphere is moved along a line segment.

Capsules are often used as bounding volumes (next to AABBs and bounding spheres).

## Import

Capsule is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { Capsule } from 'three/addons/math/Capsule.js';
```

## Constructor

### new [Capsule](#Capsule)( start : [Vector3](Vector3.html), end : [Vector3](Vector3.html), radius : number )

Constructs a new capsule.

**start**

The start vector.

**end**

The end vector.

**radius**

The capsule's radius.

Default is `1`.

## Properties

### .[end](#end) : [Vector3](Vector3.html)

The end vector.

### .[radius](#radius) : number

The capsule's radius.

Default is `1`.

### .[start](#start) : [Vector3](Vector3.html)

The start vector.

## Methods

### .[clone](#clone)() : [Capsule](Capsule.html)

Returns a new capsule with copied values from this instance.

**Returns:** A clone of this instance.

### .[copy](#copy)( capsule : [Capsule](Capsule.html) ) : [Capsule](Capsule.html)

Copies the values of the given capsule to this instance.

**capsule**

The capsule to copy.

**Returns:** A reference to this capsule.

### .[getCenter](#getCenter)( target : [Vector3](Vector3.html) ) : [Vector3](Vector3.html)

Returns the center point of this capsule.

**target**

The target vector that is used to store the method's result.

**Returns:** The center point.

### .[intersectsBox](#intersectsBox)( box : [Box3](Box3.html) ) : boolean

Returns `true` if the given bounding box intersects with this capsule.

**box**

The bounding box to test.

**Returns:** Whether the given bounding box intersects with this capsule.

### .[set](#set)( start : [Vector3](Vector3.html), end : [Vector3](Vector3.html), radius : number ) : [Capsule](Capsule.html)

Sets the capsule components to the given values. Please note that this method only copies the values from the given objects.

**start**

The start vector.

**end**

The end vector

**radius**

The capsule's radius.

**Returns:** A reference to this capsule.

### .[translate](#translate)( v : [Vector3](Vector3.html) ) : [Capsule](Capsule.html)

Adds the given offset to this capsule, effectively moving it in 3D space.

**v**

The offset that should be used to translate the capsule.

**Returns:** A reference to this capsule.

## Source

[examples/jsm/math/Capsule.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/math/Capsule.js)