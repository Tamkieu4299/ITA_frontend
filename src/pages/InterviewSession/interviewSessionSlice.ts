/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import answerApi from "api/studioService/answerApi";
import questionApi from "api/studioService/questionApi";
import loaderService from "components/Loader/loaderService";
import { IQuestionSelection, ISendAnswer } from "pages/interface";

const initialState = () => {
    return {};
};

export const getQuestionById = createAsyncThunk(
    "interviewSession/getQuestionById",
    async (data: string, thunkAPI) => {
        return loaderService({
            dispatch: thunkAPI.dispatch,
            serviceMethod: questionApi.getQuestionById,
            payload: data
        });
    }
);

export const sendQuestionSelection = createAsyncThunk(
    "interviewSession/sendQuestionSelection",
    async (data: IQuestionSelection, thunkAPI) => {
        return loaderService({
            dispatch: thunkAPI.dispatch,
            serviceMethod: questionApi.sendQuestionSelection,
            payload: data
        });
    }
);

export const createAnswer = createAsyncThunk(
    "interviewSession/createAnswer",
    async (data: ISendAnswer, thunkAPI) => {
        return loaderService({
            dispatch: thunkAPI.dispatch,
            serviceMethod: answerApi.createAnswer,
            payload: data
        });
    }
);

export const sendAnswerAnalysis = createAsyncThunk(
    "interviewSession/sendAnswerAnalysis",
    async (data: { answer_id: string }, thunkAPI) => {
        return loaderService({
            dispatch: thunkAPI.dispatch,
            serviceMethod: answerApi.sendAnswerAnalysis,
            payload: data,
            options: {
                skipLoader: true
            }
        });
    }
);

const interviewSession = createSlice({
    name: "interviewSession",
    initialState: initialState(),
    reducers: {}
});

const { reducer } = interviewSession;
export default reducer;
