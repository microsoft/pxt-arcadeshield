# fill

Set all the pixels of a bitmap to one color.

```sig
bitmaps.create(0,0).fill(0)
```

## Parameters

* **c**: the [number](/types/number) of the color to set all the pixels in bitmap to. Color numbers are value between `0` and `15` which select a color from the current palette of colors.

## Example #example

Fill the screen bitmap with blue pixels.
Fill a smaller bitmap with yellow pixels. 


```blocks
screen().fill(8)
let blueRect = bitmaps.create(32, 32)
blueRect.fill(5)
screen().drawBitmap(blueRect, 0, 0)
```


```package
pxt-arcadeshield=github:microsoft/pxt-arcadeshield
```
