# is Pressed

Check if a button is being pressed or not.

```sig
controller.A.isPressed()
```

## Returns

* a [boolean](types/boolean): `true` if the button is pressed, `false` if the button is not pressed.

## Example #example

Ramdomly move a yellow box around the screen while the ``A`` button is pressed.

### Single player

```blocks
let yellowBox = sprites.create(bmp`
e e e e e e
e 1 1 1 1 e
e 1 6 6 1 e
e 1 6 6 1 e
e 1 1 1 1 e
e e e e e e
`)
game.onUpdate(function () {
    if (controller.A.isPressed()) {
        yellowBox.x = Math.randomRange(3, scene.screenWidth() - 3)
        yellowBox.y = Math.randomRange(3, scene.screenHeight() - 3)
    }
})
```

### Multiplayer

```blocks
let yellowBox = sprites.create(bmp`
e e e e e e
e 1 1 1 1 e
e 1 6 6 1 e
e 1 6 6 1 e
e 1 1 1 1 e
e e e e e e
`)
game.onUpdate(function () {
    if (controller.player2.isPressed(ControllerButton.A)) {

        yellowBox.x = Math.randomRange(3, scene.screenWidth() - 3)
        yellowBox.y = Math.randomRange(3, scene.screenHeight() - 3)
    }
})
```

## See also #seealso

[on event](/reference/controller/button/on-event)

```package
pxt-arcadeshield=github:microsoft/pxt-arcadeshield
```
