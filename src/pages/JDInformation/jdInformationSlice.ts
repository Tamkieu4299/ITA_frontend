/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jdApi from "api/studioService/jdApi";
import textApi from "api/studioService/textApi";
import loaderService from "components/Loader/loaderService";

const initialState = () => {
    return {};
};

export const createJD = createAsyncThunk(
    "jdInformation/createJD",
    async (data: { title: string }, thunkAPI) => {
        return loaderService({
            dispatch: thunkAPI.dispatch,
            serviceMethod: jdApi.createJD,
            payload: data
        });
    }
);

export const createTextFromParagraph = createAsyncThunk(
    "jdInformation/createTextFromParagraph",
    async (data: { text: string; parent_id: string }, thunkAPI) => {
        return loaderService({
            dispatch: thunkAPI.dispatch,
            serviceMethod: textApi.createTextFromParagraph,
            payload: data
        });
    }
);

const jdInformation = createSlice({
    name: "jdInformation",
    initialState: initialState(),
    reducers: {}
});

const { reducer } = jdInformation;
export default reducer;
