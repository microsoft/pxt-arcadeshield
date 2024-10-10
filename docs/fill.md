# fill

Set all the pixels of a bitmap to one color.

```sig
bitmaps.create(0,0).fill(0)
```

## Parameters

* **c**: the [number](/types/number) of the color to set all the pixels in bitmap to. Color numbers are value between `0` and `15` which select a color from the current palette of colors.

## Example #example

Fill the screen bitmap with blue pixels (which makes the entire screen blue). Then fill a smaller bitmap with yellow pixels, and draw that
bitmap on the screen.


```blocks
screen().fill(8)
let yellowRect = bitmaps.create(32, 32)
yellowRect.fill(5)
screen().drawBitmap(yellowRect, 0, 0)
```


```package
pxt-arcadeshield=github:microsoft/pxt-arcadeshield
```
