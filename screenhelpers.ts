namespace screenhelpers {
    //% shim=pxt::displayPresent
    export function displayPresent(): boolean { return false }
    //% shim=pxt::setPalette
    export function setPalette(buf: Buffer) { }
    //% shim=pxt::displayWidth
    export function displayWidth(): number { return 0 }
    //% shim=pxt::displayHeight
    export function displayHeight(): number { return 0 }
    //% shim=pxt::setScreenBrightness
    export function setScreenBrightness(b: number) { }
}