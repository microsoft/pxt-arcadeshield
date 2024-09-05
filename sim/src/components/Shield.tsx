import React, { useEffect, useRef, useState } from "react"
import css from "@/styling/Shield.module.scss"
import { classList } from "@/util"
import { DEFAULT_WIDTH, DEFAULT_HEIGHT, DEFAULT_SKIN } from "@/constants"
import { useShieldService } from "@/hooks/useShieldService"
import { useKeyboard } from "@/hooks/useKeyboard"
import { useWindowFocus } from "@/hooks/useWindowFocus"
import { ArcadeButtonId } from "@/external/protocol"
import { ReactSVG } from "react-svg"

type ButtonElements = {
    activeEffect?: SVGElement
    hoverEffect?: SVGElement
    button?: SVGElement
}

function showElement(el?: HTMLElement | SVGElement) {
    if (el) {
        el.style.display = "block"
    }
}
function hideElement(el?: HTMLElement | SVGElement) {
    if (el) {
        el.style.display = "none"
    }
}
function setElementVisibility(el: HTMLElement | SVGElement, visible: boolean) {
    if (visible) showElement(el)
    else hideElement(el)
}

const keymap: { [key in ArcadeButtonId]: string[] } = {
    left: ["arrowleft"],
    right: ["arrowright"],
    up: ["arrowup"],
    down: ["arrowdown"],
    a: ["a", "enter"],
    b: ["b", "backspace"],
    menu: ["`"],
    restart: [],
    power: ["p"],
}

function postMessagePacket(msg: any) {
    const payload = new TextEncoder().encode(JSON.stringify(msg))
    // console.log(msg)
    window.parent.postMessage(
        {
            type: "messagepacket",
            channel: "arcadeshield",
            data: payload,
        },
        "*"
    )
}

export const Shield: React.FC = () => {
    const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null)
    const [isPowered, setIsPowered] = useState<boolean>(true)
    const skinRef = useRef<SVGElement | null>(null)
    const buttonElements = useRef<{ [key in ArcadeButtonId]: ButtonElements | undefined }>({
        left: undefined,
        right: undefined,
        up: undefined,
        down: undefined,
        a: undefined,
        b: undefined,
        menu: undefined,
        restart: undefined,
        power: undefined,
    })

    // TEMP: Configure the canvas size to 160x128. Later, this will be passed in by the main simulator
    useEffect(() => {
        if (canvasRef) {
            canvasRef.width = DEFAULT_WIDTH
            canvasRef.height = DEFAULT_HEIGHT
        }
    }, [canvasRef])

    const onButtonDown = (buttonId: ArcadeButtonId): boolean => {
        postMessagePacket({ type: "button-down", buttonId })
        return true
    }
    const onButtonUp = (buttonId: ArcadeButtonId): boolean => {
        postMessagePacket({ type: "button-up", buttonId })
        return true
    }
    const onPoweredChanged = (powered: boolean) => {
        setIsPowered(powered)
        // TODO: Send device present event to extension
    }
    const onKeyDown = (key: string): boolean => {
        if (!isPowered) return false
        for (const buttonId of Object.keys(keymap) as ArcadeButtonId[]) {
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
        if (!isPowered) return false
        for (const buttonId of Object.keys(keymap) as ArcadeButtonId[]) {
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

    function hookShieldButton(svg: SVGElement, buttonId: ArcadeButtonId): ButtonElements | undefined {
        const activeEffect = svg.querySelector(`#button-${buttonId}-active`) as SVGElement
        const hoverEffect = svg.querySelector(`#button-${buttonId}-focus`) as SVGElement
        hideElement(activeEffect)
        hideElement(hoverEffect)
        const mouseEnter = () => {
            showElement(hoverEffect)
            hideElement(activeEffect)
        }
        const mouseLeave = () => {
            hideElement(hoverEffect)
            hideElement(activeEffect)
        }
        const mouseDown = () => {
            if (isPowered) {
                showElement(activeEffect)
                onButtonDown(buttonId)
            }
        }
        const mouseUp = () => {
            hideElement(activeEffect)
            if (isPowered) {
                onButtonUp(buttonId)
            }
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

    function hookPowerButton(svg: SVGElement): ButtonElements | undefined {
        const buttonId = "power"
        const poweredEffect = svg.querySelector(`#button-${buttonId}-on`) as SVGElement
        const hoverEffect = svg.querySelector(`#button-${buttonId}-focus`) as SVGElement
        setElementVisibility(poweredEffect, isPowered)
        const mouseEnter = () => {
            showElement(hoverEffect)
        }
        const mouseLeave = () => {
            hideElement(hoverEffect)
        }
        const mouseDown = () => {
            const newPowered = !isPowered
            setElementVisibility(poweredEffect, newPowered)
            onPoweredChanged(newPowered)
        }
        const mouseUp = () => {}
        const button = svg.querySelector(`#button-${buttonId}`) as SVGElement
        if (button) {
            button.addEventListener("mouseenter", mouseEnter)
            button.addEventListener("mouseleave", mouseLeave)
            button.addEventListener("mousedown", mouseDown)
            button.addEventListener("mouseup", mouseUp)
            button.style.cursor = "pointer"
        }

        return {
            hoverEffect,
            button,
        }
    }

    function hookJacdacPort(svg: SVGElement) {
        const port = svg.querySelector("#jacdac-port") as SVGElement
        if (port) {
            port.addEventListener("click", () => {
                // NOTE: Opening the URL is blocked because of the sandbox attribute (allow-popups is not set)
                // We could potentially send a message to the extension to open the URL:
                //postMessagePacket({ type: "jacdac-port-click" })
                //window.open("https://aka.ms/jacdac", "_blank", "noopener noreferrer")
            })
            //port.style.cursor = "pointer"
        }
    }

    useShieldService(canvasRef)
    useKeyboard(onKeyDown, onKeyUp)
    const focused = useWindowFocus()

    const afterSkinInjection = (svg: SVGElement) => {
        // TODO: unregister previous skin's event listeners
        if (svg && skinRef.current !== svg) {
            skinRef.current = svg
            buttonElements.current["left"] = hookShieldButton(skinRef.current, "left")
            buttonElements.current["right"] = hookShieldButton(skinRef.current, "right")
            buttonElements.current["up"] = hookShieldButton(skinRef.current, "up")
            buttonElements.current["down"] = hookShieldButton(skinRef.current, "down")
            buttonElements.current["a"] = hookShieldButton(skinRef.current, "a")
            buttonElements.current["b"] = hookShieldButton(skinRef.current, "b")
            buttonElements.current["menu"] = hookShieldButton(skinRef.current, "menu")
            buttonElements.current["restart"] = hookShieldButton(skinRef.current, "restart")
            buttonElements.current["power"] = hookPowerButton(skinRef.current)
            hookJacdacPort(skinRef.current)
        }
    }

    return (
        <div className={classList(css["shield-board"], css[`skin-${DEFAULT_SKIN}`])}>
            <ReactSVG
                src={`assets/${DEFAULT_SKIN}.svg`}
                className={classList(css["shield-svg"], focused ? css[""] : css["unfocused"])}
                afterInjection={afterSkinInjection}
            />
            <div className={css["screen-container"]}>
                {isPowered && <canvas className={css["screen-canvas"]} ref={setCanvasRef} />}
            </div>
        </div>
    )
}
