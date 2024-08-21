
/**
 * Tagged bitmap literal converter
 */
//% shim=@f4 helper=bitmap::ofBuffer blockIdentity="bitmaps._spriteBitmap"
//% groups=["0.","1#","2T","3t","4N","5n","6G","7g","8","9","aAR","bBP","cCp","dDO","eEY","fFW"]
function bmp(lits: any, ...args: any[]): Bitmap {
    return null;
}

// set palette before creating screen, which initializes the display
screen.setPalette(hex`000000ffffffff2121ff93c4ff8135fff609249ca378dc52003fad87f2ff8e2ec4a4839f5c406ce5cdc491463d000000`)

//% whenUsed
const theScreen: ScreenBitmap = _screen_internal.createScreen();

namespace _screen_internal {
    export function createScreen() {
        const img = bitmap.create(
            screen.displayWidth(), // control.getConfigValue(DAL.CFG_DISPLAY_WIDTH, 160)
            screen.displayHeight() // control.getConfigValue(DAL.CFG_DISPLAY_HEIGHT, 128)
        )
        control.__screen.setupUpdate(() => screen.updateScreen(img))
        //control.EventContext.onStats = function (msg: string) {
        //    updateStats(msg);
        //}
        return img as ScreenBitmap;
    }
}

namespace bitmap {
    /**
    * Get the screen image
    */
    //% blockNamespace="bitmaps" group="Create"
    //% blockId=imagescreen block="screen"
    //% help=images/screen-image
    export function screenImage(): Bitmap {
        return theScreen;
    }
}
