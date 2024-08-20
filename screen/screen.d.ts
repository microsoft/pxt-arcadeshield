declare namespace ScreenMethods {
    //% shim=pxt::updateScreen
    export function updateScreen(img: Bitmap): void;
    //% shim=pxt::updateStats
    export function updateStats(s: string): void;
        //% shim=pxt::displayHeight
    export function displayHeight(): number;
    //% shim=pxt::displayWidth
    export function displayWidth(): number;
    //% shim=pxt::displayPresent
    export function displayPresent(): boolean;
    //% shim=pxt::setPalette
    export function setPalette(buf: Buffer): void;
    //% shim=pxt::setScreenBrightness
    export function setScreenBrightness(b: number): void;
}
