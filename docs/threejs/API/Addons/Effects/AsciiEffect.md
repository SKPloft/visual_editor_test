Title: AsciiEffect
Source URL: https://threejs.org/docs/pages/AsciiEffect.html

# AsciiEffect

A class that creates an ASCII effect.

The ASCII generation is based on [jsascii](https://github.com/hassadee/jsascii/blob/master/jsascii.js).

## Import

AsciiEffect is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { AsciiEffect } from 'three/addons/effects/AsciiEffect.js';
```

## Constructor

### new [AsciiEffect](#AsciiEffect)( renderer : [WebGLRenderer](WebGLRenderer.html), charSet : string, options : [AsciiEffect~Options](AsciiEffect.html#~Options) )

Constructs a new ASCII effect.

**renderer**

The renderer.

**charSet**

The char set.

Default is `' .:-=+*#%@'`.

**options**

The configuration parameter.

## Properties

### .[domElement](#domElement) : HTMLDivElement

The DOM element of the effect. This element must be used instead of the default [WebGLRenderer#domElement](WebGLRenderer.html#domElement).

## Methods

### .[render](#render)( scene : [Object3D](Object3D.html), camera : [Camera](Camera.html) )

When using this effect, this method should be called instead of the default [WebGLRenderer#render](WebGLRenderer.html#render).

**scene**

The scene to render.

**camera**

The camera.

### .[setSize](#setSize)( w : number, h : number )

Resizes the effect.

**w**

The width of the effect in logical pixels.

**h**

The height of the effect in logical pixels.

## Type Definitions

### .[Options](#~Options)

This type represents configuration settings of `AsciiEffect`.

**resolution**  
number

A higher value leads to more details.

Default is `0.15`.

**scale**  
number

The scale of the effect.

Default is `1`.

**color**  
boolean

Whether colors should be enabled or not. Better quality but slows down rendering.

Default is `false`.

**alpha**  
boolean

Whether transparency should be enabled or not.

Default is `false`.

**block**  
boolean

Whether blocked characters should be enabled or not.

Default is `false`.

**invert**  
boolean

Whether colors should be inverted or not.

Default is `false`.

**strResolution**  
'low' | 'medium' | 'high'

The string resolution.

Default is `'low'`.

## Source

[examples/jsm/effects/AsciiEffect.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/effects/AsciiEffect.js)