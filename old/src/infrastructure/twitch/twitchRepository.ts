import { AxiosInstance, AxiosResponse } from 'axios';
import { API_BASE_URL, CLIENT_ID, OAUTH_BASE_URL } from '../../config';
import {
    GetFollowedStreamsResponse,
    GetStreamsResponse,
    GetUser,
    GetUsersResponse,
    ValidateTokenResponse,
} from '../../domain/infrastructure/twitch/twitch';
import { createAxiosInstance, getToken } from './twitchHelpers';

let apiInstance: AxiosInstance;
let oAuthInstance: AxiosInstance;

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
        await getOAuthInstance().post(
            `${OAUTH_BASE_URL}/revoke?client_id=${CLIENT_ID}&token=${token}`,
        );
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

export const getStreams = async (
    after = '',
    before = '',
    usersIds: string[] = [],
    gamesIds: string[] = [],
    languages: string[] = [],
    usersLogins: string[] = [],
    first = 20,
): Promise<GetStreamsResponse> => {
    try {
        const url = new URL(`${API_BASE_URL}/streams`);

        if (after) {
            url.searchParams.append('after', after);
        }
        if (before) {
            url.searchParams.append('before', before);
        }
        usersIds.length && usersIds.map((userId) => url.searchParams.append('user_id', userId));
        gamesIds.length && gamesIds.map((gameId) => url.searchParams.append('game_id', gameId));
        languages.length && languages.map((lang) => url.searchParams.append('language', lang));
        usersLogins.length &&
            usersLogins.map((userLogin) => url.searchParams.append('user_login', userLogin));
        url.searchParams.append('first', first.toString());

        const response: AxiosResponse<GetStreamsResponse> = await getApiInstance().get(url.href);

        return response.data;
    } catch (e) {
        console.error('Error getting streams', e?.response?.data || e.message);
        throw e;
    }
};

export const getUsers = async (ids: string[] = [], login: string[] = []): Promise<GetUser[]> => {
    try {
        const response: AxiosResponse<GetUsersResponse> = await getApiInstance()
            .get(`${API_BASE_URL}/users?
            ${ids.map((id) => `&id=${id}`).join('')}
            ${login.map((login) => `&login=${login}`).join('')}`);

        return response.data.data;
    } catch (e) {
        console.error('Error getting users', e?.response?.data || e.message);
        throw e;
    }
};

export const getFollowedStreams = async (
    userId: string,
    after = '',
    first = 10,
): Promise<GetFollowedStreamsResponse> => {
    try {
        const url = new URL(`${API_BASE_URL}/streams/followed?user_id=${userId}`);

        if (after) {
            url.searchParams.append('after', after);
        }

        url.searchParams.append('first', first.toString());

        const response: AxiosResponse<GetFollowedStreamsResponse> = await getApiInstance().get(
            url.href,
        );

        return response.data;
    } catch (e) {
        console.error('Error getting followed streams', e?.response?.data || e.message);
        throw e;
    }
};
