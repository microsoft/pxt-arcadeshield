namespace shield.device {
    export class Device {
        _driver: ShieldDriver;
        
        constructor() {
        }

        setDriver(type: ShieldType) {
            this._driver = shield.ShieldDriver.create(type);
        }

        showImage(img: bitmap.Bitmap) {
            this._driver.showImage(img);
        }
    }

    let _instance: Device;

    const DEFAULT_SHIELD_TYPE = ShieldType.ST7735;

    export function instance(): Device {
        if (!_instance) {
            _instance = new Device();
            _instance.setDriver(DEFAULT_SHIELD_TYPE);
        }
        return _instance;
    }
}
