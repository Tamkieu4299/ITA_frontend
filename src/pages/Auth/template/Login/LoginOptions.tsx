import React from "react";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";

const LoginOptions = () => {
    return (
        <div className="login-options mt-4 mb-3 w-full">
            <div className="login-options__text text-center mb-3">
                <span className="px-3 fw-semibold">Or login with</span>
            </div>
            <div className="login-options__list flex justify-between">
                <div className="option-item option-item__google">
                    <GoogleIcon />
                    <span>Google</span>
                </div>
                <div className="option-item option-item__facebook">
                    <FacebookIcon />
                    <span>Facebook</span>
                </div>
            </div>
        </div>
    );
};

export default LoginOptions;
