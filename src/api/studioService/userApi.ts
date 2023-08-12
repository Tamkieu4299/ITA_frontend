import { IFormLogin } from "pages/interface";
import axiosClient from "../axiosClient";

const userApi = {
    register: (data: IFormLogin) => {
        const url = "/api/v1/studio/user";
        return axiosClient.post(url, data);
    },
    getUserById: (id: string) => {
        const url = `/api/v1/studio/user/${id}`;
        return axiosClient.get(url);
    }
};

export default userApi;
