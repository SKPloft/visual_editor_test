Title: ClippingGroup
Source URL: https://threejs.org/docs/pages/ClippingGroup.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) → [Group](Group.html) →

# ClippingGroup

In earlier three.js versions, clipping was defined globally on the renderer or on material level. This special version of `THREE.Group` allows to encode the clipping state into the scene graph. Meaning if you create an instance of this group, all descendant 3D objects will be affected by the respective clipping planes.

Note: `ClippingGroup` can only be used with `WebGPURenderer`.

## Constructor

### new [ClippingGroup](#ClippingGroup)()

Constructs a new clipping group.

## Properties

### .[clipIntersection](#clipIntersection) : boolean

Whether the intersection of the clipping planes is used to clip objects, rather than their union.

Default is `false`.

### .[clipShadows](#clipShadows) : boolean

Whether shadows should be clipped or not.

Default is `false`.

### .[clippingPlanes](#clippingPlanes) : Array.<[Plane](Plane.html)\>

An array with clipping planes.

### .[enabled](#enabled) : boolean

Whether clipping should be enabled or not.

Default is `true`.

### .[isClippingGroup](#isClippingGroup) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

## Source

[src/objects/ClippingGroup.js](https://github.com/mrdoob/three.js/blob/master/src/objects/ClippingGroup.js)