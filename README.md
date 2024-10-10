# MakeCode extension: Arcade Shield for BBC micro:bit (V2)

This MakeCode extension allows you to use any of the  MakeCode Arcade shields with the MakeCode for BBC micro:bit editor. The extension provides access 
to the screen and buttons on the shield, and has
a Bitmap abstraction with numerous drawing primitives
(draw line, circle, square, etc).
Bitmaps also can be created using the built-in
image editor in MakeCode.

> **NOTE: This extension will only work in https://makecode.microbit.org/beta**. The extension is still under development and is subject to changes. Please file issues at https://github.com/microsoft/pxt-arcadeshield/issues 

## Arcade Shields for the micro:bit V2

Various Arcade shields for the micro:bit V2 are available on the market today, including:

<table>
<tr valign="top">
<td width="33%" >
<a href="https://www.kittenbot.cc/products/newbit-arcade-shield">
Kittenbot's newbit Arcade shield
</a>
</td><td width="33%" >
<a href="https://shop.elecfreaks.com/products/micro-bit-retro-programming-arcade">
ELECFREAK's micro:bit Arcade shield
</a>
</td>
<td width="33%" >
<a href="https://www.icshop.com.tw/products/368112100137?locale=en">
ICShopping's Game:bit Arcade shield
</a>
</td></tr>
<tr>
<td>
<a alt="Kittenbot's newbit Arcade shield" href="https://www.kittenbot.cc/products/newbit-arcade-shield">
<img src="assets/newbit-shield.png">
</a>
</td><td>
<a alt="ELECFREAK's micro:bit Retro Arcade shield" href="https://shop.elecfreaks.com/products/micro-bit-retro-programming-arcade">
<img src="assets/elecfreaks-shield.png">
</a>
</td><td>
<a alt="ICShopping's Game:bit" href="https://www.icshop.com.tw/products/368112100137?locale=en">
<img src="assets/gamebit-shield.png">
</a>
</td></tr>
<tr valign="top">
<td>

Small screen. No battery or battery pack included. 3.7V JST power jack on back. One <a href="https://aka.ms/jacdac">Jacdac</a> port.

</td>

<td>

Assembly required. Small screen. AAA Battery pack on back. One <a href="https://aka.ms/jacdac">Jacdac</a> port.

</td>
<td>

No assembly required. Large screen and 3d-printed enclosure with LiPo battery inside. Two <a href="https://aka.ms/jacdac">Jacdac</a> ports.

</td>
</tr>

</table>


## Simulator support

As shown below, the extension provides a simulator for the display,
with keyboard controls mapping to the inputs of
the display shield (A and B buttons, and the D-pad).  Blocks
for the shield are under the toolbox categories `Controller` and
`Drawing` and are described further below.

![MakeCode with Arcade Shield Simulator](./assets/shieldSim.png)

## Blocks

### Controller

```blocks
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {

})
```

### Drawing with bitmaps

## TypeScript APIs

# Supported targets

- for PXT/microbit

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.opensource.microsoft.com.

When you submit a pull request, a CLA bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., status check, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Trademarks

This project may contain trademarks or logos for projects, products, or services. Authorized use of Microsoft 
trademarks or logos is subject to and must follow 
[Microsoft's Trademark & Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
Use of Microsoft trademarks or logos in modified versions of this project must not cause confusion or imply Microsoft sponsorship.
Any use of third-party trademarks or logos are subject to those third-party's policies.

<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script
