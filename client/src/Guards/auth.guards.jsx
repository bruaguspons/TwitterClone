import { Outlet, Navigate } from "react-router-dom"
import publicRoutes from "../routes/public.routes"

const AuthGuard = () => {
    return login ? <Outlet /> : <Navigate to={publicRoutes.LOGIN} />
}
export default AuthGuard