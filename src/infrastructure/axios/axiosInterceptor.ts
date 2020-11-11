import { AxiosInstance } from 'axios';
import { getToken, getRefreshToken } from '../twitch/twitchHelpers';

export const axiosInterceptor = (axios: AxiosInstance): AxiosInstance => {
    axios.interceptors.request.use(
        async (config) => {
            const token = await getToken();
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            Promise.reject(error);
        },
    );

    //Add a response interceptor
    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const newToken = await getRefreshToken();

                axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
                return axios(originalRequest);
            }

            return Promise.reject(error);
        },
    );

    return axios;
};
