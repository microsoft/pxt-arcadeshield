namespace screen {
    export function updateScreen(img: pxsim.RefImage) {
        const state = screen.getScreenState();
        if (state)
            state.showImage(img);
    }
    export function updateStats(s: string) {
        const state = screen.getScreenState();
        if (state)
            state.updateStats(s);
    }
    export function setPalette(b: pxsim.RefBuffer) {
        const state = screen.getScreenState();
        if (state)
            state.setPalette(b);
    }
    export function setScreenBrightness(b: number) {
        const state = screen.getScreenState();
        if (state)
            state.setScreenBrightness(b);
    }
    export function displayHeight(): number {
        const state = screen.getScreenState();
        if (state)
            return state.displayHeight();
        return -1;
    }
    export function displayWidth(): number {
        const state = screen.getScreenState();
        if (state)
            return state.displayWidth();
        return -1;
    }
    export function displayPresent(): boolean {
        const state = screen.getScreenState();
        if (state)
            return state.displayPresent();
        return false;
    }
}
