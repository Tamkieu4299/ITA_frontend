import React from "react";
import { BaseProps } from "pages/interface";
import "./wrapperContainer.scss";

interface Props extends BaseProps {
    bodyContent?: boolean;
}

const WrapperContainer = (props: Props) => {
    const { children, bodyContent } = props;

    return (
        <div className={`wrapper-container ${bodyContent ? "body-container" : ""}`}>{children}</div>
    );
};

export default WrapperContainer;
