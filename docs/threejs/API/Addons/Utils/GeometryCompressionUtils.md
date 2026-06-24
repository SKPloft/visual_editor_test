Title: module-GeometryCompressionUtils
Source URL: https://threejs.org/docs/pages/module-GeometryCompressionUtils.html

# GeometryCompressionUtils

## Import

GeometryCompressionUtils is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import * as GeometryCompressionUtils from 'three/addons/utils/GeometryCompressionUtils.js';
```

## Methods

### .[compressNormals](#~compressNormals)( geometry : [BufferGeometry](BufferGeometry.html), encodeMethod : 'DEFAULT' | 'OCT1Byte' | 'OCT2Byte' | 'ANGLES' ) (inner)

Compressed the given geometry's `normal` attribute by the selected encode method.

**geometry**

The geometry whose normals should be compressed.

**encodeMethod**

The compression method.

### .[compressPositions](#~compressPositions)( geometry : [BufferGeometry](BufferGeometry.html) ) (inner)

Compressed the given geometry's `position` attribute.

**geometry**

The geometry whose position values should be compressed.

### .[compressUvs](#~compressUvs)( geometry : [BufferGeometry](BufferGeometry.html) ) (inner)

Compressed the given geometry's `uv` attribute.

**geometry**

The geometry whose texture coordinates should be compressed.

## Source

[examples/jsm/utils/GeometryCompressionUtils.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/utils/GeometryCompressionUtils.js)