/**
* Get the screen bitmap
*/
//% blockNamespace="drawing" group="Create"
//% blockId=theScreen block="screen"
//% help=github:pxt-arcadeshield/docs/screen-image
function screen(): Bitmap {
        return theScreen;
}


namespace bitmaps {

        /**
         * Returns the width of a bitmap
         *
         * @param bitmap The bitmap to get the width of
         * @returns
         */
        //% blockId=bitmap_width
        //% group="Create"
        //% blockNamespace="drawing"
        //% block="$bitmap width"
        //% bitmap.shadow=variables_get
        //% bitmap.defl=bitmap
        //% weight=30
        export function width(bitmap: Bitmap) {
                return bitmap.width;
        }
        
        /**
         * Returns the height of a bitmap
         *
         * @param bitmap The bitmap to get the height of
         * @returns
         */
        //% blockId=bitmap_width
        //% group="Create"
        //% blockNamespace="drawing"
        //% block="$bitmap height"
        //% bitmap.shadow=variables_get
        //% bitmap.defl=bitmap
        //% weight=30
        export function height(bitmap: Bitmap) {
                return bitmap.height;
        }
}