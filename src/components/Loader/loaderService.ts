/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThunkDispatch, AnyAction } from "@reduxjs/toolkit";
import { finishLoading, startLoading } from "./loaderSlice";
import { AxiosResponse } from "axios";

const loaderService = async ({
    options = {},
    dispatch,
    serviceMethod,
    payload = {}
}: {
    options?: { skipLoader?: boolean };
    dispatch: ThunkDispatch<unknown, unknown, AnyAction>;
    serviceMethod: (data?: any) => Promise<AxiosResponse<any, any>>;
    payload: any;
}) => {
    try {
        if (!options.skipLoader) {
            dispatch(startLoading());
        }
        const loaderServiceResponse = await serviceMethod(payload);
        return loaderServiceResponse;
    } catch (e) {
        console.error(e);
    } finally {
        if (!options.skipLoader) {
            dispatch(finishLoading());
        }
    }
};

export default loaderService;
