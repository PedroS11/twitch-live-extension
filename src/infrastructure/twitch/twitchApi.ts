import axios, {AxiosInstance} from 'axios';
import {CLIENT_ID} from "../../config";
import {
    TwitchGetLiveInfo,
    TwitchGetUserInfo,
    TwitchLiveInfo,
    TwitchUserInfo
} from "../../domain/infrastructure/twitch/twitchApi";

let instance: AxiosInstance;

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

const getTwitchUserInfo = async (username: string): Promise<TwitchUserInfo> => {
    const response = await getAxiosInstance().get(`https://api.twitch.tv/kraken/users?login=${username}`);

    const data: TwitchGetUserInfo = response.data;
    if (data._total === 0) {
        throw new Error(`The user ${username} doesn't exist`);
    }
    return data.users[0];
};

const getTwitchLiveInfo = async (userId: string): Promise<TwitchLiveInfo | undefined> => {
    const response = await getAxiosInstance().get(`https://api.twitch.tv/kraken/streams/?channel=${userId}`);

    const data: TwitchGetLiveInfo = response.data;

    return data.streams.length ? data.streams[0] : undefined;
};

export const getStreamInfo = async (username: string): Promise<TwitchLiveInfo | undefined> => {
    const userData: TwitchUserInfo = await getTwitchUserInfo(username);

    return await getTwitchLiveInfo(userData._id);
};