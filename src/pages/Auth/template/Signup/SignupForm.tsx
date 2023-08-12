/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { FormControl, FormHelperText } from "@mui/material";
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { IFormAuth } from "pages/interface";
import CInput from "components/CInput";
import { signupUser } from "pages/Auth/authSlice";
import { useAppDispatch } from "store/hooks";
import { useNavigate } from "react-router-dom";
import { PAGE_URL } from "constants/configs";
import CButton from "components/CButton";

const defaultValues: IFormAuth = {
    confirmPassword: "",
    password: "",
    username: ""
};

const SignupForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        handleSubmit,
        control,
        getValues,
        formState: { errors }
    } = useForm<IFormAuth>({ defaultValues });

    const onValidSubmit: SubmitHandler<IFormAuth> = async (data) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...validData } = data;
        const dataResponse: any = await dispatch(signupUser(validData)).unwrap();

        if (dataResponse.username) {
            navigate(`../${PAGE_URL.HOME}`);
        }
    };

    const onInvalidSubmit: SubmitErrorHandler<IFormAuth> = (data, event) => {
        event?.target.classList.add("wasvalidated");
    };

    return (
        <form
            className="login-form w-full flex flex-col gap-7"
            onSubmit={handleSubmit(onValidSubmit, onInvalidSubmit)}
            method="POST"
            action="#"
            noValidate
            autoComplete="off"
        >
            <FormControl variant="standard" className="w-full">
                <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                        <CInput {...field} label="Username" placeholder="example@gmail.com" />
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
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            endIcon={<VisibilityIcon />}
                        />
                    )}
                />
            </FormControl>

            <FormControl variant="standard" className="w-full">
                <Controller
                    control={control}
                    name="confirmPassword"
                    rules={{
                        validate: (value) =>
                            value === getValues("password") || "Password does not match"
                    }}
                    render={({ field }) => (
                        <CInput
                            {...field}
                            label="Confirm Password"
                            placeholder="Confirm your password"
                            type="password"
                            endIcon={<VisibilityIcon />}
                            valid={!errors["confirmPassword"]}
                        />
                    )}
                />
                {errors["confirmPassword"] && (
                    <FormHelperText className="form-helper-text">
                        {errors["confirmPassword"]?.message}
                    </FormHelperText>
                )}
            </FormControl>

            <div className="login-form__button w-full text-center">
                <CButton
                    className="w-full"
                    variant="contained"
                    type="submit"
                    sx={{ minHeight: 48 }}
                >
                    Sign up
                </CButton>
            </div>
        </form>
    );
};

export default SignupForm;
