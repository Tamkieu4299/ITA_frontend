import { IS3BinaryParams, IS3Upload } from "pages/interface";
import axiosClient from "../axiosClient";

const s3Api = {
    uploadFile: ({ params, file }: IS3Upload) => {
        const url = "/api/v1/studio/s3/upload_s3/";
        return axiosClient.post(url, file, {
            params,
            headers: { "Content-Type": "multipart/form-data" }
        });
    },
    getBinaryFile: (params: IS3BinaryParams) => {
        const url = "/api/v1/studio/s3/get_binary/";
        return axiosClient.get(url, {
            params,
            responseType: "blob"
        });
    },
    getBinaryCodecsFile: (params: IS3BinaryParams) => {
        const url = "/api/v1/studio/s3/get_binary_video_convert_codecs/";
        return axiosClient.get(url, {
            params,
            responseType: "blob"
        });
    }
};

export default s3Api;
