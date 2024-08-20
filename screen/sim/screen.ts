namespace pxsim.pxtcore {
    //% TD_NOOP
    export function updateScreen(img: RefImage) {
        const state = pxsim.getScreenState();
        if (state)
            state.showImage(img);
    }
    //% TD_NOOP
    export function updateStats(s: string) {
        const state = pxsim.getScreenState();
        if (state)
            state.updateStats(s);
    }
    //% TD_NOOP
    export function setPalette(b: RefBuffer) {
        const state = pxsim.getScreenState();
        if (state)
            state.setPalette(b);
    }
    //% TD_NOOP
    export function setScreenBrightness(b: number) {
        const state = pxsim.getScreenState();
        if (state)
            state.setScreenBrightness(b);
    }
    //% TD_NOOP
    export function displayHeight(): number {
        const state = pxsim.getScreenState();
        if (state)
            return state.displayHeight();
        return -1;
    }
    //% TD_NOOP
    export function displayWidth(): number {
        const state = pxsim.getScreenState();
        if (state)
            return state.displayWidth();
        return -1;
    }
    //% TD_NOOP
    export function displayPresent(): boolean {
        const state = pxsim.getScreenState();
        if (state)
            return state.displayPresent();
        return false;
    }
}
