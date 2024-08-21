type ActionBase = {
    type: string
}

export type SetRunning_Action = ActionBase & {
    type: "SET_RUNNING"
    running: boolean
}

export type Action = SetRunning_Action

export const setRunningAction = (running: boolean): SetRunning_Action => ({
    type: "SET_RUNNING",
    running,
})
