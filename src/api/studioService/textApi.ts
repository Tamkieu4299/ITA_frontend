/* eslint-disable @typescript-eslint/no-unused-vars */
import axiosClient from "../axiosClient";

const textApi = {
    getTextByParent: (params: { parent_id: string }) => {
        const url = "/api/v1/studio/text/get_by_parent_id/";
        return axiosClient.get(url, { params });
    },
    createTextFromParagraph: (data: { text: string; parent_id: string }) => {
        const url = "/api/v1/studio/text/create_from_paragraph";
        return axiosClient.post(url, data);
    }
};

export default textApi;
