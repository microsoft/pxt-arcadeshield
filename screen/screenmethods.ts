namespace screen {
    //% shim=screen::updateScreen
    export function updateScreen(img: Bitmap) {
        basic.pause(0)
    }
    //% shim=screen::updateStats
    export function updateStats(s: string) {
        basic.pause(0)
    }
    //% shim=screen::displayHeight
    export function displayHeight() { 
        return 0;
    }
    //% shim=screen::displayWidth
    export function displayWidth() {
        return 0;
    }
    //% shim=screen::displayPresent
    export function displayPresent() {
        return 0;
    }
    //% shim=screen::setPalette
    export function setPalette(buf: Buffer) {
        basic.pause(0)
    }
    //% shim=screen::setScreenBrightness
    export function setScreenBrightness(b: number) {
        basic.pause(0)
    }
}
