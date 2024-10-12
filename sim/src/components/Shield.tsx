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
function setElementVisibility(el: HTMLElement | SVGElement | undefined, visible: boolean) {
    if (visible) showElement(el)
    else hideElement(el)
}

const keymap: { [key in ArcadeButtonId]: string[] } = {
    left: ["arrowleft"],
    right: ["arrowright"],
    up: ["arrowup"],
    down: ["arrowdown"],
    a: ["a", "enter"],
    b: ["b", "escape"],
    menu: ["`"],
    power: ["p"],
}

// SVG export doesn't output nodes in a natural tab order, so we need to explicitly set it
// TODO: This should be configurable in the skin SVG
const tabIndex: { [key in ArcadeButtonId]: number } = {
    left: 4,
    right: 5,
    up: 6,
    down: 7,
    a: 2,
    b: 3,
    menu: 8,
    power: 1,
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
        power: undefined,
    })

    // TEMP: Configure the canvas size to 160x120. 
    // Later, this will be passed in by the main simulator
    useEffect(() => {
        if (canvasRef) {
            canvasRef.width = DEFAULT_WIDTH
            canvasRef.height = DEFAULT_HEIGHT
        }
    }, [canvasRef])

    const onButtonDown = (buttonId: ArcadeButtonId): boolean => {
        const elems = buttonElements.current[buttonId]
        // Show the active effect when the button is pressed and the shield is powered
        if (isPowered && elems?.activeEffect) {
            elems.activeEffect.style.display = "block"
        }
        // Focus the button to allow for keyboard navigation from here
        if (elems?.button) {
            elems.button.focus()
        }
        if (isPowered) {
            postMessagePacket({ type: "button-down", buttonId })
        }
        if (buttonId === "power") {
            const newPowered = !isPowered
            const poweredEffect = buttonElements.current["power"]?.activeEffect
            setElementVisibility(poweredEffect, newPowered)
            onPoweredChanged(!isPowered)
        }
        return true
    }
    const onButtonUp = (buttonId: ArcadeButtonId): boolean => {
        const elems = buttonElements.current[buttonId]
        // Hide the active effect when the button is released, unless it's the power button
        if (buttonId !== "power" && elems?.activeEffect) {
            elems.activeEffect.style.display = "none"
        }
        if (isPowered) {
            postMessagePacket({ type: "button-up", buttonId })
        }
        return true
    }
    const onPoweredChanged = (powered: boolean) => {
        setIsPowered(powered)
        if (canvasRef) {
            canvasRef.style.display = powered ? "block" : "none"
        }
        postMessagePacket({ type: powered ? "display-on" : "display-off" })
    }
    const onKeyDown = (key: string): boolean => {
        for (const buttonId of Object.keys(keymap) as ArcadeButtonId[]) {
            const assignments = keymap[buttonId]
            if (assignments.includes(key)) {
                return onButtonDown(buttonId)
            }
        }
        return false
    }
    const onKeyUp = (key: string): boolean => {
        for (const buttonId of Object.keys(keymap) as ArcadeButtonId[]) {
            const assignments = keymap[buttonId]
            if (assignments.includes(key)) {
                return onButtonUp(buttonId)
            }
        }
        return false
    }

    function hookShieldButton(svg: SVGElement, buttonId: ArcadeButtonId): ButtonElements | undefined {
        const activeEffect = svg.querySelector(`#button-${buttonId}-active`) as SVGElement
        const hoverEffect = svg.querySelector(`#button-${buttonId}-focus`) as SVGElement
        const button = svg.querySelector(`#button-${buttonId}-body`) as SVGElement
        const mouseDown = () => {
            onButtonDown(buttonId)
        }
        const mouseUp = () => {
            onButtonUp(buttonId)
        }
        const mouseLeave = () => {
            hideElement(activeEffect)
        }

        if (button) {
            button.setAttribute("tabindex", tabIndex[buttonId].toString())
            button.addEventListener("mousedown", mouseDown)
            button.addEventListener("mouseup", mouseUp)
            button.addEventListener("mouseleave", mouseLeave)
            button.addEventListener("keydown", (e) => {
                if (e.key === " ") {
                    e.preventDefault()
                    e.stopPropagation()
                    mouseDown()
                    setTimeout(mouseUp, 100)
                }
            })
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
        const button = svg.querySelector(`#button-${buttonId}-body`) as SVGElement
        setElementVisibility(poweredEffect, isPowered)
        const mouseDown = () => {
            onButtonDown(buttonId)
        }
        if (button) {
            button.setAttribute("tabindex", tabIndex[buttonId].toString())
            button.addEventListener("mousedown", mouseDown)
            button.addEventListener("keydown", (e) => {
                if (e.key === " ") {
                    e.preventDefault()
                    e.stopPropagation()
                    mouseDown()
                }
            })
        }

        return {
            activeEffect: poweredEffect,
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

    useShieldService(canvasRef, {
        isPowered,
    })
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
                <canvas className={css["screen-canvas"]} ref={setCanvasRef} />
            </div>
        </div>
    )
}
