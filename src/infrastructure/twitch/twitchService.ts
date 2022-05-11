import {
    FollowedLivestream,
    GetFollowedStreams,
    GetGame,
    GetUser,
    GetUserFollow,
    ValidateTokenResponse,
} from '../../domain/infrastructure/twitch/twitch';
import {
    getFollowedStreams,
    getGames,
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
        const streams: GetFollowedStreams[] = await getFollowedStreams(user.user_id);
        nrStreams = streams.length;
    }

    return nrStreams;
};

export const getFollowedLivestreams = async (userId: string): Promise<FollowedLivestream[]> => {
    const streams: GetFollowedStreams[] = await getFollowedStreams(userId);

    const promisesGetExtraInfo = streams.map(
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

    let livestreams: FollowedLivestream[] = [];

    const responseLivestreams: PromiseSettledResult<
        FollowedLivestream
    >[] = await Promise.allSettled(promisesGetExtraInfo);

    responseLivestreams.forEach((result: PromiseSettledResult<FollowedLivestream>) => {
        if (result.status === 'fulfilled') {
            livestreams = [...livestreams, result.value];
        }
    });

    return livestreams;
};

export const getJustWentLive = async () => {
    const user: ValidateTokenResponse = await getCurrentUser();

    const livestreams: FollowedLivestream[] = await getFollowedLivestreams(user.user_id);

    const nowUTC: Date = new Date(new Date().getTime());

    return livestreams.filter(
        (stream: FollowedLivestream) =>
            Math.round((nowUTC.getTime() - new Date(stream.started_at).getTime()) / (60 * 1000)) <=
            POOLING_JUST_WENT_LIVE,
    );
};
