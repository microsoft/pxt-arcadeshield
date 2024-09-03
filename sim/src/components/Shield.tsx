import React, { useEffect, useRef, useState } from "react"
import css from "@/styling/Shield.module.scss"
import { classList } from "@/util"
import { DEFAULT_WIDTH, DEFAULT_HEIGHT, DEFAULT_SKIN } from "@/constants"
import { useShieldService } from "@/hooks/useShieldService"
import { useKeyboard } from "@/hooks/useKeyboard"
import { useWindowFocus } from "@/hooks/useWindowFocus"
import { ButtonId } from "@/types"
import { ReactSVG } from "react-svg"

type ButtonElements = {
    activeEffect: SVGElement | null
    hoverEffect: SVGElement | null
    button: SVGElement | null
}

function hookShieldButton(
    svg: SVGElement | null,
    buttonId: ButtonId,
    onButtonDown: (buttonId: ButtonId) => void,
    onButtonUp: (buttonId: ButtonId) => void
): ButtonElements | undefined {
    if (!svg) {
        return undefined
    }
    const activeEffect = svg.querySelector(`#button-${buttonId}-active`) as SVGElement
    if (activeEffect) {
        activeEffect.style.display = "none"
    }
    const hoverEffect = svg.querySelector(`#button-${buttonId}-focus`) as SVGElement
    if (hoverEffect) {
        hoverEffect.style.display = "none"
    }
    const showActiveEffect = () => {
        if (activeEffect) {
            activeEffect.style.display = "block"
        }
    }
    const hideActiveEffect = () => {
        if (activeEffect) {
            activeEffect.style.display = "none"
        }
    }
    const showHoverEffect = () => {
        if (hoverEffect) {
            hoverEffect.style.display = "block"
        }
    }
    const hideHoverEffect = () => {
        if (hoverEffect) {
            hoverEffect.style.display = "none"
        }
    }
    const mouseEnter = () => {
        showHoverEffect()
        hideActiveEffect()
    }
    const mouseLeave = () => {
        hideHoverEffect()
        hideActiveEffect()
    }
    const mouseDown = () => {
        showActiveEffect()
        onButtonDown(buttonId)
    }
    const mouseUp = () => {
        hideActiveEffect()
        onButtonUp(buttonId)
    }

    const button = svg.querySelector(`#button-${buttonId}`) as SVGElement
    if (button) {
        button.addEventListener("mouseenter", mouseEnter)
        button.addEventListener("mouseleave", mouseLeave)
        button.addEventListener("mousedown", mouseDown)
        button.addEventListener("mouseup", mouseUp)
        button.style.cursor = "pointer"
    }

    return {
        activeEffect,
        hoverEffect,
        button,
    }
}

const keymap: { [key in ButtonId]: string[] } = {
    left: ["arrowleft"],
    right: ["arrowright"],
    up: ["arrowup"],
    down: ["arrowdown"],
    a: ["a"],
    b: ["b"],
    menu: ["`"],
    restart: ["backspace"],
}

function postMessagePacket(msg: any) {
    const payload = new TextEncoder().encode(JSON.stringify(msg))
    window.parent.postMessage(
        {
            type: "messagepacket",
            channel: "arcadeshield",
            data: payload,
        },
        "*"
    )

export const Shield: React.FC = () => {
    const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null)
    const skinRef = useRef<SVGElement | null>(null)
    const buttonElements = useRef<{ [key in ButtonId]: ButtonElements | undefined }>({
        left: undefined,
        right: undefined,
        up: undefined,
        down: undefined,
        a: undefined,
        b: undefined,
        menu: undefined,
        restart: undefined,
    })

    // TEMP: Configure the canvas size to 160x128. Later, this will be passed in by the main simulator
    useEffect(() => {
        if (canvasRef) {
            canvasRef.width = DEFAULT_WIDTH
            canvasRef.height = DEFAULT_HEIGHT
        }
    }, [canvasRef])

    const onButtonDown = (buttonId: ButtonId): boolean => {
        return true
    }
    const onButtonUp = (buttonId: ButtonId): boolean => {
        return true
    }
    const onKeyDown = (key: string): boolean => {
        //console.log(`key down: ${key}`)
        for (const buttonId of Object.keys(keymap) as ButtonId[]) {
            const assignments = keymap[buttonId]
            if (assignments.includes(key)) {
                const elems = buttonElements.current[buttonId]
                if (elems?.activeEffect) {
                    elems.activeEffect.style.display = "block"
                }
                return onButtonDown(buttonId)
            }
        }
        return false
    }
    const onKeyUp = (key: string): boolean => {
        //console.log(`key up: ${key}`)
        for (const buttonId of Object.keys(keymap) as ButtonId[]) {
            const assignments = keymap[buttonId]
            if (assignments.includes(key)) {
                const elems = buttonElements.current[buttonId]
                if (elems?.activeEffect) {
                    elems.activeEffect.style.display = "none"
                }
                return onButtonUp(buttonId)
            }
        }
        return false
    }

    useShieldService(canvasRef)
    useKeyboard(onKeyDown, onKeyUp)
    const focused = useWindowFocus()

    const afterSkinInjection = (svg: SVGElement) => {
        // TODO: unregister previous skin's event listeners
        skinRef.current = svg
        buttonElements.current["left"] = hookShieldButton(skinRef.current, "left", onButtonDown, onButtonUp)
        buttonElements.current["right"] = hookShieldButton(skinRef.current, "right", onButtonDown, onButtonUp)
        buttonElements.current["up"] = hookShieldButton(skinRef.current, "up", onButtonDown, onButtonUp)
        buttonElements.current["down"] = hookShieldButton(skinRef.current, "down", onButtonDown, onButtonUp)
        buttonElements.current["a"] = hookShieldButton(skinRef.current, "a", onButtonDown, onButtonUp)
        buttonElements.current["b"] = hookShieldButton(skinRef.current, "b", onButtonDown, onButtonUp)
        buttonElements.current["menu"] = hookShieldButton(skinRef.current, "menu", onButtonDown, onButtonUp)
        buttonElements.current["restart"] = hookShieldButton(skinRef.current, "restart", onButtonDown, onButtonUp)
    }

    return (
        <div className={classList(css["shield-board"], css[`skin-${DEFAULT_SKIN}`])}>
            <ReactSVG
                src={`assets/${DEFAULT_SKIN}.svg`}
                className={classList(css["shield-svg"], focused ? css[""] : css["unfocused"])}
                afterInjection={afterSkinInjection}
            />
            <div className={css["screen-container"]}>
                <canvas className={css["screen-canvas"]} ref={setCanvasRef} />
            </div>
        </div>
    )
}
