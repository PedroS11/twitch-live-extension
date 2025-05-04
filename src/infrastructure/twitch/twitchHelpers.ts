import { axiosInterceptor } from "../axios/axiosInterceptor";
import axios, { AxiosInstance } from "axios";
import {
	getTokenFromStorage,
	storeTokenOnStorage,
} from "../localStorage/localStorageService";
import {
	TwitchFollowedStream,
	TwitchStream,
	TwitchUser,
} from "../../domain/twitch/api";
import { FollowedStream, TopStream } from "../../domain/twitch/service";
import { fetchToken } from "../identityFlowAuth/identityFlowAuth";

export const refreshToken = async (promptPopup = false): Promise<string> => {
	const token = await fetchToken(promptPopup);
	await storeTokenOnStorage(token);
	return token;
};

export const getToken = async (): Promise<string> => {
	try {
		const tokenStorage = await getTokenFromStorage();

		if (!tokenStorage) {
			// As soon as Mozilla supports background messages returning data
			// We can read the token as a background response instead of getting it from the storage
			const token = await fetchToken(true);
			await storeTokenOnStorage(token);
			return token;
		}
		return tokenStorage;
	} catch (e) {
		console.error(
			"Error getting token",
			JSON.stringify(e?.response?.data) || e.message,
		);
		throw e;
	}
};

export const createTwitchInstance = (clientId = ""): AxiosInstance =>
	axiosInterceptor(
		axios.create({
			headers: {
				...(clientId && { "Client-Id": clientId }),
			},
			adapter: "fetch",
		}),
	);

export const createFollowedTopStream = (
	stream: TwitchStream | TwitchFollowedStream,
	streamer: TwitchUser,
): FollowedStream | TopStream => ({
	viewer_count: stream.viewer_count,
	id: stream.id,
	started_at: stream.started_at,
	title: stream.title,
	game: stream.game_name,
	display_name: streamer.display_name,
	profile_image_url: streamer.profile_image_url,
	user_id: streamer.id,
	url: `https://twitch.tv/${streamer.login}`,
});
