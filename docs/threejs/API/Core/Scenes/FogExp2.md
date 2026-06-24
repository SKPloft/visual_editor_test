Title: FogExp2
Source URL: https://threejs.org/docs/pages/FogExp2.html

# FogExp2

This class can be used to define an exponential squared fog, which gives a clear view near the camera and a faster than exponentially densening fog farther from the camera.

## Code Example

```js
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
```

## Constructor

### new [FogExp2](#FogExp2)( color : number | [Color](Color.html), density : number )

Constructs a new fog.

**color**

The fog's color.

**density**

Defines how fast the fog will grow dense.

Default is `0.00025`.

## Properties

### .[color](#color) : [Color](Color.html)

The fog's color.

### .[density](#density) : number

Defines how fast the fog will grow dense.

Default is `0.00025`.

### .[isFogExp2](#isFogExp2) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[name](#name) : string

The name of the fog.

## Methods

### .[clone](#clone)() : [FogExp2](FogExp2.html)

Returns a new fog with copied values from this instance.

**Returns:** A clone of this instance.

### .[toJSON](#toJSON)( meta : Object | string ) : Object

Serializes the fog into JSON.

**meta**

An optional value holding meta information about the serialization.

**Returns:** A JSON object representing the serialized fog

## Source

[src/scenes/FogExp2.js](https://github.com/mrdoob/three.js/blob/master/src/scenes/FogExp2.js)