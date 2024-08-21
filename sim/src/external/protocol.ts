// CONTENT BELOW COPIED FROM <root>/screen/sim/state.ts.
// Keep this in sync with that file.

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
