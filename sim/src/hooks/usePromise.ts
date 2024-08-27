import { useEffect, useState } from "react"

export function usePromise<T>(promise: Promise<T>, defaultValue: T): T {
    const [value, setValue] = useState(defaultValue)

    useEffect(() => {
        promise.then(setValue)
    }, [promise])

    return value
}
