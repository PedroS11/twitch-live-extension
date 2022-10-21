import { FollowedLivestream, TopLivestream } from '../infrastructure/twitch/twitch';

export interface TwitchStore {
    livestreams: FollowedLivestream[];
    topLivestreams: TopLivestream[];
    cursor?: string;
}
