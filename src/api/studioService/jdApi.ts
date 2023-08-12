import axiosClient from "../axiosClient";

const jdApi = {
    getJDById: (id: string) => {
        const url = `/api/v1/studio/jd/get/${id}`;
        return axiosClient.get(url);
    },
    getAllJds: () => {
        const url = "/api/v1/studio/jd/";
        return axiosClient.get(url);
    },
    createJD: (params: { title: string }) => {
        const url = "/api/v1/studio/jd/create";
        return axiosClient.post(
            url,
            {},
            {
                params
            }
        );
    }
};

export default jdApi;
