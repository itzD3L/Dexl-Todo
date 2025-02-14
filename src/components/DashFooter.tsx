import styles from "./components.module.css";
import { useNavigate, useLocation } from "react-router"
import { IoHomeOutline } from "react-icons/io5";
import useAuth from "../hooks/useAuth";

const DashFooter = () => {

    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { username } = useAuth();
    const onGoHomeClicked = () => navigate('/user')

    let goBackButton = null;
    
    if(pathname !== '/user') {
        goBackButton = (
            <button className={styles.dashFooter__goBackHome} onClick={() => onGoHomeClicked()}>
            <IoHomeOutline />
            </button>
        )
    }

    const content = (
        <footer className={styles.dashFooter}>
            <h3>User : {username}</h3>
            {goBackButton}
        </footer>
    )
    return content
}

export default DashFooter
