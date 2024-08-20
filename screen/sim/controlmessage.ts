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
    export function sendMessage(channel: string, message: string, parentOnly?: boolean) {
        if (!channel) return;

        const buf = Uint8Array.from(message.split("").map(x => x.charCodeAt(0)))

        pxsim.Runtime.postMessage({
            type: "messagepacket",
            broadcast: !parentOnly,
            channel: channel,
            data: buf
        } as SimulatorControlMessage)
    }
}
