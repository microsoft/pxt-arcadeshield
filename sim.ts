namespace shield.sim {
    // shim=TD_NOOP
    export function sendSim() {

    }

    export function handleShieldMessage(b: Buffer) {
        const s = b.toString()
        const msg = JSON.parse(s) as protocol.ArcadeShieldMessage
        if (msg) {

        }
    }
}

// shim=TD_NOOP
export function registerSim() {
    const dev = shield.device.instance();
    dev.setDriver(shield.drivers.ShieldType.SIM);
    control.simmessages.onReceivedMessage = shield.sim.handleShieldMessage;
}

registerSim();
