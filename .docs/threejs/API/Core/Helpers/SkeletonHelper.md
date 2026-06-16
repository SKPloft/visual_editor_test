Title: SkeletonHelper
Source URL: https://threejs.org/docs/pages/SkeletonHelper.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) → [Line](Line.html) → [LineSegments](LineSegments.html) →

# SkeletonHelper

A helper object to assist with visualizing a [Skeleton](Skeleton.html).

## Code Example

```js
const helper = new THREE.SkeletonHelper( skinnedMesh );
scene.add( helper );
```

## Constructor

### new [SkeletonHelper](#SkeletonHelper)( object : [Object3D](Object3D.html) )

Constructs a new skeleton helper.

**object**

Usually an instance of [SkinnedMesh](SkinnedMesh.html). However, any 3D object can be used if it represents a hierarchy of bones (see [Bone](Bone.html)).

## Properties

### .[bones](#bones) : Array.<[Bone](Bone.html)\>

The list of bones that the helper visualizes.

### .[isSkeletonHelper](#isSkeletonHelper) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[root](#root) : [Object3D](Object3D.html)

The object being visualized.

## Methods

### .[dispose](#dispose)()

Frees the GPU-related resources allocated by this instance. Call this method whenever this instance is no longer used in your app.

### .[setColors](#setColors)( color1 : [Color](Color.html), color2 : [Color](Color.html) ) : [SkeletonHelper](SkeletonHelper.html)

Defines the colors of the helper.

**color1**

The first line color for each bone.

**color2**

The second line color for each bone.

**Returns:** A reference to this helper.

## Source

[src/helpers/SkeletonHelper.js](https://github.com/mrdoob/three.js/blob/master/src/helpers/SkeletonHelper.js)