type ActionBase = {
    type: string
}

export type SetRunning_Action = ActionBase & {
    type: "SET_RUNNING"
    running: boolean
}

export type SetSkin_Action = ActionBase & {
    type: "SET_SKIN"
    skin: string
}

export type Action = SetRunning_Action | SetSkin_Action

export const setRunningAction = (running: boolean): SetRunning_Action => ({
    type: "SET_RUNNING",
    running,
})

export const setSkinAction = (skin: string): SetSkin_Action => ({
    type: "SET_SKIN",
    skin,
})
