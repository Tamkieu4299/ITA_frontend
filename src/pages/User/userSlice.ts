/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import answerApi from "api/studioService/answerApi";
import cvApi from "api/studioService/cvApi";
import interviewSessionApi from "api/studioService/interviewSessionApi";
import jdApi from "api/studioService/jdApi";
import questionApi from "api/studioService/questionApi";
import textApi from "api/studioService/textApi";
import loaderService from "components/Loader/loaderService";
import { IUser } from "pages/interface";

const initialState = (): IUser => {
    return {
        interviewList: [],
        questionList: []
    };
};

export const getInterviewSessionList = createAsyncThunk(
    "user/interviewSession",
    async (_, thunkAPI) => {
        return loaderService({
            dispatch: thunkAPI.dispatch,
            serviceMethod: interviewSessionApi.getInterviewSessionList,
            payload: _
        });
    }
);

export const getInterviewSessionById = createAsyncThunk(
    "user/getInterviewSessionById",
    async (id: string, thunkAPI) => {
        return loaderService({
            dispatch: thunkAPI.dispatch,
            serviceMethod: interviewSessionApi.getInterviewSessionById,
            payload: id
        });
    }
);

export const getCVById = createAsyncThunk("user/getCVById", async (id: string, thunkAPI) => {
    return loaderService({
        dispatch: thunkAPI.dispatch,
        serviceMethod: cvApi.getCVById,
        payload: id
    });
});

export const getJDById = createAsyncThunk("user/getJDById", async (id: string, thunkAPI) => {
    return loaderService({
        dispatch: thunkAPI.dispatch,
        serviceMethod: jdApi.getJDById,
        payload: id
    });
});

export const getJDText = createAsyncThunk(
    "user/getJDById",
    async (params: { parent_id: string }, thunkAPI) => {
        return loaderService({
            dispatch: thunkAPI.dispatch,
            serviceMethod: textApi.getTextByParent,
            payload: params
        });
    }
);

export const getQuestionList = createAsyncThunk(
    "user/getQuestionList",
    async (params: { interview_session_id: string }, thunkAPI) => {
        return loaderService({
            dispatch: thunkAPI.dispatch,
            serviceMethod: questionApi.getQuestionByInterviewId,
            payload: params
        });
    }
);

export const getAnswerByQuestionId = createAsyncThunk(
    "user/getAnswerByQuestionId",
    async (id: string, thunkAPI) => {
        return loaderService({
            dispatch: thunkAPI.dispatch,
            serviceMethod: answerApi.getAnswerByQuestionId,
            payload: id
        });
    }
);

const user = createSlice({
    name: "user",
    initialState: initialState(),
    reducers: {},
    extraReducers: (builders) => {
        builders
            .addCase(getInterviewSessionList.fulfilled, (state, action: PayloadAction<any>) => {
                state.interviewList = action.payload;
            })
            .addCase(getQuestionList.fulfilled, (state, action: PayloadAction<any>) => {
                state.questionList = action.payload;
            });
    }
});

const { reducer } = user;
export default reducer;
