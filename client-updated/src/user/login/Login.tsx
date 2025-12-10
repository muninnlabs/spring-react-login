import React, { useEffect } from "react";
import "./Login.css";
import { GOOGLE_AUTH_URL } from "../../constants/constants.ts";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import googleLogo from "../../img/google-logo.png";
import toast from "react-hot-toast";

interface LoginProps {
    authenticated: boolean;
}

type SampleLoginProps = {};

const SampleLogin: React.FC<SampleLoginProps> = () => {
    return (
        <div className="social-login">
            <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                <img src={googleLogo} alt="Google" /> Log in with Google
            </a>
        </div>
    );
};

const Login: React.FC<LoginProps> = ({ authenticated }) => {
    const location = useLocation();
    const navigate = useNavigate();

    console.log('Generated Google Auth URL:', GOOGLE_AUTH_URL);

    useEffect(() => {
        const errorState = location.state as { error?: string } | null;
        if (errorState?.error) {
            setTimeout(() => {
                toast.error(errorState.error || 'An error occurred');
                navigate(location.pathname, { replace: true, state: {} });
            }, 100);
        }
    }, [location.state, location.pathname, navigate]);

    if (authenticated) {
        return (
            <Navigate
                to="/"
                replace
                state={{ from: location }}
            />
        );
    }

    return (
        <div className="login-container">
            <div className="login-content">
                <h1 className="login-title">Login</h1>
                <SampleLogin />
            </div>
        </div>
    );
};

export default Login;