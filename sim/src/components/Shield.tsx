import React, { useEffect } from "react"
import css from "@/styling/Shield.module.scss"
import { classList } from "@/util"
import { stateAndDispatch } from "@/state/Context"
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

export const Shield: React.FC = () => {
    const { state } = stateAndDispatch();
    const { skin } = state;

    const [canvasRef, setCanvasRef] = React.useState<HTMLCanvasElement | null>(null);

    // TEMP: Set the canvas size to 160x128
    useEffect(() => {
        if (canvasRef) {
            canvasRef.width = 160;
            canvasRef.height = 128;
        }
    }, [canvasRef]);

    // TESt: Draw registration marks on the canvas

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


    // Mount a window event listener to handle keyboard events
    useEffect(() => {
        const handleKeyDown = (ev: KeyboardEvent) => {
            const { key } = ev;
            // TODO handle it
        }
        const handleKeyUp = (ev: KeyboardEvent) => {
            const { key } = ev;
            // TODO handle it
        }
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        }
    }, []);

    // Mount a window event listener to handle message events from parent window
    useEffect(() => {
        function handleStopMessage(msg: any) {
            //transforms.setRunning(false)
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
                //transforms.setRunning(true)
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
            console.log("show-image");
        }

        function handleSetPaletteMessage(msg: protocol.SetPaletteMessage) {
            console.log("set-palette");
        }


        function handleMessage(ev: MessageEvent) {
            const { data } = ev;

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

            // TODO handle it
        }

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    return (
        <div className={classList(css["shield-board"], css[`skin-${skin}`])}>
            <div className={classList(css["placeable"], css["screen-container"])}>
                <canvas className={css["screen-canvas"]} ref={setCanvasRef} />
            </div>
            <div className={classList(css["placeable"], css["gamepad-button"], css["dpad-button"], css["button-dpad-left"])} tabIndex={1} />
            <div className={classList(css["placeable"], css["gamepad-button"], css["dpad-button"], css["button-dpad-up"])} tabIndex={1} />
            <div className={classList(css["placeable"], css["gamepad-button"], css["dpad-button"], css["button-dpad-right"])} tabIndex={1} />
            <div className={classList(css["placeable"], css["gamepad-button"], css["dpad-button"], css["button-dpad-down"])} tabIndex={1} />
            <div className={classList(css["placeable"], css["gamepad-button"], css["button-a"])} tabIndex={1} />
            <div className={classList(css["placeable"], css["gamepad-button"], css["button-b"])} tabIndex={1} />
        </div>
    )
}
