/**
 * Image manipulation blocks
 */
namespace bitmaps {

    //% blockId=screen_image_picker block="%img"
    //% shim=TD_ID
    //% img.fieldEditor="sprite"
    //% img.fieldOptions.taggedTemplate="img"
    //% img.fieldOptions.decompileIndirectFixedInstances="true"
    //% img.fieldOptions.decompileArgumentAsString="true"
    //% img.fieldOptions.filter="!tile !dialog !background"
    //% weight=100 group="Create" duplicateShadowOnDrag
    //% help=images/sprite-image
    export function _spriteImage(img: Image) {
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

}
