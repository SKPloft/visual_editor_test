Title: ProgressiveLightMap
Source URL: https://threejs.org/docs/pages/ProgressiveLightMap.html

# ProgressiveLightMap

Progressive Light Map Accumulator, by [zalo](https://github.com/zalo/).

To use, simply construct a `ProgressiveLightMap` object, `plmap.addObjectsToLightMap(object)` an array of semi-static objects and lights to the class once, and then call `plmap.update(camera)` every frame to begin accumulating lighting samples.

This should begin accumulating lightmaps which apply to your objects, so you can start jittering lighting to achieve the texture-space effect you're looking for.

This class can only be used with [WebGLRenderer](WebGLRenderer.html). When using [WebGPURenderer](WebGPURenderer.html), import from `ProgressiveLightMapGPU.js`.

## Import

ProgressiveLightMap is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { ProgressiveLightMap } from 'three/addons/misc/ProgressiveLightMap.js';
```

## Constructor

### new [ProgressiveLightMap](#ProgressiveLightMap)( renderer : [WebGLRenderer](WebGLRenderer.html), res : number )

Constructs a new progressive light map.

**renderer**

The renderer.

**res**

The side-long dimension of the total lightmap.

Default is `1024`.

## Properties

### .[renderer](#renderer) : [WebGLRenderer](WebGLRenderer.html)

The renderer.

### .[res](#res) : number

The side-long dimension of the total lightmap.

Default is `1024`.

## Methods

### .[addObjectsToLightMap](#addObjectsToLightMap)( objects : Array.<[Object3D](Object3D.html)\> )

Sets these objects' materials' lightmaps and modifies their uv1's.

**objects**

An array of objects and lights to set up your lightmap.

### .[dispose](#dispose)()

Frees all internal resources.

### .[showDebugLightmap](#showDebugLightmap)( visible : boolean, position : [Vector3](Vector3.html) )

Draws the lightmap in the main scene. Call this after adding the objects to it.

**visible**

Whether the debug plane should be visible

**position**

Where the debug plane should be drawn

### .[update](#update)( camera : [Camera](Camera.html), blendWindow : number, blurEdges : boolean )

This function renders each mesh one at a time into their respective surface maps.

**camera**

The camera the scene is rendered with.

**blendWindow**

When >1, samples will accumulate over time.

Default is `100`.

**blurEdges**

Whether to fix UV Edges via blurring.

Default is `true`.

## Source

[examples/jsm/misc/ProgressiveLightMap.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/misc/ProgressiveLightMap.js)