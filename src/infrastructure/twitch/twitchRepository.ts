import type { AxiosInstance, AxiosResponse } from "axios";
import { API_BASE_URL, CLIENT_ID, OAUTH_BASE_URL } from "../../config";
import { createTwitchInstance, getToken } from "./twitchHelpers";
import {
	GetFollowedStreamsResponse,
	GetStreamsResponse,
	GetUsersResponse,
	ValidateTokenResponse,
} from "../../domain/twitch/api";

let apiInstance: AxiosInstance;
let oAuthInstance: AxiosInstance;

/**
 * Gets the Twitch OAuth instance
 */
const getOAuthInstance = (): AxiosInstance => {
	if (!oAuthInstance) {
		oAuthInstance = createTwitchInstance();
	}
	return oAuthInstance;
};

/**
 * Gets the Twitch api instance
 */
const getApiInstance = (): AxiosInstance => {
	if (!apiInstance) {
		apiInstance = createTwitchInstance(CLIENT_ID);
	}
	return apiInstance;
};

/**
 * Revokes the authentication token from current logged in user
 */
export const revokeTwitchToken = async (): Promise<void> => {
	try {
		const token: string = await getToken();
		await getOAuthInstance().post(
			`${OAUTH_BASE_URL}/revoke?client_id=${CLIENT_ID}&token=${token}`,
		);
	} catch (e) {
		console.error(
			"Error revoking token",
			JSON.stringify(e?.response?.data) || e.message,
		);
		throw e;
	}
};

/**
 * Validates the token for the current logged-in user
 */
export const validateTwitchToken = async (): Promise<ValidateTokenResponse> => {
	try {
		const response: AxiosResponse<ValidateTokenResponse> =
			await getOAuthInstance().get(`${OAUTH_BASE_URL}/validate`);

		return response.data;
	} catch (e) {
		console.error(
			"Error validating the token",
			JSON.stringify(e?.response?.data) || e.message,
		);
		throw e;
	}
};

/**
 * Gets information about active streams. Streams are returned sorted by number of current viewers, in descending order.
 * @param {string} after - Cursor for forward pagination: tells the server where to start fetching the next set of results, in a multi-page response. The cursor value specified here is from the pagination response field of a prior query.
 * @param {string} before - Cursor for backward pagination: tells the server where to start fetching the next set of results, in a multi-page response. The cursor value specified here is from the pagination response field of a prior query.
 * @param {string[]} usersIds - Returns streams broadcast by one or more specified user IDs. You can specify up to 100 IDs.
 * @param {string[]} gamesIds - Returns streams broadcasting a specified game ID. You can specify up to 100 IDs.
 * @param {string[]} languages - Stream language. You can specify up to 100 languages. A language value must be either the ISO 639-1 two-letter code for a supported stream language or “other”.
 * @param {string[]} usersLogins - Returns streams broadcast by one or more specified user login names. You can specify up to 100 names.
 * @param {number} first - Maximum number of objects to return. Maximum: 100. Default: 20.
 */
export const getTwitchStreams = async (
	after = "",
	before = "",
	usersIds: string[] = [],
	gamesIds: string[] = [],
	languages: string[] = [],
	usersLogins: string[] = [],
	first = 20,
): Promise<GetStreamsResponse> => {
	try {
		const url = new URL(`${API_BASE_URL}/streams`);

		if (after) {
			url.searchParams.append("after", after);
		}
		if (before) {
			url.searchParams.append("before", before);
		}
		usersIds.length &&
			usersIds.map((userId) => url.searchParams.append("user_id", userId));
		gamesIds.length &&
			gamesIds.map((gameId) => url.searchParams.append("game_id", gameId));
		languages.length &&
			languages.map((lang) => url.searchParams.append("language", lang));
		usersLogins.length &&
			usersLogins.map((userLogin) =>
				url.searchParams.append("user_login", userLogin),
			);
		url.searchParams.append("first", first.toString());

		const response: AxiosResponse<GetStreamsResponse> =
			await getApiInstance().get(url.href);

		return response.data;
	} catch (e) {
		console.error(
			"Error getting streams",
			JSON.stringify(e?.response?.data) || e.message,
		);
		throw e;
	}
};

/**
 * Gets information about one or more specified Twitch users. Users are identified by optional user IDs and/or login name. If neither a user ID nor a login name is specified, the user is looked up by Bearer token.
 * @param {string[]} ids - User ID. Multiple user IDs can be specified. Limit: 100.
 * @param {string[]} login - User login name. Multiple login names can be specified. Limit: 100.
 */
export const getTwitchUsers = async (
	ids: string[] = [],
	login: string[] = [],
): Promise<GetUsersResponse> => {
	try {
		const response: AxiosResponse<GetUsersResponse> = await getApiInstance()
			.get(`${API_BASE_URL}/users?
            ${ids.map((id) => `&id=${id}`).join("")}
            ${login.map((login) => `&login=${login}`).join("")}`);

		return response.data;
	} catch (e) {
		console.error(
			"Error getting users",
			JSON.stringify(e?.response?.data) || e.message,
		);
		throw e;
	}
};

/**
 * Gets information about active streams belonging to channels that the authenticated user follows. Streams are returned sorted by number of current viewers, in descending order. Across multiple pages of results, there may be duplicate or missing streams, as viewers join and leave streams.
 * @param {string} userId - Results will only include active streams from the channels that this Twitch user follows. user_id must match the User ID in the bearer token.
 * @param {string} after - Cursor for forward pagination: tells the server where to start fetching the next set of results, in a multi-page response. The cursor value specified here is from the pagination response field of a prior query.
 * @param {number} first - Maximum number of objects to return. Maximum: 100. Default: 100.
 */
export const getTwitchFollowedStreams = async (
	userId: string,
	after = "",
	first = 10,
): Promise<GetFollowedStreamsResponse> => {
	try {
		const url = new URL(`${API_BASE_URL}/streams/followed?user_id=${userId}`);

		if (after) {
			url.searchParams.append("after", after);
		}

		url.searchParams.append("first", first.toString());

		const response: AxiosResponse<GetFollowedStreamsResponse> =
			await getApiInstance().get(url.href);

		return response.data;
	} catch (e) {
		console.error(
			"Error getting followed streams",
			JSON.stringify(e?.response?.data) || e.message,
		);
		throw e;
	}
};
