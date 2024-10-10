# on Button Event

Run some code when a button is pressed or released.

```sig
controller.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
	
})
```

## Parameters

* **event**: the button action to wait for. The button actions (events) are:
> * ``pressed``: button was pressed
> * ``released``: button is released from being pressed
> * ``repeated``: this event keeps repeating when the button is pressed
* **handler**: the code you want to run when something happens to a button

## Example #example

Move a box to a random location on the screen when a button is pressed.

```blocks
let y = 0
let x = 0
let box = bmp`
    e e e e e e 
    e 1 1 1 1 e 
    e 1 6 6 1 e 
    e 1 6 6 1 e 
    e 1 1 1 1 e 
    e e e e e e 
    `
screen().fill(15)
screen().drawBitmap(box, x, y)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    x = Math.randomRange(3, screen().width - 3)
    y = Math.randomRange(3, screen().height - 3)
    screen().fill(15)
    screen().drawBitmap(box, x, y)
})
```

```package
pxt-arcadeshield=github:microsoft/pxt-arcadeshield
```
