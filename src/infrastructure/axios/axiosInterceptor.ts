import { getToken, refreshToken } from "../twitch/twitchHelpers";
import { AxiosInstance } from "axios";
import {
	clearBadgeText,
	getBadgeText,
	setErrorBadgeText,
} from "../utils/setBadgeIcon";
import { AUTH_ERROR_BADGE_TEST } from "../../domain/background/constants";

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

	axios.interceptors.response.use(
		async (response) => {
			const badgeText = await getBadgeText();
			if (badgeText === AUTH_ERROR_BADGE_TEST) {
				await clearBadgeText();
			}

			return response;
		},
		async (error) => {
			const originalRequest = error.config;

			originalRequest._retryCount = originalRequest?._retryCount
				? ++originalRequest._retryCount
				: 1;

			try {
				if (originalRequest._retryCount < 1) {
					const newToken = await refreshToken();

					axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
					return axios(originalRequest);
				}
			} catch (error) {
				await setErrorBadgeText(AUTH_ERROR_BADGE_TEST);

				return Promise.reject(error);
			}
			await setErrorBadgeText(AUTH_ERROR_BADGE_TEST);

			return Promise.reject(error);
		},
	);

	return axios;
};
