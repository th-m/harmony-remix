import { Login } from "./login.client"
import { Suspend } from "./suspend"

export const Header = () => {
    return (
        <span className="flex flex-row content-between justify-center w-full">
            <span className="flex flex-1">Harmony Hub</span>
            <Suspend>
                <span className="flex flex-1">

                <Login />
                </span>
            </Suspend>
        </span>
    )
}