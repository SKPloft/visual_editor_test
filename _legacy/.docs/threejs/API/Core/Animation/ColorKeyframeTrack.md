Title: ColorKeyframeTrack
Source URL: https://threejs.org/docs/pages/ColorKeyframeTrack.html

[KeyframeTrack](KeyframeTrack.html) →

# ColorKeyframeTrack

A track for color keyframe values.

## Constructor

### new [ColorKeyframeTrack](#ColorKeyframeTrack)( name : string, times : Array.<number>, values : Array.<number>, interpolation : [InterpolateLinear](global.html#InterpolateLinear) | [InterpolateDiscrete](global.html#InterpolateDiscrete) | [InterpolateSmooth](global.html#InterpolateSmooth) )

Constructs a new color keyframe track.

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

Default is `'color'`.

**Overrides:** [KeyframeTrack#ValueTypeName](KeyframeTrack.html#ValueTypeName)

## Source

[src/animation/tracks/ColorKeyframeTrack.js](https://github.com/mrdoob/three.js/blob/master/src/animation/tracks/ColorKeyframeTrack.js)