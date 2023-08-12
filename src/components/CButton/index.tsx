import React from "react";
import { Button, ButtonProps } from "@mui/material";
import classNames from "classnames";
import "./CButton.scss";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props extends ButtonProps {}

const CButton = (props: Props) => {
    const { children, color = "primary", variant = "contained", disabled, className } = props;
    const buttonClassname = classNames(
        "cbutton",
        `cbutton-${variant}-${color}`,
        {
            "cbutton-disabled": disabled
        },
        className
    );

    return (
        <Button {...props} className={buttonClassname}>
            {children}
        </Button>
    );
};

export default CButton;
