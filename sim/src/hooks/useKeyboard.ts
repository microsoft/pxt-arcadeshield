import { useEffect, useRef } from "react"

export function useKeyboard(onKeyDown: (key: string) => void, onKeyUp: (key: string) => void) {
    const downKeys = useRef(new Set<string>())

    // Mount a window event listener to handle keyboard events
    useEffect(() => {
        const handleKeyDown = (ev: KeyboardEvent) => {
            let { key } = ev
            key = key?.toLowerCase()
            if (!key) return
            if (downKeys.current.has(key)) return // don't send repeat "down" events
            downKeys.current.add(key)
            onKeyDown(key)
        }
        const handleKeyUp = (ev: KeyboardEvent) => {
            let { key } = ev
            key = key?.toLowerCase()
            if (!key) return
            if (!downKeys.current.has(key)) return
            downKeys.current.delete(key)
            onKeyUp(key)
        }
        window.addEventListener("keydown", handleKeyDown)
        window.addEventListener("keyup", handleKeyUp)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            window.removeEventListener("keyup", handleKeyUp)
        }
    }, [onKeyDown, onKeyUp])
}
