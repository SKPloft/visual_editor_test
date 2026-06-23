Title: MorphBlendMesh
Source URL: https://threejs.org/docs/pages/MorphBlendMesh.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) → [Mesh](Mesh.html) →

# MorphBlendMesh

A special type of an animated mesh with a more advanced interface for animation playback. Unlike [MorphAnimMesh](MorphAnimMesh.html). It allows to playback more than one morph animation at the same time but without fading options.

## Import

MorphBlendMesh is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { MorphBlendMesh } from 'three/addons/misc/MorphBlendMesh.js';
```

## Constructor

### new [MorphBlendMesh](#MorphBlendMesh)( geometry : [BufferGeometry](BufferGeometry.html), material : [Material](Material.html) | Array.<[Material](Material.html)\> )

Constructs a new morph blend mesh.

**geometry**

The mesh geometry.

**material**

The mesh material.

## Properties

### .[animationsList](#animationsList) : Array.<Object>

A list of animations.

### .[animationsMap](#animationsMap) : Object.<string, Object>

A dictionary of animations.

## Methods

### .[autoCreateAnimations](#autoCreateAnimations)( fps : number )

Automatically creates animations based on the values in [Mesh#morphTargetDictionary](Mesh.html#morphTargetDictionary).

**fps**

The FPS of all animations.

### .[createAnimation](#createAnimation)( name : string, start : number, end : number, fps : number )

Creates a new animation.

**name**

The animation name.

**start**

The start time.

**end**

The end time.

**fps**

The FPS.

### .[getAnimationDuration](#getAnimationDuration)( name : string ) : number

Returns the duration for the defined animation.

**name**

The animation name.

**Returns:** The duration.

### .[getAnimationTime](#getAnimationTime)( name : string ) : number

Returns the time for the defined animation.

**name**

The animation name.

**Returns:** The time.

### .[playAnimation](#playAnimation)( name : string )

Plays the defined animation.

**name**

The animation name.

### .[setAnimationDirectionBackward](#setAnimationDirectionBackward)( name : string )

Sets the animation playback direction to "backward" for the defined animation.

**name**

The animation name.

### .[setAnimationDirectionForward](#setAnimationDirectionForward)( name : string )

Sets the animation playback direction to "forward" for the defined animation.

**name**

The animation name.

### .[setAnimationDuration](#setAnimationDuration)( name : string, duration : number )

Sets the duration to the given value for the defined animation.

**name**

The animation name.

**duration**

The duration to set.

### .[setAnimationFPS](#setAnimationFPS)( name : string, fps : number )

Sets the FPS to the given value for the defined animation.

**name**

The animation name.

**fps**

The FPS to set.

### .[setAnimationTime](#setAnimationTime)( name : string, time : number )

Sets the time to the given value for the defined animation.

**name**

The animation name.

**time**

The time to set.

### .[setAnimationWeight](#setAnimationWeight)( name : string, weight : number )

Sets the weight to the given value for the defined animation.

**name**

The animation name.

**weight**

The weight to set.

### .[stopAnimation](#stopAnimation)( name : string )

Stops the defined animation.

**name**

The animation name.

### .[update](#update)( delta : number )

Updates the animations of the mesh.

**delta**

The delta time in seconds.

## Source

[examples/jsm/misc/MorphBlendMesh.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/misc/MorphBlendMesh.js)