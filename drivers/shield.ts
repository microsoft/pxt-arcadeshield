namespace shield {
    export enum ShieldType {
        SIM,
        ST7735,
    }

    export class ShieldDriver {
        constructor(private _type: ShieldType) {
        }

        static create(type: ShieldType) {
            switch (type) {
                case ShieldType.SIM:
                    return new drivers.Shield_Sim(type);
                case ShieldType.ST7735:
                    return new drivers.Shield_ST7735(type);
                default:
                    throw "Unknown shield type";
            }
        }

        type() {
            return this._type;
        }

        showImage(img: bitmap.Bitmap) {
            // Stub
        }
    }
}
