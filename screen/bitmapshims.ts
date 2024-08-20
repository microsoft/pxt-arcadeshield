//% fixedInstances decompileIndirectFixedInstances
namespace Bitmap {
    /**
     * Fill a rectangle
     */
    //% helper=imageFillRect blockNamespace="bitmaps" inlineInputMode="inline" group="Drawing"
    //% block="fill rectangle in %bmap=variables_get at x %x y %y width %w height %h %c=colorindexpicker"
    //% help=github:pxt-arcadeshield/reference/bitmaps/bitmap/fill-rect
    export function fillRect(x: number, y: number, w: number, h: number, c: color): void {
        basic.pause(0)
    }

    /**
     * Replace colors in a rectangle
     */
    //% helper=imageMapRect
    export function mapRect(x: number, y: number, w: number, h: number, colorMap: Buffer): void {
        basic.pause(0)    
    }

    /**
     * Draw a line
     */
    //% helper=imageDrawLine blockNamespace="bitmaps" inlineInputMode="inline" group="Drawing"
    //% block="draw line in %bmap=variables_get from x %x0 y %y0 to x %x1 y %y1 %c=colorindexpicker"
    //% help=images/image/draw-line
    export function drawLine(x0: number, y0: number, x1: number, y1: number, c: color): void 
    {
        basic.pause(0)
    }

    /**
     * Draw an empty rectangle
     */
    //% helper=imageDrawRect blockNamespace="bitmaps" inlineInputMode="inline" group="Drawing"
    //% block="draw rectangle in %bmap=variables_get at x %x y %y width %w height %h %c=colorindexpicker"
    //% help=images/image/draw-rect
    export function drawRect(x: number, y: number, w: number, h: number, c: color): void {
        basic.pause(0)
    }

    /**
     * Set pixel color
     */
    //% shim=BitmapMethods::setPixel blockNamespace="bitmaps" group="Drawing"
    //% block="set %bmap=variables_get color at x %x y %y to %c=colorindexpicker"
    //% help=images/image/set-pixel
    export function setPixel(x: int32, y: int32, c: int32): void {
        basic.pause(0)
    }

    /**
     * Get a pixel color
     */
    //% shim=BitmapMethods::getPixel blockNamespace="bitmaps" group="Drawing"
    //% block="%bmap=variables_get color at x %x y %y"
    //% help=images/image/get-pixel
    export function getPixel(x: int32, y: int32): int32 {
        return 0
    }

    /**
     * Fill entire image with a given color
     */
    //% shim=BitmapMethods::fill blockNamespace="bitmaps" group="Drawing"
    //% block="fill %bmap=variables_get with %c=colorindexpicker"
    //% help=images/image/fill
    export function fill(c: int32): void {
        basic.pause(0)
    }

    /**
     * Return a copy of the current image
     */
    //% shim=BitmapMethods::clone blockNamespace="bitmaps" group="Create"
    //% weight=60
    //% block="clone %bmap=variables_get"
    //% help=images/image/clone
    export function clone(): Bitmap {
        return null;
    }

    /**
     * Flips (mirrors) pixels horizontally in the current image
     */
    //% shim=BitmapMethods::flipX blockNamespace="bitmaps" group="Transformations"
    //% block="flip %bmap=variables_get horizontally"
    //% help=images/image/flip-x
    export function flipX(): void {
        basic.pause(0)
    }

    /**
     * Flips (mirrors) pixels vertically in the current image
     */
    //% shim=BitmapMethods::flipY blockNamespace="bitmaps" group="Transformations"
    //% block="flip %bmap=variables_get vertically"
    //% help=images/image/flip-y
    export function flipY(): void {
        basic.pause(0)
    }

    /**
     * Every pixel in image is moved by (dx,dy)
     */
    //% shim=BitmapMethods::scroll blockNamespace="bitmaps" group="Transformations"
    //% help=images/image/scroll
    export function scroll(dx: int32, dy: int32): void {
        basic.pause(0)
    }

    /**
     * Replaces one color in an image with another
     */
    //% shim=BitmapMethods::replace blockNamespace="bitmaps" group="Transformations"
    //% block="change color in %bmap=variables_get from %from=colorindexpicker to %to=colorindexpicker"
    //% help=images/image/replace
    export function replace(from: int32, to: int32): void {
        basic.pause(0)
    }

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
    //% help=images/image/equals
    export function equals(other: Bitmap): boolean {
        return false
    }

    //% shim=BitmapMethods::isStatic
    export function isStatic(): boolean {
        return false
    }

    //% shim=BitmapMethods::revision
    export function revision(): number {
        return 0
    }
}

namespace bitmap {
    //% blockNamespace="bitmaps"
    //% block="create bitmap width %width height %height" group="Create"
    //% weight=50
    //% help=images/create
    //% shim=bitmap::create
    function create(width: number, height: number): Bitmap {
        return null;
    }

    //% shim=bitmap::ofBuffer
    function ofBuffer(buf: Buffer): Bitmap {
        return null;
    }

    //% shim=bitmap::doubledIcon
    function doubledIcon(icon: Buffer): Buffer {
        return null;      
    }
}