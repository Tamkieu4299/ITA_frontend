import { useEffect, ReactElement, useState } from "react";
import axios, {
    AxiosError,
    AxiosResponse,
    AxiosRequestConfig,
    InternalAxiosRequestConfig
} from "axios";
import queryString from "query-string";
import APP from "../constants/configs";

interface retryAxiosResponseConfig extends AxiosRequestConfig {
    _retry?: boolean;
}

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs
const axiosClient = axios.create({
    headers: {
        "content-type": "application/json"
    },
    baseURL: APP.API_URL,
    paramsSerializer: (params) => queryString.stringify(params)
});

const AxiosInterceptor = ({ children }: { children: ReactElement }): ReactElement | null => {
    const [isSet, setIsSet] = useState<boolean>(false);

    useEffect(() => {
        const resInterceptor = (response: AxiosResponse) => {
            if (response && response.data) {
                return response.data;
            }
            return response;
        };

        const reqInterceptor = (config: InternalAxiosRequestConfig) => {
            // This is for JWT token in the future

            // const authJson = sessionStorage.getItem(Config.storageKey.auth);

            // if (authJson) {
            //     const authValue = {
            //         ...JSON.parse(authJson)
            //     };
            //     if (authValue && config.headers) {
            //         config.headers.Authorization = `Bearer ${authValue.token}`;
            //     }
            // }
            return config;
        };

        const errInterceptor = async (error: AxiosError) => {
            const originalRequest = error.config;
            const retryRequest: retryAxiosResponseConfig = {
                ...originalRequest
            };
            if (error.response?.status === 401) {
                if (!retryRequest._retry) {
                    retryRequest._retry = true;

                    return axiosClient(retryRequest);
                } else {
                    sessionStorage.clear();
                }
            }

            return Promise.reject(error);
        };

        const responseInterceptor = axiosClient.interceptors.response.use(
            resInterceptor,
            errInterceptor
        );
        const requestInterceptor = axiosClient.interceptors.request.use(
            reqInterceptor,
            errInterceptor
        );
        setIsSet(true);

        return () => {
            axiosClient.interceptors.response.eject(responseInterceptor);
            axiosClient.interceptors.request.eject(requestInterceptor);
        };
    }, []);

    return isSet ? children : null;
};

export { AxiosInterceptor };
export default axiosClient;
