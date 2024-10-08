namespace screenhelpers {
    type ArcadeButtonId = "left" | "right" | "up" | "down" | "a" | "b" | "menu"

    interface ArcadeShieldMessage {
        type: "show-image" | "set-brightness" | "set-palette" | "button-down" | "button-up"
        runId: any
    }
    interface ShowImageMessage extends ArcadeShieldMessage {
        type: "show-image"
        data: string
    }
    interface SetBrightnessMessage extends ArcadeShieldMessage {
        type: "set-brightness"
        value: number
    }
    interface SetPaletteMessage extends ArcadeShieldMessage {
        type: "set-palette"
        data: string
    }

    interface ButtonMessage extends ArcadeShieldMessage {
        type: "button-down" | "button-up"
        buttonId: ArcadeButtonId
    }

    class ScreenState {
        runId: string;
        brightness: number;

        constructor() {
            this.runId = Math.random() + "";
        }

        displayHeight(): number {
            return 120;
        }

        displayWidth(): number {
            return 160;
        }

        displayPresent(): boolean {
            return true;
        }

        private sendMessage(msg: string) {
            control.simmessages.send("arcadeshield", Buffer.fromUTF8(msg) , false)
        }

        setScreenBrightness(b: number) {
            // NOTE: May need to cache locally for querying
            const msg: SetBrightnessMessage = {
                type: "set-brightness",
                runId: this.runId,
                value: b
            }
            this.sendMessage(JSON.stringify(msg))
        }

        setPalette(buf: Buffer) {
            // NOTE: May need to cache locally for querying
            const msg: SetPaletteMessage = {
                type: "set-palette",
                runId: this.runId,
                data: buf.toBase64()
            }
            this.sendMessage(JSON.stringify(msg))
        }

        showImage(img: Bitmap) {
            // NOTE: May need to cache locally for querying
            const msg: ShowImageMessage = {
                type: "show-image",
                runId: this.runId,
                data: img.__buffer.toBase64()
            }
            this.sendMessage(JSON.stringify(msg))
        }
    }

    let _screenState: ScreenState = null;

    function getScreenState() {
        if (_screenState) _screenState;
        _screenState = new ScreenState();
    }

    //% shim=TD_NOOP
    function simUpdateScreen(img: Bitmap) {
        getScreenState();
        if (_screenState)
            _screenState.showImage(img);        
    }

    export function updateScreen(img: Bitmap) {
        __screenhelpers.updateScreen(img)
        simUpdateScreen(img)
    }

    //% shim=TD_NOOP    
    function simSetPalette(b: Buffer) {
        getScreenState();
        if (_screenState)
            _screenState.setPalette(b);
    }

    export function setPalette(b: Buffer) {
        __screenhelpers.setPalette(b)
        simSetPalette(b)
    }

    //% shim=TD_NOOP   
    function simSetScreenBrightness(n: number) {
        getScreenState();
        if (_screenState)
            _screenState.setScreenBrightness(n);
    }

    export function setScreenBrightness(n: number) {
        __screenhelpers.setScreenBrightness(n)
        simSetScreenBrightness(n)
    }

    // getters

    let __height = 0
    
    //% shim=TD_NOOP
    function simDisplayHeight() {
        __height = 120
        getScreenState();
        if (_screenState)
            __height = _screenState.displayHeight();
    }
    
    export function displayHeight(): number {
        __height = __screenhelpers.displayHeight()
        simDisplayHeight()
        return __height
    }

    let __width = 0
    
    //% shim=TD_NOOP
    function simDisplayWidth() {
        __width = 160
        getScreenState();
        if (_screenState)
            __width = _screenState.displayWidth();
    }

    export function displayWidth(): number {
        __width = __screenhelpers.displayWidth()
        simDisplayWidth()
        return __width
    }

    let __present = true
    
    //% shim=TD_NOOP
    function simDisplayPresent() {
        __present = true
        getScreenState();
        if (_screenState)
            __present = _screenState.displayPresent();
    }

    export function displayPresent(): boolean {
        __present = __screenhelpers.displayPresent()
        simDisplayPresent()
        return __present
    }

    function getButton(id: ArcadeButtonId): controller.Button {
        switch (id) {
            case "left": return controller.left
            case "right": return controller.right
            case "up": return controller.up
            case "down": return controller.down
            case "a": return controller.A
            case "b": return controller.B
            case "menu": return controller.menu
        }
        return null
    }

    function handleShieldMessage(b: Buffer) {
        const s = b.toString()
        const msg = <ArcadeShieldMessage>JSON.parse(s)
        if (msg && (msg.type === "button-down" || msg.type === "button-up")) {
            const button = getButton((<ButtonMessage>msg).buttonId)
            if (button) {
                if (msg.type === "button-down") {
                    button.raiseButtonDown()
                } else {
                    button.raiseButtonUp()
                }
            }
        }
    }

    /**
     * Register simulator to get button presses
     */
    //% shim=TD_NOOP
    export function registerSim() {
        control.simmessages.onReceived("arcadeshield", handleShieldMessage)
    }
}

screenhelpers.registerSim()