/**
 * Image manipulation blocks
 */
namespace bitmaps {

    //% blockId=background_image_picker block="%img"
    //% shim=TD_ID
    //% img.fieldEditor="sprite"
    //% img.fieldOptions.taggedTemplate="img"
    //% img.fieldOptions.decompileIndirectFixedInstances="true"
    //% img.fieldOptions.decompileArgumentAsString="true"
    //% img.fieldOptions.sizes="-1,-1"
    //% img.fieldOptions.filter="background"
    //% weight=100 group="Create"
    //% blockHidden=1 duplicateShadowOnDrag
    export function _screenImage(img: Bitmap) {
        return img
    }

    /**
     * A bitmap
     * @param image the image
     */
    //% blockId=image_picker block="$image" shim=TD_ID
    //% image.fieldEditor="sprite"
    //% image.fieldOptions.taggedTemplate="img"
    //% image.fieldOptions.decompileIndirectFixedInstances="true"
    //% image.fieldOptions.decompileArgumentAsString="true"
    //% weight=0 group="Create"
    //% help=images/image
    export function _image(image: Bitmap): Bitmap {
        return image;
    }

    //% blockId=colorindexpicker block="%index" blockHidden=true shim=TD_ID
    //% index.fieldEditor="colornumber"
    //% index.fieldOptions.valueMode="index"
    //% index.fieldOptions.decompileLiterals="true"
    export function __colorIndexPicker(index: number) {
        return index;
    }

}
