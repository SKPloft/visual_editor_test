Title: EngineAPI/Tags
Source URL: https://docs.rogueengine.io/EngineAPI/Tags

###  Tags

This class is is in charge of managing tags. Tags are a simple way to classify objects in our project.

For instance, you could have a "human" tag, to identify a human character, and a "player" tag to identify well, that, a player.

You could have some objects with both the "human" and "player" tags to define them as "human players".

##  Methods

####  .getTags

```
getTags(): string[];
```

Returns all the registered tags.

####  .getObjects

```
getObjects(tag: string): THREE.Object3D[];
```

Returns all objects with the given tag.

####  .getWithAll

```
getWithAll(...tags: string[]): THREE.Object3D[];
```

Returns a list of objects which have all of the given tags.

####  .getWithAny

```
getWithAny(...tags: string[]): THREE.Object3D[];
```

Returns a list of objects which have any of the given tags.

####  .hasAny

```
hasAny(object: THREE.Object3D, ...tags: string[]): boolean;
```

Checks if an object has any of the given tags.

####  .hasAll

```
hasAll(object: THREE.Object3D, ...tags: string[]): boolean;
```

Checks if an object has all of the given tags.

####  .hasNone

```
hasNone(object: THREE.Object3D, ...tags: string[]): boolean;
```

Checks if an object has none of the given tags.

####  .isMissingAll

```
isMissingAll(object: THREE.Object3D, ...tags: string[]): boolean;
```

Checks if an object is missing all of the given tags.

####  .get

```
get(object: THREE.Object3D): string[];
```

Returns all tags of a given object.

####  .set

```
set(object: THREE.Object3D, ...tags: string[]): void;
```

Sets all the given tags to an object. If a tag does not exist yet, it'll be created and registered.

####  .remove

```
remove(object: THREE.Object3D, ...tags: string[]): void;
```

Removes the given tags from an object.

####  .create

```
create(...tags: string[]): void;
```

Creates the given tags. If a tag is already present it will be omitted.