import { axiosInterceptor } from "../axios/axiosInterceptor";
import axios, { AxiosInstance } from "axios";
import { getTokenFromStorage } from "../localStorage/localStorageService";
import {
	TwitchFollowedStream,
	TwitchStream,
	TwitchUser,
} from "../../domain/twitch/api";
import { FollowedStream, TopStream } from "../../domain/twitch/service";
import { sendGetTokenMessage } from "../background/messageWrapper";
import fetchAdapter from "@vespaiach/axios-fetch-adapter";

export const getRefreshToken = async (promptPopup = false): Promise<string> => {
	await sendGetTokenMessage(promptPopup);

	return await getTokenFromStorage();
};

export const getToken = async (): Promise<string> => {
	try {
		console.log("getToken-init");
		const tokenStorage = await getTokenFromStorage();
		console.log("getToken-toke", tokenStorage);
		if (!tokenStorage) {
			console.log("Send getToken");
			const x = await sendGetTokenMessage(true);
			console.log("END", x);
			return await getTokenFromStorage();
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
			adapter: fetchAdapter,
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
