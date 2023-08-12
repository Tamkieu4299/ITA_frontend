import CustomSidebar from "components/CustomSidebar/CustomSidebar";
import LayoutWithSidebar from "components/LayoutWithSidebar/LayoutWithSidebar";
import WrapperContainer from "components/WrapperContainer";
import { PAGE_URL } from "constants/configs";
import { ISidebarItem } from "pages/interface";
import React, { useLayoutEffect, useState } from "react";
import { Outlet, matchPath, useLocation } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AirplayIcon from "@mui/icons-material/Airplay";
import "./User.scss";

const User = () => {
    const location = useLocation();
    const { pathname } = location;
    const isSidebarRemoved = [PAGE_URL.INTERVIEW_DETAIL].some((path) =>
        matchPath({ path }, pathname)
    );
    const [sidebarItems, setSidebarItems] = useState<ISidebarItem[]>([
        { title: "My Profile", isActive: false, to: PAGE_URL.ACCOUNT, icon: <AccountBoxIcon /> },
        {
            title: "Interview List",
            isActive: false,
            to: PAGE_URL.INTERVIEW_BASE,
            icon: <AirplayIcon />
        }
    ]);

    useLayoutEffect(() => {
        const newSidebarItems: ISidebarItem[] = sidebarItems.map((page) => {
            page.isActive = page.to === pathname;

            return page;
        });

        setSidebarItems(newSidebarItems);
    }, [pathname]);

    return (
        <div className="user">
            <WrapperContainer bodyContent>
                <LayoutWithSidebar
                    sidebar={!isSidebarRemoved && <CustomSidebar sidebarItems={sidebarItems} />}
                >
                    <Outlet />
                </LayoutWithSidebar>
            </WrapperContainer>
        </div>
    );
};

export default User;
