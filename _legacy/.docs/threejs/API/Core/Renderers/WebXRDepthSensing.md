Title: WebXRDepthSensing
Source URL: https://threejs.org/docs/pages/WebXRDepthSensing.html

# WebXRDepthSensing

A XR module that manages the access to the Depth Sensing API.

## Constructor

### new [WebXRDepthSensing](#WebXRDepthSensing)()

Constructs a new depth sensing module.

## Properties

### .[depthFar](#depthFar) : number

The depth near far.

### .[depthNear](#depthNear) : number

The depth near value.

### .[mesh](#mesh) : [Mesh](Mesh.html)

A plane mesh for visualizing the depth texture.

### .[texture](#texture) : [ExternalTexture](ExternalTexture.html)

An opaque texture representing the depth of the user's environment.

## Methods

### .[getDepthTexture](#getDepthTexture)() : [ExternalTexture](ExternalTexture.html)

Returns a texture representing the depth of the user's environment.

**Returns:** The depth texture.

### .[getMesh](#getMesh)( cameraXR : [ArrayCamera](ArrayCamera.html) ) : [Mesh](Mesh.html)

Returns a plane mesh that visualizes the depth texture.

**cameraXR**

The XR camera.

**Returns:** The plane mesh.

### .[init](#init)( depthData : XRWebGLDepthInformation, renderState : XRRenderState )

Inits the depth sensing module

**depthData**

The XR depth data.

**renderState**

The XR render state.

### .[reset](#reset)()

Resets the module

## Source

[src/renderers/webxr/WebXRDepthSensing.js](https://github.com/mrdoob/three.js/blob/master/src/renderers/webxr/WebXRDepthSensing.js)