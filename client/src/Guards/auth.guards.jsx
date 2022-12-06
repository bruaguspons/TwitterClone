import { Outlet, Navigate } from "react-router-dom"
import publicRoutes from "../routes/public.routes"
import { useSelector } from 'react-redux'
const AuthGuard = () => {
    const { token } = useSelector(state => state.user)
    return token ? <Outlet /> : <Navigate to={publicRoutes.LOGIN} />
}
export default AuthGuard