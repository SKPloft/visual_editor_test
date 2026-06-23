Title: MD2CharacterComplex
Source URL: https://threejs.org/docs/pages/MD2CharacterComplex.html

# MD2CharacterComplex

This class represents a management component for animated MD2 character assets. It provides a larger API compared to [MD2Character](MD2Character.html).

## Import

MD2CharacterComplex is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { MD2CharacterComplex } from 'three/addons/misc/MD2CharacterComplex.js';
```

## Constructor

### new [MD2CharacterComplex](#MD2CharacterComplex)()

Constructs a new MD2 character.

## Properties

### .[angularSpeed](#angularSpeed) : number

The character's angular speed.

Default is `2.5`.

### .[animationFPS](#animationFPS) : number

The FPS

Default is `6`.

### .[backAcceleration](#backAcceleration) : number

The character's back acceleration.

Default is `600`.

### .[controls](#controls) : Object

The movement controls.

Default is `null`.

### .[currentSkin](#currentSkin) : [Texture](Texture.html)

The current skin.

Default is `undefined`.

### .[frontAcceleration](#frontAcceleration) : number

The character's front acceleration.

Default is `600`.

### .[frontDeceleration](#frontDeceleration) : number

The character's front deceleration.

Default is `600`.

### .[maxReverseSpeed](#maxReverseSpeed) : number

The character's maximum reverse speed.

Default is `- 275`.

### .[maxSpeed](#maxSpeed) : number

The character's maximum speed.

Default is `275`.

### .[meshBody](#meshBody) : [Mesh](Mesh.html)

The body mesh.

Default is `null`.

### .[meshWeapon](#meshWeapon) : [Mesh](Mesh.html)

The weapon mesh.

Default is `null`.

### .[root](#root) : [Object3D](Object3D.html)

The root 3D object

### .[scale](#scale) : number

The mesh scale.

Default is `1`.

### .[skinsBody](#skinsBody) : Array.<[Texture](Texture.html)\>

The body skins.

### .[skinsWeapon](#skinsWeapon) : Array.<[Texture](Texture.html)\>

The weapon skins.

### .[transitionFrames](#transitionFrames) : number

The transition frames.

Default is `15`.

### .[weapons](#weapons) : Array.<[Mesh](Mesh.html)\>

The weapon meshes.

## Methods

### .[enableShadows](#enableShadows)( enable : boolean )

Toggles shadow casting and receiving on the character's meshes.

**enable**

Whether to enable shadows or not.

### .[loadParts](#loadParts)( config : Object )

Loads the character model for the given config.

**config**

The config which defines the model and textures paths.

### .[setAnimation](#setAnimation)( animationName : string )

Sets the defined animation clip as the active animation.

**animationName**

The name of the animation clip.

### .[setPlaybackRate](#setPlaybackRate)( rate : number )

Sets the animation playback rate.

**rate**

The playback rate to set.

### .[setSkin](#setSkin)( index : number )

Sets the skin defined by the given skin index. This will result in a different texture for the body mesh.

**index**

The skin index.

### .[setVisible](#setVisible)( enable : boolean )

Toggles visibility on the character's meshes.

**enable**

Whether the character is visible or not.

### .[setWeapon](#setWeapon)( index : number )

Sets the weapon defined by the given weapon index. This will result in a different weapon hold by the character.

**index**

The weapon index.

### .[setWireframe](#setWireframe)( wireframeEnabled : boolean )

Sets the wireframe material flag.

**wireframeEnabled**

Whether to enable wireframe rendering or not.

### .[shareParts](#shareParts)( original : [MD2CharacterComplex](MD2CharacterComplex.html) )

Shares certain resources from a different character model.

**original**

The original MD2 character.

### .[updateAnimations](#updateAnimations)( delta : number )

Updates the animations of the mesh. Must be called inside the animation loop.

**delta**

The delta time in seconds.

### .[updateBehaviors](#updateBehaviors)()

Updates the animation state based on the control inputs.

### .[updateMovementModel](#updateMovementModel)( delta : number )

Transforms the character model based on the control input.

**delta**

The delta time in seconds.

## Source

[examples/jsm/misc/MD2CharacterComplex.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/misc/MD2CharacterComplex.js)