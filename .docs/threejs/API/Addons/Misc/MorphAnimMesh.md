Title: MorphAnimMesh
Source URL: https://threejs.org/docs/pages/MorphAnimMesh.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) → [Mesh](Mesh.html) →

# MorphAnimMesh

A special type of an animated mesh with a simple interface for animation playback. It allows to playback just one animation without any transitions or fading between animation changes.

## Import

MorphAnimMesh is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { MorphAnimMesh } from 'three/addons/misc/MorphAnimMesh.js';
```

## Constructor

### new [MorphAnimMesh](#MorphAnimMesh)( geometry : [BufferGeometry](BufferGeometry.html), material : [Material](Material.html) | Array.<[Material](Material.html)\> )

Constructs a new morph anim mesh.

**geometry**

The mesh geometry.

**material**

The mesh material.

## Properties

### .[activeAction](#activeAction) : [AnimationAction](AnimationAction.html)

The current active animation action.

Default is `null`.

### .[mixer](#mixer) : [AnimationMixer](AnimationMixer.html)

The internal animation mixer.

## Methods

### .[playAnimation](#playAnimation)( label : string, fps : number )

Plays the defined animation clip. The implementation assumes the animation clips are stored in [Object3D#animations](Object3D.html#animations) or the geometry.

**label**

The name of the animation clip.

**fps**

The FPS of the animation clip.

### .[setDirectionBackward](#setDirectionBackward)()

Sets the animation playback direction to "backward".

### .[setDirectionForward](#setDirectionForward)()

Sets the animation playback direction to "forward".

### .[updateAnimation](#updateAnimation)( delta : number )

Updates the animations of the mesh. Must be called inside the animation loop.

**delta**

The delta time in seconds.

## Source

[examples/jsm/misc/MorphAnimMesh.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/misc/MorphAnimMesh.js)