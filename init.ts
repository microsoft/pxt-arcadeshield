/**
 * Tagged bitmap literal converter
 */
//% shim=@f4 helper=bitmaps::ofBuffer blockIdentity="bitmaps._bitmap"
//% groups=["0.","1#","2T","3t","4N","5n","6G","7g","8","9","aAR","bBP","cCp","dDO","eEY","fFW"]
function bmp(lits: any, ...args: any[]): Bitmap { return null; }

// set palette before creating screen, which initializes the display
screenhelpers.setPalette(hex`dededeffffffff2121ff93c4ff8135fff609249ca378dc52003fad87f2ff8e2ec4a4839f5c406ce5cdc491463d000000`)

const theScreen: Bitmap = __screen_internal.createScreen();
theScreen.fill(15)

namespace __screen_internal {

    export function createScreen() {
        const img = bitmaps.create(
            screenhelpers.displayWidth(), // control.getConfigValue(DAL.CFG_DISPLAY_WIDTH, 160)
            screenhelpers.displayHeight() // control.getConfigValue(DAL.CFG_DISPLAY_HEIGHT, 120)
        )
        control.__screen.setupUpdate(() => screenhelpers.updateScreen(img))
        return img as Bitmap;
    }
}
