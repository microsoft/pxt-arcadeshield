// tests go here; this will not be compiled when this package is used as an extension.

const present = screenhelpers.displayPresent();

basic.showNumber(present ? 1 : 0)

while (true) {
    let x = 0
    let my = screen.height -1
    screen.fill(0)
    screen.print((my+1).toString(), 60, 60)
    while (x < 160) {
        screen.setPixel(x, 0, 9)
        screen.setPixel(x, 2, 10)
        screen.setPixel(x, 4, 11)
        screen.setPixel(x, my, 9)
        screen.setPixel(x, my - 2, 10)
        screen.setPixel(x, my - 4, 11)
        x++
        basic.pause(100)
        // pause
    }
}
