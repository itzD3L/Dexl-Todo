import styles from './components.module.css'
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { logOut, setSessionExpired } from '../features/auth/authSlice';

const SessionExpire = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSessionExpire = () => {
        dispatch(logOut());
        dispatch(setSessionExpired(false));
        navigate('/login');
    }
    return (
        <div className={styles.sessionExpireContainer}>
            <div className={styles.sessionExpireContent}>
                <h4>Your session has expired. Please login again.</h4>
                <button onClick={handleSessionExpire}>Okay</button>
            </div>
        </div>
    )
}

export default SessionExpire;