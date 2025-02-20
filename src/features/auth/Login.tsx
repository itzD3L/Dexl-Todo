import styles from './auth.module.css'
import { Link, useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { ClipLoader } from 'react-spinners'
import useTitle from '../../hooks/useTitle'
// RTK Query
import { useLoginMutation } from './authApiSlice'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'

// Regex
const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
const PASSWORD_REGEX = /^[A-Za-z0-9]{6,}$/


const Login = () => {
    useTitle('Login');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useLoginMutation();

    

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(true);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(true);

    useEffect(() => {
        if(isSuccess) {
            setEmail('');
            setPassword('');
            navigate('/user');
        }
    }, [navigate, isSuccess])

    const onEmailChange = (e: any) => {
        e.preventDefault();
        const newValue = e.currentTarget.value;
        setEmail(newValue);

        if(newValue.length === 0 || !EMAIL_REGEX.test(newValue)) {
            setValidEmail(false)
        } else {
            setValidEmail(true)
        }
    }

    const onPasswordChange = (e: any) => {
        e.preventDefault();
        const newValue = e.currentTarget.value;
        setPassword(newValue);

        if(newValue.length === 0 || !PASSWORD_REGEX.test(newValue)) {
            setValidPassword(false)
        } else {
            setValidPassword(true)
        }
    }

    const canLogin = [validEmail, validPassword].every(Boolean) && !isLoading;

    const onLoginClicked = async (e: React.FormEvent) => {
        e.preventDefault();

        if(email.length === 0) setValidEmail(false);
        if(password.length === 0) setValidPassword(false);

        if(canLogin && email.length > 0 && password.length > 0) {
            const { fastKey, tabId } = await login({
                email : email.toLocaleLowerCase(),
                password
            }).unwrap();
            
            dispatch(setCredentials({ fastKey }));
            sessionStorage.setItem('currentTabId', tabId);
        }
    }

    const errClass = isError ? styles.errmsg : styles.offscreen;
    const validEmailClass = !validEmail ? styles.formInvalid : styles.offscreen;
    const validPasswordClass = !validPassword ? styles.formInvalid : styles.offscreen;

    const content = (
        <section className={styles.authContainer}>
            <header>
                <h1>Login</h1>
            </header>
            <main className={styles.authContainer__main}>
                <div className={errClass} >
                    <p>{(error as any)?.data?.message || 'An error occurred'}</p>
                </div>
                <form action="" className={styles.form} onSubmit={onLoginClicked}>
                    <div className={styles.formContainer}>
                        <label htmlFor="email">Email</label>
                        <input type="text" name="" id="email" onInput={onEmailChange} value={email} />
                        <p className={validEmailClass}> Email must contain '@' and follow a valid format.</p>
                    </div>
                    <div className={styles.formContainer}>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="" id="password" onInput={onPasswordChange} value={password}/>
                        <p className={validPasswordClass}>Password must be at least 6 characters without special characters.</p>
                        <Link to='/forgot-password'>Forgot password?</Link>
                    </div>
                    <button disabled={!canLogin}>Login{isLoading && <ClipLoader loading={true} size={16} />}</button>
                </form>
                <div className={styles.links}>
                    <Link to='/register'>Don't have an account?</Link>
                    <Link to='/'>Back to home</Link>
                </div>
            </main>
            <footer>
                
            </footer>
        </section>
    )

    return content

}

export default Login
