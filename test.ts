// tests go here; this will not be compiled when this package is used as an extension.
let x = 0
let y = 0
basic.forever(function () {
    bitmap.screenImage().fill(9)
    x = input.acceleration(Dimension.X) / 20
    y = input.acceleration(Dimension.Y) / 20
    bitmap.screenImage().drawRect(80 + x, 60 + y, 20, 20, 12)
})

