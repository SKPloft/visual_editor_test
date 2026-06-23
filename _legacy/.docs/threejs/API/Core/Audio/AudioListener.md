Title: AudioListener
Source URL: https://threejs.org/docs/pages/AudioListener.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) →

# AudioListener

The class represents a virtual listener of the all positional and non-positional audio effects in the scene. A three.js application usually creates a single listener. It is a mandatory constructor parameter for audios entities like [Audio](Audio.html) and [PositionalAudio](PositionalAudio.html).

In most cases, the listener object is a child of the camera. So the 3D transformation of the camera represents the 3D transformation of the listener.

## Constructor

### new [AudioListener](#AudioListener)()

Constructs a new audio listener.

## Properties

### .[context](#context) : [AudioContext](AudioContext.html) (readonly)

The native audio context.

### .[filter](#filter) : AudioNode (readonly)

An optional filter.

Defined via [AudioListener#setFilter](AudioListener.html#setFilter).

Default is `null`.

### .[gain](#gain) : GainNode (readonly)

The gain node used for volume control.

### .[timeDelta](#timeDelta) : number (readonly)

Time delta values required for `linearRampToValueAtTime()` usage.

Default is `0`.

## Methods

### .[getFilter](#getFilter)() : AudioNode

Returns the current set filter.

**Returns:** The filter.

### .[getInput](#getInput)() : GainNode

Returns the listener's input node.

This method is used by other audio nodes to connect to this listener.

**Returns:** The input node.

### .[getMasterVolume](#getMasterVolume)() : number

Returns the applications master volume.

**Returns:** The master volume.

### .[removeFilter](#removeFilter)() : [AudioListener](AudioListener.html)

Removes the current filter from this listener.

**Returns:** A reference to this listener.

### .[setFilter](#setFilter)( value : AudioNode ) : [AudioListener](AudioListener.html)

Sets the given filter to this listener.

**value**

The filter to set.

**Returns:** A reference to this listener.

### .[setMasterVolume](#setMasterVolume)( value : number ) : [AudioListener](AudioListener.html)

Sets the applications master volume. This volume setting affects all audio nodes in the scene.

**value**

The master volume to set.

**Returns:** A reference to this listener.

## Source

[src/audio/AudioListener.js](https://github.com/mrdoob/three.js/blob/master/src/audio/AudioListener.js)