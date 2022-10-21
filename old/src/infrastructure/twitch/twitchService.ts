import {
    FollowedLivestream,
    FollowedLivestreamResponse,
    GetFollowedStreams,
    GetFollowedStreamsResponse,
    GetStream,
    GetStreamsResponse,
    GetUser,
    TopLivestream,
    TopLivestreamResponse,
    ValidateTokenResponse,
} from '../../domain/infrastructure/twitch/twitch';
import { getFollowedStreams, getStreams, getUsers, validateToken } from './twitchRepository';
import {
    POOLING_JUST_WENT_LIVE,
    ONE_MINUTE_IN_MILLISECONDS,
} from '../../domain/infrastructure/background/constants';
import * as localStorageService from '../localStorage/localStorageService';

export const getUserById = async (userId: string): Promise<GetUser> => {
    const response: GetUser[] = await getUsers([userId]);

    return response?.[0];
};

export const getCurrentUser = async (): Promise<ValidateTokenResponse> => {
    return await validateToken();
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

export const getAllFollowedStreams = async (userId: string): Promise<FollowedLivestream[]> => {
    try {
        let streams: FollowedLivestream[] = [];
        let response: FollowedLivestreamResponse;
        let cursor: string | undefined = '';
        do {
            response = await getFollowedLivestreams(userId, cursor);

            cursor = response?.cursor;
            streams = [...streams, ...response.data];
        } while (response?.cursor);

        return streams;
    } catch (e) {
        console.error('Error getting followed streams', e?.response?.data || e.message);
        throw e;
    }
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
        const streams: FollowedLivestream[] = await getAllFollowedStreams(user.user_id);
        nrStreams = streams.length;
    }

    return nrStreams;
};

export const getJustWentLive = async () => {
    const user: ValidateTokenResponse = await getCurrentUser();

    const livestreams: FollowedLivestream[] = await getAllFollowedStreams(user.user_id);

    const nowUTC: Date = new Date(new Date().getTime());

    return livestreams.filter(
        (stream: FollowedLivestream) =>
            Math.round(
                (nowUTC.getTime() - new Date(stream.started_at).getTime()) /
                    ONE_MINUTE_IN_MILLISECONDS,
            ) <= POOLING_JUST_WENT_LIVE,
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
