import React from "react"
import css from "@/styling/Shield.module.scss"
import { classList } from "@/util"
import { stateAndDispatch } from "@/state/Context"

export const Shield: React.FC = () => {
    const { state } = stateAndDispatch();
    const { skin } = state;

    return (
        <div className={classList(css["shield-board"], css[`skin-${skin}`])}>
            <div className={css["screen-container"]}>
                <canvas className={css["screen-canvas"]} />
            </div>
            <div className={classList(css["gamepad-button"], css["button-dpad-left"])} tabIndex={1} />
            <div className={classList(css["gamepad-button"], css["button-dpad-up"])} tabIndex={1} />
            <div className={classList(css["gamepad-button"], css["button-dpad-right"])} tabIndex={1} />
            <div className={classList(css["gamepad-button"], css["button-dpad-down"])} tabIndex={1} />
            <div className={classList(css["gamepad-button"], css["button-a"])} tabIndex={1} />
            <div className={classList(css["gamepad-button"], css["button-b"])} tabIndex={1} />
        </div>
    )
}
