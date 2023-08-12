/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import audioApi from "api/studioService/audioApi";
import generationApi from "api/studioService/generationApi";
import imageApi from "api/studioService/imageApi";
import s3Api from "api/studioService/s3Api";
import videoApi from "api/studioService/videoApi";
import loaderService from "components/Loader/loaderService";
import {
    IImageUpload,
    IS3BinaryParams,
    IS3Upload,
    IStudio,
    IVideoUpload,
    talkingMLParams
} from "pages/interface";
import { GeneratedAvatar } from "types/generatedAvatar";

const initialState = (): IStudio => {
    return {
        activeTabIndex: 0,
        avatarList: []
    };
};

export const createVideo = createAsyncThunk(
    "studio/createVideo",
    async (data: IVideoUpload, thunkAPI) => {
        return loaderService({
            dispatch: thunkAPI.dispatch,
            serviceMethod: videoApi.createVideo,
            payload: data
        });
    }
);

export const createImage = createAsyncThunk(
    "studio/createImage",
    async (data: IImageUpload, thunkAPI) => {
        return loaderService({
            dispatch: thunkAPI.dispatch,
            serviceMethod: imageApi.createImage,
            payload: data
        });
    }
);

export const createAudio = createAsyncThunk(
    "studio/createAudio",
    async (data: IVideoUpload, thunkAPI) => {
        return loaderService({
            dispatch: thunkAPI.dispatch,
            serviceMethod: audioApi.createAudio,
            payload: data
        });
    }
);

export const uploadFileToS3 = createAsyncThunk(
    "studio/uploadS3",
    async (data: IS3Upload, thunkAPI) => {
        return loaderService({
            dispatch: thunkAPI.dispatch,
            serviceMethod: s3Api.uploadFile,
            payload: data
        });
    }
);

export const sendGenerationTalkingHead = createAsyncThunk(
    "studio/sendGenerationTalkingHead",
    async (data: talkingMLParams, thunkAPI) => {
        return loaderService({
            dispatch: thunkAPI.dispatch,
            serviceMethod: generationApi.sendTalkingHead,
            payload: data
        });
    }
);

export const createAvatarGeneration = createAsyncThunk(
    "studio/createAvatarGeneration",
    async (data: Omit<GeneratedAvatar, "id">, thunkAPI) => {
        return loaderService({
            dispatch: thunkAPI.dispatch,
            serviceMethod: generationApi.createGeneration,
            payload: data
        });
    }
);

export const getGenerationById = createAsyncThunk(
    "studio/getGenerationById",
    async (id: string, thunkAPI) => {
        return loaderService({
            dispatch: thunkAPI.dispatch,
            serviceMethod: generationApi.getGenerationById,
            payload: id
        });
    }
);

export const getImageById = createAsyncThunk(
    "studio/getImageById",
    async (id: string, thunkAPI) => {
        return loaderService({
            dispatch: thunkAPI.dispatch,
            serviceMethod: imageApi.getImageById,
            payload: id
        });
    }
);

export const getVideoById = createAsyncThunk(
    "studio/getVideoById",
    async (id: string, thunkAPI) => {
        return loaderService({
            dispatch: thunkAPI.dispatch,
            serviceMethod: videoApi.getVideoById,
            payload: id
        });
    }
);

export const getAudioById = createAsyncThunk(
    "studio/getAudioById",
    async (id: string, thunkAPI) => {
        return loaderService({
            dispatch: thunkAPI.dispatch,
            serviceMethod: audioApi.getAudioById,
            payload: id
        });
    }
);

export const getBinaryFile = createAsyncThunk(
    "studio/getBinaryFile",
    async (params: IS3BinaryParams, thunkAPI) => {
        return loaderService({
            dispatch: thunkAPI.dispatch,
            serviceMethod: s3Api.getBinaryFile,
            payload: params,
            options: { skipLoader: true }
        });
    }
);

export const getBinaryCodecsFile = createAsyncThunk(
    "studio/getBinaryCodecsFile",
    async (params: IS3BinaryParams, thunkAPI) => {
        return loaderService({
            dispatch: thunkAPI.dispatch,
            serviceMethod: s3Api.getBinaryCodecsFile,
            payload: params,
            options: { skipLoader: true }
        });
    }
);

export const getGenerationByUser = createAsyncThunk(
    "studio/userGeneration",
    async (data: Partial<GeneratedAvatar>, thunkAPI) => {
        return loaderService({
            dispatch: thunkAPI.dispatch,
            serviceMethod: generationApi.getGenerationByUser,
            payload: data
        });
    }
);

export const updateGenerationType = createAsyncThunk(
    "studio/updateGenerationType",
    async (data: Partial<GeneratedAvatar>, thunkAPI) => {
        return loaderService({
            dispatch: thunkAPI.dispatch,
            serviceMethod: generationApi.updateGenerationType,
            payload: data
        });
    }
);

const studio = createSlice({
    name: "studio",
    initialState: initialState(),
    reducers: {
        changeTab: (state, action) => {
            console.log(action.payload);
            state.activeTabIndex = action.payload;
        }
    },
    extraReducers: (builders) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        builders.addCase(getGenerationByUser.fulfilled, (state, action: PayloadAction<any>) => {
            state.avatarList = action.payload;
        });
    }
});

const { reducer, actions } = studio;
export const { changeTab } = actions;
export default reducer;
