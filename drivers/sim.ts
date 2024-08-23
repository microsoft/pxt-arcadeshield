namespace shield.drivers {
    export class Shield_Sim extends ShieldDriver {
        constructor(type: ShieldType) {
            super(type);
        }

        showImage(img: bitmap.Bitmap) {
            // TODO: Post show-image message to iframe
        }
    }
}
