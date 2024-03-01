/**
 * Bitmap manipulation blocks
 */
namespace bitmaps {

    /**
     * A bitmap
     * @param bitmap the bitmap
     */
    //% blockId=bitmap_picker block="$bitmap" shim=TD_ID
    //% bitmap.fieldEditor="sprite"
    //% bitmap.fieldOptions.taggedTemplate="bmp"
    //% bitmap.fieldOptions.decompileIndirectFixedInstances="true"
    //% bitmap.fieldOptions.decompileArgumentAsString="true"
    //% weight=0 group="Create"
    //% help=bitmaps/bitmap
    export function _bitmap(bitmap: Bitmap): Bitmap {
        return bitmap;
    }

    //% blockId=screen_bitmap_picker block="%bitmap"
    //% shim=TD_ID
    //% bitmap.fieldEditor="sprite"
    //% bitmap.fieldOptions.taggedTemplate="bmp"
    //% bitmap.fieldOptions.decompileIndirectFixedInstances="true"
    //% bitmap.fieldOptions.decompileArgumentAsString="true"
    //% bitmap.fieldOptions.filter="!tile !dialog !background"
    //% weight=100 group="Create" duplicateShadowOnDrag
    //% help=bitmaps/sprite-bitmap
    export function _spriteBitmap(bitmap: Bitmap): Bitmap {
        return bitmap
    }

    //% blockId=colorindexpicker block="%index" blockHidden=true shim=TD_ID
    //% index.fieldEditor="colornumber"
    //% index.fieldOptions.valueMode="index"
    //% index.fieldOptions.colours='["#000000","#ffffff","#ff2121","#ff93c4","#ff8135","#fff609","#249ca3","#78dc52","#003fad","#f2f2f2","#f2b233","#e45a33","#a5694f","#7c3f58","#91d2e7","#1e1e1e"]'
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