Title: KTX2Exporter
Source URL: https://threejs.org/docs/pages/KTX2Exporter.html

# KTX2Exporter

An exporter for KTX2.

## Code Example

```js
const exporter = new KTX2Exporter();
const result = await exporter.parse( dataTexture );
```

## Import

KTX2Exporter is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { KTX2Exporter } from 'three/addons/exporters/KTX2Exporter.js';
```

## Constructor

### new [KTX2Exporter](#KTX2Exporter)()

## Methods

### .[parse](#parse)( arg1 : [DataTexture](DataTexture.html) | [Data3DTexture](Data3DTexture.html) | [WebGPURenderer](WebGPURenderer.html) | [WebGLRenderer](WebGLRenderer.html), arg2 : [RenderTarget](RenderTarget.html) ) : Promise.<Uint8Array> (async)

This method has two variants.

*   When exporting a data texture, it receives one parameter. The data or 3D data texture.
*   When exporting a render target (e.g. a PMREM), it receives two parameters. The renderer and the render target.

**arg1**

The data texture to export or a renderer.

**arg2**

The render target that should be exported

**Returns:** A Promise that resolves with the exported KTX2.

## Source

[examples/jsm/exporters/KTX2Exporter.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/exporters/KTX2Exporter.js)