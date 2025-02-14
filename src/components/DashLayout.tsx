import styles from "./components.module.css"
import { Outlet } from "react-router" 
import DashHeader from "./DashHeader"
import DashFooter from "./DashFooter"
import { useSelector } from "react-redux"
import SessionExpire from "./SessionExpire"

const DashLayout = () => {
    const session = useSelector(
        (state: { auth: { isSessionExpired: boolean } }) => state.auth.isSessionExpired
    )

    return (
        <>
            <DashHeader />
            <div className={styles.dashMain}>
                {!session ? <Outlet />: <SessionExpire />}
            </div>            
            <DashFooter />
        </>
    )
}

export default DashLayout
