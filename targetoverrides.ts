/**
 * Tagged bitmap literal converter
 */
//% shim=@f4 helper=image::ofBuffer blockIdentity="bitmaps._spriteBitmap"
//% groups=["0.","1#","2T","3t","4N","5n","6G","7g","8","9","aAR","bBP","cCp","dDO","eEY","fFW"]
function bmp(lits: any, ...args: any[]): Bitmap { return null }

// set palette before creating screen, which initializes the display
bitmap.setPalette(hex`000000ffffffff2121ff93c4ff8135fff609249ca378dc52003fad87f2ff8e2ec4a4839f5c406ce5cdc491463d000000`)

//% whenUsed
const screen = _screen_internal.createScreen();

namespace bitmap {
    //% shim=pxt::setPalette
    export function setPalette(buf: Buffer) { }
}

namespace _screen_internal {
    //% shim=pxt::updateScreen
    function updateScreen(img: Bitmap): void { }    
    //% shim=pxt::displayHeight
    function displayHeight(): number { return 0 }   
    //% shim=pxt::displayWidth
    function displayWidth(): number { return 0 }
    //% shim=pxt::displayPresent
    export function displayPresent(): boolean { return false }
    
    //% parts="screen"
    export function createScreen() {
        const img = bitmap.create(
            displayWidth(), // control.getConfigValue(DAL.CFG_DISPLAY_WIDTH, 160),
            displayHeight() // control.getConfigValue(DAL.CFG_DISPLAY_HEIGHT, 128))
        )
        control.__screen.setupUpdate(() => updateScreen(img))
        //control.EventContext.onStats = function (msg: string) {
        //    updateStats(msg);
        //}
        return img as ScreenBitmap;
    }
}
