/**
 * Image manipulation blocks
 */
namespace bitmaps {

    /**
     * A bitmap
     * @param bitmap the bitmap
     */
    //% blockId=image_picker block="$image" shim=TD_ID
    //% image.fieldEditor="sprite"
    //% image.fieldOptions.taggedTemplate="img"
    //% image.fieldOptions.decompileIndirectFixedInstances="true"
    //% image.fieldOptions.decompileArgumentAsString="true"
    //% weight=0 group="Create"
    //% help=images/image
    export function _image(image: Image): Image {
        return image;
    }

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

    //% blockId=colorindexpicker block="%index" blockHidden=true shim=TD_ID
    //% index.fieldEditor="colornumber"
    //% index.fieldOptions.valueMode="index"
    //% index.fieldOptions.colours='["#000000","#ffffff","#ff2121","#ff93c4","#ff8135","#fff609","#249ca3","#78dc52","#003fad","#f2f2f2","#f2b233","#e45a33","#a5694f","#7c3f58","#91d2e7","#1e1e1e"]'
    //% index.fieldOptions.decompileLiterals="true"
    export function __colorIndexPicker(index: number) {
        return index;
    }

}
