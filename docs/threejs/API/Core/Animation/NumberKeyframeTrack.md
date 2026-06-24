Title: NumberKeyframeTrack
Source URL: https://threejs.org/docs/pages/NumberKeyframeTrack.html

[KeyframeTrack](KeyframeTrack.html) →

# NumberKeyframeTrack

A track for numeric keyframe values.

## Constructor

### new [NumberKeyframeTrack](#NumberKeyframeTrack)( name : string, times : Array.<number>, values : Array.<number>, interpolation : [InterpolateLinear](global.html#InterpolateLinear) | [InterpolateDiscrete](global.html#InterpolateDiscrete) | [InterpolateSmooth](global.html#InterpolateSmooth) )

Constructs a new number keyframe track.

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

Default is `'number'`.

**Overrides:** [KeyframeTrack#ValueTypeName](KeyframeTrack.html#ValueTypeName)

## Source

[src/animation/tracks/NumberKeyframeTrack.js](https://github.com/mrdoob/three.js/blob/master/src/animation/tracks/NumberKeyframeTrack.js)