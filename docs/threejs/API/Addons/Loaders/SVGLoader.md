Title: SVGLoader
Source URL: https://threejs.org/docs/pages/SVGLoader.html

[Loader](Loader.html) →

# SVGLoader

A loader for the SVG format.

Scalable Vector Graphics is an XML-based vector image format for two-dimensional graphics with support for interactivity and animation.

## Code Example

```js
const loader = new SVGLoader();
const data = await loader.loadAsync( 'data/svgSample.svg' );
const paths = data.paths;
const group = new THREE.Group();
for ( let i = 0; i < paths.length; i ++ ) {
	const path = paths[ i ];
	const material = new THREE.MeshBasicMaterial( {
		color: path.color,
		side: THREE.DoubleSide,
		depthWrite: false
	} );
	const shapes = SVGLoader.createShapes( path );
	for ( let j = 0; j < shapes.length; j ++ ) {
		const shape = shapes[ j ];
		const geometry = new THREE.ShapeGeometry( shape );
		const mesh = new THREE.Mesh( geometry, material );
		group.add( mesh );
	}
}
scene.add( group );
```

## Import

SVGLoader is an addon, and must be imported explicitly, see [Installation#Addons](https://threejs.org/manual/#en/installation).

```js
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
```

## Constructor

### new [SVGLoader](#SVGLoader)( manager : [LoadingManager](LoadingManager.html) )

Constructs a new SVG loader.

**manager**

The loading manager.

## Properties

### .[defaultDPI](#defaultDPI) : number

Default dots per inch.

Default is `90`.

### .[defaultUnit](#defaultUnit) : 'mm' | 'cm' | 'in' | 'pt' | 'pc' | 'px'

Default unit.

Default is `'px'`.

## Methods

### .[load](#load)( url : string, onLoad : function, onProgress : [onProgressCallback](global.html#onProgressCallback), onError : [onErrorCallback](global.html#onErrorCallback) )

Starts loading from the given URL and passes the loaded SVG asset to the `onLoad()` callback.

**url**

The path/URL of the file to be loaded. This can also be a data URI.

**onLoad**

Executed when the loading process has been finished.

**onProgress**

Executed while the loading is in progress.

**onError**

Executed when errors occur.

**Overrides:** [Loader#load](Loader.html#load)

### .[parse](#parse)( text : string ) : Object

Parses the given SVG data and returns the resulting data.

**text**

The raw SVG data as a string.

**Overrides:** [Loader#parse](Loader.html#parse)

**Returns:** An object holding an array of shape paths and the SVG XML document.

## Static Methods

### .[createShapes](#.createShapes)( shapePath : [ShapePath](ShapePath.html) ) : Array.<[Shape](Shape.html)\>

Creates from the given shape path and array of shapes.

**shapePath**

The shape path.

**Returns:** An array of shapes.

### .[getStrokeStyle](#.getStrokeStyle)( width : number, color : string, lineJoin : 'round' | 'bevel' | 'miter' | 'miter-limit', lineCap : 'round' | 'square' | 'butt', miterLimit : number ) : Object

Returns a stroke style object from the given parameters.

**width**

The stroke width.

Default is `1`.

**color**

The stroke color, as returned by [Color#getStyle](Color.html#getStyle).

Default is `'#000'`.

**lineJoin**

The line join style.

Default is `'miter'`.

**lineCap**

The line cap style.

Default is `'butt'`.

**miterLimit**

Maximum join length, in multiples of the `width` parameter (join is truncated if it exceeds that distance).

Default is `4`.

**Returns:** The style object.

### .[pointsToStroke](#.pointsToStroke)( points : Array.<[Vector2](Vector2.html)\>, style : Object, arcDivisions : number, minDistance : number ) : [BufferGeometry](BufferGeometry.html)

Creates a stroke from an array of points.

**points**

The points in 2D space. Minimum 2 points. The path can be open or closed (last point equals to first point).

**style**

Object with SVG properties as returned by `SVGLoader.getStrokeStyle()`, or `SVGLoader.parse()` in the `path.userData.style` object.

**arcDivisions**

Arc divisions for round joins and endcaps.

Default is `12`.

**minDistance**

Points closer to this distance will be merged.

Default is `0.001`.

**Returns:** The stroke geometry. UV coordinates are generated ('u' along path. 'v' across it, from left to right). Returns `null` if not geometry was generated.

### .[pointsToStrokeWithBuffers](#.pointsToStrokeWithBuffers)( points : Array.<[Vector2](Vector2.html)\>, style : Object, arcDivisions : number, minDistance : number, vertices : Array.<number>, normals : Array.<number>, uvs : Array.<number>, vertexOffset : number ) : number

Creates a stroke from an array of points.

**points**

The points in 2D space. Minimum 2 points.

**style**

Object with SVG properties as returned by `SVGLoader.getStrokeStyle()`, or `SVGLoader.parse()` in the `path.userData.style` object.

**arcDivisions**

Arc divisions for round joins and endcaps.

Default is `12`.

**minDistance**

Points closer to this distance will be merged.

Default is `0.001`.

**vertices**

An array holding vertices.

**normals**

An array holding normals.

**uvs**

An array holding uvs.

**vertexOffset**

The vertex offset.

Default is `0`.

**Returns:** The number of vertices.

## Source

[examples/jsm/loaders/SVGLoader.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/SVGLoader.js)