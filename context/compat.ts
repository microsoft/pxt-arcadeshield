namespace scene.systemMenu {
    export function isVisible() {
        return false
    }
}

namespace power {
    export function poke() {}
}

namespace scene {
    export const SCREEN_CLEAR_PRIORITY = 1;
    export const UPDATE_INTERVAL_PRIORITY = 19;
    export const UPDATE_PRIORITY = 20;

    export const PRE_RENDER_UPDATE_PRIORITY = 55;
    export const RENDER_BACKGROUND_PRIORITY = 60;
    export const RENDER_SPRITES_PRIORITY = 90;
    export const RENDER_DIAGNOSTICS_PRIORITY = 150;
    export const UPDATE_SCREEN_PRIORITY = 200;
}

class Scene {
    millis() {
        return control.millis()
    }

    constructor() {
        this.buttonEventHandlers = []
    }

    buttonEventHandlers: controller.ButtonEventHandlerState[];
}

namespace scene {
    export let stats = false;
    let inited = false

    const _scene = new Scene()
    export function currentScene() {
        return _scene
    }

    export function pushScene() {
        const ctx = context.pushEventContext()
        ctx.registerFrameHandler(scene.RENDER_BACKGROUND_PRIORITY, () => {
            theScreen.fill(0)
        });
        ctx.registerFrameHandler(scene.UPDATE_SCREEN_PRIORITY, control.__screen.update);
    }

    export function popScene() {
        context.popEventContext()
    }

    export function eventContext() {
        if (!inited) {
            inited = true
            pushScene()
        }
        return context.eventContext()
    }

    let __waitAnyButton: () => void;
    export function setWaitAnyButton(f: () => void) {
        __waitAnyButton = f
    }

    export function onPaint(a: () => void): void {
        if (!a) return;
        context.eventContext().registerFrameHandler(scene.RENDER_SPRITES_PRIORITY - 1, a);
    }

    export function onShade(a: () => void): void {
        if (!a) return;
        context.eventContext().registerFrameHandler(scene.RENDER_SPRITES_PRIORITY, a);
    }

}

namespace controller {
    export function _player1() {
        return new Controller(1, undefined)
    }
    export class Controller {
        constructor(no: number, v: any) { }
        connected: boolean
    }
}
