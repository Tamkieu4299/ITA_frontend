/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import generationApi from "api/studioService/generationApi";
import userApi from "api/studioService/userApi";
import loaderService from "components/Loader/loaderService";

const initialState = () => {
    return {};
};

export const getBaseGeneration = createAsyncThunk(
    "avatarList/getBaseGeneration",
    async (_, thunkAPI) => {
        return loaderService({
            dispatch: thunkAPI.dispatch,
            serviceMethod: generationApi.getBaseGeneration,
            payload: _
        });
    }
);

export const getUserById = createAsyncThunk(
    "jobList/getUserById",
    async (data: string, thunkAPI) => {
        return loaderService({
            dispatch: thunkAPI.dispatch,
            serviceMethod: userApi.getUserById,
            payload: data
        });
    }
);

const avatarList = createSlice({
    name: "avatarList",
    initialState: initialState(),
    reducers: {}
});

const { reducer } = avatarList;
export default reducer;
