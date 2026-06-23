Title: EngineAPI/Events
Source URL: https://docs.rogueengine.io/EngineAPI/Events

###  Events

###  onObjectAdded

```
onObjectAdded(callback: (object: THREE.Object3D, target: THREE.Object3D) => void): {stop: () => void}
```

This event listener takes a callback function as a parameter to be executed when **Object3D.add(object)** is called. The callback function gives us the object added and the target object as parameters.

Remember to stop listening to this event when you don't need it anymore by calling the **stop()** function in the object returned by this function.

###  Example

```
import { onObjectAdded } from 'rogue-engine';
...

onObjectAdded((object, target) => {
// Do something
});

...

```

###  onObjectRemoved

```
onObjectRemoved(callback: (object: THREE.Object3D, target: THREE.Object3D) => void): {stop: () => void}
```

This event listener takes a callback function as a parameter to be executed when **Object3D.remove(object)** is called. The callback function gives us the object added and the target object as parameters.

Remember to stop listening to this event when you don't need it anymore by calling the **stop()** function in the object returned by this function.

###  Example

```
import { onObjectRemoved } from 'rogue-engine';
...

onObjectRemoved((object, target) => {
// Do something
});

...

```

###  onComponentAdded

```
onComponentAdded(callback: (component: Component, target: THREE.Object3D) => void): {stop: () => void}
```

This event listener takes a callback function as a parameter to be executed when **addComponent(component)** is called. The callback function gives us the object added and the target object as parameters.

Remember to stop listening to this event when you don't need it anymore by calling the **stop()** function in the object returned by this function.

###  Example

```
import { onComponentAdded } from 'rogue-engine';
...

onComponentAdded((component, target) => {
// Do something
});

...

```

###  onComponentRemoved

```
onComponentRemoved(callback: (component: Component, target: THREE.Object3D) => void): {stop: () => void}
```

This event listener takes a callback function as a parameter to be executed when **removeComponent(component)** is called. The callback function gives us the object added and the target object as parameters.

Remember to stop listening to this event when you don't need it anymore by calling the **stop()** function in the object returned by this function.

###  Example

```

import { onComponentRemoved } from 'rogue-engine';
...

onComponentRemoved((component, target) => {
// Do something
});

...

```

###  onBeforeUpdate

```
onBeforeUpdate(callback: (sceneController: SceneController) => void): {stop: () => void}
```

This event listener takes a callback function as a parameter which will be executed in the **beforeUpdate()** event of any active [SceneController](/EngineAPI/SceneController). In practice, this means that the given function will be called both in the editor's and the runtime's animation loop. The callback gives us the [SceneController](/EngineAPI/SceneController) instance responsible for firing the event.

Remember to stop listening to this event when you don't need it anymore by calling the **stop()** function in the object returned by this function.

###  Example

```

import { onBeforeUpdate } from 'rogue-engine';
...

onBeforeUpdate(() => {
// Do something that runs in the beforeUpdate event 
// of both the editor and the engine runtimes.
});

...

```

###  onUpdate

```
onUpdate(callback: (sceneController: SceneController) => void): {stop: () => void}
```

This event listener takes a callback function as a parameter which will be executed in the **update()** event of any active **SceneController**. In practice, this means that the given function will be called both in the editor's and the runtime's animation loop. The callback gives us the **SceneController** instance responsible for firing the event.

Remember to stop listening to this event when you don't need it anymore by calling the **stop()** function in the object returned by this function.

###  Example

```

import { onUpdate } from 'rogue-engine';
...

onUpdate(() => {
// Do something that runs in the update event 
// of both the editor and the engine runtimes.
});

...

```

###  onAfterUpdate

```
onAfterUpdate(callback: (sceneController: SceneController) => void): {stop: () => void}
```

This event listener takes a callback function as a parameter which will be executed in the **afterUpdate()** event of any active [SceneController](/EngineAPI/SceneController). In practice, this means that the given function will be called both in the editor's and the runtime's animation loop. The callback gives us the [SceneController](/EngineAPI/SceneController) instance responsible for firing the event.

Remember to stop listening to this event when you don't need it anymore by calling the **stop()** function in the object returned by this function.

###  Example

```

import { onAfterUpdate } from 'rogue-engine';
...

onAfterUpdate(() => {
// Do something that runs in the afterUpdate event 
// of both the editor and the engine runtimes.
});

...

```

###  onNextFrame

```
onNextFrame(callback: (sceneController: SceneController) => void): void
```

This event listener takes a callback function as a parameter to be executed in the next frame. The callback gives us the [SceneController](/EngineAPI/SceneController) instance responsible for firing the event.

###  Example

```

import { onNextFrame } from 'rogue-engine';
...

onNextFrame(() => {
// Do something that runs on the next frame.
});

...

```