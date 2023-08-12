/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "api/studioService/authApi";
import userApi from "api/studioService/userApi";
import loaderService from "components/Loader/loaderService";
import { STORAGE_KEY } from "constants/configs";
import { IAuth, IFormLogin } from "pages/interface";
import { User } from "types/userType";

const initialState = (): IAuth => {
    const auth = sessionStorage.getItem(STORAGE_KEY.AUTH);
    if (auth) {
        return { ...JSON.parse(auth) };
    }

    return {};
};

export const signupUser = createAsyncThunk("auth/register", async (data: IFormLogin, thunkAPI) => {
    return loaderService({
        dispatch: thunkAPI.dispatch,
        serviceMethod: userApi.register,
        payload: data
    });
});

export const authenticate = createAsyncThunk(
    "auth/authenticate",
    async (data: Partial<User>, thunkAPI) => {
        return loaderService({
            dispatch: thunkAPI.dispatch,
            serviceMethod: authApi.login,
            payload: data
        });
    }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    return loaderService({
        dispatch: thunkAPI.dispatch,
        serviceMethod: authApi.logout,
        payload: _,
        options: {
            skipLoader: true
        }
    });
});

const auth = createSlice({
    name: "auth",
    initialState: initialState(),
    reducers: {},
    extraReducers: (builders) => {
        builders
            .addCase(authenticate.fulfilled, (state, action: PayloadAction<any>) => {
                state.userInfo = action.payload;
                sessionStorage.setItem(STORAGE_KEY.AUTH, JSON.stringify(state));
            })
            .addCase(signupUser.fulfilled, (state, action: PayloadAction<any>) => {
                state.userInfo = action.payload;
                sessionStorage.setItem(STORAGE_KEY.AUTH, JSON.stringify(state));
            })
            .addCase(logout.fulfilled, (state) => {
                sessionStorage.removeItem(STORAGE_KEY.AUTH);
                state.token = null;
                state.userInfo = null;
            });
    }
});

const { reducer } = auth;
export default reducer;
