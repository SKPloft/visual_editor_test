Title: EngineAPI/AudioAsset
Source URL: https://docs.rogueengine.io/EngineAPI/AudioAsset

###  AudioAsset

This class provides the necessary information to load a **.rogueAudio** file. An instance of this class aids us in creating either an [Audio (opens new window)](https://threejs.org/docs/#api/en/audio/Audio) or [PositionalAudio (opens new window)](https://threejs.org/docs/#api/en/audio/PositionalAudio) object.

##  Properties

####  .uuid

```
readonly uuid: string;
```

The unique identifier of this asset.

####  .path

```
readonly path: string;
```

The current path to the related **.rogueAudio** file.

####  .name

```
readonly name: string;
```

The name of the asset.

##  Methods

####  .getAudio

```
getAudio(): Audio;
```

This method creates an Audio object with the buffer information in the same instance of AudioAsset.

####  .getPositionalAudio

```
getPositionalAudio(): PositionalAudio;
```

This method creates a PositionalAudio object with the buffer information in the same instance of AudioAsset.

####  AudioAsset.fromFile

```
static fromFile(filePath: string): Promise<AudioAsset>;
```

This static method of AudioAsset takes the path of a **.rogueAudio** file and returns an instance of AudioAsset. You should use this method, instead of instantiating the class manually.