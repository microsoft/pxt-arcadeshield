# is Pressed

Check if a button is being pressed or not.

```sig
controller.A.isPressed()
```

## Returns

* a [boolean](types/boolean): `true` if the button is pressed, `false` if the button is not pressed.

## Example #example

Ramdomly move a box around the screen while the ``A`` button is pressed.

### Single player

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
basic.forever(() => {
    if (controller.A.isPressed()) {
        x = Math.randomRange(3, bitmaps.width(screen()) - 3)
        y = Math.randomRange(3, bitmaps.height(screen()) - 3)
        screen().fill(15)
        screen().drawBitmap(box, x, y)
    }
})
```


```package
pxt-arcadeshield=github:microsoft/pxt-arcadeshield
```
