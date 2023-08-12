import { PAGE_URL } from "constants/configs";
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Auth.scss";

const Auth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;

    useEffect(() => {
        if (pathname === PAGE_URL.AUTH) {
            navigate(PAGE_URL.LOGIN, { replace: true });
        }
    }, [pathname]);

    return (
        <div className="auth">
            <div className="auth-background"></div>
            <div className="auth-content">
                <Outlet />
            </div>
        </div>
    );
};

export default Auth;
