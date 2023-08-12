/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FormControl } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import PersonIcon from "@mui/icons-material/Person";
import CInput from "components/CInput";
import LockIcon from "@mui/icons-material/Lock";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { IFormLogin } from "pages/interface";
import { useAppDispatch } from "store/hooks";
import { PAGE_URL } from "constants/configs";
import { authenticate } from "pages/Auth/authSlice";
import CButton from "components/CButton";

const defaultValues: IFormLogin = {
    password: "",
    username: ""
};

const LoginForm = () => {
    const { handleSubmit, control } = useForm<IFormLogin>({ defaultValues });
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const submitFormHandler: SubmitHandler<IFormLogin> = async (data) => {
        const dataResponse: any = await dispatch(authenticate(data)).unwrap();

        if (dataResponse.username) {
            navigate(`../${PAGE_URL.HOME}`);
        }
    };

    return (
        <form
            className="login-form w-full flex flex-col gap-7"
            onSubmit={handleSubmit(submitFormHandler)}
            method="POST"
            action="#"
            noValidate
            autoComplete="off"
        >
            <FormControl variant="standard" className="w-full">
                <Controller
                    name={"username"}
                    control={control}
                    render={({ field }) => (
                        <CInput
                            {...field}
                            label="Username"
                            placeholder="example@gmail.com"
                            startIcon={<PersonIcon />}
                        />
                    )}
                />
            </FormControl>

            <FormControl variant="standard" className="w-full">
                <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                        <CInput
                            {...field}
                            type="password"
                            label="Password"
                            placeholder="Enter your password"
                            startIcon={<LockIcon />}
                            endIcon={<VisibilityIcon />}
                        />
                    )}
                />
            </FormControl>

            <div className="login-form__button w-full text-center">
                <CButton
                    className="w-full"
                    variant="contained"
                    type="submit"
                    sx={{ minHeight: 48 }}
                >
                    Login
                </CButton>
            </div>
        </form>
    );
};

export default LoginForm;
