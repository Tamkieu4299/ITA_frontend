import { ISidebarItem } from "pages/interface";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./CustomSidebar.scss";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
interface Props {
    sidebarItems: ISidebarItem[];
}

const CustomSidebar = (props: Props) => {
    const { sidebarItems } = props;
    const navigate = useNavigate();

    return (
        <div className="custom-sidebar">
            {sidebarItems.map((nav) => {
                const { icon, title, to, isActive } = nav;
                return (
                    <div
                        className="custom-sidebar__subItem"
                        key={title}
                        onClick={() => navigate(to)}
                        aria-selected={isActive}
                    >
                        <div className="flex items-center gap-2">
                            {icon}
                            <span>{title}</span>
                        </div>
                        <ChevronRightIcon />
                    </div>
                );
            })}
        </div>
    );
};

export default CustomSidebar;
