# equals

Compare this bitmap to another bitmap to see if they are the same.

```sig
bitmap.create(0, 0).equals(null)
```

Each pixel in the bitmap is compared with another bitmap. If all the pixels in both bitmaps are identical, then the bitmaps are considered "equal".

## Parameters

* **other**: the other bitmap to compare this one to.

## Returns

* a [boolean](/types/boolean) value that is `true` if all of the pixels in the two bitmaps are identical, or a value of `false` otherwise.

## Example #example

Create a `burger` bitmap. Create a bitmap of the same burger using a second variable. Compare that bitmap with the bitmap in the second variable to see if they are equal.

```blocks
let firstBitmap = bmp`
    . . . . c c c b b b b b . . . . 
    . . c c b 4 4 4 4 4 4 b b b . . 
    . c c 4 4 4 4 4 5 4 4 4 4 b c . 
    . e 4 4 4 4 4 4 4 4 4 5 4 4 e . 
    e b 4 5 4 4 5 4 4 4 4 4 4 4 b c 
    e b 4 4 4 4 4 4 4 4 4 4 5 4 4 e 
    e b b 4 4 4 4 4 4 4 4 4 4 4 b e 
    . e b 4 4 4 4 4 5 4 4 4 4 b e . 
    8 7 e e b 4 4 4 4 4 4 b e e 6 8 
    8 7 2 e e e e e e e e e e 2 7 8 
    e 6 6 2 2 2 2 2 2 2 2 2 2 6 c e 
    e c 6 7 6 6 7 7 7 6 6 7 6 c c e 
    e b e 8 8 c c 8 8 c c c 8 e b e 
    e e b e c c e e e e e c e b e e 
    . e e b b 4 4 4 4 4 4 4 4 e e . 
    . . . c c c c c e e e e e . . . 
    `
let secondBitmap = bmp`
    . . . . c c c b b b b b . . . . 
    . . c c b 4 4 4 4 4 4 b b b . . 
    . c c 4 4 4 4 4 5 4 4 4 4 b c . 
    . e 4 4 4 4 4 4 4 4 4 5 4 4 e . 
    e b 4 5 4 4 5 4 4 4 4 4 4 4 b c 
    e b 4 4 4 4 4 4 4 4 4 4 5 4 4 e 
    e b b 4 4 4 4 4 4 4 4 4 4 4 b e 
    . e b 4 4 4 4 4 5 4 4 4 4 b e . 
    8 7 e e b 4 4 4 4 4 4 b e e 6 8 
    8 7 2 e e e e e e e e e e 2 7 8 
    e 6 6 2 2 2 2 2 2 2 2 2 2 6 c e 
    e c 6 7 6 6 7 7 7 6 6 7 6 c c e 
    e b e 8 8 c c 8 8 c c c 8 e b e 
    e e b e c c e e e e e c e b e e 
    . e e b b 4 4 4 4 4 4 4 4 e e . 
    . . . c c c c c e e e e e . . . 
    `
if (secondBitmap.equals(firstBitmap)) {
    console.log("The bitmaps are equal.")
}
```

## See Also #seealso

[clone](/reference/bitmaps/bitmap/clone),
[get pixel](/reference/bitmaps/bitmap/get-pixel)

```package
pxt-arcadeshield=github:microsoft/pxt-arcadeshield
```
