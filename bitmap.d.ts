//% fixedInstances decompileIndirectFixedInstances
interface Bitmap {
    /**
     * Fill entire image with a given color
     */
    //% shim=BitmapMethods::fill blockNamespace="bitmaps" group="Drawing"
    //% block="fill $this=variables_get with $c=colorindexpicker"
    //% help=github:pxt-arcadeshield/docs/reference/bitmaps/bitmap/fill
    //% this.shadow="theScreen"
    //% weight=100
    fill(c: int32): void;

    /**
     * Set pixel color
     */
    //% shim=BitmapMethods::setPixel blockNamespace="bitmaps" group="Drawing"
    //% block="set $this=variables_get color at x $x y $y to $c=colorindexpicker"
    //% help=github:pxt-arcadeshield/docs/reference/bitmaps/bitmap/set-pixel
    //% this.shadow="theScreen"
    //% weight=96
    setPixel(x: int32, y: int32, c: int32): void;

    /**
     * Get a pixel color
     */
    //% shim=BitmapMethods::getPixel blockNamespace="bitmaps" group="Drawing"
    //% block="$this=variables_get color at x $x y $y"
    //% help=github:pxt-arcadeshield/docs/reference/bitmaps/bitmap/get-pixel
    //% this.shadow="theScreen"
    //% weight=92
    getPixel(x: int32, y: int32): int32;

    /**
     * Draw a line
     */
    //% helper=imageDrawLine blockNamespace="bitmaps" inlineInputMode="inline" group="Drawing"
    //% block="draw line in $this=variables_get from x $x0 y $y0 to x $x1 y $y1 $c=colorindexpicker"
    //% help=github:pxt-arcadeshield/docs/reference/bitmaps/bitmap/draw-line
    //% this.shadow="theScreen"
    //% weight=88
    drawLine(x0: number, y0: number, x1: number, y1: number, c: color): void;

    /**
     * Draw an empty rectangle
     */
    //% helper=imageDrawRect blockNamespace="bitmaps" inlineInputMode="inline" group="Drawing"
    //% block="draw rectangle in $this=variables_get at x $x y $y width $w height $h $c=colorindexpicker"
    //% help=github:pxt-arcadeshield/docs/reference/bitmaps/bitmap/draw-rect
    //% this.shadow="theScreen"
    //% weight=84
    drawRect(x: number, y: number, w: number, h: number, c: color): void;

    /**
     * Fill a rectangle
     */
    //% helper=imageFillRect blockNamespace="bitmaps" inlineInputMode="inline" group="Drawing"
    //% block="fill rectangle in $this=variables_get at x $x y $y width $w height $h $c=colorindexpicker"
    //% help=github:pxt-arcadeshield/docs/reference/bitmaps/bitmap/fill-rect
    //% this.shadow="theScreen"
    //% weight=80
    fillRect(x: number, y: number, w: number, h: number, c: color): void;

    /**
     * Draw given bitmap on the current bitmap
     */
    //% shim=BitmapMethods::drawTransparentBitmap blockNamespace="bitmaps" group="Drawing"
    //% block="draw bitmap $from=variables_get in $this=variables_get at x $x y $y"
    //% help=github:pxt-arcadeshield/docs/reference/bitmaps/bitmap/draw-bitmap
    //% this.shadow="theScreen"
    //% weight=76
    drawBitmap(from: Bitmap, x: int32, y: int32): void;

    /**
     * Flips (mirrors) pixels horizontally in the current image
     */
    //% shim=BitmapMethods::flipX blockNamespace="bitmaps" group="Transformations"
    //% block="flip $this=variables_get horizontally"
    //% help=github:pxt-arcadeshield/docs/reference/bitmaps/bitmap/flip-x
    //% this.shadow="theScreen"
    //% weight=72
    flipX(): void;

    /**
     * Flips (mirrors) pixels vertically in the current image
     */
    //% shim=BitmapMethods::flipY blockNamespace="bitmaps" group="Transformations"
    //% block="flip $this=variables_get vertically"
    //% help=github:pxt-arcadeshield/docs/reference/bitmaps/bitmap/flip-y
    //% this.shadow="theScreen"
    //% weight=68
    flipY(): void;

    /**
     * Every pixel in image is moved by (dx,dy)
     */
    //% shim=BitmapMethods::scroll blockNamespace="bitmaps" group="Transformations"
    //% help=github:pxt-arcadeshield/docs/reference/bitmaps/bitmap/scroll
    //% this.shadow="theScreen"
    //% block="scroll $this=variables_get by x $dx y $dy"
    //% weight=64
    scroll(dx: int32, dy: int32): void;

    /**
     * Replaces one color in an image with another
     */
    //% shim=BitmapMethods::replace blockNamespace="bitmaps" group="Transformations"
    //% block="change color in $this=variables_get from $from=colorindexpicker to $to=colorindexpicker"
    //% help=bitmaps/bitmap/replace
    //% help=github:pxt-arcadeshield/docs/reference/bitmaps/bitmap/replace
    //% this.shadow="theScreen"
    //% weight=60 
    replace(from: int32, to: int32): void;

    /**
     * Returns true if the provided image is the same as this image,
     * otherwise returns false.
     */
    //% shim=BitmapMethods::equals
    //% blockNamespace="bitmaps" group="Compare"
    //% block="$this is equal to image $other"
    //% this.shadow=variables_get
    //% other.shadow=variables_get
    //% this.defl="bmap"
    //% help=github:pxt-arcadeshield/docs/reference/bitmaps/bitmap/equals
    equals(other: Bitmap): boolean;

    //% shim=BitmapMethods::isStatic
    isStatic(): boolean;

    //% shim=BitmapMethods::revision
    revision(): number;

    /**
     * Replace colors in a rectangle
     */
    //% helper=imageMapRect
    mapRect(x: number, y: number, w: number, h: number, colorMap: Buffer): void;

    /**
     * Return a copy of the current image
     */
    //% shim=BitmapMethods::clone blockNamespace="bitmaps" group="Create"
    //% weight=50
    //% block="clone $this=variables_get"
    //% help=github:pxt-arcadeshield/docs/reference/bitmaps/bitmap/clone
    //% this.shadow="theScreen"
    clone(): Bitmap;
}

declare namespace bitmap {
    //% blockNamespace="bitmaps"
    //% block="create bitmap width $width height $height" group="Create"
    //% weight=60
    //% help=github:pxt-arcadeshield/docs/reference/bitmaps/create
    function create(width: number, height: number): Bitmap;
}