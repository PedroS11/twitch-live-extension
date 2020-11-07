import axios, {AxiosInstance, AxiosResponse} from 'axios';
import {CLIENT_ID} from '../../config';
import {
    GetGame, GetGamesResponse, GetStream,
    GetStreamsResponse, GetUser, GetUserFollow, GetUserFollowsResponse,
    GetUsersResponse,
    TwitchGetLiveInfo,
    TwitchGetUserInfo,
    TwitchLiveInfo,
    TwitchUserInfo, ValidateTokenResponse,
} from '../../domain/infrastructure/twitch/twitchApi';

let instance: AxiosInstance;

const OAUTH_BASE_URL: string = "https://id.twitch.tv/oauth2";
const API_BASE_URL: string = "https://api.twitch.tv/helix";
export const MAX_INTEGER_VALUE = 100;
/**
 * Get singleton Axios instance
 */
const getAxiosInstance = (): AxiosInstance => {
    if (!instance) {
        instance = axios.create({
            headers: {
                "Client-ID": CLIENT_ID,
                "Authorization": "Bearer TOKEN"
            },
        });
    }

    return instance;
};

/**
 * Get twitch user by Twitch streamer username
 * @param {string} username - Twitch streamer username
 */
export const getTwitchUserInfo = async (username: string): Promise<TwitchUserInfo> => {
    const response: AxiosResponse<TwitchGetUserInfo> = await getAxiosInstance().get(
        `https://api.twitch.tv/kraken/users?login=${username}`,
    );

    return response.data?.users?.[0];
};

/**
 * Get live stream information by Twitch user ID
 * @param {string} id - Twitch streamer id
 */
export const getTwitchLiveInfo = async (id: number): Promise<TwitchLiveInfo> => {
    const response: AxiosResponse<TwitchGetLiveInfo> = await getAxiosInstance().get(
        `https://api.twitch.tv/kraken/streams/?channel=${id}`,
    );

    return response.data?.streams?.[0];
};








export const revokeToken = async (token: string): Promise<void> => {
    await getAxiosInstance().post(`${OAUTH_BASE_URL}/revoke?client_id=${CLIENT_ID}&token=${token}`);
};


export const getUserFollows = async (fromId: string = '', toId: string = '', first = 20): Promise<GetUserFollow[]> => {
    if (!fromId && !toId) {
        throw new Error("At minimum, from_id or to_id must be provided for a query to be valid.");
    }

    let follows: GetUserFollow[] = [];
    let response: AxiosResponse<GetUserFollowsResponse>;
    let cursor: string | undefined = '';

    try {
        do {
            const url = new URL(`${API_BASE_URL}/users/follows`);

            fromId && url.searchParams.append("from_id", fromId);
            toId && url.searchParams.append("to_id", toId);
            url.searchParams.append("first", first.toString());
            cursor && url.searchParams.append("after", cursor);

            response = await getAxiosInstance().get(url.href);

            cursor = response.data?.pagination?.cursor;
            follows = [...follows, ...response.data.data];
        } while (response.data?.pagination?.cursor);

        return follows;
    } catch (e) {
        console.error("Error getting followers", e.response.data || e.message);
        return [];
    }
};

export const validateToken = async (): Promise<ValidateTokenResponse> => {
    try {
        const response: AxiosResponse<ValidateTokenResponse> = await getAxiosInstance().get(
            `${OAUTH_BASE_URL}/validate`
        );

        return response.data;
    } catch (e) {
        console.log("Error retrieving followers", e.response.data || e.message);
        throw e;
    }
};

export const getStreams = async (usersIds: string[] = [], gamesIds: string[] = [], languages: string[] = [], usersLogins: string[] = [], first = 20): Promise<GetStream[]> => {
    let liveStreams: GetStream[] = [];
    let response: AxiosResponse<GetStreamsResponse>;
    let cursor: string | undefined;

    try {
        do {
            const url = new URL(`${API_BASE_URL}/streams`);

            usersIds.length && usersIds.map(userId => url.searchParams.append("user_id", userId));
            gamesIds.length && gamesIds.map(gameId => url.searchParams.append("game_id", gameId));
            languages.length && languages.map(lang => url.searchParams.append("language", lang));
            usersLogins.length && usersLogins.map(userLogin => url.searchParams.append("user_login", userLogin));
            url.searchParams.append("first", first.toString());
            cursor && url.searchParams.append("after", cursor);

            response = await getAxiosInstance().get(url.href);

            cursor = response.data?.pagination?.cursor;
            liveStreams = [...liveStreams, ...response.data.data]
        } while (response.data?.pagination?.cursor) ;
        return liveStreams;
    } catch
        (e) {
        console.log("Error getting streams", e.response.data || e.message);
        throw e;
    }
};

export const getUsers = async (ids: string[] = [], login: string[] = []): Promise<GetUser[]> => {
    let response: AxiosResponse<GetUsersResponse>;

    try {
        response = await getAxiosInstance().get(`${API_BASE_URL}/users?
            ${ids.map(id => `&id=${id}`).join('')}
            ${login.map(login => `&login=${login}`).join('')}`);

        return response.data.data;
    } catch (e) {
        console.log("Error getting users", e.response.data || e.message);
        throw e;
    }
};

export const getGames = async (ids: string[] = [], names: string[] = []): Promise<GetGame[]> => {
    let games: GetGame[] = [];
    let response: AxiosResponse<GetGamesResponse>;
    let cursor: string | undefined;
    try {
        do {
            response = await getAxiosInstance().get(`${API_BASE_URL}/games?
            ${ids.map(id => `&id=${id}`).join('')}
            ${names.map(name => `&name=${name}`).join('')}
            ${cursor ? `&after=${cursor}` : ''}`);

            cursor = response.data?.pagination?.cursor;
            games = [...games, ...response.data.data]
        } while (response.data?.pagination?.cursor);

        return games;
    } catch (e) {
        console.log("Error getting games", e.response.data || e.message);
        throw e;
    }
};