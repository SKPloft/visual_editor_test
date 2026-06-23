Title: PointLight
Source URL: https://threejs.org/docs/pages/PointLight.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) → [Light](Light.html) →

# PointLight

A light that gets emitted from a single point in all directions. A common use case for this is to replicate the light emitted from a bare lightbulb.

This light can cast shadows - see the [PointLightShadow](PointLightShadow.html) for details.

## Code Example

```js
const light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 50, 50, 50 );
scene.add( light );
```

## Constructor

### new [PointLight](#PointLight)( color : number | [Color](Color.html) | string, intensity : number, distance : number, decay : number )

Constructs a new point light.

**color**

The light's color.

Default is `0xffffff`.

**intensity**

The light's strength/intensity measured in candela (cd).

Default is `1`.

**distance**

Maximum range of the light. `0` means no limit.

Default is `0`.

**decay**

The amount the light dims along the distance of the light.

Default is `2`.

## Properties

### .[decay](#decay) : number

The amount the light dims along the distance of the light. In context of physically-correct rendering the default value should not be changed.

Default is `2`.

### .[distance](#distance) : number

When distance is zero, light will attenuate according to inverse-square law to infinite distance. When distance is non-zero, light will attenuate according to inverse-square law until near the distance cutoff, where it will then attenuate quickly and smoothly to 0. Inherently, cutoffs are not physically correct.

Default is `0`.

### .[isPointLight](#isPointLight) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[power](#power) : number

The light's power. Power is the luminous power of the light measured in lumens (lm). Changing the power will also change the light's intensity.

### .[shadow](#shadow) : [PointLightShadow](PointLightShadow.html)

This property holds the light's shadow configuration.

## Source

[src/lights/PointLight.js](https://github.com/mrdoob/three.js/blob/master/src/lights/PointLight.js)