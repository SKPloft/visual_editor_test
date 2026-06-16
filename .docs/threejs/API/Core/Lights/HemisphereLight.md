Title: HemisphereLight
Source URL: https://threejs.org/docs/pages/HemisphereLight.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) → [Light](Light.html) →

# HemisphereLight

A light source positioned directly above the scene, with color fading from the sky color to the ground color.

This light cannot be used to cast shadows.

## Code Example

```js
const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
scene.add( light );
```

## Constructor

### new [HemisphereLight](#HemisphereLight)( skyColor : number | [Color](Color.html) | string, groundColor : number | [Color](Color.html) | string, intensity : number )

Constructs a new hemisphere light.

**skyColor**

The light's sky color.

Default is `0xffffff`.

**groundColor**

The light's ground color.

Default is `0xffffff`.

**intensity**

The light's strength/intensity.

Default is `1`.

## Properties

### .[groundColor](#groundColor) : [Color](Color.html)

The light's ground color.

### .[isHemisphereLight](#isHemisphereLight) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

## Source

[src/lights/HemisphereLight.js](https://github.com/mrdoob/three.js/blob/master/src/lights/HemisphereLight.js)