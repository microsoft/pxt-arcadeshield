namespace pxsim.arcadeshield {
    namespace _protocol {
        export interface ArcadeShieldMessage {
            type: "set-screen-buffer" | "set-brightness" | "set-palette"
            runId: string
        }
        export interface SetScreenBufferMessage extends ArcadeShieldMessage {
            type: "set-screen-buffer"
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
        screenBuffer: RefImage;

        constructor() {
            this.runId = Math.random() + "";
        }

        setScreenBrightness(b: number) {
            const msg: _protocol.SetBrightnessMessage = {
                type: "set-brightness",
                runId: this.runId,
                value: b
            }
            control.simmessages.send("arcadeshield", Buffer.fromUTF8(JSON.stringify(msg)), false)
        }

        setPalette(buf: RefBuffer) {
            const msg: _protocol.SetPaletteMessage = {
                type: "set-palette",
                runId: this.runId,
                data: buf.data.toString()
            }
            control.simmessages.send("arcadeshield", Buffer.fromUTF8(JSON.stringify(msg)), false)
        }

        updateStats(s: string) {
            // Ignore
        }

        showImage(img: RefImage) {
            const msg: _protocol.SetScreenBufferMessage = {
                type: "set-screen-buffer",
                runId: this.runId,
                data: img.data.toString()
            }
            control.simmessages.send("arcadeshield", Buffer.fromUTF8(JSON.stringify(msg)), false)
        }
    }

    //% whenUsed
    const _screenState: ScreenState = new ScreenState();

    //% shim=TD_NOOP
    export function getScreenState(): ScreenState {
        return _screenState;
    }
}
