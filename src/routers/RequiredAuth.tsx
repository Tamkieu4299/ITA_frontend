import { PAGE_URL } from "constants/configs";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "store/hooks";
import { authSelector } from "store/selectors";

interface Props {
    allowedRoles: string[];
}

const RequiredAuth = (props: Props) => {
    const { allowedRoles } = props;
    const location = useLocation();
    const { userInfo } = useAppSelector(authSelector);
    const role = userInfo?.role;

    return role && allowedRoles.includes(role) ? (
        <Outlet />
    ) : (
        <Navigate to={PAGE_URL.HOME} state={{ from: location }} replace />
    );
};

export default RequiredAuth;
