Title: LOD
Source URL: https://threejs.org/docs/pages/LOD.html

[EventDispatcher](EventDispatcher.html) → [Object3D](Object3D.html) →

# LOD

A component for providing a basic Level of Detail (LOD) mechanism.

Every LOD level is associated with an object, and rendering can be switched between them at the distances specified. Typically you would create, say, three meshes, one for far away (low detail), one for mid range (medium detail) and one for close up (high detail).

## Code Example

```js
const lod = new THREE.LOD();
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
//Create spheres with 3 levels of detail and create new LOD levels for them
for( let i = 0; i < 3; i++ ) {
	const geometry = new THREE.IcosahedronGeometry( 10, 3 - i );
	const mesh = new THREE.Mesh( geometry, material );
	lod.addLevel( mesh, i * 75 );
}
scene.add( lod );
```

## Constructor

### new [LOD](#LOD)()

Constructs a new LOD.

## Properties

### .[autoUpdate](#autoUpdate) : boolean

Whether the LOD object is updated automatically by the renderer per frame or not. If set to `false`, you have to call [LOD#update](LOD.html#update) in the render loop by yourself.

Default is `true`.

### .[isLOD](#isLOD) : boolean (readonly)

This flag can be used for type testing.

Default is `true`.

### .[levels](#levels) : Array.<{object:Object3D, distance:number, hysteresis:number}>

This array holds the LOD levels.

## Methods

### .[addLevel](#addLevel)( object : [Object3D](Object3D.html), distance : number, hysteresis : number ) : [LOD](LOD.html)

Adds a mesh that will display at a certain distance and greater. Typically the further away the distance, the lower the detail on the mesh.

**object**

The 3D object to display at this level.

**distance**

The distance at which to display this level of detail.

Default is `0`.

**hysteresis**

Threshold used to avoid flickering at LOD boundaries, as a fraction of distance.

Default is `0`.

**Returns:** A reference to this instance.

### .[getCurrentLevel](#getCurrentLevel)() : number

Returns the currently active LOD level index.

**Returns:** The current active LOD level index.

### .[getObjectForDistance](#getObjectForDistance)( distance : number ) : [Object3D](Object3D.html)

Returns a reference to the first 3D object that is greater than the given distance.

**distance**

The LOD distance.

**Returns:** The found 3D object. `null` if no 3D object has been found.

### .[raycast](#raycast)( raycaster : [Raycaster](Raycaster.html), intersects : Array.<Object> )

Computes intersection points between a casted ray and this LOD.

**raycaster**

The raycaster.

**intersects**

The target array that holds the intersection points.

**Overrides:** [Object3D#raycast](Object3D.html#raycast)

### .[removeLevel](#removeLevel)( distance : number ) : boolean

Removes an existing level, based on the distance from the camera. Returns `true` when the level has been removed. Otherwise `false`.

**distance**

Distance of the level to remove.

**Returns:** Whether the level has been removed or not.

### .[update](#update)( camera : [Camera](Camera.html) )

Updates the LOD by computing which LOD level should be visible according to the current distance of the given camera.

**camera**

The camera the scene is rendered with.

## Source

[src/objects/LOD.js](https://github.com/mrdoob/three.js/blob/master/src/objects/LOD.js)