// tests go here; this will not be compiled when this package is used as an extension.

while (true) {
    let x = 0
    bitmap.screenImage().fill(0)
    while (x < 160) {
        bitmap.screenImage().setPixel(x, 0, 9)
        bitmap.screenImage().setPixel(x, 2, 10)
        bitmap.screenImage().setPixel(x, 4, 11)
        x++
        basic.pause(100)
        // pause
    }
}
