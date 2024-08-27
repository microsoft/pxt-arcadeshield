import React, { useEffect } from "react"
import css from "@/styling/Shield.module.scss"
import { classList } from "@/util"
import { stateAndDispatch } from "@/state/Context"
import * as protocol from "@/external/protocol"
import * as transforms from "@/state/transforms"

let currRunId = ""

const DEFAULT_WIDTH = 160
const DEFAULT_HEIGHT = 128

const palette = new Uint32Array(256)

/*
"#000000", // 0x00000000
"#ffffff", // 0xffffffff
"#ff2121", // 0xff2121ff
"#ff93c4", // 0xff93c4ff
"#ff8135", // 0xff8135ff
"#fff609", // 0xfff609ff
"#249ca3", // 0x249ca3ff
"#78dc52", // 0x78dc52ff
"#003fad", // 0x003fadff
"#f2f2f2", // 0xf2f2f2ff
"#f2b233", // 0xf2b233ff
"#e45a33", // 0xe45a33ff
"#a5694f", // 0xa5694fff
"#7c3f58", // 0x7c3f58ff
"#91d2e7", // 0x91d2e7ff
"#1e1e1e"  // 0x1e1e1eff 
*/

// Set the palette colors
palette[0x00] = 0xff000000
palette[0x01] = 0xffffffff
palette[0x02] = 0xff2121ff
palette[0x03] = 0xff93c4ff
palette[0x04] = 0xff8135ff
palette[0x05] = 0xfff609ff
palette[0x06] = 0x249ca3ff
palette[0x07] = 0x78dc52ff
palette[0x08] = 0x003fadff
palette[0x09] = 0xf2f2f2ff
palette[0x0a] = 0xf2b233ff
palette[0x0b] = 0xe45a33ff
palette[0x0c] = 0xa5694fff
palette[0x0d] = 0x7c3f58ff
palette[0x0e] = 0x91d2e7ff
palette[0x0f] = 0x1e1e1eff


function postMessagePacket(msg: protocol.ArcadeShieldMessage) {
    const payload = new TextEncoder().encode(JSON.stringify(msg))
    window.parent.postMessage(
        {
            type: "messagepacket",
            channel: "arcadeshield",
            data: payload,
        },
        "*"
    )
}

export const Shield: React.FC = () => {
    const { state } = stateAndDispatch()
    const { skin } = state

    const [canvasRef, setCanvasRef] = React.useState<HTMLCanvasElement | null>(
        null
    )

    // TEMP: Configure the canvas size to 160x128. Later, this will be passed in by the main simulator
    useEffect(() => {
        if (canvasRef) {
            canvasRef.width = DEFAULT_WIDTH
            canvasRef.height = DEFAULT_HEIGHT
        }
    }, [canvasRef])

    // TESt: Draw registration marks on the canvas
    /*
    useEffect(() => {
        if (canvasRef) {
            const ctx = canvasRef.getContext("2d");
            if (ctx) {
                ctx.fillStyle = "red";
                ctx.fillRect(0, 0, 12, 12);
                ctx.fillRect(160 - 12, 0, 12, 12);
                ctx.fillRect(160 - 12, 128 - 12, 12, 12);
                ctx.fillRect(0, 128 - 12, 12, 12);
            }
        }
    }, [canvasRef]);
    */

    // Mount a window event listener to handle keyboard events
    useEffect(() => {
        const handleKeyDown = (ev: KeyboardEvent) => {
            const { key } = ev
            // TODO handle it
        }
        const handleKeyUp = (ev: KeyboardEvent) => {
            const { key } = ev
            // TODO handle it
        }
        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup", handleKeyUp)
        }
    }, [])

    // Mount a window event listener to handle message events from parent window
    useEffect(() => {
        function handleStopMessage(msg: any) { }

        function handleMessagePacket(msg: any) {
            const srcFrameIndex = (msg.srcFrameIndex as number) ?? -1
            switch (msg.channel) {
                case "arcadeshield":
                    return handleShieldMessage(msg.data, srcFrameIndex)
                default:
                    console.log(`unknown messagepacket: ${JSON.stringify(msg)}`)
            }
        }

        function handleShieldMessage(buf: any, srcFrameIndex: number) {
            // Is this message from the primary sim frame? This frame will reliably exist at index zero.
            // Secondary frame index cannot be relied upon to exist at a knowable index. The check for <= 0
            // is for backwards compatibility with older versions of the editor before the frame index
            // was added to the message.
            const isPrimarySim = srcFrameIndex <= 0

            const data = new TextDecoder().decode(new Uint8Array(buf))
            const msg = JSON.parse(data) as protocol.ArcadeShieldMessage

            // If the runId has changed, the simulator has been restarted.
            if (isPrimarySim && msg.runId !== currRunId) {
                currRunId = msg.runId
            }

            switch (msg.type) {
                case "show-image":
                    return handleShowImageMessage(
                        msg as protocol.ShowImageMessage
                    )
                case "set-brightness":
                    return
                case "set-palette":
                    return handleSetPaletteMessage(
                        msg as protocol.SetPaletteMessage
                    )
                default:
                    console.log(
                        `unknown arcadeshield message: ${JSON.stringify(msg)}`
                    )
            }
        }

        function handleShowImageMessage(msg: protocol.ShowImageMessage) {
            if (!canvasRef) {
                return
            }
            const ctx = canvasRef.getContext("2d")
            if (!ctx) {
                return
            }

            const { data } = msg
            // convert image data from base 64 to buffer
            const buf = Uint8Array.from(atob(data), (c) => c.charCodeAt(0))
            // Ensure buffer size is correct
            const expectedSize = canvasRef.width * canvasRef.height
            if (buf.length !== expectedSize) {
                console.error(
                    `expected image buffer size ${expectedSize}, got ${buf.length}`
                )
                return
            }
            // Create an image data object from the buffer. the buffer is a 1d array of color indices.
            const imgData = new ImageData(canvasRef.width, canvasRef.height)
            // Set the pixel data of the image data object
            for (let i = 0; i < buf.length; i++) {
                const index = buf[i]
                if (index >= palette.length) {
                    console.error(`invalid color index ${index}`)
                    return
                }
                const color = palette[index]
                imgData.data[i * 4 + 0] = (color >> 16) & 0xff
                imgData.data[i * 4 + 1] = (color >> 8) & 0xff
                imgData.data[i * 4 + 2] = color & 0xff
                imgData.data[i * 4 + 3] = 0xff
            }
            // Draw the image data to the canvas
            ctx.putImageData(imgData, 0, 0)
        }

        function handleSetPaletteMessage(msg: protocol.SetPaletteMessage) {
            console.log("set-palette")
        }

        function handleMessage(ev: MessageEvent) {
            const { data } = ev

            try {
                switch (data?.type) {
                    case "messagepacket":
                        return handleMessagePacket(ev.data)
                    case "stop":
                        return handleStopMessage(ev.data)
                    case "run":
                        // We can't rely on receiving a run message every time the
                        // simulator starts, so instead we restart the sim whenever
                        // we receive a message with a new runId from the extension.
                        return
                    case "debugger":
                        return
                    case "bulkserial":
                        return
                    case "stopsound":
                        return
                }
                console.log(`unknown message: ${JSON.stringify(data)}`)
            } catch (e) {
                console.error(e)
            }

            // TODO handle it
        }

        window.addEventListener("message", handleMessage)
        return () => window.removeEventListener("message", handleMessage)
    }, [])

    return (
        <div className={classList(css["shield-board"], css[`skin-${skin}`])}>
            <div
                className={classList(css["placeable"], css["screen-container"])}
            >
                <canvas className={css["screen-canvas"]} ref={setCanvasRef} />
            </div>
            <div
                className={classList(
                    css["placeable"],
                    css["gamepad-button"],
                    css["dpad-button"],
                    css["button-dpad-left"]
                )}
                tabIndex={1}
            />
            <div
                className={classList(
                    css["placeable"],
                    css["gamepad-button"],
                    css["dpad-button"],
                    css["button-dpad-up"]
                )}
                tabIndex={1}
            />
            <div
                className={classList(
                    css["placeable"],
                    css["gamepad-button"],
                    css["dpad-button"],
                    css["button-dpad-right"]
                )}
                tabIndex={1}
            />
            <div
                className={classList(
                    css["placeable"],
                    css["gamepad-button"],
                    css["dpad-button"],
                    css["button-dpad-down"]
                )}
                tabIndex={1}
            />
            <div
                className={classList(
                    css["placeable"],
                    css["gamepad-button"],
                    css["button-a"]
                )}
                tabIndex={1}
            />
            <div
                className={classList(
                    css["placeable"],
                    css["gamepad-button"],
                    css["button-b"]
                )}
                tabIndex={1}
            />
        </div>
    )
}
