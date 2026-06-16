Title: EngineAPI/Input/TouchController
Source URL: https://docs.rogueengine.io/EngineAPI/Input/TouchController

###  TouchController

The **TouchController** class keeps track of touch events and provides access to these interactions. This class is instanced by the [Input](/EngineAPI/Input) controller, and that's the only place where it should be used. For that reason, this class is not exposed by the engine.

##  Properties

####  .startTouches

```
readonly startTouches: TouchInteraction[]
```

An array of [TouchInteraction](/EngineAPI/Input#touchinteraction-type) objects which contains all touch events that have started in the current frame.

####  .endTouches

```
readonly endTouches: TouchInteraction[]
```

An array of [TouchInteraction](/EngineAPI/Input#touchinteraction-type) objects which contains all touch events that have ended in the current frame.

####  .touches

```
readonly touches: TouchInteraction[]
```

An array of [TouchInteraction](/EngineAPI/Input#touchinteraction-type) objects which contains all touch events that are still happening in the current frame.

####  .rightStartTouches

```
readonly rightStartTouches: TouchInteraction[]
```

An array of [TouchInteraction](/EngineAPI/Input#touchinteraction-type) objects which contains all touch events that have started in the current frame on the right half of the screen.

####  .rightEndTouches

```
readonly rightEndTouches: TouchInteraction[]
```

An array of [TouchInteraction](/EngineAPI/Input#touchinteraction-type) objects which contains all touch events that have ended in the current frame on the right half of the screen.

####  .rightTouches

```
readonly rightTouches: TouchInteraction[]
```

An array of [TouchInteraction](/EngineAPI/Input#touchinteraction-type) objects which contains all touch events that are still happening in the current frame on the right half of the screen.

####  .leftStartTouches

```
readonly leftStartTouches: TouchInteraction[]
```

An array of [TouchInteraction](/EngineAPI/Input#touchinteraction-type) objects which contains all touch events that have started in the current frame on the left half of the screen.

####  .leftEndTouches

```
readonly leftEndTouches: TouchInteraction[]
```

An array of [TouchInteraction](/EngineAPI/Input#touchinteraction-type) objects which contains all touch events that have ended in the current frame on the left half of the screen.

####  .leftTouches

```
readonly leftTouches: TouchInteraction[]
```

An array of [TouchInteraction](/EngineAPI/Input#touchinteraction-type) objects which contains all touch events that are still happening in the current frame on the left half of the screen.

####  .enabled

```
enabled: boolean
```

This property is used to enable and disable the **TouchController**

####  .buttons

```
buttons: TouchButton[]
```

A list of active [TouchButtons](#touchbutton-type) which can be used as part of the action-based input system. You can create them by calling [createButton](#createbutton).

##  Methods

####  .init

```
init(): void
```

This method initializes the touch events for the **TouchController**. This is used internally by the engine and you should never need call it.

####  .createButton

```
createButton(elem: HTMLDivElement, stopPropagation?: boolean): TouchButton
```

Takes an HTMLDivElement and creates a [TouchButton](#touchbutton-type) which can be used as part of the action-based input system. It'll be automatically added to the [buttons](#buttons) list. You can pass in an optional boolean parameter to stop the propagation of the captured touch event.

##  TouchInteraction Type

```
type TouchInteraction = {
    id: string;
    touch: Touch;
    x: number;
    y: number;
    viewX: number;
    viewY: number;
    deltaX: number;
    deltaY: number;
    movedX: number;
    movedY: number;
    originX: number;
    originY: number;
}
```

This type provides relevant information of a touch interaction by the user.

##  TouchButton Type

```
type TouchButton {
    elem: HTMLDivElement;
    isDown: boolean;
    isPressed: boolean;
    isUp: boolean;
    onButtonDown: () => void;
    onButtonUp: () => void;
    constructor(elem: HTMLDivElement, stopPropagation?: boolean);
}
```

This type represents a touch button as found in RE.Input.touch.buttons.