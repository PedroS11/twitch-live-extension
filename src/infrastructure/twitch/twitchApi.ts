import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { CLIENT_ID } from '../../config';
import {
    TwitchGetLiveInfo,
    TwitchGetUserInfo,
    TwitchLiveInfo,
    TwitchUserInfo,
} from '../../domain/infrastructure/twitch/twitchApi';

let instance: AxiosInstance;

/**
 * Get singleton Axios instance
 */
const getAxiosInstance = (): AxiosInstance => {
    if (!instance) {
        instance = axios.create({
            headers: {
                Accept: 'application/vnd.twitchtv.v5+json',
                'Client-ID': CLIENT_ID,
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
