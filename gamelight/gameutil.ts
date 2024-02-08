/**
 * Scene transitions and dialog
 **/
namespace scene {

    /**
     * Update the position and velocities of sprites
     * @param body code to execute
     */
    export function onUpdate(a: () => void): void {
        if (!a) return;
        scene.eventContext().registerFrameHandler(scene.UPDATE_PRIORITY, a);
    }

    /**
     * Run code on an interval of time. This executes before scene.onUpdate()
     * @param body code to execute
     */
    export function onUpdateInterval(period: number, a: () => void): void {
        if (!a || period < 0) return;
        let timer = 0;
        scene.eventContext().registerFrameHandler(scene.UPDATE_INTERVAL_PRIORITY, () => {
            const time = scene.currentScene().millis();
            if (timer <= time) {
                timer = time + period;
                a();
            }
        });
    }

    /**
     * Returns the time since the scene started in milliseconds
     */
    export function runtime(): number {
        return currentScene().millis();
    }
}
