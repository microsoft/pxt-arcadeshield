import css from "@/styling/App.module.scss"
import { Shield } from "@/components/Shield"

export const App: React.FC = () => {
    return (
        <div className={css["app"]}>
            <Shield />
        </div>
    )
}
