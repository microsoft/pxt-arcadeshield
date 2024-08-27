// tests go here; this will not be compiled when this package is used as an extension.

const present = screenhelpers.displayPresent();

basic.showNumber(present ? 1 : 0)

while (true) {
    let x = 0
    let my = theScreen.height -1
    theScreen.fill(0)
    theScreen.print((my+1).toString(), 60, 60)
    while (x < 160) {
        theScreen.setPixel(x, 0, 9)
        theScreen.setPixel(x, 2, 10)
        theScreen.setPixel(x, 4, 11)
        theScreen.setPixel(x, my, 9)
        theScreen.setPixel(x, my - 2, 10)
        theScreen.setPixel(x, my - 4, 11)
        x++
        basic.pause(100)
        // pause
    }
}
