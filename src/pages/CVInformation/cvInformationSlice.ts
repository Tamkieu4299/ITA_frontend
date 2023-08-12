/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cvApi from "api/studioService/cvApi";
import loaderService from "components/Loader/loaderService";
import { CVUpload } from "pages/interface";

const initialState = () => {
    return {};
};

export const createCV = createAsyncThunk(
    "cvInformation/createCV",
    async (data: CVUpload, thunkAPI) => {
        return loaderService({
            dispatch: thunkAPI.dispatch,
            serviceMethod: cvApi.createCV,
            payload: data
        });
    }
);

const cvInformation = createSlice({
    name: "cvInformation",
    initialState: initialState(),
    reducers: {}
});

const { reducer } = cvInformation;
export default reducer;
