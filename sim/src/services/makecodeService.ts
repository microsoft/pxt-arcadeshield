import * as protocol from "@/external/protocol"
import * as transforms from "@/state/transforms"

let currRunId = ""

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

function handleStopMessage(msg: any) {
    transforms.setRunning(false)
}

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
        transforms.setRunning(true)
    }

    switch (msg.type) {
        case "set-screen-buffer":
            return handleScreenMessage(msg as protocol.SetScreenBufferMessage)
        case "set-brightness":
            return
        case "set-palette":
            return
        case "update-stats":
            return;
        default:
            console.log(`unknown arcadeshield message: ${JSON.stringify(msg)}`)
    }
}

function handleScreenMessage(msg: protocol.ScreenBufferMessage) {}

export function init() {
    window.addEventListener("message", (ev) => {
        if (ev.data?.source?.startsWith("react-devtools")) return

        try {
            switch (ev.data?.type) {
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
            console.log(`unknown message: ${JSON.stringify(ev.data)}`)
        } catch (e) {
            console.error(e)
        }
    })
}
