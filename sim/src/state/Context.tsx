import React, { createContext, useReducer, useEffect } from "react"
import { AppState, initialState } from "@/state/state"
import { reducer } from "@/state/reducer"
import { Action } from "@/state/actions"

let state: AppState
let dispatch: React.Dispatch<Action>

let initializationComplete: () => void

// This promise will resolve when the app state is initialized and available outside the React context.
export const AppStateReady: Promise<boolean> = new Promise((resolve) => {
    initializationComplete = () => resolve(true)
})

// Never cache `state` and `dispatch`. They can and will be updated frequently.
// eslint-disable-next-line react-refresh/only-export-components
export function stateAndDispatch() {
    if (!(state && dispatch)) throw new Error("AppStateContext not ready")
    return { state, dispatch }
}

type AppStateContextProps = {
    state: AppState
    dispatch: React.Dispatch<Action>
}

const initialAppStateContextProps: AppStateContextProps = {
    state: undefined!,
    dispatch: undefined!,
}

export const AppStateContext = createContext<AppStateContextProps>(
    initialAppStateContextProps
)

// Here it would be appropriate to read the URL parameters and set the initial state accordingly

const _initialState: AppState = {
    ...initialState,
}

export function AppStateProvider(
    props: React.PropsWithChildren<{}>
): React.ReactElement {
    // Create the application state and state change mechanism (dispatch)
    const [state_, dispatch_] = useReducer(reducer, _initialState)

    // Make state and dispatch available outside the React context
    useEffect(() => {
        state = state_
        dispatch = dispatch_
        initializationComplete()
    }, [state_, dispatch_])

    return (
        // Provide current state and dispatch mechanism to all child components
        <AppStateContext.Provider
            value={{
                state: state_,
                dispatch: dispatch_,
            }}
        >
            {props.children}
        </AppStateContext.Provider>
    )
}
