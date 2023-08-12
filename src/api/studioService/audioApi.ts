import { IVideoUpload } from "pages/interface";
import axiosClient from "../axiosClient";

const audioApi = {
    createAudio: ({ file, params }: IVideoUpload) => {
        const url = "/api/v1/studio/audio/create";
        return axiosClient.post(url, file, {
            params,
            headers: { "Content-Type": "multipart/form-data" }
        });
    },
    getAudioById: (id: string) => {
        const url = `/api/v1/studio/audio/get/${id}`;
        return axiosClient.get(url);
    }
};

export default audioApi;
