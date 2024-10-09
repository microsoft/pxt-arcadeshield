/**
* Get the screen bitmap
*/
//% blockNamespace="bitmaps" group="Create"
//% blockId=theScreen block="screen"
//% help=bitmaps/screen-image
function screen(): Bitmap {
        return theScreen;
}


namespace bitmaps {
        export enum Dimension {
                //% block="width"
                Width,
                //% block="height"
                Height
        }


        /**
         * Returns the width or height of a picture.
         *
         * @param picture The picture to get the width or height of
         * @param dimension The dimension to get
         * @returns
         */
        //% blockId=image_get_dimension
        //% group="Create"
        //% blockNamespace="bitmaps"
        //% block="$bitmap $dimension"
        //% picture.shadow=variables_get
        //% picture.defl=bitmap
        export function getDimension(bitmap: Bitmap, dimension: Dimension) {
                if (dimension === Dimension.Width) return picture.width;
                else return picture.height;
        }
}