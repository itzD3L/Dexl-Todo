import { useLocation, Navigate, Outlet } from "react-router";
import useAuth from "../../hooks/useAuth";

const RequiredAuth = ({ allowedRoles }: { allowedRoles: string[] }) => {
    const location = useLocation();
    const { roles } = useAuth();

    const content = (
        roles.some((role: string) => allowedRoles.includes(role)) ?
            <Outlet /> :
            <Navigate to="/user" state={{ from: location.pathname }} replace/>
    )

    return content
}

export default RequiredAuth;