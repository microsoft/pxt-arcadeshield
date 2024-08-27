type ActionBase = {
    type: string
}

export type SetSkin_Action = ActionBase & {
    type: "SET_SKIN"
    skin: string
}

export type Action = SetSkin_Action

export const setSkinAction = (skin: string): SetSkin_Action => ({
    type: "SET_SKIN",
    skin,
})
