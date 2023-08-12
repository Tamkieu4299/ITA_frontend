import axiosClient from "../axiosClient";
import { CVUpload } from "pages/interface";

const cvApi = {
    getCVById: (id: string) => {
        const url = `/api/v1/studio/cv/get/${id}`;
        return axiosClient.get(url);
    },
    getCVByUserId: (params: { user_id: string }) => {
        const url = "/api/v1/studio/cv/get_by_user/";
        return axiosClient.get(url, { params });
    },
    createCV: ({ file, params }: CVUpload) => {
        const url = "/api/v1/studio/cv/create";
        return axiosClient.post(url, file, {
            params,
            headers: { "Content-Type": "multipart/form-data" }
        });
    }
};

export default cvApi;
