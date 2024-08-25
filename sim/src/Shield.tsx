import React from "react"
import "./App.css"

export const Shield: React.FC = () => {
    return (
        <div className={"shield-board"}>
            <div className={"shield-screen-container"}>
                <canvas className={"shield-screen-canvas"} />
            </div>
            <div className={"shield-dpad-buttons-container"}>
                <button className={"shield-button-up"}>↑</button>
                <button className={"shield-button-left"}>←</button>
                <button className={"shield-button-right"}>→</button>
                <button className={"shield-button-down"}>↓</button>
            </div>
            <div className={"shield-ab-buttons-container"}>
                <button className={"shield-button-a"}>A</button>
                <button className={"shield-button-b"}>B</button>
            </div>
        </div>
    )
}
