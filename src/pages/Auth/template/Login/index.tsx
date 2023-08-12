import React from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import { PAGE_URL } from "constants/configs";
import { Logo } from "assets";

const Login = () => {
    const navigate = useNavigate();

    const navigateTo = (destination: string) => {
        navigate(destination);
    };

    return (
        <div className="auth-content__login">
            <Logo />
            <h1 className="text-center">Intelligent Talent Allocation</h1>
            <LoginForm />

            <div className="w-full login-nav flex items-center justify-between mt-3 mb-4">
                <div className="login-nav__forgotpassword">Forgot password?</div>

                <div className="login-nav__register" onClick={() => navigateTo(PAGE_URL.SIGNUP)}>
                    Create account
                </div>
            </div>

            {/* <LoginOptions /> */}
        </div>
    );
};

export default Login;
