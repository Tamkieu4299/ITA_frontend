/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
import { Box, InputAdornment, TextField, BaseTextFieldProps } from "@mui/material";
import React, { forwardRef } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./CInput.scss";

interface Props extends BaseTextFieldProps {
    endIcon?: React.ReactElement;
    startIcon?: React.ReactElement;
    valid?: boolean;
    onChange?: any;
}

const CInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
    const { startIcon = null, endIcon = null, type, className, valid = true, ...restProps } = props;
    const [isShowPassword, setIsShowPassword] = React.useState<boolean>(false);

    return (
        <TextField
            {...Object.assign({}, restProps)}
            className={`cinput ${className} cinput-${valid ? "valid" : "invalid"}`}
            InputProps={{
                startAdornment: startIcon && (
                    <InputAdornment position="start">{startIcon}</InputAdornment>
                ),
                endAdornment: endIcon && (
                    <InputAdornment position="end">
                        {type === "text" ? (
                            <>{endIcon}</>
                        ) : (
                            <Box
                                sx={{ cursor: "pointer" }}
                                onClick={() => setIsShowPassword(!isShowPassword)}
                            >
                                {isShowPassword ? endIcon : <VisibilityOffIcon />}
                            </Box>
                        )}
                    </InputAdornment>
                )
            }}
            ref={ref}
            type={isShowPassword ? "text" : type}
            fullWidth
        />
    );
});

export default CInput;
