import {TwitchLiveInfo, TwitchUserInfo} from "../infrastructure/twitch/twitchApi";

export const FAVORITE_STREAMERS_STORAGE_KEY = "tle-favorite-streamers";

export interface TwitchStore {
    liveStreams: TwitchLiveInfo[],
    favoriteStreamers: TwitchUserInfo[]
}
