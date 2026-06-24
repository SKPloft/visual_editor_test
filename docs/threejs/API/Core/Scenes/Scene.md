Title: scene
Source URL: https://threejs.org/docs/pages/Scene.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) →

# Scene

Scenes allow you to set up what is to be rendered and where by three.js. This is where you place 3D objects like meshes, lines or lights.

## Constructor

### new [Scene](#Scene)()

Constructs a new scene.

## Properties

### .[background](#background) : [Color](Color.html) | [Texture](Texture.html)

Defines the background of the scene. Valid inputs are:

*   A color for defining a uniform colored background.
*   A texture for defining a (flat) textured background.
*   Cube textures or equirectangular textures for defining a skybox.

Default is `null`.

### .[backgroundBlurriness](#backgroundBlurriness) : number

Sets the blurriness of the background. Only influences environment maps assigned to [Scene#background](Scene.html#background). Valid input is a float between `0` and `1`.

Default is `0`.

### .[backgroundIntensity](#backgroundIntensity) : number

Attenuates the color of the background. Only applies to background textures.

Default is `1`.

### .[backgroundRotation](#backgroundRotation) : [Euler](Euler.html)

The rotation of the background in radians. Only influences environment maps assigned to [Scene#background](Scene.html#background).

Default is `(0,0,0)`.

### .[environment](#environment) : [Texture](Texture.html)

Sets the environment map for all physical materials in the scene. However, it's not possible to overwrite an existing texture assigned to the `envMap` material property.

Default is `null`.

### .[environmentIntensity](#environmentIntensity) : number

Attenuates the color of the environment. Only influences environment maps assigned to [Scene#environment](Scene.html#environment).

Default is `1`.

### .[environmentRotation](#environmentRotation) : [Euler](Euler.html)

The rotation of the environment map in radians. Only influences physical materials in the scene when [Scene#environment](Scene.html#environment) is used.

Default is `(0,0,0)`.

### .[fog](#fog) : [Fog](Fog.html) | [FogExp2](FogExp2.html)

A fog instance defining the type of fog that affects everything rendered in the scene.

Default is `null`.

### .[isScene](#isScene) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[overrideMaterial](#overrideMaterial) : [Material](Material.html)

Forces everything in the scene to be rendered with the defined material. It is possible to exclude materials from override by setting [Material#allowOverride](Material.html#allowOverride) to `false`.

Default is `null`.

## Source

[src/scenes/Scene.js](https://github.com/mrdoob/three.js/blob/master/src/scenes/Scene.js)