import React from "react";

import { useNavigate } from "react-router-dom";
import SignupForm from "./SignupForm";
import { PAGE_URL } from "constants/configs";
import { Logo } from "assets";

const Signup = () => {
    const navigate = useNavigate();

    return (
        <div className="auth-content__signup">
            <Logo />
            <h1 className="text-center">Intelligent Talent Allocation</h1>
            <SignupForm />

            <div className="signup-nav text-center mt-3">
                I&apos;m already a member!&nbsp;
                <span onClick={() => navigate(PAGE_URL.LOGIN)}>Login</span>
            </div>
        </div>
    );
};

export default Signup;
