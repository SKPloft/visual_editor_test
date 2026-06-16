Title: AnimationAction
Source URL: https://threejs.org/docs/pages/AnimationAction.html

# AnimationAction

An instance of `AnimationAction` schedules the playback of an animation which is stored in [AnimationClip](AnimationClip.html).

## Constructor

### new [AnimationAction](#AnimationAction)( mixer : [AnimationMixer](AnimationMixer.html), clip : [AnimationClip](AnimationClip.html), localRoot : [Object3D](Object3D.html), blendMode : [NormalAnimationBlendMode](global.html#NormalAnimationBlendMode) | [AdditiveAnimationBlendMode](global.html#AdditiveAnimationBlendMode) )

Constructs a new animation action.

**mixer**

The mixer that is controlled by this action.

**clip**

The animation clip that holds the actual keyframes.

**localRoot**

The root object on which this action is performed.

Default is `null`.

**blendMode**

The blend mode.

## Properties

### .[blendMode](#blendMode) : [NormalAnimationBlendMode](global.html#NormalAnimationBlendMode) | [AdditiveAnimationBlendMode](global.html#AdditiveAnimationBlendMode)

Defines how the animation is blended/combined when two or more animations are simultaneously played.

### .[clampWhenFinished](#clampWhenFinished) : boolean

If set to true the animation will automatically be paused on its last frame.

If set to false, [AnimationAction#enabled](AnimationAction.html#enabled) will automatically be switched to `false` when the last loop of the action has finished, so that this action has no further impact.

Note: This member has no impact if the action is interrupted (it has only an effect if its last loop has really finished).

Default is `false`.

### .[enabled](#enabled) : boolean

If set to `false`, the action is disabled so it has no impact.

When the action is re-enabled, the animation continues from its current time (setting `enabled` to `false` doesn't reset the action).

Default is `true`.

### .[loop](#loop) : [LoopRepeat](global.html#LoopRepeat) | [LoopOnce](global.html#LoopOnce) | [LoopPingPong](global.html#LoopPingPong)

The loop mode, set via [AnimationAction#setLoop](AnimationAction.html#setLoop).

Default is `LoopRepeat`.

### .[paused](#paused) : boolean

If set to `true`, the playback of the action is paused.

Default is `false`.

### .[repetitions](#repetitions) : number

The number of repetitions of the performed clip over the course of this action. Can be set via [AnimationAction#setLoop](AnimationAction.html#setLoop).

Setting this number has no effect if [AnimationAction#loop](AnimationAction.html#loop) is set to `THREE:LoopOnce`.

Default is `Infinity`.

### .[time](#time) : number

The local time of this action (in seconds, starting with `0`).

The value gets clamped or wrapped to `[0,clip.duration]` (according to the loop state).

Default is `Infinity`.

### .[timeScale](#timeScale) : number

Scaling factor for the [AnimationAction#time](AnimationAction.html#time). A value of `0` causes the animation to pause. Negative values cause the animation to play backwards.

Default is `1`.

### .[weight](#weight) : number

The degree of influence of this action (in the interval `[0, 1]`). Values between `0` (no impact) and `1` (full impact) can be used to blend between several actions.

Default is `1`.

### .[zeroSlopeAtEnd](#zeroSlopeAtEnd) : boolean

Enables smooth interpolation without separate clips for start, loop and end.

Default is `true`.

### .[zeroSlopeAtStart](#zeroSlopeAtStart) : boolean

Enables smooth interpolation without separate clips for start, loop and end.

Default is `true`.

## Methods

### .[crossFadeFrom](#crossFadeFrom)( fadeOutAction : [AnimationAction](AnimationAction.html), duration : number, warp : boolean ) : [AnimationAction](AnimationAction.html)

Causes this action to fade in and the given action to fade out, within the passed time interval.

**fadeOutAction**

The animation action to fade out.

**duration**

The duration of the fade.

**warp**

Whether warping should be used or not.

Default is `false`.

**Returns:** A reference to this animation action.

### .[crossFadeTo](#crossFadeTo)( fadeInAction : [AnimationAction](AnimationAction.html), duration : number, warp : boolean ) : [AnimationAction](AnimationAction.html)

Causes this action to fade out and the given action to fade in, within the passed time interval.

**fadeInAction**

The animation action to fade in.

**duration**

The duration of the fade.

**warp**

Whether warping should be used or not.

Default is `false`.

**Returns:** A reference to this animation action.

### .[fadeIn](#fadeIn)( duration : number ) : [AnimationAction](AnimationAction.html)

Fades the animation in by increasing its weight gradually from `0` to `1`, within the passed time interval.

**duration**

The duration of the fade.

**Returns:** A reference to this animation action.

### .[fadeOut](#fadeOut)( duration : number ) : [AnimationAction](AnimationAction.html)

Fades the animation out by decreasing its weight gradually from `1` to `0`, within the passed time interval.

**duration**

The duration of the fade.

**Returns:** A reference to this animation action.

### .[getClip](#getClip)() : [AnimationClip](AnimationClip.html)

Returns the animation clip of this animation action.

**Returns:** The animation clip.

### .[getEffectiveTimeScale](#getEffectiveTimeScale)() : number

Returns the effective time scale of this action.

**Returns:** The effective time scale.

### .[getEffectiveWeight](#getEffectiveWeight)() : number

Returns the effective weight of this action.

**Returns:** The effective weight.

### .[getMixer](#getMixer)() : [AnimationMixer](AnimationMixer.html)

Returns the animation mixer of this animation action.

**Returns:** The animation mixer.

### .[getRoot](#getRoot)() : [Object3D](Object3D.html)

Returns the root object of this animation action.

**Returns:** The root object.

### .[halt](#halt)( duration : number ) : [AnimationAction](AnimationAction.html)

Decelerates this animation's speed to `0` within the passed time interval.

**duration**

The duration.

**Returns:** A reference to this animation action.

### .[isRunning](#isRunning)() : boolean

Returns `true` if the animation is running.

**Returns:** Whether the animation is running or not.

### .[isScheduled](#isScheduled)() : boolean

Returns `true` when [AnimationAction#play](AnimationAction.html#play) has been called.

**Returns:** Whether the animation is scheduled or not.

### .[play](#play)() : [AnimationAction](AnimationAction.html)

Starts the playback of the animation.

**Returns:** A reference to this animation action.

### .[reset](#reset)() : [AnimationAction](AnimationAction.html)

Resets the playback of the animation.

**Returns:** A reference to this animation action.

### .[setDuration](#setDuration)( duration : number ) : [AnimationAction](AnimationAction.html)

Sets the duration for a single loop of this action.

**duration**

The duration to set.

**Returns:** A reference to this animation action.

### .[setEffectiveTimeScale](#setEffectiveTimeScale)( timeScale : number ) : [AnimationAction](AnimationAction.html)

Sets the effective time scale of this action.

An action has no effect and thus an effective time scale of zero when the action is paused.

**timeScale**

The time scale to set.

**Returns:** A reference to this animation action.

### .[setEffectiveWeight](#setEffectiveWeight)( weight : number ) : [AnimationAction](AnimationAction.html)

Sets the effective weight of this action.

An action has no effect and thus an effective weight of zero when the action is disabled.

**weight**

The weight to set.

**Returns:** A reference to this animation action.

### .[setLoop](#setLoop)( mode : [LoopRepeat](global.html#LoopRepeat) | [LoopOnce](global.html#LoopOnce) | [LoopPingPong](global.html#LoopPingPong), repetitions : number ) : [AnimationAction](AnimationAction.html)

Configures the loop settings for this action.

**mode**

The loop mode.

**repetitions**

The number of repetitions.

**Returns:** A reference to this animation action.

### .[startAt](#startAt)( time : number ) : [AnimationAction](AnimationAction.html)

Defines the time when the animation should start.

**time**

The start time in seconds.

**Returns:** A reference to this animation action.

### .[stop](#stop)() : [AnimationAction](AnimationAction.html)

Stops the playback of the animation.

**Returns:** A reference to this animation action.

### .[stopFading](#stopFading)() : [AnimationAction](AnimationAction.html)

Stops any fading which is applied to this action.

**Returns:** A reference to this animation action.

### .[stopWarping](#stopWarping)() : [AnimationAction](AnimationAction.html)

Stops any scheduled warping which is applied to this action.

**Returns:** A reference to this animation action.

### .[syncWith](#syncWith)( action : [AnimationAction](AnimationAction.html) ) : [AnimationAction](AnimationAction.html)

Synchronizes this action with the passed other action.

**action**

The action to sync with.

**Returns:** A reference to this animation action.

### .[warp](#warp)( startTimeScale : number, endTimeScale : number, duration : number ) : [AnimationAction](AnimationAction.html)

Changes the playback speed, within the passed time interval, by modifying [AnimationAction#timeScale](AnimationAction.html#timeScale) gradually from `startTimeScale` to `endTimeScale`.

**startTimeScale**

The start time scale.

**endTimeScale**

The end time scale.

**duration**

The duration.

**Returns:** A reference to this animation action.

## Source

[src/animation/AnimationAction.js](https://github.com/mrdoob/three.js/blob/master/src/animation/AnimationAction.js)