import { getToken, getRefreshToken } from "../twitch/twitchHelpers";
import { AxiosInstance } from "axios";

export const axiosInterceptor = (axios: AxiosInstance): AxiosInstance => {
	axios.interceptors.request.use(
		async (config) => {
			const token = await getToken();
			if (token) {
				config.headers["Authorization"] = `Bearer ${token}`;
			}
			return config;
		},
		(error) => Promise.reject(error),
	);

	//Add a response interceptor
	axios.interceptors.response.use(
		(response) => response,
		async (error) => {
			const originalRequest = error.config;
			originalRequest._retryCount = ++originalRequest._retryCount || 1;

			if (originalRequest._retryCount < 3) {
				const forceAuthenticationPopup: boolean = [401, 403].includes(
					error?.response?.status,
				);
				const newToken = await getRefreshToken(forceAuthenticationPopup);

				axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
				return axios(originalRequest);
			}

			return Promise.reject(error);
		},
	);

	return axios;
};
