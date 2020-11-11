import {
    FollowedLivestream,
    GetGame,
    GetStream,
    GetUser,
    GetUserFollow,
    ValidateTokenResponse,
} from '../../domain/infrastructure/twitch/twitch';
import { getGames, getStreams, getUserFollows, getUsers, MAX_INTEGER_VALUE, validateToken } from './twitchRepository';

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

export const getFollowedLivestreams = async (userIds: string[]): Promise<FollowedLivestream[]> => {
    const streamsPromises = [];

    let streams: GetStream[] = [];

    while (userIds.length) {
        const batch = userIds.splice(0, MAX_INTEGER_VALUE);
        streamsPromises.push(getStreams(batch, [], [], [], MAX_INTEGER_VALUE));
    }

    const response: PromiseSettledResult<GetStream[]>[] = await Promise.allSettled(streamsPromises);

    response.forEach((result: PromiseSettledResult<GetStream[]>) => {
        if (result.status === 'fulfilled') {
            streams = [...streams, ...result.value];
        }
    });

    const promisesGetExtraInfo = streams.map(
        async (stream: GetStream): Promise<FollowedLivestream> => {
            const result: Partial<FollowedLivestream> = {
                viewer_count: stream.viewer_count,
                id: stream.id,
            };

            const promises = [getUserById(stream.user_id), getGameById(stream.game_id)];
            const responses: PromiseSettledResult<GetUser | GetGame>[] = await Promise.allSettled(promises);

            responses.forEach((response: PromiseSettledResult<GetUser | GetGame>) => {
                if (response.status === 'fulfilled') {
                    if (response.value.hasOwnProperty('display_name')) {
                        const user: GetUser = response.value as GetUser;
                        result.display_name = user.display_name;
                        result.profile_image_url = user.profile_image_url;
                        result.user_id = user.id;
                        result.url = `https://twitch.tv/${user.login}`;
                    } else {
                        const game: GetGame = response.value as GetGame;
                        result.game = game.name;
                    }
                }
            });

            return result as FollowedLivestream;
        },
    );

    let livestreams: FollowedLivestream[] = [];

    const responseLivestrams: PromiseSettledResult<FollowedLivestream>[] = await Promise.allSettled(
        promisesGetExtraInfo,
    );

    responseLivestrams.forEach((result: PromiseSettledResult<FollowedLivestream>) => {
        if (result.status === 'fulfilled') {
            livestreams = [...livestreams, result.value];
        }
    });

    return livestreams;
};
