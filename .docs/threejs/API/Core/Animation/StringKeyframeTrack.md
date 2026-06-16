Title: StringKeyframeTrack
Source URL: https://threejs.org/docs/pages/StringKeyframeTrack.html

[KeyframeTrack](KeyframeTrack.html) →

# StringKeyframeTrack

A track for string keyframe values.

## Constructor

### new [StringKeyframeTrack](#StringKeyframeTrack)( name : string, times : Array.<number>, values : Array.<string> )

Constructs a new string keyframe track.

This keyframe track type has no `interpolation` parameter because the interpolation is always discrete.

**name**

The keyframe track's name.

**times**

A list of keyframe times.

**values**

A list of keyframe values.

## Properties

### .[DefaultInterpolation](#DefaultInterpolation) : [InterpolateLinear](global.html#InterpolateLinear) | [InterpolateDiscrete](global.html#InterpolateDiscrete) | [InterpolateSmooth](global.html#InterpolateSmooth)

The default interpolation type of this keyframe track.

Default is `InterpolateDiscrete`.

**Overrides:** [KeyframeTrack#DefaultInterpolation](KeyframeTrack.html#DefaultInterpolation)

### .[ValueBufferType](#ValueBufferType) : TypedArray | Array

The value buffer type of this keyframe track.

Default is `Array.constructor`.

**Overrides:** [KeyframeTrack#ValueBufferType](KeyframeTrack.html#ValueBufferType)

### .[ValueTypeName](#ValueTypeName) : string

The value type name.

Default is `'string'`.

**Overrides:** [KeyframeTrack#ValueTypeName](KeyframeTrack.html#ValueTypeName)

## Source

[src/animation/tracks/StringKeyframeTrack.js](https://github.com/mrdoob/three.js/blob/master/src/animation/tracks/StringKeyframeTrack.js)