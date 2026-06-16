Title: USDComposer
Source URL: https://threejs.org/docs/pages/USDComposer.html

# USDComposer

USDComposer handles scene composition from parsed USD data. This includes reference resolution, variant selection, transform handling, and building the Three.js scene graph.

Works with specsByPath format from USDCParser.

## Constructor

### new [USDComposer](#USDComposer)()

## Methods

### .[\_applyMaterialBinding](#_applyMaterialBinding)()

Apply material binding from a prim path to a mesh. Used when merging referenced geometry into a prim that has material binding.

### .[\_applyTextureOrValue](#_applyTextureOrValue)()

Shared helper for applying texture or value from shader attribute. Reduces duplication between \_applyPreviewSurface and \_applyOpenPBRSurface.

### .[\_buildCamera](#_buildCamera)()

Build a camera from a Camera spec.

### .[\_buildGeomPrimitive](#_buildGeomPrimitive)()

Build a mesh from a USD geometric primitive (Cube, Sphere, Cylinder, Cone, Capsule).

### .[\_buildHierarchy](#_buildHierarchy)()

Build the scene hierarchy recursively. Uses childrenByPath index for O(1) child lookup instead of O(n) iteration.

### .[\_buildIndexes](#_buildIndexes)()

Build indexes for efficient lookups. Called once during compose() to avoid O(n) scans per lookup.

### .[\_buildLight](#_buildLight)()

Build a light from a UsdLux light spec.

### .[\_buildMesh](#_buildMesh)()

Build a mesh from a Mesh spec.

### .[\_colorTemperature](#_colorTemperature)()

Convert a color temperature in Kelvin to an RGB Color. Based on Tanner Helland's algorithm.

### .[\_computeVertexNormals](#_computeVertexNormals)()

Compute per-vertex normals from indexed triangle data. Accumulates area-weighted face normals at each shared vertex and normalizes.

### .[\_findSingleMesh](#_findSingleMesh)()

Find a single mesh in the group's shallow hierarchy. Only returns a mesh if it's at depth 0 or 1, not deeply nested. This preserves transforms in complex hierarchies like Kitchen Set while supporting USDZExporter round-trip (Xform > Xform > Mesh pattern).

### .[\_getAttributes](#_getAttributes)()

Get attributes for a path from attribute specs.

### .[\_getBasePath](#_getBasePath)()

Get the base path (directory) from a file path.

### .[\_getLocalVariantSelections](#_getLocalVariantSelections)()

Extract variant selections from a spec's fields.

### .[\_getMaterialBindingTarget](#_getMaterialBindingTarget)()

Get material binding target path, checking variant paths if needed.

### .[\_getMaterialPath](#_getMaterialPath)()

Get the material path for a mesh, checking various binding sources.

### .[\_getReferences](#_getReferences)() : Array.<string>

Get all reference values from a prim spec.

**Returns:** Array of reference strings like "@path@" or "@path@"

### .[\_getVariantPaths](#_getVariantPaths)()

Get variant paths for a parent path based on variant selections.

### .[\_hasNonIdentityTransform](#_hasNonIdentityTransform)()

Check if an object has a non-identity local transform.

### .[\_isDirectChild](#_isDirectChild)()

Check if a path is a direct child of parentPath.

### .[\_resolveFilePath](#_resolveFilePath)()

Resolve a file path relative to basePath.

### .[\_resolveReference](#_resolveReference)( refValue : string, localVariants : Object ) : [Group](Group.html) | null

Resolve a USD reference and return the composed content.

**refValue**

Reference value like "@./path/to/file.usdc@"

**localVariants**

Variant selections to apply

**Returns:** Composed content or null

### .[applyTransform](#applyTransform)()

Apply USD transforms to a Three.js object. Handles xformOpOrder with proper matrix composition. USD uses row-vector convention, Three.js uses column-vector.

### .[compose](#compose)( parsedData : Object, assets : Object, variantSelections : Object, basePath : string ) : [Group](Group.html)

Compose a Three.js scene from parsed USD data.

**parsedData**

Data from USDCParser or USDAParser

**assets**

Dictionary of referenced assets (specsByPath or blob URLs)

**variantSelections**

External variant selections

**basePath**

Base path for resolving relative references

**Returns:** Three.js scene graph

## Source

[examples/jsm/loaders/usd/USDComposer.js](https://github.com/mrdoob/three.js/blob/master/examples/jsm/loaders/usd/USDComposer.js)