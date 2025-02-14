import { Outlet, Navigate } from 'react-router';
import { useRefreshMutation } from './authApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentKey } from './authSlice';
import { useEffect, useRef, useState } from 'react';
import LoadingState from '../../components/LoadingState';

const PersistLogin = () => {

    const fastKey = useSelector(selectCurrentKey);
    const effectRan = useRef(false);
    const [ trueSuccess, setTrueSuccess ] = useState(false);

    const [ refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError
    }] = useRefreshMutation();

    useEffect(() => {

        if(effectRan.current === true || process.env.NODE_ENV !== 'development') {
            const verifyRefreshToken = async () => {
                try {
                    await refresh(sessionStorage.getItem('currentTabId'));
                    setTrueSuccess(true);
                } catch (err) {
                    console.error('Refresh failed:', err);
                }
            }

            if(!fastKey) verifyRefreshToken();
        }

        effectRan.current = true;

    }, [])

    if(isLoading) {
        return <LoadingState />
    } else if(isSuccess && trueSuccess) {
        return <Outlet />
    } else if(isUninitialized && fastKey) {
        return <Outlet />
    } else if (isError) {
        return <Navigate to="/" />
    }
};

export default PersistLogin;