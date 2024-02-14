/**
 * Image manipulation blocks
 */
namespace simages {

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
    export function _screenImage(img: Image) {
        return img
    }

    //% blockId=dialog_image_picker block="%img"
    //% shim=TD_ID
    //% img.fieldEditor="sprite"
    //% img.fieldOptions.taggedTemplate="img"
    //% img.fieldOptions.decompileIndirectFixedInstances="true"
    //% img.fieldOptions.decompileArgumentAsString="true"
    //% img.fieldOptions.sizes="15,15;18,18;21,21;24,24;9,9;12,12"
    //% img.fieldOptions.filter="dialog"
    //% weight=100 group="Create"
    //% blockHidden=1 duplicateShadowOnDrag
    export function _dialogImage(img: Image) {
        return img
    }

    /**
     * An image
     * @param image the image
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

    //% blockId=colorindexpicker block="%index" blockHidden=true shim=TD_ID
    //% index.fieldEditor="colornumber"
    //% index.fieldOptions.valueMode="index"
    //% index.fieldOptions.decompileLiterals="true"
    export function __colorIndexPicker(index: number) {
        return index;
    }

    /**
     * A position picker
     */
    //% blockId=positionPicker block="%index" blockHidden=true shim=TD_ID
    //% index.fieldEditor="position" color="#ffffff" colorSecondary="#ffffff"
    //% index.fieldOptions.decompileLiterals="true"
    export function __positionPicker(index: number) {
        return index;
    }
}
