Title: AnimationPathHelper
Source URL: https://threejs.org/docs/pages/AnimationPathHelper.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) →

# AnimationPathHelper

Visualizes the motion path of an animated object based on position keyframes from an AnimationClip.

## Code Example

```js
const clip = model.animations[ 0 ];
const helper = new AnimationPathHelper( model, clip, object );
scene.add( helper );
```

## Import

AnimationPathHelper is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { AnimationPathHelper } from 'three/addons/helpers/AnimationPathHelper.js';
```

## Constructor

### new [AnimationPathHelper](#AnimationPathHelper)( root : [Object3D](Object3D.html), clip : [AnimationClip](AnimationClip.html), object : [Object3D](Object3D.html), options : Object )

Constructs a new animation path helper.

**root**

The root object containing the animation clips.

**clip**

The animation clip containing position keyframes.

**object**

The specific object to show the path for.

**options**

Configuration options.

Default is `{}`.

**color**

The path line color.

Default is `0x00ff00`.

**markerColor**

The keyframe marker color.

Default is `0xff0000`.

**divisions**

Number of samples for smooth path interpolation.

Default is `100`.

**showMarkers**

Whether to show markers at keyframe positions.

Default is `true`.

**markerSize**

Size of keyframe markers in pixels.

Default is `5`.

## Properties

### .[clip](#clip) : [AnimationClip](AnimationClip.html)

The animation clip containing position keyframes.

### .[divisions](#divisions) : number

Number of samples for smooth path interpolation.

Default is `100`.

### .[isAnimationPathHelper](#isAnimationPathHelper) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[line](#line) : [Line](Line.html)

The line representing the animation path.

### .[object](#object) : [Object3D](Object3D.html)

The object whose path is being visualized.

### .[points](#points) : [Points](Points.html) | null

Points marking keyframe positions.

### .[root](#root) : [Object3D](Object3D.html)

The root object containing the animation clips.

## Methods

### .[dispose](#dispose)()

Frees the GPU-related resources allocated by this instance.

### .[setColor](#setColor)( color : number | [Color](Color.html) | string )

Sets the path line color.

**color**

The new color.

### .[setMarkerColor](#setMarkerColor)( color : number | [Color](Color.html) | string )

Sets the keyframe marker color.

**color**

The new color.

### .[updateMatrixWorld](#updateMatrixWorld)( force : boolean )

Updates the helper's transform to match the object's parent.

**force**

Force matrix update.

**Overrides:** [Object3D#updateMatrixWorld](Object3D.html#updateMatrixWorld)

## Source

[examples/jsm/helpers/AnimationPathHelper.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/helpers/AnimationPathHelper.js)