/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cvApi from "api/studioService/cvApi";
import jdApi from "api/studioService/jdApi";
import questionApi from "api/studioService/questionApi";
import loaderService from "components/Loader/loaderService";
import { QuestionGeneration } from "pages/interface";

const initialState = () => {
    return {};
};

export const getCVByUserId = createAsyncThunk(
    "jobList/getCV",
    async (data: { user_id: string }, thunkAPI) => {
        return loaderService({
            dispatch: thunkAPI.dispatch,
            serviceMethod: cvApi.getCVByUserId,
            payload: data
        });
    }
);

export const getAllJds = createAsyncThunk("jobList/getAllJds", async (_, thunkAPI) => {
    return loaderService({
        dispatch: thunkAPI.dispatch,
        serviceMethod: jdApi.getAllJds,
        payload: _
    });
});

export const sendQuestionGeneration = createAsyncThunk(
    "jobList/sendQuestion",
    async (data: QuestionGeneration, thunkAPI) => {
        return loaderService({
            dispatch: thunkAPI.dispatch,
            serviceMethod: questionApi.sendQuestionGeneration,
            payload: data
        });
    }
);

const jobList = createSlice({
    name: "jobList",
    initialState: initialState(),
    reducers: {}
});

const { reducer } = jobList;
export default reducer;
