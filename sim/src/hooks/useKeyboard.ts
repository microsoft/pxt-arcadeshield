import { useEffect, useRef } from "react"

export function useKeyboard(onKeyDown: (key: string) => boolean, onKeyUp: (key: string) => boolean) {
    const downKeys = useRef(new Set<string>())

    // Mount a window event listener to handle keyboard events
    useEffect(() => {
        const handleKeyDown = (ev: KeyboardEvent) => {
            let { key } = ev
            key = key?.toLowerCase()
            if (!key) return
            if (downKeys.current.has(key)) return // don't send repeat "down" events
            downKeys.current.add(key)
            if (onKeyDown(key)) {
                ev.preventDefault()
                ev.stopPropagation()
            }
        }
        const handleKeyUp = (ev: KeyboardEvent) => {
            let { key } = ev
            key = key?.toLowerCase()
            if (!key) return
            if (!downKeys.current.has(key)) return
            downKeys.current.delete(key)
            if (onKeyUp(key)) {
                ev.preventDefault()
                ev.stopPropagation()
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup", handleKeyUp)
        }
    }, [onKeyDown, onKeyUp])
}
