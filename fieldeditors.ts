/**
 * Bitmap manipulation blocks
 */
namespace bitmaps {
    /**
     * Creates a new bitmap
     * @param width the width of the bitmap
     * @param height the height of the bitmap
     */
    //% group="Create"
    //% blockId=bitmapcreatenoset 
    //% block = "create bitmap width $width height $height"
    //% blockAliasFor="bitmaps.create"
    export function __create(width: number, height: number): Bitmap
    {
        return bitmaps.create(width, height);
    }

    /**
     * A bitmap
     * @param bitmap the bitmap
     */
    //% blockId=bitmap_picker block="$bitmap" shim=TD_ID
    //% bitmap.fieldEditor="sprite"
    //% bitmap.fieldOptions.taggedTemplate="bmp"
    //% bitmap.fieldOptions.decompileIndirectFixedInstances="true"
    //% bitmap.fieldOptions.decompileArgumentAsString="true"
    //% weight=50 
    //% group="Create"
    //% help=bitmaps/bitmap
    //% blockNamespace="drawing"
    export function _bitmap(bitmap: Bitmap): Bitmap {
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
    //% fixedInstance blockIdentity=bitmaps._bitmap
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