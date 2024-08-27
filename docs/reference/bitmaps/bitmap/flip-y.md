# flip Y

Flip the pixels vertically from one side to the other side.

```sig
bitmap.create(0, 0).flipY()
```

The pixels in each half of the bitmap are moved across to the other half. This happens in the vertical direction. They are "flipped" across an imaginary line that goes across the middle of the bitmap. So, in a bitmap with a size of 10 x 10, a pixel at a location of (3, 2) will move to (3, 8) and the pixel that was originally at (3, 8) will move to (3, 2).

If a bitmap has on odd number of rows, then the "center line" goes through a row of pixels. When those pixels are "flipped" they keep their same location and don't move.

## Example #example

Flip an arrow bitmap `3` times vertically.

```blocks
let upArrow: Bitmap = null
upArrow = bmp`
. . . a . . .
. . a a a . .
. a a . a a .
a a a . a a a
. . a . a . .
. . a . a . .
. . a . a . .
. . a . a . .
. . a . a . .
. . a . a . .
. . a . a . .
. . a a a . .
`
for (let i = 0; i < 3; i++) {
    screen.drawBitmap(upArrow, 0, 0)
    basic.pause(500)
    upArrow.flipY()
}
```

## See also #seealso

[flip x](/reference/bitmaps/bitmap/flip-x),
[scroll](/reference/bitmaps/bitmap/scroll)

```package
pxt-arcadeshield=github:microsoft/pxt-arcadeshield
```
