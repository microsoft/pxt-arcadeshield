import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { AppStateProvider } from "@/state/Context"
import { App } from "@/components/App.tsx"
import "./global.scss"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AppStateProvider>
            <App />
        </AppStateProvider>
    </StrictMode>
)
