import { AxiosInstance, AxiosResponse } from 'axios';
import { CLIENT_ID } from '../../config';
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
import { createAxiosInstance, getToken } from './twitchHelpers';

let apiInstance: AxiosInstance;
let oAuthInstance: AxiosInstance;

export const OAUTH_BASE_URL = 'https://id.twitch.tv/oauth2';
const API_BASE_URL = 'https://api.twitch.tv/helix';

export const MAX_INTEGER_VALUE = 100;

const getOAuthInstance = (): AxiosInstance => {
    if (!oAuthInstance) {
        oAuthInstance = createAxiosInstance();
    }
    return oAuthInstance;
};

const getApiInstance = (): AxiosInstance => {
    if (!apiInstance) {
        apiInstance = createAxiosInstance(CLIENT_ID);
    }
    return apiInstance;
};

export const revokeToken = async (): Promise<void> => {
    try {
        const token: string = await getToken();
        await getOAuthInstance().post(`${OAUTH_BASE_URL}/revoke?client_id=${CLIENT_ID}&token=${token}`);
    } catch (e) {
        console.error('Error revoking token', e?.response?.data || e.message);
        throw e;
    }
};

export const validateToken = async (): Promise<ValidateTokenResponse> => {
    try {
        const response: AxiosResponse<ValidateTokenResponse> = await getOAuthInstance().get(
            `${OAUTH_BASE_URL}/validate`,
        );
        return response.data;
    } catch (e) {
        console.error('Error validating the token', e?.response?.data || e.message);
        throw e;
    }
};

export const getUserFollows = async (fromId = '', toId = '', first = 20): Promise<GetUserFollow[]> => {
    if (!fromId && !toId) {
        throw new Error('At minimum, from_id or to_id must be provided for a query to be valid.');
    }

    try {
        let follows: GetUserFollow[] = [];
        let response: AxiosResponse<GetUserFollowsResponse>;
        let cursor: string | undefined = '';

        do {
            const url = new URL(`${API_BASE_URL}/users/follows`);

            fromId && url.searchParams.append('from_id', fromId);
            toId && url.searchParams.append('to_id', toId);
            url.searchParams.append('first', first.toString());
            cursor && url.searchParams.append('after', cursor);

            response = await getApiInstance().get(url.href);

            cursor = response.data?.pagination?.cursor;
            follows = [...follows, ...response.data.data];
        } while (response.data?.pagination?.cursor);

        return follows;
    } catch (e) {
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
    try {
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

            response = await getApiInstance().get(url.href);

            cursor = response.data?.pagination?.cursor;
            liveStreams = [...liveStreams, ...response.data.data];
        } while (response.data?.pagination?.cursor);

        return liveStreams;
    } catch (e) {
        console.error('Error getting streams', e?.response?.data || e.message);
        throw e;
    }
};

export const getUsers = async (ids: string[] = [], login: string[] = []): Promise<GetUser[]> => {
    try {
        const response: AxiosResponse<GetUsersResponse> = await getApiInstance().get(`${API_BASE_URL}/users?
            ${ids.map((id) => `&id=${id}`).join('')}
            ${login.map((login) => `&login=${login}`).join('')}`);

        return response.data.data;
    } catch (e) {
        console.error('Error getting users', e?.response?.data || e.message);
        throw e;
    }
};

export const getGames = async (ids: string[] = [], names: string[] = []): Promise<GetGame[]> => {
    try {
        let games: GetGame[] = [];
        let response: AxiosResponse<GetGamesResponse>;
        let cursor: string | undefined;
        do {
            response = await getApiInstance().get(`${API_BASE_URL}/games?
            ${ids.map((id) => `&id=${id}`).join('')}
            ${names.map((name) => `&name=${name}`).join('')}
            ${cursor ? `&after=${cursor}` : ''}`);

            cursor = response.data?.pagination?.cursor;
            games = [...games, ...response.data.data];
        } while (response.data?.pagination?.cursor);

        return games;
    } catch (e) {
        console.error('Error getting games', e?.response?.data || e.message);
        throw e;
    }
};
