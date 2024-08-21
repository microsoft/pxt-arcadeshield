import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { AppStateProvider } from "@/state/Context"
import App from "./App.tsx"
import "./index.css"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AppStateProvider>
            <App />
        </AppStateProvider>
    </StrictMode>
)
