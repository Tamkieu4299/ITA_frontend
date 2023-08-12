import "./Studio.css";
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "../../components/Sidebar/Sidebar";

import WrapperContainer from "components/WrapperContainer";
import LayoutWithSidebar from "components/LayoutWithSidebar/LayoutWithSidebar";
import { PAGE_URL } from "constants/configs";

export const Studio = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pathname } = location;

    useEffect(() => {
        if (pathname === PAGE_URL.STUDIO) {
            navigate(PAGE_URL.STUDIO_CREATE, { replace: true });
        }
    }, [pathname]);

    return (
        <div className="studio">
            <WrapperContainer bodyContent>
                <LayoutWithSidebar sidebar={<Sidebar />}>
                    <Outlet />
                </LayoutWithSidebar>
            </WrapperContainer>
        </div>
    );
};
