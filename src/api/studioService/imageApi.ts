import { IImageUpload } from "pages/interface";
import axiosClient from "../axiosClient";

const imageApi = {
    createImage: ({ file, params }: IImageUpload) => {
        const url = "/api/v1/studio/image/create/";
        return axiosClient.post(url, file, {
            params,
            headers: { "Content-Type": "multipart/form-data" }
        });
    },
    getImageById: (id: string) => {
        const url = `/api/v1/studio/image/get/${id}`;
        return axiosClient.get(url);
    }
};

export default imageApi;
