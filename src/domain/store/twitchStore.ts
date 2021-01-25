import { FollowedLivestream } from '../infrastructure/twitch/twitch';

export interface TwitchStore {
    livestreams: FollowedLivestream[];
}
