import "./Navbar.css";
import "./custom.scss";
import { PAGE_URL } from "constants/configs";
import { DefaultUser, Logo } from "assets";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { authSelector } from "store/selectors";
import { logout } from "pages/Auth/authSlice";
import { Avatar, Chip, Popover } from "@mui/material";
import { useState } from "react";
import BadgeIcon from "@mui/icons-material/Badge";
import LogoutIcon from "@mui/icons-material/Logout";
import WrapperContainer from "components/WrapperContainer";
import CButton from "components/CButton";

export const Navbar = () => {
    const { pathname } = useLocation();
    if (pathname.includes("/auth")) return null;

    const dispatch = useAppDispatch();
    const { userInfo } = useAppSelector(authSelector);
    const navigate = useNavigate();
    const [anchorShowDropdown, setAnchorShowDropdown] = useState<null | Element>(null);

    const navigateTo = async (path: string) => {
        if (path === "logout") {
            await dispatch(logout());
            setAnchorShowDropdown(null);
        } else {
            navigate(path);
            setAnchorShowDropdown(null);
        }
    };

    const handleShowDropdown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setAnchorShowDropdown(event.currentTarget);
    };

    const handleCloseDropdown = () => {
        setAnchorShowDropdown(null);
    };

    const accountDropdownData = [
        {
            label: "My Account",
            icon: <BadgeIcon />,
            path: PAGE_URL.ACCOUNT
        },
        {
            label: "Log out",
            icon: <LogoutIcon />,
            path: "logout"
        }
    ];

    const initNav: { name: string; href: string; current: boolean; allowedRoles: string[] }[] = [
        { name: "Home", href: "/", current: false, allowedRoles: [] },
        { name: "Studio", href: PAGE_URL.STUDIO, current: false, allowedRoles: ["interviewer"] },
        {
            name: "Upload CV",
            href: PAGE_URL.CV_INFORMATION,
            current: false,
            allowedRoles: ["interviewee"]
        },
        {
            name: "Upload JD",
            href: PAGE_URL.JD_INFORMATION,
            current: false,
            allowedRoles: ["interviewer"]
        },
        { name: "Job", href: PAGE_URL.JOB_LIST, current: false, allowedRoles: [] }
    ];

    return (
        <div className="navbar">
            <WrapperContainer>
                <div className="navbar__container">
                    <div className="navbar__items">
                        <div className="navbar__items__logo">
                            <Logo />
                            <span className="navbar__logo__title">
                                ITA - Intelligent Talent Allocation{" "}
                            </span>
                        </div>
                        <div className="navbar__items__list">
                            {initNav.map(
                                (item) =>
                                    ((userInfo?.role &&
                                        item.allowedRoles.includes(userInfo.role)) ||
                                        item.allowedRoles.length === 0) && (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={
                                                item.current
                                                    ? "items-list__item--current"
                                                    : "items-list__item"
                                            }
                                        >
                                            {item.name}
                                        </a>
                                    )
                            )}
                        </div>
                        <div className="navbar__items__button">
                            {userInfo ? (
                                <>
                                    <div
                                        className="header-account__wrapper"
                                        onClick={(e) => handleShowDropdown(e)}
                                    >
                                        <Chip
                                            avatar={
                                                <Avatar alt={userInfo.username} src={DefaultUser} />
                                            }
                                            className="header-account--avatar"
                                            label={userInfo.username}
                                            variant="outlined"
                                        />
                                    </div>
                                    <Popover
                                        className="header-account__dropdown"
                                        open={!!anchorShowDropdown}
                                        anchorEl={anchorShowDropdown}
                                        onClose={handleCloseDropdown}
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "right"
                                        }}
                                        transformOrigin={{
                                            vertical: "top",
                                            horizontal: "right"
                                        }}
                                    >
                                        {accountDropdownData.map((data) => (
                                            <div
                                                className="account-dropdown__item"
                                                key={data.label}
                                                onClick={() => navigateTo(data.path)}
                                            >
                                                {data.icon}
                                                <span>{data.label}</span>
                                            </div>
                                        ))}
                                    </Popover>
                                </>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <CButton
                                        variant="text"
                                        onClick={() => navigate(PAGE_URL.LOGIN)}
                                    >
                                        Login
                                    </CButton>
                                    <CButton
                                        variant="outlined"
                                        onClick={() => navigate(PAGE_URL.SIGNUP)}
                                    >
                                        Signup
                                    </CButton>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </WrapperContainer>
        </div>
    );
};
