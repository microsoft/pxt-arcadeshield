import { useEffect, useState } from "react"
import css from "@/styling/App.module.scss"
import { Shield } from "@/components/Shield"
import { Loading } from "@/components/Loading"
import { usePromise } from "@/hooks/usePromise"
import { AppStateReady } from "@/state/Context"

export const App: React.FC = () => {
    const [inited, setInited] = useState(false)

    const ready = usePromise(AppStateReady, false)

    useEffect(() => {
        if (ready && !inited) {
            setInited(true)
        }
    }, [ready, inited])

    return <div className={css["app"]}>{inited ? <Shield /> : <Loading />}</div>
}
