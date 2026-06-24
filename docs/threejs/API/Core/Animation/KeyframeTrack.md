Title: KeyframeTrack
Source URL: https://threejs.org/docs/pages/KeyframeTrack.html

# KeyframeTrack

Represents a timed sequence of keyframes, which are composed of lists of times and related values, and which are used to animate a specific property of an object.

## Constructor

### new [KeyframeTrack](#KeyframeTrack)( name : string, times : Array.<number>, values : Array.<(number|string|boolean)>, interpolation : [InterpolateLinear](global.html#InterpolateLinear) | [InterpolateDiscrete](global.html#InterpolateDiscrete) | [InterpolateSmooth](global.html#InterpolateSmooth) | [InterpolateBezier](global.html#InterpolateBezier) )

Constructs a new keyframe track.

**name**

The keyframe track's name.

**times**

A list of keyframe times.

**values**

A list of keyframe values.

**interpolation**

The interpolation type.

## Properties

### .[DefaultInterpolation](#DefaultInterpolation) : [InterpolateLinear](global.html#InterpolateLinear) | [InterpolateDiscrete](global.html#InterpolateDiscrete) | [InterpolateSmooth](global.html#InterpolateSmooth) | [InterpolateBezier](global.html#InterpolateBezier)

The default interpolation type of this keyframe track.

Default is `InterpolateLinear`.

### .[TimeBufferType](#TimeBufferType) : TypedArray | Array

The time buffer type of this keyframe track.

Default is `Float32Array.constructor`.

### .[ValueBufferType](#ValueBufferType) : TypedArray | Array

The value buffer type of this keyframe track.

Default is `Float32Array.constructor`.

### .[ValueTypeName](#ValueTypeName) : string

The value type name.

Default is `''`.

### .[name](#name) : string

The track's name can refer to morph targets or bones or possibly other values within an animated object. See PropertyBinding#parseTrackName for the forms of strings that can be parsed for property binding.

### .[times](#times) : Float32Array

The keyframe times.

### .[values](#values) : Float32Array

The keyframe values.

## Methods

### .[InterpolantFactoryMethodBezier](#InterpolantFactoryMethodBezier)( result : TypedArray ) : [BezierInterpolant](BezierInterpolant.html)

Factory method for creating a new Bezier interpolant.

The Bezier interpolant requires tangent data to be set via the `settings` property on the track before creating the interpolant. The settings should contain:

*   `inTangents`: Float32Array with \[time, value\] pairs per keyframe per component
*   `outTangents`: Float32Array with \[time, value\] pairs per keyframe per component

**result**

The result buffer.

**Returns:** The new interpolant.

### .[InterpolantFactoryMethodDiscrete](#InterpolantFactoryMethodDiscrete)( result : TypedArray ) : [DiscreteInterpolant](DiscreteInterpolant.html)

Factory method for creating a new discrete interpolant.

**result**

The result buffer.

**Returns:** The new interpolant.

### .[InterpolantFactoryMethodLinear](#InterpolantFactoryMethodLinear)( result : TypedArray ) : [LinearInterpolant](LinearInterpolant.html)

Factory method for creating a new linear interpolant.

**result**

The result buffer.

**Returns:** The new interpolant.

### .[InterpolantFactoryMethodSmooth](#InterpolantFactoryMethodSmooth)( result : TypedArray ) : [CubicInterpolant](CubicInterpolant.html)

Factory method for creating a new smooth interpolant.

**result**

The result buffer.

**Returns:** The new interpolant.

### .[clone](#clone)() : [KeyframeTrack](KeyframeTrack.html)

Returns a new keyframe track with copied values from this instance.

**Returns:** A clone of this instance.

### .[getInterpolation](#getInterpolation)() : [InterpolateLinear](global.html#InterpolateLinear) | [InterpolateDiscrete](global.html#InterpolateDiscrete) | [InterpolateSmooth](global.html#InterpolateSmooth) | [InterpolateBezier](global.html#InterpolateBezier)

Returns the current interpolation type.

**Returns:** The interpolation type.

### .[getValueSize](#getValueSize)() : number

Returns the value size.

**Returns:** The value size.

### .[optimize](#optimize)() : [KeyframeTrack](KeyframeTrack.html)

Optimizes this keyframe track by removing equivalent sequential keys (which are common in morph target sequences).

**Returns:** A reference to this keyframe track.

### .[scale](#scale)( timeScale : number ) : [KeyframeTrack](KeyframeTrack.html)

Scale all keyframe times by a factor (useful for frame - seconds conversions).

**timeScale**

The time scale.

**Returns:** A reference to this keyframe track.

### .[setInterpolation](#setInterpolation)( interpolation : [InterpolateLinear](global.html#InterpolateLinear) | [InterpolateDiscrete](global.html#InterpolateDiscrete) | [InterpolateSmooth](global.html#InterpolateSmooth) | [InterpolateBezier](global.html#InterpolateBezier) ) : [KeyframeTrack](KeyframeTrack.html)

Defines the interpolation factor method for this keyframe track.

**interpolation**

The interpolation type.

**Returns:** A reference to this keyframe track.

### .[shift](#shift)( timeOffset : number ) : [KeyframeTrack](KeyframeTrack.html)

Moves all keyframes either forward or backward in time.

**timeOffset**

The offset to move the time values.

**Returns:** A reference to this keyframe track.

### .[trim](#trim)( startTime : number, endTime : number ) : [KeyframeTrack](KeyframeTrack.html)

Removes keyframes before and after animation without changing any values within the defined time range.

Note: The method does not shift around keys to the start of the track time, because for interpolated keys this will change their values

**startTime**

The start time.

**endTime**

The end time.

**Returns:** A reference to this keyframe track.

### .[validate](#validate)() : boolean

Performs minimal validation on the keyframe track. Returns `true` if the values are valid.

**Returns:** Whether the keyframes are valid or not.

## Static Methods

### .[toJSON](#.toJSON)( track : [KeyframeTrack](KeyframeTrack.html) ) : Object

Converts the keyframe track to JSON.

**track**

The keyframe track to serialize.

**Returns:** The serialized keyframe track as JSON.

## Source

[src/animation/KeyframeTrack.js](https://github.com/mrdoob/three.js/blob/master/src/animation/KeyframeTrack.js)