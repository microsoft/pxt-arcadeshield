// tests go here; this will not be compiled when this package is used as an extension.

const present = ScreenMethods.displayPresent();

basic.showNumber(present ? 1 : 0)

while (true) {
    let x = 0
    let my = bitmap.screenImage().height -1
    bitmap.screenImage().fill(0)
    bitmap.screenImage().print(my.toString(), 60, 60)
    while (x < 160) {
        bitmap.screenImage().setPixel(x, 0, 9)
        bitmap.screenImage().setPixel(x, 2, 10)
        bitmap.screenImage().setPixel(x, 4, 11)
        bitmap.screenImage().setPixel(x, my, 9)
        bitmap.screenImage().setPixel(x, my - 2, 10)
        bitmap.screenImage().setPixel(x, my - 4, 11)
        x++
        basic.pause(100)
        // pause
    }
}
