declare namespace ScreenMethods {
    //% shim=screen::updateScreen
    export function updateScreen(img: Bitmap): void;
    //% shim=screen::updateStats
    export function updateStats(s: string): void;
        //% screen=pxt::displayHeight
    export function displayHeight(): number;
    //% shim=screen::displayWidth
    export function displayWidth(): number;
    //% shim=screen::displayPresent
    export function displayPresent(): boolean;
    //% shim=screen::setPalette
    export function setPalette(buf: Buffer): void;
    //% shim=screen::setScreenBrightness
    export function setScreenBrightness(b: number): void;
}
