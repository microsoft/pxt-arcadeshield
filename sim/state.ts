namespace pxsim {
    namespace _protocol {
        export interface ArcadeShieldMessage {
            type: "show-image" | "set-brightness" | "set-palette"
            runId: string
        }
        export interface ShowImageMessage extends ArcadeShieldMessage {
            type: "show-image"
            data: string
        }     
        export interface SetBrightnessMessage extends ArcadeShieldMessage {
            type: "set-brightness"
            value: number
        }
        export interface SetPaletteMessage extends ArcadeShieldMessage {
            type: "set-palette"
            data: string
        }
    }

    //% fixedInstance
    class ScreenState {
        runId: string;
        brightness: number;

        constructor() {
            this.runId = Math.random() + "";
        }

        bpp(): number {
            return 4; // TODO: Do we need to support legacy 2bpp mode?
        }

        displayHeight(): number {
            return 128;
        }

        displayWidth(): number {
            return 160;
        }

        displayPresent(): boolean {
            return true;
        }

        private sendMessage(msg: string) {
            let encoder = new TextEncoder();
            let buf = encoder.encode(msg)
            let fullmsg = {
                type: "messagepacket",
                broadcast: false,
                channel: "arcadeshield",
                data: buf
            }
            //control.simmessages.send("jacdac", JSON.stringify(fullmsg) payload, false)
        }

        setScreenBrightness(b: number) {
            // NOTE: May need to cache locally for querying
            const msg: _protocol.SetBrightnessMessage = {
                type: "set-brightness",
                runId: this.runId,
                value: b
            }
            this.sendMessage(JSON.stringify(msg))
        }

        setPalette(buf: Buffer) {
            // NOTE: May need to cache locally for querying
            const msg: _protocol.SetPaletteMessage = {
                type: "set-palette",
                runId: this.runId,
                data: null //buf.data.toString()
            }
            this.sendMessage(JSON.stringify(msg))
        }

        updateStats(s: string) {
            // Ignore
        }

        showImage(img: Bitmap) {
            // NOTE: May need to cache locally for querying
            const msg: _protocol.ShowImageMessage = {
                type: "show-image",
                runId: this.runId,
                data: img.data.toString()
            }
            this.sendMessage(JSON.stringify(msg))
        }
    }

    const _screenState: ScreenState = new ScreenState();

    export function getScreenState(): ScreenState {
        return _screenState;
    }
}

namespace pxsim {
    export function updateScreen(img: Bitmap) {
        const state = getScreenState();
        if (state)
            state.showImage(img);
    }
    export function updateStats(s: string) {
        const state = getScreenState();
        if (state)
            state.updateStats(s);
    }
    export function setPalette(b: Buffer) {
        const state = getScreenState();
        if (state)
            state.setPalette(b);
    }
    export function setScreenBrightness(b: number) {
        const state = getScreenState();
        if (state)
            state.setScreenBrightness(b);
    }
    export function displayHeight(): number {
        const state = getScreenState();
        if (state)
            return state.displayHeight();
        return -1;
    }
    export function displayWidth(): number {
        const state = getScreenState();
        if (state)
            return state.displayWidth();
        return -1;
    }
    export function displayPresent(): boolean {
        const state = getScreenState();
        if (state)
            return state.displayPresent();
        return false;
    }
}
