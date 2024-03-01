    /**
     * Show a bitmap on the screen
     * @param bitmap bitmap to draw
     */
    //% blockId=displayshowimage block="show bitmap %bitmap=bitmap_picker"
    //% weight=100 group="Bitmaps" blockGap=8
    //% help=display/show-image
    export function showBitmap(bitmap: Bitmap, duration: number = 400) {
        screen.fill(0);
        if (bitmap)
            screen.drawBitmap(bitmap, 0, 0)
        if (duration > 0)
            basic.pause(duration);
    }