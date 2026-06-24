Title: PropertyMixer
Source URL: https://threejs.org/docs/pages/PropertyMixer.html

# PropertyMixer

Buffered scene graph property that allows weighted accumulation; used internally.

## Constructor

### new [PropertyMixer](#PropertyMixer)( binding : [PropertyBinding](PropertyBinding.html), typeName : string, valueSize : number )

Constructs a new property mixer.

**binding**

The property binding.

**typeName**

The keyframe track type name.

**valueSize**

The keyframe track value size.

## Properties

### .[binding](#binding) : [PropertyBinding](PropertyBinding.html)

The property binding.

### .[cumulativeWeight](#cumulativeWeight) : number

Accumulated weight of the property binding.

Default is `0`.

### .[cumulativeWeightAdditive](#cumulativeWeightAdditive) : number

Accumulated additive weight of the property binding.

Default is `0`.

### .[referenceCount](#referenceCount) : number

Number of keyframe tracks referencing this property binding.

Default is `0`.

### .[useCount](#useCount) : number

Number of active keyframe tracks currently using this property binding.

Default is `0`.

### .[valueSize](#valueSize) : number

The keyframe track value size.

## Methods

### .[accumulate](#accumulate)( accuIndex : number, weight : number )

Accumulates data in the `incoming` region into `accu<i>`.

**accuIndex**

The accumulation index.

**weight**

The weight.

### .[accumulateAdditive](#accumulateAdditive)( weight : number )

Accumulates data in the `incoming` region into `add`.

**weight**

The weight.

### .[apply](#apply)( accuIndex : number )

Applies the state of `accu<i>` to the binding when accus differ.

**accuIndex**

The accumulation index.

### .[restoreOriginalState](#restoreOriginalState)()

Applies the state previously taken via [PropertyMixer#saveOriginalState](PropertyMixer.html#saveOriginalState) to the binding.

### .[saveOriginalState](#saveOriginalState)()

Remembers the state of the bound property and copy it to both accus.

## Source

[src/animation/PropertyMixer.js](https://github.com/mrdoob/three.js/blob/master/src/animation/PropertyMixer.js)