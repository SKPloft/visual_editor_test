Title: AnimationUtils
Source URL: https://threejs.org/docs/pages/AnimationUtils.html

# AnimationUtils

A class with various methods to assist with animations.

## Static Methods

### .[convertArray](#.convertArray)( array : TypedArray | Array, type : TypedArray.constructor ) : TypedArray

Converts an array to a specific type

**array**

The array to convert.

**type**

The constructor of a type array.

**Returns:** The converted array

### .[flattenJSON](#.flattenJSON)( jsonKeys : Array.<number>, times : Array.<number>, values : Array.<number>, valuePropertyName : string )

Used for parsing AOS keyframe formats.

**jsonKeys**

A list of JSON keyframes.

**times**

This array will be filled with keyframe times by this method.

**values**

This array will be filled with keyframe values by this method.

**valuePropertyName**

The name of the property to use.

### .[getKeyframeOrder](#.getKeyframeOrder)( times : Array.<number> ) : Array.<number>

Returns an array by which times and values can be sorted.

**times**

The keyframe time values.

**Returns:** The array.

### .[isTypedArray](#.isTypedArray)( object : [any](global.html#any) ) : boolean

Returns `true` if the given object is a typed array.

**object**

The object to check.

**Returns:** Whether the given object is a typed array.

### .[makeClipAdditive](#.makeClipAdditive)( targetClip : [AnimationClip](AnimationClip.html), referenceFrame : number, referenceClip : [AnimationClip](AnimationClip.html), fps : number ) : [AnimationClip](AnimationClip.html)

Converts the keyframes of the given animation clip to an additive format.

**targetClip**

The clip to make additive.

**referenceFrame**

The reference frame.

Default is `0`.

**referenceClip**

The reference clip.

Default is `targetClip`.

**fps**

The FPS.

Default is `30`.

**Returns:** The updated clip which is now additive.

### .[sortedArray](#.sortedArray)( values : Array.<number>, stride : number, order : Array.<number> ) : Array.<number>

Sorts the given array by the previously computed order via `getKeyframeOrder()`.

**values**

The values to sort.

**stride**

The stride.

**order**

The sort order.

**Returns:** The sorted values.

### .[subclip](#.subclip)( sourceClip : [AnimationClip](AnimationClip.html), name : string, startFrame : number, endFrame : number, fps : number ) : [AnimationClip](AnimationClip.html)

Creates a new clip, containing only the segment of the original clip between the given frames.

**sourceClip**

The values to sort.

**name**

The name of the clip.

**startFrame**

The start frame.

**endFrame**

The end frame.

**fps**

The FPS.

Default is `30`.

**Returns:** The new sub clip.

## Source

[src/animation/AnimationUtils.js](https://github.com/mrdoob/three.js/blob/master/src/animation/AnimationUtils.js)