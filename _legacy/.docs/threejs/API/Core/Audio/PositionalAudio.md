Title: PositionalAudio
Source URL: https://threejs.org/docs/pages/PositionalAudio.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) → [Audio](Audio.html) →

# PositionalAudio

Represents a positional audio object.

## Code Example

```js
// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add( listener );
// create the PositionalAudio object (passing in the listener)
const sound = new THREE.PositionalAudio( listener );
// load a sound and set it as the PositionalAudio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( 'sounds/song.ogg', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setRefDistance( 20 );
	sound.play();
});
// create an object for the sound to play from
const sphere = new THREE.SphereGeometry( 20, 32, 16 );
const material = new THREE.MeshPhongMaterial( { color: 0xff2200 } );
const mesh = new THREE.Mesh( sphere, material );
scene.add( mesh );
// finally add the sound to the mesh
mesh.add( sound );
```

## Constructor

### new [PositionalAudio](#PositionalAudio)( listener : [AudioListener](AudioListener.html) )

Constructs a positional audio.

**listener**

The global audio listener.

## Properties

### .[panner](#panner) : PannerNode (readonly)

The panner node represents the location, direction, and behavior of an audio source in 3D space.

## Methods

### .[getDistanceModel](#getDistanceModel)() : 'linear' | 'inverse' | 'exponential'

Returns the current distance model.

**Returns:** The distance model.

### .[getMaxDistance](#getMaxDistance)() : number

Returns the current max distance.

**Returns:** The max distance.

### .[getRefDistance](#getRefDistance)() : number

Returns the current reference distance.

**Returns:** The reference distance.

### .[getRolloffFactor](#getRolloffFactor)() : number

Returns the current rolloff factor.

**Returns:** The rolloff factor.

### .[setDirectionalCone](#setDirectionalCone)( coneInnerAngle : number, coneOuterAngle : number, coneOuterGain : number ) : [PositionalAudio](PositionalAudio.html)

Sets the directional cone in which the audio can be listened.

**coneInnerAngle**

An angle, in degrees, of a cone inside of which there will be no volume reduction.

**coneOuterAngle**

An angle, in degrees, of a cone outside of which the volume will be reduced by a constant value, defined by the `coneOuterGain` parameter.

**coneOuterGain**

The amount of volume reduction outside the cone defined by the `coneOuterAngle`. When set to `0`, no sound can be heard.

**Returns:** A reference to this instance.

### .[setDistanceModel](#setDistanceModel)( value : 'linear' | 'inverse' | 'exponential' ) : [PositionalAudio](PositionalAudio.html)

Defines which algorithm to use to reduce the volume of the audio source as it moves away from the listener.

Read [the spec](https://www.w3.org/TR/webaudio-1.1/#enumdef-distancemodeltype) for more details.

**value**

The distance model to set.

**Returns:** A reference to this instance.

### .[setMaxDistance](#setMaxDistance)( value : number ) : [PositionalAudio](PositionalAudio.html)

Defines the maximum distance between the audio source and the listener, after which the volume is not reduced any further.

This value is used only by the `linear` distance model.

**value**

The max distance.

**Returns:** A reference to this instance.

### .[setRefDistance](#setRefDistance)( value : number ) : [PositionalAudio](PositionalAudio.html)

Defines the reference distance for reducing volume as the audio source moves further from the listener – i.e. the distance at which the volume reduction starts taking effect.

**value**

The reference distance to set.

**Returns:** A reference to this instance.

### .[setRolloffFactor](#setRolloffFactor)( value : number ) : [PositionalAudio](PositionalAudio.html)

Defines how quickly the volume is reduced as the source moves away from the listener.

**value**

The rolloff factor.

**Returns:** A reference to this instance.

## Source

[src/audio/PositionalAudio.js](https://github.com/mrdoob/three.js/blob/master/src/audio/PositionalAudio.js)