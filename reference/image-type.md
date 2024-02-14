# Bitmap

An bitmap is some number of rows and columns of color pixels that make up rectangular picture. A _pixel_ is a single point of color inside the picture.

Bitmaps are two-dimensional so they have a known height and width. When an bitmap is declared, or created, the height and width are specified either by the _layout_ of the bitmap or as parameters to it's [create](/reference/bitmaps/create) method.

## Bitmap layout

You _declare_ an bitmap by creating a layout. This is done in JavaScript with the ``img'...'`` string declaration. The pixels are single characters inside the string.

### Zero size bitmap

An zero size bitmap has no height or width and has no pixels, so the **img** string is just ``img''``.

```typescript
let emptyBitmap = img``
```

You can also use [create](/reference/bitmaps/create) and make another zero size bitmap with no pixels.

```blocks
let emptyBitmap1 = img``
let emptyBitmap2 = bitmap.create(0, 0)
```

A zero size bitmap isn't really useful so MakeCode actually makes it have some size if you declare it without any.

### Bitmaps with size

To make an bitmap with some size, just set the pixel characters in the rows of the **img** string. An bitmap that is 1 pixel high by 1 pixel wide (1 x 1) is:

```typescript
let oneByOne = img`.`
```

A bitmap that is 2 x 2 is declared like this:

```typescript
let twoBytwo = img`
. .
. .
`
```

Here they are in blocks:

```blocks
let oneByOne = img`.`
let twoBytwo = img`
. .
. .
`
```

You'll notice that they look the same. That's because the pixel colors are not set so the bitmaps are empty.

Bitmaps don't have to be exactly square. The height and width can be different. Here's a 6 x 2 bitmap:

```typescript
let sixByTwo = img`
. . . . . .
. . . . . .
`
```

## Setting pixels

### Transparent pixels

A pixel value of `.` means an empty pixel. This pixel has no color and that pixel _location_ in the bitmap is _transparent_. Being transparent means that if this bitmap is on top of another bitmap (overlapping) that has some pixel color, then the color of the pixel in the bitmap underneath shows through to the bitmap above it.

### Pixel colors

Besides the empty, or transparent pixel `.`, there are 16 color pixels you can use. These are matched to colors in a _palette_. A palette is a group of colors you can choose from. The colors are selected by using a single number or letter to match them. The default palette, for example, uses these colors:

* `.`: empty or transparent
* `0`: transparent
* `1`: white
* `2`: light blue
* `3`: medium blue
* `4`: dark blue
* `5`: violet
* `6`: lime
* `7`: olive
* `8`: brown
* `9`: cyan
* `a`: red
* `b`: purple
* `c`: pink
* `d`: orange
* `e`: yellow
* `f`: black

A 1 x 1 bitmap with a red pixel is declared as:

```typescript
let oneRed = img`a`
```

As a block it looks like this:

```block
let oneRed = img`a`
```

We can make 4 x 4 bitmap that uses all of the colors:

```typescript
let allColors = img`
0 1 2 3
4 5 6 7
8 9 a b
c d e f
`
```

This the same bitmap as a block:

```block
let allColors = img`
0 1 2 3
4 5 6 7
8 9 a b
c d e f
`
```

## Transparency and overlap

Let's see how transparency works with bitmaps. A `.` means that a pixel is transparent. Only the pixels with a color will show in an bitmap and any pixels with color in an bitmap below it will show through. So, to demonstrate, let's make two bitmaps that are the same size and put one that has some transparent pixels on top of one that doesn't.

Our first bitmap is a green circle inside a 8 x 8 rectangle. All of the pixels around the circle are transparent.

```typescript
let greenBall = img`
. . . . . . . .
. . . 6 6 . . .
. . 6 6 6 6 . .
. 6 6 6 6 6 6 .
. 6 6 6 6 6 6 .
. . 6 6 6 6 . .
. . . 6 6 . . .
. . . . . . . .
`
```

The other bitmap is the same size but with all yellow pixels.

```blocks
let greenBall = img`
. . . . . . . .
. . . 6 6 . . .
. . 6 6 6 6 . .
. 6 6 6 6 6 6 .
. 6 6 6 6 6 6 .
. . 6 6 6 6 . .
. . . 6 6 . . .
. . . . . . . .
`

let yellowSquare = img`
e e e e e e e e
e e e e e e e e
e e e e e e e e
e e e e e e e e
e e e e e e e e
e e e e e e e e
e e e e e e e e
e e e e e e e e
e e e e e e e e
`
```

Putting the green circle bitmap exacly over the yellow square, you see that the yellow from the bitmap below isn't blocked out by the transparent pixels from the bitmap on top.

```sim
let greenBall = img`
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . 6 6 6 6 . . . . . . 
. . . . 6 6 6 6 6 6 6 6 . . . . 
. . . 6 6 6 6 6 6 6 6 6 6 . . . 
. . . 6 6 6 6 6 6 6 6 6 6 . . . 
. . 6 6 6 6 6 6 6 6 6 6 6 6 . . 
. . 6 6 6 6 6 6 6 6 6 6 6 6 . . 
. . 6 6 6 6 6 6 6 6 6 6 6 6 . . 
. . 6 6 6 6 6 6 6 6 6 6 6 6 . . 
. . . 6 6 6 6 6 6 6 6 6 6 . . . 
. . . 6 6 6 6 6 6 6 6 6 6 . . . 
. . . . 6 6 6 6 6 6 6 6 . . . . 
. . . . . . 6 6 6 6 . . . . . . 
. . . . . . . . . . . . . . . . 
. . . . . . . . . . . . . . . . 
`
let yellowSquare = bitmap.create(16, 16)
yellowSquare.fill(14)

let yellowSprite = sprites.create(yellowSquare)
let greenSprite = sprites.create(greenBall)
```

## Setting pixels at locations

You can create your bitmaps while your program is running too (dynamically). To make an bitmap this way, you set the color of a pixel at its location with code. Pixels are addressed by their row (``x`` value) and column (``y`` value) inside the bitmap. You could create and empty bitmap and make some or all of the bitmap by setting pixel colors in your code. Let's make a 32 x 32 box by creating an empty bitmap and then draw an orange border around it.

```blocks
let orangeBox = bitmap.create(32, 32)
for (let i = 0; i < 32; i++) {
    orangeBox.setPixel(0, i, 13)
    orangeBox.setPixel(i, 0, 13)
    orangeBox.setPixel(i, 31, 13)
    orangeBox.setPixel(31, i, 13)
}
let boxSprite = sprites.create(orangeBox)
```

The [bitmap](/reference/bitmaps) functions let you do more complex pixel operations like filling and drawing shapes.

## See also

[bitmap](/reference/bitmaps)