// set palette before creating screen, which initializes the display
screenhelpers.setPalette(hex`000000ffffffff2121ff93c4ff8135fff609249ca378dc52003fad87f2ff8e2ec4a4839f5c406ce5cdc491463d000000`)

//% whenUsed
const screen: ScreenBitmap = _screen_internal.createScreen();

namespace _screen_internal {
    //% shim=pxt::updateScreen
    function updateScreen(img: Bitmap): void { }

    export function createScreen() {
        const img = bitmap.create(
            screenhelpers.displayWidth(), // control.getConfigValue(DAL.CFG_DISPLAY_WIDTH, 160)
            screenhelpers.displayHeight() // control.getConfigValue(DAL.CFG_DISPLAY_HEIGHT, 128)
        )
        control.__screen.setupUpdate(() => updateScreen(img))
        return img as ScreenBitmap;
    }
}
