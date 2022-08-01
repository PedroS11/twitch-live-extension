import {
    FollowedLivestream,
    FollowedLivestreamResponse,
    GetFollowedStreams,
    GetFollowedStreamsResponse,
    GetGame,
    GetStream,
    GetStreamsResponse,
    GetUser,
    GetUserFollow,
    TopLivestream,
    TopLivestreamResponse,
    ValidateTokenResponse,
} from '../../domain/infrastructure/twitch/twitch';
import {
    getFollowedStreams,
    getGames,
    getStreams,
    getUserFollows,
    getUsers,
    MAX_INTEGER_VALUE,
    validateToken,
} from './twitchRepository';
import { POOLING_JUST_WENT_LIVE } from '../../domain/infrastructure/background/constants';
import * as localStorageService from '../localStorage/localStorageService';

export const getGameById = async (gameId: string): Promise<GetGame> => {
    const response: GetGame[] = await getGames([gameId]);

    return response?.[0];
};

export const getUserById = async (userId: string): Promise<GetUser> => {
    const response: GetUser[] = await getUsers([userId]);

    return response?.[0];
};

export const getUserFollowers = async (userId: string): Promise<GetUserFollow[]> => {
    return await getUserFollows(userId, '', MAX_INTEGER_VALUE);
};

export const getCurrentUser = async (): Promise<ValidateTokenResponse> => {
    return await validateToken();
};

export const getNumberOfLivestreams = async (): Promise<number | null> => {
    let nrStreams = 0;

    // The first time it's installed, there's no token, so it shouldn't render the icon
    const token: string = localStorageService.getToken();

    if (!token) {
        return null;
    }

    const user: ValidateTokenResponse = await getCurrentUser();

    if (user) {
        const streams: GetFollowedStreamsResponse = await getFollowedStreams(user.user_id);
        nrStreams = streams.data.length;
    }

    return nrStreams;
};

export const getFollowedLivestreams = async (
    userId: string,
    cursor?: string,
): Promise<FollowedLivestreamResponse> => {
    const streams: GetFollowedStreamsResponse = await getFollowedStreams(userId, cursor, 20);

    const promisesGetExtraInfo = streams.data.map(
        async (stream: GetFollowedStreams): Promise<FollowedLivestream> => {
            const streamerInfo: GetUser = await getUserById(stream.user_id);

            const result: Partial<FollowedLivestream> = {
                viewer_count: stream.viewer_count,
                id: stream.id,
                started_at: stream.started_at,
                title: stream.title,
                game: stream.game_name,
                display_name: streamerInfo.display_name,
                profile_image_url: streamerInfo.profile_image_url,
                user_id: streamerInfo.id,
                url: `https://twitch.tv/${streamerInfo.login}`,
            };

            return result as FollowedLivestream;
        },
    );

    const response: FollowedLivestreamResponse = {
        cursor: streams.pagination?.cursor,
        data: [],
    };

    const responseLivestreams: PromiseSettledResult<
        FollowedLivestream
    >[] = await Promise.allSettled(promisesGetExtraInfo);

    responseLivestreams.forEach((result: PromiseSettledResult<FollowedLivestream>) => {
        if (result.status === 'fulfilled') {
            response.data = [...response.data, result.value];
        }
    });

    return response;
};

export const getJustWentLive = async () => {
    const user: ValidateTokenResponse = await getCurrentUser();

    const livestreams: FollowedLivestreamResponse = await getFollowedLivestreams(user.user_id);

    const nowUTC: Date = new Date(new Date().getTime());

    return livestreams.data.filter(
        (stream: FollowedLivestream) =>
            Math.round((nowUTC.getTime() - new Date(stream.started_at).getTime()) / (60 * 1000)) <=
            POOLING_JUST_WENT_LIVE,
    );
};

export const getTopTwitchLiveStreams = async (cursor?: string): Promise<TopLivestreamResponse> => {
    const streams: GetStreamsResponse = await getStreams(cursor);

    const promisesGetExtraInfo = streams.data.map(
        async (stream: GetStream): Promise<TopLivestream> => {
            const streamerInfo: GetUser = await getUserById(stream.user_id);

            const result: Partial<TopLivestream> = {
                viewer_count: stream.viewer_count,
                id: stream.id,
                started_at: stream.started_at,
                title: stream.title,
                game: stream.game_name,
                display_name: streamerInfo.display_name,
                profile_image_url: streamerInfo.profile_image_url,
                user_id: streamerInfo.id,
                url: `https://twitch.tv/${streamerInfo.login}`,
                thumbnail_url: stream.thumbnail_url,
            };

            return result as TopLivestream;
        },
    );

    const response: TopLivestreamResponse = {
        cursor: streams.pagination?.cursor,
        data: [],
    };

    const responseLivestreams: PromiseSettledResult<TopLivestream>[] = await Promise.allSettled(
        promisesGetExtraInfo,
    );

    responseLivestreams.forEach((result: PromiseSettledResult<TopLivestream>) => {
        if (result.status === 'fulfilled') {
            response.data = [...response.data, result.value];
        }
    });

    return response;
};
