Title: EngineAPI/Input/Mouse
Source URL: https://docs.rogueengine.io/EngineAPI/Input/Mouse

###  Mouse

The **Mouse** class keeps track of mouse events and provides access to these interactions. This class is instanced by the [Input](/EngineAPI/Input) controller, and that's the only place where it should be used. For that reason, this class is not exposed by the engine.

##  Properties

####  .x

```
readonly x: number
```

This is the position of the mouse on the x-axis of the screen. This is analogous to the **clientX** property of the **MouseEvent**.

####  .y

```
readonly y: number
```

This is the position of the mouse on the y-axis of the screen. This is analogous to the **clientY** property of the **MouseEvent**.

####  .viewX

```
readonly viewX: number
```

This is the position of the mouse on the x-axis relative to the canvas.

####  .viewY

```
readonly viewY: number
```

This is the position of the mouse on the y-axis relative to the canvas.

####  .movementX

```
readonly movementX: number
```

This is the movement of the mouse on the x-axis of the screen. This is analogous to the **movementX** property of the **MouseEvent**.

####  .movementY

```
readonly movementY: number
```

This is the movement of the mouse on the y-axis of the screen. This is analogous to the **movementY** property of the **MouseEvent**.

####  .wheelX

```
readonly wheelX: number
```

This represents the horizontal scrolling amount. This is analogous to the **deltaX** property of the **WheelEvent**.

####  .wheelY

```
readonly wheelY: number
```

This represents the vertical scrolling amount. This is analogous to the **deltaY** property of the **WheelEvent**.

####  .isMoving

```
readonly isMoving: boolean
```

A handy flag which tells us if the mouse is moving.

####  .isLeftButtonDown

```
readonly isLeftButtonDown: boolean
```

A flag which tells us if the left mouse button has been pressed in the current frame. If true, will be set to false in the next frame.

####  .isLeftButtonPressed

```
readonly isLeftButtonPressed: boolean
```

A flag which tells us if the left mouse button is being pressed. If true, will be set to false when the button is released.

####  .isLeftButtonUp

```
readonly isLeftButtonUp: boolean
```

A flag which tells us if the left mouse button has been released in the current frame. If true, will be set to false in the next frame.

####  .isRightButtonDown

```
readonly isRightButtonDown: boolean
```

A flag which tells us if the right mouse button has been pressed in the current frame. If true, will be set to false in the next frame.

####  .isRightButtonPressed

```
readonly isRightButtonPressed: boolean
```

A flag which tells us if the right mouse button is being pressed. If true, will be set to false when the button is released.

####  .isRightButtonUp

```
readonly isRightButtonUp: boolean
```

A flag which tells us if the right mouse button has been released in the current frame. If true, will be set to false in the next frame.

####  .isMidButtonDown

```
readonly isMidButtonDown: boolean
```

A flag which tells us if the middle mouse button has been pressed in the current frame. If true, will be set to false in the next frame.

####  .isMidButtonPressed

```
readonly isMidButtonPressed: boolean
```

A flag which tells us if the middle mouse button is being pressed. If true, will be set to false when the button is released.

####  .isMidButtonUp

```
readonly isMidButtonUp: boolean
```

A flag which tells us if the middle mouse button has been released in the current frame. If true, will be set to false in the next frame.

####  .pointerLock

```
readonly pointerLock: PointerLockControls | undefined
```

This property provides the instance of the Threejs **PointerLockControls** being used by this **Mouse** instance to handle locking the mouse pointer. Until the mouse is locked, this property remains undefined.

####  .enabled

```
enabled: boolean
```

Setting this property, disables or enables the mouse controls.

##  Methods

####  .lock

```
lock(): void
```

Handy function to lock the mouse pointer using the three js **PointerLockControls** instance referenced in the **pointerLock** property.

####  .unlock

```
unlock(): void
```

Unlocks the mouse pointer when locked.

####  .getButtonDown

```
getButtonDown(button: number): boolean
```

This method tells us if the key with the given mouse button has been pressed in the current frame. If true, will be set to false in the next frame.

####  .getButtonPressed

```
getButtonPressed(button: number): boolean
```

This method tells us if the key with the given mouse button is being pressed. If true, will be set to false when the button is released.

####  .getButtonUp

```
getButtonUp(button: number): boolean
```

This method tells us if the key with the given mouse button has been released in the current frame. If true, will be set to false in the next frame.