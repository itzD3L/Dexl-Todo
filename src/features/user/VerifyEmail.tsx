import { useVerifyEmailMutation } from "./verifyEmailApiSlice";
import { useSearchParams } from "react-router";
import { useEffect } from "react";  
import { useNavigate } from "react-router";
import { useState } from "react";
import { ClipLoader } from "react-spinners";

const VerifyEmail = () => {
    const [ searchParams ] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();
    const [resendTimeout, setResendTimeout] = useState(15 * 60); // 15 minutes in seconds
    const redirectTimeout = 5 * 1000; // 5 seconds

    const [verifyEmail, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useVerifyEmailMutation();

    useEffect(() => {
        if(token) {
            console.log(token)
            const result = verifyEmail(token).unwrap();
            console.log(result)
        }
    }, [token]);

    useEffect(() => {
        if (isSuccess) {
            console.log('success')
            const timer = setTimeout(() => {
                navigate('/login');
            }, redirectTimeout); // 5 seconds

            return () => clearTimeout(timer);
        }
    }, [isSuccess, navigate]);

    useEffect(() => {
        if (resendTimeout > 0) {
            const timer = setTimeout(() => {
                setResendTimeout(resendTimeout - 1);
            }, 1000); // 1 second

            return () => clearTimeout(timer);
        }
    }, [resendTimeout]);

    const resendVerificationEmail = () => {
        setResendTimeout(15 * 60);
        verifyEmail(token);
    }

    let content;
    
    if(isLoading) {
        content = (
            <div>
                <h1>Verifiying Email</h1>
                <p>Loading<ClipLoader loading={true} size={20}/></p>
            </div>
        )
    } else if(!isSuccess) {
        content = (
            <div>
                <h1>Verify Email</h1>
                <p>Thank you for registering! Please check your email address to verify registration.</p>
                {resendTimeout > 0 ? (
                    <p>Haven't received the email? Try again in {Math.floor(resendTimeout / 60)}:{resendTimeout % 60 < 10 ? '0' : ''}{resendTimeout % 60}</p>
                ) : (
                    <button onClick={() => resendVerificationEmail()}>Resend Verification Email</button>
                )}
            </div>
        )
    } else if (isSuccess) {
        content = (
            <div>
                <h1>Email Verified!</h1>
                <p>Your email has been verified! You will be redirected to the login page in {redirectTimeout / 1000} seconds.</p>
            
            </div>
        )
    } else if (isError) {
        content = (
            <div>
                <h1>Verification Failed</h1>
                <p>{(error as { data: { message: string } }).data?.message}</p>
            </div>
        )
    }
    
    return content;
}

export default VerifyEmail;
