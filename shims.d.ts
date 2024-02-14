// Auto-generated. Do not edit.


declare interface Bitmap {
    /**
     * Get the width of the image
     */
    //% property shim=BitmapMethods::width
    width: int32;

    /**
     * Get the height of the image
     */
    //% property shim=BitmapMethods::height
    height: int32;

    /**
     * True if the image is monochromatic (black and white)
     */
    //% property shim=BitmapMethods::isMono
    isMono: boolean;

    /**
     * Sets all pixels in the current image from the other image, which has to be of the same size and
     * bpp.
     */
    //% shim=BitmapMethods::copyFrom
    copyFrom(from: Bitmap): void;

    /**
     * Set pixel color
     */
    //% shim=BitmapMethods::setPixel
    setPixel(x: int32, y: int32, c: int32): void;

    /**
     * Get a pixel color
     */
    //% shim=BitmapMethods::getPixel
    getPixel(x: int32, y: int32): int32;

    /**
     * Fill entire image with a given color
     */
    //% shim=BitmapMethods::fill
    fill(c: int32): void;

    /**
     * Copy row(s) of pixel from image to buffer (8 bit per pixel).
     */
    //% shim=BitmapMethods::getRows
    getRows(x: int32, dst: Buffer): void;

    /**
     * Copy row(s) of pixel from buffer to image.
     */
    //% shim=BitmapMethods::setRows
    setRows(x: int32, src: Buffer): void;

    /**
     * Return a copy of the current image
     */
    //% shim=BitmapMethods::clone
    clone(): Bitmap;

    /**
     * Flips (mirrors) pixels horizontally in the current image
     */
    //% shim=BitmapMethods::flipX
    flipX(): void;

    /**
     * Flips (mirrors) pixels vertically in the current image
     */
    //% shim=BitmapMethods::flipY
    flipY(): void;

    /**
     * Returns a transposed image (with X/Y swapped)
     */
    //% shim=BitmapMethods::transposed
    transposed(): Bitmap;

    /**
     * Every pixel in image is moved by (dx,dy)
     */
    //% shim=BitmapMethods::scroll
    scroll(dx: int32, dy: int32): void;

    /**
     * Stretches the image horizontally by 100%
     */
    //% shim=BitmapMethods::doubledX
    doubledX(): Bitmap;

    /**
     * Stretches the image vertically by 100%
     */
    //% shim=BitmapMethods::doubledY
    doubledY(): Bitmap;

    /**
     * Replaces one color in an image with another
     */
    //% shim=BitmapMethods::replace
    replace(from: int32, to: int32): void;

    /**
     * Stretches the image in both directions by 100%
     */
    //% shim=BitmapMethods::doubled
    doubled(): Bitmap;

    /**
     * Draw given image on the current image
     */
    //% shim=BitmapMethods::drawImage
    drawImage(from: Bitmap, x: int32, y: int32): void;

    /**
     * Draw given image with transparent background on the current image
     */
    //% shim=BitmapMethods::drawTransparentImage
    drawTransparentImage(from: Bitmap, x: int32, y: int32): void;

    /**
     * Check if the current image "collides" with another
     */
    //% shim=BitmapMethods::overlapsWith
    overlapsWith(other: Bitmap, x: int32, y: int32): boolean;
}
declare namespace bitmap {

    /**
     * Create new empty (transparent) image
     */
    //% shim=bitmap::create
    function create(width: int32, height: int32): Bitmap;

    /**
     * Create new image with given content
     */
    //% shim=bitmap::ofBuffer
    function ofBuffer(buf: Buffer): Bitmap;

    /**
     * Double the size of an icon
     */
    //% shim=bitmap::doubledIcon
    function doubledIcon(icon: Buffer): Buffer;
}
declare namespace control {

    /**
     * Used internally
     */
    //% flags.defl=16 shim=control::myOnEvent
    function myOnEvent(src: int32, value: int32, handler: () => void, flags?: int32): void;
}

// Auto-generated. Do not edit. Really.
