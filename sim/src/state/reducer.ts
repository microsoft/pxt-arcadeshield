import { AppState } from "./state"
import { Action } from "./actions"

export const reducer = (state: AppState, action: Action): AppState => {
    switch (action.type) {
        case "SET_RUNNING":
            return {
                ...state,
                running: action.running,
            }
    }
}
