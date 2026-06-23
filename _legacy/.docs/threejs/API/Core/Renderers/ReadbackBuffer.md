Title: ReadbackBuffer
Source URL: https://threejs.org/docs/pages/ReadbackBuffer.html

[EventDispatcher](EventDispatcher.html) →

# ReadbackBuffer

A readback buffer is used to transfer data from the GPU to the CPU. It is primarily used to read back compute shader results.

## Constructor

### new [ReadbackBuffer](#ReadbackBuffer)( maxByteLength : number )

Constructs a new readback buffer.

**maxByteLength**

The maximum size of the buffer to be read back.

## Properties

### .[buffer](#buffer) : ArrayBuffer | null

The mapped, read back array buffer.

### .[isReadbackBuffer](#isReadbackBuffer) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[maxByteLength](#maxByteLength) : number

The maximum size of the buffer to be read back.

### .[name](#name) : string

Name used for debugging purposes.

## Methods

### .[dispose](#dispose)()

Frees internal resources.

### .[release](#release)()

Releases the mapped buffer data so the GPU buffer can be used by the GPU again.

Note: Any `ArrayBuffer` data associated with this readback buffer are removed and no longer accessible after calling this method.

## Source

[src/renderers/common/ReadbackBuffer.js](https://github.com/mrdoob/three.js/blob/master/src/renderers/common/ReadbackBuffer.js)