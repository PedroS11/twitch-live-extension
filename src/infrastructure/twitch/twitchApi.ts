import axios, {AxiosInstance} from 'axios';
import {CLIENT_ID} from "../../config";
import {
    TwitchLiveInfo,
    TwitchUserInfo
} from "../../domain/infrastructure/twitch/twitchApi";

let instance: AxiosInstance;

/**
 * Get singleton Axios instance
 */
const getAxiosInstance = (): AxiosInstance => {
    if (!instance) {
        instance = axios.create({
            headers:
                {
                    "Accept": "application/vnd.twitchtv.v5+json",
                    "Client-ID": CLIENT_ID
                }
        })
    }

    return instance;
};

/**
 * Get twitch user by Twitch streamer username
 * @param {string} username - Twitch streamer username
 */
export const getTwitchUserInfo = async (username: string): Promise<TwitchUserInfo> => {
    const response = await getAxiosInstance().get(`https://api.twitch.tv/kraken/users?login=${username}`);

    return response.data?.users?.[0];
};

/**
 * Get live stream information by Twitch user ID
 * @param {string} id - Twitch streamer id
 */
export const getTwitchLiveInfo = async (id: string): Promise<TwitchLiveInfo> => {
    const response = await getAxiosInstance().get(`https://api.twitch.tv/kraken/streams/?channel=${id}`);

    return response.data?.streams?.[0];
};