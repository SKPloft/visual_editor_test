Title: ShadowMaterial
Source URL: https://threejs.org/docs/pages/ShadowMaterial.html

[EventDispatcher](EventDispatcher.html) → [Material](Material.html) →

# ShadowMaterial

This material can receive shadows, but otherwise is completely transparent.

## Code Example

```js
const geometry = new THREE.PlaneGeometry( 2000, 2000 );
geometry.rotateX( - Math.PI / 2 );
const material = new THREE.ShadowMaterial();
material.opacity = 0.2;
const plane = new THREE.Mesh( geometry, material );
plane.position.y = -200;
plane.receiveShadow = true;
scene.add( plane );
```

## Constructor

### new [ShadowMaterial](#ShadowMaterial)( parameters : Object )

Constructs a new shadow material.

**parameters**

An object with one or more properties defining the material's appearance. Any property of the material (including any property from inherited materials) can be passed in here. Color values can be passed any type of value accepted by [Color#set](Color.html#set).

## Properties

### .[color](#color) : [Color](Color.html)

Color of the material.

Default is `(0,0,0)`.

### .[fog](#fog) : boolean

Whether the material is affected by fog or not.

Default is `true`.

### .[isShadowMaterial](#isShadowMaterial) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[transparent](#transparent) : boolean

Overwritten since shadow materials are transparent by default.

Default is `true`.

**Overrides:** [Material#transparent](Material.html#transparent)

## Source

[src/materials/ShadowMaterial.js](https://github.com/mrdoob/three.js/blob/master/src/materials/ShadowMaterial.js)