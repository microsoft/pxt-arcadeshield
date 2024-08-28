import React, { useEffect, useRef, useState, useCallback } from "react"
import css from "@/styling/Shield.module.scss"
import { classList } from "@/util"
import { DEFAULT_WIDTH, DEFAULT_HEIGHT, DEFAULT_SKIN } from "@/constants"
import { useShieldService } from "@/hooks/useShieldService"
import { useKeyboard } from "@/hooks/useKeyboard"
import { ButtonId } from "@/types"

// Matches Arcade's default keyboard mapping
const keymap: { [key in ButtonId]: string[] } = {
    left: ["arrowleft", "a"],
    right: ["arrowright", "d"],
    up: ["arrowup", "w"],
    down: ["arrowdown", "s"],
    a: ["enter", "q"],
    b: [" ", "e"],
    menu: ['`'],
    restart: ["backspace"],
}

export const Shield: React.FC = () => {
    const [canvasRef, setCanvasRef] = React.useState<HTMLCanvasElement | null>(null)
    const activeButtons = useRef(new Set<ButtonId>())
    const [gen, setGen] = useState(0) // changes to this value trigger a component redraw

    // TEMP: Configure the canvas size to 160x128. Later, this will be passed in by the main simulator
    useEffect(() => {
        if (canvasRef) {
            canvasRef.width = DEFAULT_WIDTH
            canvasRef.height = DEFAULT_HEIGHT
        }
    }, [canvasRef])

    const onButtonDown = useCallback(
        (buttonId: ButtonId) => {
            //console.log(`button down: ${buttonId}`)
            activeButtons.current.add(buttonId)
            setGen(gen + 1)
        },
        [gen, setGen]
    )
    const onButtonUp = useCallback(
        (buttonId: ButtonId) => {
            //console.log(`button up: ${buttonId}`)
            activeButtons.current.delete(buttonId)
            setGen(gen + 1)
        },
        [gen, setGen]
    )
    const onButtonClick = useCallback(
        (buttonId: ButtonId) => {
            //console.log(`button click: ${buttonId}`)
            activeButtons.current.add(buttonId)
            setGen(gen + 1)
            setTimeout(() => activeButtons.current.delete(buttonId), 100)
        },
        [gen, setGen]
    )

    const onKeyDown = useCallback(
        (key: string) => {
            //console.log(`key down: ${key}`)
            for (const buttonId of Object.keys(keymap) as ButtonId[]) {
                const assignments = keymap[buttonId]
                if (assignments.includes(key)) {
                    onButtonDown(buttonId)
                    break
                }
            }
        },
        [onButtonDown]
    )
    const onKeyUp = useCallback(
        (key: string) => {
            //console.log(`key up: ${key}`)
            for (const buttonId of Object.keys(keymap) as ButtonId[]) {
                const assignments = keymap[buttonId]
                if (assignments.includes(key)) {
                    onButtonUp(buttonId)
                    break
                }
            }
        },
        [onButtonUp]
    )

    useShieldService(canvasRef)
    useKeyboard(onKeyDown, onKeyUp)

    return (
        <div className={classList(css["shield-board"], css[`skin-${DEFAULT_SKIN}`])}>
            <div className={classList(css["placeable"], css["screen-container"])}>
                <canvas className={css["screen-canvas"]} ref={setCanvasRef} />
            </div>
            <div
                className={classList(
                    css["placeable"],
                    css["gamepad-button"],
                    css["dpad-button"],
                    css["button-dpad-left"],
                    activeButtons.current.has("left") ? css["active"] : ""
                )}
                tabIndex={1}
                onMouseDown={() => onButtonDown("left")}
                onMouseUp={() => onButtonUp("left")}
            />
            <div
                className={classList(
                    css["placeable"],
                    css["gamepad-button"],
                    css["dpad-button"],
                    css["button-dpad-up"],
                    activeButtons.current.has("up") ? css["active"] : ""
                )}
                tabIndex={1}
                onMouseDown={() => onButtonDown("up")}
                onMouseUp={() => onButtonUp("up")}
            />
            <div
                className={classList(
                    css["placeable"],
                    css["gamepad-button"],
                    css["dpad-button"],
                    css["button-dpad-right"],
                    activeButtons.current.has("right") ? css["active"] : ""
                )}
                tabIndex={1}
                onMouseDown={() => onButtonDown("right")}
                onMouseUp={() => onButtonUp("right")}
            />
            <div
                className={classList(
                    css["placeable"],
                    css["gamepad-button"],
                    css["dpad-button"],
                    css["button-dpad-down"],
                    activeButtons.current.has("down") ? css["active"] : ""
                )}
                tabIndex={1}
                onMouseDown={() => onButtonDown("down")}
                onMouseUp={() => onButtonUp("down")}
            />
            <div
                className={classList(
                    css["placeable"],
                    css["gamepad-button"],
                    css["button-a"],
                    activeButtons.current.has("a") ? css["active"] : ""
                )}
                tabIndex={1}
                onMouseDown={() => onButtonDown("a")}
                onMouseUp={() => onButtonUp("a")}
            />
            <div
                className={classList(
                    css["placeable"],
                    css["gamepad-button"],
                    css["button-b"],
                    activeButtons.current.has("b") ? css["active"] : ""
                )}
                tabIndex={1}
                onMouseDown={() => onButtonDown("b")}
                onMouseUp={() => onButtonUp("b")}
            />
        </div>
    )
}
