import { useSelector } from "react-redux";
import { selectCurrentKey } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
    const token = useSelector(selectCurrentKey);
    let Admin = false;
    let status = 'User'

    if(token) {
        const decodedToken = jwtDecode(token);
        const { username, roles } = (decodedToken as any).UserInfo;

        Admin = roles.includes('Admin')

        if(Admin) status = "Admin"

        return { username, roles, Admin, status }
    }

    return { username : '', roles : [], Admin, status }
}

export default useAuth