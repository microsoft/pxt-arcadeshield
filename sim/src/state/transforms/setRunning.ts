import * as actions from "@/state/actions"
import { stateAndDispatch } from "@/state/Context"

export function setRunning(running: boolean) {
    const { dispatch } = stateAndDispatch()
    dispatch(actions.setRunningAction(running))
}
