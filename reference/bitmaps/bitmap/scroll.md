# scroll

Scroll the pixels in a bitmap up, down, right, or left.

```sig
bitmap.create(0, 0).scroll(0, 0)
```

Bitmaps are scrolled by a number of pixel rows or columns (the scroll distance). A bitmap can even be scrolled by both rows and columns at the same time. The scroll direction depends on the sign (-) of the scroll distance value. Scrolling up will use a negative scroll value. Scrolling to the left also uses a negative scroll value. Scrolling down or to the right use positive scroll values.

Scrolling is a _destructive_ operation. This means that the pixels scrolled outside the bitmap are lost and can't be scrolled back inside again. As scrolling happens, the pixels that are scrolled have their original locations replaced by transparent pixels.

## Parameters

* **dx**: the [number](/types/number) of pixels to scroll the bitmap to the left or right Use a negative value to scroll to the left.
* **dy**: the [number](/types/number) of pixels to scroll the bitmap up or down. Use a negative value to scroll up.

## Examples #example

### Color bands #ex1

Scroll a bitmap of 15 color bands up until it disappears.

```blocks
let colorBands: Bitmap = null
let scrollCount = 0
scrollCount = 16
colorBands = bmp`
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 3 
4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 
6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 6 
7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 
8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 8 
9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 
a a a a a a a a a a a a a a a a 
b b b b b b b b b b b b b b b b 
c c c c c c c c c c c c c c c c 
d d d d d d d d d d d d d d d d 
e e e e e e e e e e e e e e e e 
f f f f f f f f f f f f f f f f 
`
forever(() => {
    screen.drawBitmap(colorBands, 0, 0)
    basic.pause(500)
    if (scrollCount > 0) {
        colorBands.scroll(0, -1)
        scrollCount += -1
    }
})
```

### Diagonal scroll #ex2

Scroll a green square diagonally down and to the right.

```blocks
let greenSquare: Bitmap = null
greenSquare = bitmap.create(32, 32)
greenSquare.fill(6)
forever(() => {
    screen.fill(0)
    screen.drawBitmap(greenSquare, 0, 0)
    basic.pause(500)
    greenSquare.scroll(1, 1)
})
```

## See also #seealso

[flip x](/reference/bitmaps/bitmap/flip-x),
[flip y](/reference/bitmaps/bitmap/flip-y)

```package
pxt-arcadeshield=github:microsoft/pxt-arcadeshield
```
