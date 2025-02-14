import styles from './components.module.css'
import { CiLogout } from "react-icons/ci";
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useSendLogoutMutation } from '../features/auth/authApiSlice';
import { ClipLoader } from 'react-spinners';

const DashHeader = () => {
    const navigate = useNavigate();
    // if it is admin, show admin menu(hamburger menu)
    // else, show logout button
    //let menu;
    // if (user.role === 'admin') {
    //     menu = <RxHamburgerMenu />
    // } else {
    //     menu = <CiLogout />

    const [sendLogout, { 
        isLoading, 
        isSuccess
    }] = useSendLogoutMutation();

    useEffect(() => {
        if(isSuccess) navigate('/');
    }, [isSuccess, navigate]);

    const onLogoutClicked = async (e: React.FormEvent) =>  {
        e.preventDefault();
        const currentTabId = sessionStorage.getItem('currentTabId');
        const result = await sendLogout({ currentTabId }).unwrap();

        if(result) navigate('/');
    }

    const content = (
        <header className={styles.dashHeader}>
            <h2>Dexl's To-Do</h2>
            <div className={styles.dashHeader__menu}>
                <button onClick={onLogoutClicked} title='Logout' disabled={isLoading}>
                    {isLoading ? <ClipLoader loading={true} size={24} /> : <CiLogout />}
                </button>
            </div>
        </header>
    )

    return content
}

export default DashHeader
