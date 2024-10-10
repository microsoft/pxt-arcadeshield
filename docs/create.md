# create

Create a pixel bitmap of a certain size.

```sig
bitmaps.create(0, 0)
```

An empty rectangular bitmap is created for the number of pixels wide and high you ask for. Empty means that the bitmap contains all transparent pixels. Pixels colors are set in the bitmap using the bitmap functions.

You can create an zero size bitmap (``width = 0`` and ``height = 0``) but the function will actually create and bitmap of a default size.

## Parameters

* **width**: the [number](/types/number) of pixels wide (x dimension) for the bitmap.
* **height**: the [number](/types/number) of pixels high (y dimension) for the bitmap.

## Returns

* an empty (transparent) [bitmap](/types/bitmap) of the desired size.

## Example #example

Create a 32 x 32 bitmap and draw an orange border around it.

```blocks
let orangeBox = bitmaps.create(32, 32)
for (let i = 0; i <= 31; i++) {
    orangeBox.setPixel(0, i, 4)
    orangeBox.setPixel(i, 0, 4)
    orangeBox.setPixel(i, 31, 4)
    orangeBox.setPixel(31, i, 4)
}
screen().fill(8)
screen().drawTransparentBitmap(orangeBox, 0, 0)
```

```package
pxt-arcadeshield=github:microsoft/pxt-arcadeshield
```
