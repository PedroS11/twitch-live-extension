import {
	getTwitchFollowedStreams,
	getTwitchStreams,
	getTwitchTopGames,
	getTwitchUsers,
	validateTwitchToken,
} from "./twitchRepository";
import { getTokenFromStorage } from "../localStorage/localStorageService";
import {
	GetFollowedStreamsResponse,
	GetStreamsResponse,
	GetTopGamesResponse,
	GetUsersResponse,
	TwitchFollowedStream,
	TwitchStream,
	TwitchTopGame,
	TwitchUser,
	ValidateTokenResponse,
} from "../../domain/twitch/api";
import {
	FollowedStream,
	FollowedStreamResponse,
	TopGame,
	TopGamesResponse,
	TopStream,
	TopStreamResponse,
} from "../../domain/twitch/service";
import { createFollowedTopStream } from "./twitchHelpers";
import {
	ONE_MINUTE_IN_MILLISECONDS,
	POOLING_JUST_WENT_LIVE,
} from "../../domain/background/constants";

/**
 * Gets Twitch user by its id
 * @param {string} userId - Twitch user id
 */
export const getUserById = async (userId: string): Promise<TwitchUser> => {
	const response: GetUsersResponse = await getTwitchUsers([userId]);

	return response?.data[0];
};

/**
 * Gets the token information for the current logged in user
 */
export const getCurrentUser = async (): Promise<ValidateTokenResponse> =>
	validateTwitchToken();

export const getFollowedStreams = async (
	userId: string,
	cursor?: string,
	first = 20,
): Promise<FollowedStreamResponse> => {
	const streams: GetFollowedStreamsResponse = await getTwitchFollowedStreams(
		userId,
		cursor,
		first,
	);

	const promisesGetExtraInfo = streams.data.map(
		async (stream: TwitchFollowedStream): Promise<FollowedStream> => {
			const streamer: TwitchUser = await getUserById(stream.user_id);

			const result: FollowedStream = createFollowedTopStream(stream, streamer);

			return result as FollowedStream;
		},
	);

	const response: FollowedStreamResponse = {
		cursor: streams.pagination?.cursor,
		data: [],
	};

	const responseLivestreams: PromiseSettledResult<FollowedStream>[] =
		await Promise.allSettled(promisesGetExtraInfo);

	responseLivestreams.forEach(
		(result: PromiseSettledResult<FollowedStream>) => {
			if (result.status === "fulfilled") {
				response.data = [...response.data, result.value];
			}
		},
	);

	return response;
};

export const getAllFollowedStreams = async (
	userId: string,
): Promise<FollowedStream[]> => {
	try {
		let streams: FollowedStream[] = [];
		let response: FollowedStreamResponse;
		let cursor: string | undefined = "";
		do {
			response = await getFollowedStreams(userId, cursor, 100);

			cursor = response?.cursor;
			streams = [...streams, ...response.data];
		} while (response?.cursor);

		return streams;
	} catch (e) {
		console.error(
			"Error getting followed streams",
			JSON.stringify(e?.response?.data) || e.message,
		);
		throw e;
	}
};

export const getNumberOfLivestreams = async (): Promise<number | null> => {
	let nrStreams = 0;
	// The first time it's installed, there's no token, so it shouldn't render the icon
	const token: string = await getTokenFromStorage();
	if (!token) {
		return null;
	}
	const user: ValidateTokenResponse = await getCurrentUser();

	if (user) {
		const streams: FollowedStream[] = await getAllFollowedStreams(user.user_id);
		nrStreams = streams.length;
	}

	return nrStreams;
};

export const getJustWentLive = async () => {
	const user: ValidateTokenResponse = await getCurrentUser();

	const livestreams: FollowedStream[] = await getAllFollowedStreams(
		user.user_id,
	);

	const nowUTC: Date = new Date(new Date().getTime());

	return livestreams.filter(
		(stream: FollowedStream) =>
			Math.round(
				(nowUTC.getTime() - new Date(stream.started_at).getTime()) /
					ONE_MINUTE_IN_MILLISECONDS,
			) <= POOLING_JUST_WENT_LIVE,
	);
};

export const getTopStreams = async (
	cursor?: string,
): Promise<TopStreamResponse> => {
	const streams: GetStreamsResponse = await getTwitchStreams(cursor);

	const promisesGetExtraInfo = streams.data.map(
		async (stream: TwitchStream): Promise<TopStream> => {
			const streamer: TwitchUser = await getUserById(stream.user_id);

			const result: TopStream = createFollowedTopStream(stream, streamer);

			return result as TopStream;
		},
	);

	const response: TopStreamResponse = {
		cursor: streams.pagination?.cursor,
		data: [],
	};

	const responseLivestreams: PromiseSettledResult<TopStream>[] =
		await Promise.allSettled(promisesGetExtraInfo);

	responseLivestreams.forEach((result: PromiseSettledResult<TopStream>) => {
		if (result.status === "fulfilled") {
			response.data = [...response.data, result.value];
		}
	});

	return response;
};

export const getTopGames = async (
	cursor?: string,
): Promise<TopGamesResponse> => {
	const topGames: GetTopGamesResponse = await getTwitchTopGames(20, cursor);

	const promisesTopGames = topGames.data.map(
		async (game: TwitchTopGame): Promise<TopGame> => {
			const stream: GetStreamsResponse = await getTwitchStreams(
				"",
				"",
				undefined,
				[game.id],
			);

			return {
				...game,
				viewer_count: stream.data?.[0]?.viewer_count || 0,
			};
		},
	);

	const response: TopGamesResponse = {
		cursor: topGames.pagination?.cursor,
		data: [],
	};

	const promisesSettled: PromiseSettledResult<TopGame>[] =
		await Promise.allSettled(promisesTopGames);

	promisesSettled.forEach((result: PromiseSettledResult<TopGame>) => {
		if (result.status === "fulfilled") {
			response.data = [...response.data, result.value];
		}
	});

	return response;
};
