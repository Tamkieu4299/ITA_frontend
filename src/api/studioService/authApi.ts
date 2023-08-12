import { IFormLogin } from "pages/interface";
import axiosClient from "../axiosClient";

const authApi = {
    login: (data: IFormLogin) => {
        const url = "/api/v1/studio/auth/token";
        return axiosClient.post(url, data);
    },
    logout: () => {
        const url = "/api/v1/studio/auth/logout";
        return axiosClient.post(url);
    }
};

export default authApi;
