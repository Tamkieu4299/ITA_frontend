import React, { ReactNode } from "react";
import "./layoutWithSidebar.scss";

interface Props {
    sidebar: ReactNode;
    children: ReactNode;
    className?: string;
}

const LayoutWithSidebar = ({ sidebar, children, className = "" }: Props) => {
    return (
        <div className={`flex flex-nowrap m-0 sidebar-layout ${className}`}>
            {sidebar && <div className="p-0 pe-3 sidebar-layout-container">{sidebar}</div>}
            <div className="p-0 sidebar-layout-children">{children}</div>
        </div>
    );
};

export default LayoutWithSidebar;
