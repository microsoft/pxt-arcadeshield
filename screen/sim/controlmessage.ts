interface SimulatorMessage {
    type: string;
    // who created this message
    source?: string;
}

declare namespace pxsim {
    class Runtime {
        static postMessage(data: SimulatorMessage): void;   
    }
}

namespace control {

    interface SimulatorControlMessage  {
        type: "messagepacket";
        broadcast: boolean;
        channel: string;
        data: Uint8Array;
    }

    // general purpose message sending mechanism
    export function sendMessage(channel: string, message: pxsim.RefBuffer, parentOnly?: boolean) {
        if (!channel) return;

        pxsim.Runtime.postMessage({
            type: "messagepacket",
            broadcast: !parentOnly,
            channel: channel,
            data: message && message.data
        } as SimulatorControlMessage)
    }
}
