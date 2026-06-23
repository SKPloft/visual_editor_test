Title: QuaternionKeyframeTrack
Source URL: https://threejs.org/docs/pages/QuaternionKeyframeTrack.html

[KeyframeTrack](KeyframeTrack.html) →

# QuaternionKeyframeTrack

A track for Quaternion keyframe values.

## Constructor

### new [QuaternionKeyframeTrack](#QuaternionKeyframeTrack)( name : string, times : Array.<number>, values : Array.<number>, interpolation : [InterpolateLinear](global.html#InterpolateLinear) | [InterpolateDiscrete](global.html#InterpolateDiscrete) | [InterpolateSmooth](global.html#InterpolateSmooth) )

Constructs a new Quaternion keyframe track.

**name**

The keyframe track's name.

**times**

A list of keyframe times.

**values**

A list of keyframe values.

**interpolation**

The interpolation type.

## Properties

### .[ValueTypeName](#ValueTypeName) : string

The value type name.

Default is `'quaternion'`.

**Overrides:** [KeyframeTrack#ValueTypeName](KeyframeTrack.html#ValueTypeName)

## Methods

### .[InterpolantFactoryMethodLinear](#InterpolantFactoryMethodLinear)( result : TypedArray ) : [QuaternionLinearInterpolant](QuaternionLinearInterpolant.html)

Overwritten so the method returns Quaternion based interpolant.

**result**

The result buffer.

**Overrides:** [KeyframeTrack#InterpolantFactoryMethodLinear](KeyframeTrack.html#InterpolantFactoryMethodLinear)

**Returns:** The new interpolant.

## Source

[src/animation/tracks/QuaternionKeyframeTrack.js](https://github.com/mrdoob/three.js/blob/master/src/animation/tracks/QuaternionKeyframeTrack.js)