import { IVideoUpload } from "pages/interface";
import axiosClient from "../axiosClient";

const videoApi = {
    getVideoById: (id: string) => {
        const url = `/api/v1/studio/video/get/${id}`;
        return axiosClient.get(url);
    },
    getVideoByUser: (params: { user_id: string }) => {
        const url = "/api/v1/studio/video/get_by_user/";
        return axiosClient.get(url, { params });
    },
    createVideo: ({ file, params }: IVideoUpload) => {
        const url = "/api/v1/studio/video/create";
        return axiosClient.post(url, file, {
            headers: { "Content-Type": "multipart/form-data" },
            params
        });
    }
};

export default videoApi;
