/**
 * Bitmap manipulation blocks
 */
namespace bitmaps {

    //% blockNamespace="drawing"
    //% blockId=bitmapCreate shim=TD_ID
    //% block="create bitmap width $width height $height"
    //% weight=60
    //% group="Create"
    //% blockAliasFor="bitmaps.create"
    //% help=github:pxt-arcadeshield/docs/reference/bitmaps/create
    export function _create(width: number, height: number): Bitmap {
        return bitmaps.create(width, height);
    }

    /**
     * A bitmap
     * @param bitmap the bitmap
     */
    //% blockId=bitmap_picker block="$bitmap" shim=TD_ID
    //% bitmap.fieldEditor="sprite"
    //% bitmap.fieldOptions.taggedTemplate="bmp"
    //% bitmap.fieldOptions.decompileArgumentAsString="true"
    //% weight=50 
    //% group="Create"
    //% help=bitmaps/bitmap
    //% blockAliasFor="bitmaps.create"
    //% blockNamespace="drawing"
    export function _bitmap(bitmap: Bitmap): Bitmap {
        return bitmap;
    }


    /**
     * A bitmap
     * @param bitmap the bitmap
     */
    //% blockId=bitmap_assign block="$bitmap" shim=TD_ID
    //% bitmap.fieldEditor="sprite"
    //% bitmap.fieldOptions.taggedTemplate="bmp"
    //% bitmap.fieldOptions.decompileArgumentAsString="true"
    //% weight=58
    //% group="Create"
    //% blockSetVariable=bitmap
    //% blockNamespace="drawing"
    export function __bitmap(bitmap: Bitmap): Bitmap {
        return bitmap;
    }


    //% blockId=colorindexpicker block="$index" blockHidden=true shim=TD_ID
    //% index.fieldEditor="colornumber"
    //% index.fieldOptions.valueMode="index"
    //% index.fieldOptions.colours='["#000000","#ffffff","#ff2121","#ff93c4","#ff8135","#fff609","#249ca3","#78dc52","#003fad","#87f2ff","#8e2ec4","#a4839f","#5c406c","#e5cdc4","#91463d","#000000"]'
    //% index.fieldOptions.decompileLiterals="true"
    export function __colorIndexPicker(index: number) {
        return index;
    }
}
    //% blockIdentity=bitmaps._bitmap
    const defaultBitmap: Bitmap = bmp`
    . . . . . . . . . . . . . . . .
    . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
    . 1 . . . . . . . . . . . . 1 .
    . 1 . . . . . . . . . . . . 1 .
    . 1 . . . . . . . . . . . . 1 .
    . 1 . . . . . . . . . . . . 1 .
    . 1 . . . . . . . . . . . . 1 .
    . 1 . . . . . . . . . . . . 1 .
    . 1 . . . . . . . . . . . . 1 .
    . 1 . . . . . . . . . . . . 1 .
    . 1 . . . . . . . . . . . . 1 .
    . 1 . . . . . . . . . . . . 1 .
    . 1 . . . . . . . . . . . . 1 .
    . 1 . . . . . . . . . . . . 1 .
    . 1 1 1 1 1 1 1 1 1 1 1 1 1 1 .
    . . . . . . . . . . . . . . . .
`