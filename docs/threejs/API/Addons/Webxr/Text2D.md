Title: module-Text2D
Source URL: https://threejs.org/docs/pages/module-Text2D.html

# Text2D

## Import

Text2D is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import * as Text2D from 'three/addons/webxr/Text2D.js';
```

## Methods

### .[createText](#~createText)( message : string, height : number ) : [Mesh](Mesh.html) (inner)

A helper function for creating a simple plane mesh that can be used as a text label. The mesh's material holds a canvas texture that displays the given message.

**message**

The message to display.

**height**

The labels height.

**Returns:** The plane mesh representing a text label.

## Source

[examples/jsm/webxr/Text2D.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/webxr/Text2D.js)