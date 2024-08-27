# flip X

Flip the pixels horizontally from one side to the other side.

```sig
bitmap.create(0, 0).flipX()
```

The pixels in each half of the bitmap are moved across to the other half. This happens in the horizontal direction. They are "flipped" across an imaginary line that goes down the middle of the bitmap. So, in a bitmap with a size of 10 x 10, a pixel at a location of (3, 4) will move to (6, 4) and the pixel that was originally at (6, 4) will move to (3, 4).

If a bitmap has on odd number of columns, then the "center line" goes through a column of pixels. When those pixels are "flipped" they keep their same location and don't move.

## Example #example

Flip an arrow bitmap `3` times horizontally.

```blocks
let leftArrow: Bitmap = null
leftArrow = bmp`
. . . a . . . . . . . . . . 
. . a a . . . . . . . . . . 
. a a a a a a a a a a a a a 
a a . . . . . . . . . . . a 
. a a a a a a a a a a a a a 
. . a a . . . . . . . . . . 
. . . a . . . . . . . . . . 
`
for (let i = 0; i < 3; i++) {
    screen.drawBitmap(leftArrow, 0, 0)  
    pause(500)
    leftArrow.flipX()
}
```

## See also #seealso

[flip y](/reference/bitmaps/bitmap/flip-y),
[scroll](/reference/bitmaps/bitmap/scroll)

```package
pxt-arcadeshield=github:microsoft/pxt-arcadeshield
```
