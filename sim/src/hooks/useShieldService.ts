import { useEffect } from "react"
import * as protocol from "@/external/protocol"

function postMessage(msg: protocol.ArcadeShieldMessage) {
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

const palette = new Uint32Array(16)
let currRunId: any
let _imgData: ImageData | undefined

function tmpImageBuffer(width: number, height: number): ImageData {
    if (_imgData && (_imgData.width !== width || _imgData.height !== height)) {
        _imgData = undefined
    }
    if (!_imgData) {
        _imgData = new ImageData(width, height)
    }
    return _imgData
}

export function useShieldService(canvasRef: HTMLCanvasElement | null) {
    // Mount a window event listener to handle message events from parent window
    useEffect(() => {
        function handleStopMessage(msg: any) {}

        function handleMessagePacket(msg: any) {
            const srcFrameIndex = (msg.srcFrameIndex as number) ?? -1
            switch (msg.channel) {
                case "arcadeshield":
                    return handleShieldMessage(msg.data, srcFrameIndex)
                case "jacdac":
                    return
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
                    return handleShowImageMessage(msg as protocol.ShowImageMessage)
                case "set-brightness":
                    return
                case "set-palette":
                    return handleSetPaletteMessage(msg as protocol.SetPaletteMessage)
                default:
                    console.log(`unknown arcadeshield message: ${JSON.stringify(msg)}`)
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
                console.error(`expected image buffer size ${expectedSize}, got ${buf.length}`)
                return
            }
            // Create an image data object from the buffer. the buffer is a 1d array of color indices.
            const imgData = tmpImageBuffer(canvasRef.width, canvasRef.height)
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
            const { data } = msg
            // convert image data from base 64 to buffer
            const buf = Uint8Array.from(atob(data), (c) => c.charCodeAt(0))
            // Ensure buffer size is correct
            const expectedSize = 16 * 3   // 16 colors, 3 bytes per color
            if (buf.length !== expectedSize) {
                console.error(`expected image buffer size ${expectedSize}, got ${buf.length}`)
                return
            }
            for (let i = 0; i < 16; i++) {
                const r = buf[i * 3 + 0]
                const g = buf[i * 3 + 1]
                const b = buf[i * 3 + 2]
                palette[i] = (r << 16) | (g << 8) | b
            }
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
        }

        window.addEventListener("message", handleMessage)
        return () => window.removeEventListener("message", handleMessage)
    }, [canvasRef])
}
