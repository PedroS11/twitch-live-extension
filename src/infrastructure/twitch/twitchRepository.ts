import {AxiosInstance, AxiosResponse} from 'axios';
import {CLIENT_ID} from '../../config';
import {
    GetGame,
    GetGamesResponse,
    GetStream,
    GetStreamsResponse,
    GetUser,
    GetUserFollow,
    GetUserFollowsResponse,
    GetUsersResponse,
    ValidateTokenResponse,
} from '../../domain/infrastructure/twitch/twitch';
import {createAxiosInstance, getToken, refreshToken} from "./twitchHelpers";

let apiInstance: AxiosInstance;
let oAuthInstance: AxiosInstance;

export const OAUTH_BASE_URL = 'https://id.twitch.tv/oauth2';
const API_BASE_URL = 'https://api.twitch.tv/helix';

export const MAX_INTEGER_VALUE = 100;

const getOAuthInstance = (token: string): AxiosInstance => {
    if (!oAuthInstance) {
        oAuthInstance = createAxiosInstance(token);
    }
    return oAuthInstance;
};

const getApiInstance = (token: string): AxiosInstance => {
    if (!apiInstance) {
        apiInstance = createAxiosInstance(token, CLIENT_ID);
    }
    return apiInstance;
};

export const revokeToken = async (): Promise<void> => {
    const getData = async (): Promise<void> => {
        const token: string = await getToken();
        await getOAuthInstance(token).post(`${OAUTH_BASE_URL}/revoke?client_id=${CLIENT_ID}&token=${token}`);
    };

    try {
        return await getData();
    } catch (e) {
        if (e?.response?.status === 401) {
            const token = await refreshToken();
            oAuthInstance.defaults.headers["Authorization"] = `Bearer ${token}`;

            return await getData();
        }

        console.error('Error revoking token', e?.response?.data || e.message);
        throw e;
    }
};

export const validateToken = async (): Promise<ValidateTokenResponse> => {
    const getData = async (): Promise<ValidateTokenResponse> => {
        const response: AxiosResponse<ValidateTokenResponse> = await getOAuthInstance(await getToken()).get(
            `${OAUTH_BASE_URL}/validate`,
        );

        return response.data;
    };

    try {
        return await getData();
    } catch (e) {
        if (e?.response?.status === 401) {
            const token = await refreshToken();
            oAuthInstance.defaults.headers["Authorization"] = `Bearer ${token}`;

            return await getData();
        }

        console.error('Error validating the token', e?.response?.data || e.message);
        throw e;
    }
};

export const getUserFollows = async (fromId = '', toId = '', first = 20): Promise<GetUserFollow[]> => {
    if (!fromId && !toId) {
        throw new Error('At minimum, from_id or to_id must be provided for a query to be valid.');
    }

    const getData = async (): Promise<GetUserFollow[]> => {
        let follows: GetUserFollow[] = [];
        let response: AxiosResponse<GetUserFollowsResponse>;
        let cursor: string | undefined = '';

        do {
            const url = new URL(`${API_BASE_URL}/users/follows`);

            fromId && url.searchParams.append('from_id', fromId);
            toId && url.searchParams.append('to_id', toId);
            url.searchParams.append('first', first.toString());
            cursor && url.searchParams.append('after', cursor);

            response = await getApiInstance(await getToken()).get(url.href);

            cursor = response.data?.pagination?.cursor;
            follows = [...follows, ...response.data.data];
        } while (response.data?.pagination?.cursor);

        return follows;
    };

    try {
        return await getData();
    } catch (e) {
        if (e?.response?.status === 401) {
            const token = await refreshToken();
            apiInstance.defaults.headers["Authorization"] = `Bearer ${token}`;

            return await getData();
        }

        console.error('Error getting followers', e?.response?.data || e.message);
        throw e;
    }
};

export const getStreams = async (
    usersIds: string[] = [],
    gamesIds: string[] = [],
    languages: string[] = [],
    usersLogins: string[] = [],
    first = 20,
): Promise<GetStream[]> => {
    const getData = async (): Promise<GetStream[]> => {
        let liveStreams: GetStream[] = [];
        let response: AxiosResponse<GetStreamsResponse>;
        let cursor: string | undefined;

        do {
            const url = new URL(`${API_BASE_URL}/streams`);

            usersIds.length && usersIds.map((userId) => url.searchParams.append('user_id', userId));
            gamesIds.length && gamesIds.map((gameId) => url.searchParams.append('game_id', gameId));
            languages.length && languages.map((lang) => url.searchParams.append('language', lang));
            usersLogins.length && usersLogins.map((userLogin) => url.searchParams.append('user_login', userLogin));
            url.searchParams.append('first', first.toString());
            cursor && url.searchParams.append('after', cursor);

            response = await getApiInstance(await getToken()).get(url.href);

            cursor = response.data?.pagination?.cursor;
            liveStreams = [...liveStreams, ...response.data.data];
        } while (response.data?.pagination?.cursor);
        return liveStreams;
    };

    try {
        return await getData();
    } catch (e) {
        if (e?.response?.status === 401) {
            const token = await refreshToken();
            apiInstance.defaults.headers["Authorization"] = `Bearer ${token}`;

            return await getData();
        }

        console.error('Error getting streams', e?.response?.data || e.message);
        throw e;
    }
};

export const getUsers = async (ids: string[] = [], login: string[] = []): Promise<GetUser[]> => {
    const getData = async (): Promise<GetUser[]> => {
        let response: AxiosResponse<GetUsersResponse>;
        response = await getApiInstance(await getToken()).get(`${API_BASE_URL}/users?
            ${ids.map((id) => `&id=${id}`).join('')}
            ${login.map((login) => `&login=${login}`).join('')}`);

        return response.data.data;
    };

    try {
        return await getData();
    } catch (e) {
        if (e?.response?.status === 401) {
            const token = await refreshToken();
            apiInstance.defaults.headers["Authorization"] = `Bearer ${token}`;

            return await getData();
        }

        console.error('Error getting users', e?.response?.data || e.message);
        throw e;
    }
};

export const getGames = async (ids: string[] = [], names: string[] = []): Promise<GetGame[]> => {
    const getData = async (): Promise<GetGame[]> => {
        let games: GetGame[] = [];
        let response: AxiosResponse<GetGamesResponse>;
        let cursor: string | undefined;
        do {
            response = await getApiInstance(await getToken()).get(`${API_BASE_URL}/games?
            ${ids.map((id) => `&id=${id}`).join('')}
            ${names.map((name) => `&name=${name}`).join('')}
            ${cursor ? `&after=${cursor}` : ''}`);

            cursor = response.data?.pagination?.cursor;
            games = [...games, ...response.data.data];
        } while (response.data?.pagination?.cursor);

        return games;
    };

    try {
        return await getData();
    } catch (e) {
        if (e?.response?.status === 401) {
            const token = await refreshToken();
            apiInstance.defaults.headers["Authorization"] = `Bearer ${token}`;

            return await getData();
        }
        console.error('Error getting games', e?.response?.data || e.message);
        throw e;
    }
};
