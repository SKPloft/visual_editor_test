Title: EngineAPI/Prefab
Source URL: https://docs.rogueengine.io/EngineAPI/Prefab

###  Prefab

A Prefab is a predefined [Object3D (opens new window)](https://threejs.org/docs/#api/en/core/Object3D) that we store in a **.roguePrefab** file along with all components associated to the object itself or its children.

An instance of this class provides the information to load a Prefab and the means to instantiate it.

The class includes some static members to allow the loading dynamic loading of Prefabs.

##  Static

####  static namedPrefabUUIDs

```
static namedPrefabUUIDs: Record<string, string>;
```

A map of all prefab `uuids` with their paths relative to `Assets/Prefabs/` as keys. We refer to this relative path as the "name path" and all Prefabs in `Assets/Prefabs/` as "Named Prefabs". A name path, does not include the `.roguePrefab` extension.

####  static instantiate

```
static instantiate(name: string): Promise<THREE.Object3D<THREE.Object3DEventMap>>;
```

Asynchronously instatiate a prefab within `Assets/Prefabs/`, by their "name path", or relative path to the Prefabs folder, excluding the `.roguePrefab` extension. This will fetch the prefab, including all its dependencies and instantiate it in your current scene.

```

async start() {
  // Location: Assets/Prefabs/MyPrefab.roguePrefab
  const instance = await RE.Prefab.instantiate("MyPrefab");
  // Location: Assets/Prefabs/Enemies/Nemesis.roguePrefab
  const nemesis = await RE.prefab.instantiate("Enemies/Nemesis");
}

```

####  static fetch

```
static fetch(name: string): Promise<Prefab>;
```

Asynchronously fetch a prefab within `Assets/Prefabs/`, by their "name path", or relative path to the Prefabs folder, excluding the `.roguePrefab` extension.

```

async start() {
  // Location: Assets/Prefabs/Enemies/Nemesis.roguePrefab
  const nemesisPrefab = await RE.prefab.fetch("Enemies/Nemesis");
  const instance = nemesisPrefab.instantiate();
}

```

####  static get

```
static get(name: string): Prefab;
```

Synchronously fetch a prefab within `Assets/Prefabs/`, by their "name path", or relative path to the Prefabs folder, excluding the `.roguePrefab` extension. This is useful when your Prefab is set to "preload" in the AssetManager and you know for a fact that it's immediately accessible in memory.

```

start() {
  // Location: Assets/Prefabs/Enemies/Nemesis.roguePrefab
  const nemesisPrefab = RE.prefab.get("Enemies/Nemesis");
  const instance = nemesisPrefab.instantiate();
}

```

##  Properties

####  .uuid

```
readonly uuid: string;
```

The unique identifier for the Prefab.

####  .path

```
readonly path: string;
```

The current path to the Prefab file.

####  .name

```
readonly name: string;
```

The name of the Prefab.

##  Methods

####  .instantiate

```
instantiate(parent?: THREE.Object3D): THREE.Object3D;
```

This method instantiates the Prefab either directly into the Scene. Optionally, you can pass in an [Object3D (opens new window)](https://threejs.org/docs/#api/en/core/Object3D) as the parent.

```

@RE.props.prefab() myPrefab: RE.Prefab;

start() {
  const instance = this.myPrefab.instantiate();
}

```