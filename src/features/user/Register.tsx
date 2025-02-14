import styles from '../auth/auth.module.css'
import { ClipLoader } from 'react-spinners'
import { Link, useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import useTitle from '../../hooks/useTitle'

// RTK Query
import { useCreateUserMutation } from './userApiSlice'
import VerifyEmail from './VerifyEmail'

// Regex
const USERNAME_REGEX = /^\S{1,20}$/
const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
const PASSWORD_REGEX = /^[A-Za-z0-9]{6,}$/

const Register = () => {
    useTitle('Register');

    const navigate = useNavigate();

    const [createUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useCreateUserMutation();

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    let content;

    useEffect(() => {
        setValidUsername(USERNAME_REGEX.test(username));
    }, [username])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password));
    }, [password])

    useEffect(() => {
        if(isSuccess) {
            setUsername('');
            setEmail('');
            setPassword('');
        }
    }, [navigate, isSuccess])

    const onUserNameChange = (e: any) => setUsername(e.target.value);
    const onEmailChange = (e: any) => setEmail(e.target.value);
    const onPasswordChange = (e: any) => setPassword(e.target.value);

    const canCreate = [validUsername, validEmail, validPassword].every(Boolean) && !isLoading;

    const onCreateUserClicked = async (e: React.FormEvent) => {
        e.preventDefault();
        if (canCreate) {
            await createUser({ username, email : email.toLowerCase(), password });
        }
    };

    const errClass = isError ? styles.errmsg : styles.offscreen;
    const validUserClass = !validUsername ? styles.formInvalid : styles.offscreen;
    const validEmailClass = !validEmail ? styles.formInvalid : styles.offscreen;
    const validPasswordClass = !validPassword ? styles.formInvalid : styles.offscreen;

    if(isSuccess) content = <VerifyEmail />

    if(!isSuccess) content = (
        <section className={styles.authContainer}>
            <header>
                <h1>Register</h1>
            </header>
            <main className={styles.authContainer__main}>
                <div className={errClass} >
                    <p>{(error as any)?.data?.message || 'An error occurred'}</p>
                </div>
                <form action="" className={styles.form} onSubmit={onCreateUserClicked}>
                    <div className={styles.formContainer}>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="" id="username" onInput={onUserNameChange} value={username} title='Username' autoComplete='off'/>
                        <p className={validUserClass}>Username must be up to 20 characters with no spaces.</p>
                    </div>
                    <div className={styles.formContainer}>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="" id="email" onInput={onEmailChange} value={email} title='Email' autoComplete='off'/>
                        <p className={validEmailClass}> Email must contain '@' and follow a valid format.</p>
                    </div>
                    <div className={styles.formContainer}>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="" id="password" onInput={onPasswordChange} value={password} title='Password' autoComplete='off'/>
                        <p className={validPasswordClass}>Password must be at least 6 characters without special characters.</p>
                    </div>
                    <button disabled={!canCreate} title='Register'>Register {isLoading && <ClipLoader loading={true} size={16} />}</button>
                </form>
                <div className={styles.links}>
                    <Link to='/login'>Already have an account?</Link>
                    <Link to='/'>Back to home</Link>
                </div>
            </main>
        </section>
    )

    return content

}

export default Register
