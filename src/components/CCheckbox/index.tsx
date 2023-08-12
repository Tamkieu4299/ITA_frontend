/* eslint-disable @typescript-eslint/no-empty-interface */
import React from "react";
import { CheckboxProps, Checkbox } from "@mui/material";
import "./CCheckbox.scss";

interface Props extends CheckboxProps {}

const CCheckbox = (props: Props) => {
    return <Checkbox {...props} />;
};

export default CCheckbox;
