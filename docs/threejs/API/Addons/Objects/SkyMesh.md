Title: SkyMesh
Source URL: https://threejs.org/docs/pages/SkyMesh.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) → [Mesh](Mesh.html) →

# SkyMesh

Represents a skydome for scene backgrounds. Based on [A Practical Analytic Model for Daylight](https://www.researchgate.net/publication/220720443_A_Practical_Analytic_Model_for_Daylight) aka The Preetham Model, the de facto standard for analytical skydomes.

Note that this class can only be used with [WebGPURenderer](WebGPURenderer.html). When using [WebGLRenderer](WebGLRenderer.html), use [Sky](Sky.html).

More references:

*   [http://simonwallner.at/project/atmospheric-scattering/](http://simonwallner.at/project/atmospheric-scattering/)
*   [http://blenderartists.org/forum/showthread.php?245954-preethams-sky-impementation-HDR](http://blenderartists.org/forum/showthread.php?245954-preethams-sky-impementation-HDR)

It can be useful to hide the sun disc when generating an environment map to avoid artifacts

```js
// disable before rendering environment map
sky.showSunDisc.value = false;
// ...
// re-enable before scene sky box rendering
sky.showSunDisc.value = true;
```

## Code Example

```js
const sky = new SkyMesh();
sky.scale.setScalar( 10000 );
scene.add( sky );
```

## Import

SkyMesh is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { SkyMesh } from 'three/addons/objects/SkyMesh.js';
```

## Constructor

### new [SkyMesh](#SkyMesh)()

Constructs a new skydome.

## Properties

### .[cloudCoverage](#cloudCoverage) : [UniformNode](UniformNode.html).<float>

The cloud coverage uniform.

### .[cloudDensity](#cloudDensity) : [UniformNode](UniformNode.html).<float>

The cloud density uniform.

### .[cloudElevation](#cloudElevation) : [UniformNode](UniformNode.html).<float>

The cloud elevation uniform.

### .[cloudScale](#cloudScale) : [UniformNode](UniformNode.html).<float>

The cloud scale uniform.

### .[cloudSpeed](#cloudSpeed) : [UniformNode](UniformNode.html).<float>

The cloud speed uniform.

### .[isSky](#isSky) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

**Deprecated:** Use isSkyMesh instead.

### .[isSkyMesh](#isSkyMesh) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[mieCoefficient](#mieCoefficient) : [UniformNode](UniformNode.html).<float>

The mieCoefficient uniform.

### .[mieDirectionalG](#mieDirectionalG) : [UniformNode](UniformNode.html).<float>

The mieDirectionalG uniform.

### .[rayleigh](#rayleigh) : [UniformNode](UniformNode.html).<float>

The rayleigh uniform.

### .[showSunDisc](#showSunDisc) : [UniformNode](UniformNode.html).<float>

Whether to render the solar disc.

### .[sunPosition](#sunPosition) : [UniformNode](UniformNode.html).<vec3>

The sun position uniform.

### .[turbidity](#turbidity) : [UniformNode](UniformNode.html).<float>

The turbidity uniform.

### .[upUniform](#upUniform) : [UniformNode](UniformNode.html).<vec3>

The up position.

## Source

[examples/jsm/objects/SkyMesh.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/objects/SkyMesh.js)