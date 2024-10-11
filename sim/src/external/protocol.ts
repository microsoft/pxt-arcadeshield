// copied from screenhelpers.ts
// KEEP IN SYNC

export type ArcadeButtonId = "left" | "right" | "up" | "down" | "a" | "b" | "menu" | "power"

export interface ArcadeShieldMessage {
    type: "initialize" | "show-image" | "set-brightness" | "set-palette" | "button-down" | "button-up" | "display-on" | "display-off"
    runId: any
}
export interface ShowImageMessage extends ArcadeShieldMessage {
    type: "show-image"
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

export interface ButtonMessage extends ArcadeShieldMessage {
    type: "button-down" | "button-up"
    buttonId: ArcadeButtonId
}

export interface DisplayMessage extends ArcadeShieldMessage {
    type: "display-on" | "display-off"
}