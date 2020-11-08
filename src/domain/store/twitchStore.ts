import { FollowedLivestream } from '../infrastructure/twitch/twitchApi';

export const LAST_FOLLOWS_UPDATE_KEY = 'tle-last-follows-update';
export const FOLLOWS_KEY = 'tle-follows';
export const TOKEN_KEY = 'tle-token';

export interface TwitchStore {
    livestreams: FollowedLivestream[];
}
