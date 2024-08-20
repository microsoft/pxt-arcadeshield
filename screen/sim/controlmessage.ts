namespace pxsim.pxtcore {
    
    interface SimulatorControlMessage  {
        type: "messagepacket";
        broadcast: boolean;
        channel: string;
        data: Uint8Array;
    }

    // general purpose message sending mechanism
    export function sendMessage(channel: string, message: RefBuffer, parentOnly?: boolean) {
        if (!channel) return;

        Runtime.postMessage({
            type: "messagepacket",
            broadcast: !parentOnly,
            channel: channel,
            data: message && message.data
        } as SimulatorControlMessage)
    }
}
