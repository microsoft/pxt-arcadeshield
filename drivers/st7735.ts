namespace shield.drivers {
    export class Shield_ST7735 extends ShieldDriver {
        constructor(type: ShieldType) {
            super(type);
        }

        showImage(img: bitmap.Bitmap) {
            // TODO: Send to hardware
        }
    }
}
