import axios, {AxiosInstance} from 'axios';
import {CLIENT_ID} from "../../config";
import {
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

export const getTwitchUserInfo = async (username: string): Promise<TwitchUserInfo> => {
    const response = await getAxiosInstance().get(`https://api.twitch.tv/kraken/users?login=${username}`);

    const data: TwitchGetUserInfo = response.data;
    // if (data._total === 0) {
    //     throw new Error(`The user ${username} doesn't exist`);
    // }
    return data?.users?.[0];
};

export const getTwitchLiveInfo = async (userId: string): Promise<TwitchLiveInfo> => {
    const response = await getAxiosInstance().get(`https://api.twitch.tv/kraken/streams/?channel=${userId}`);

    return response.data?.streams?.[0];
};

// export const getStreamInfo = async (username: string): Promise<TwitchLiveInfo | undefined> => {
//     const userData: TwitchUserInfo = await getTwitchUserInfo(username);
//     if (userData) {
//         return await getTwitchLiveInfo(userData._id);
//     }
//     return;
// };