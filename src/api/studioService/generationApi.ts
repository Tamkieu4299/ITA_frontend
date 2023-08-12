import { talkingMLParams } from "pages/interface";
import axiosClient from "../axiosClient";
import { GeneratedAvatar } from "types/generatedAvatar";

const generationApi = {
    getBaseGeneration: () => {
        const url = "/api/v1/studio/generation/base";
        return axiosClient.get(url);
    },
    getGenerationByUser: (params: Partial<GeneratedAvatar>) => {
        const url = "/api/v1/studio/generation/get_by_user/";
        return axiosClient.get(url, { params });
    },
    getGenerationById: (id: string) => {
        const url = `/api/v1/studio/generation/get/${id}`;
        return axiosClient.get(url);
    },
    sendTalkingHead: (params: talkingMLParams) => {
        const url = "/api/v1/studio/generation/send/talking_head";
        return axiosClient.post(url, "", { params });
    },
    createGeneration: (params: Omit<GeneratedAvatar, "id">) => {
        const url = "/api/v1/studio/generation/create";
        return axiosClient.post(
            url,
            {},
            {
                params
            }
        );
    },
    updateGenerationType: (data: Partial<GeneratedAvatar>) => {
        const url = "/api/v1/studio/generation/update_type/";
        return axiosClient.put(url, data);
    }
};

export default generationApi;
