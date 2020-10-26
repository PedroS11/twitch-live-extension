import {TwitchLiveInfo} from "../infrastructure/twitch/twitchApi";

export interface TwitchStore {
    liveStreams: TwitchLiveInfo[]
}
