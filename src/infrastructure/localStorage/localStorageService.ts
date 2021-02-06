import { getStorageData, removeStorageData, setStorageData } from '../../utils/localStorage';
import {
    FOLLOWS_KEY,
    LAST_FOLLOWS_UPDATE_KEY,
    NOTIFICATIONS_ENABLE_KEY,
    TOKEN_KEY,
} from '../../domain/utils/localStorageContants';
import { GetUserFollow } from '../../domain/infrastructure/twitch/twitch';

/**
 * Returns if the notifications are enabled
 */
export const getNotificationFlag = (): boolean => getStorageData(NOTIFICATIONS_ENABLE_KEY) == 'true';

/**
 * Returns a stringified follows list
 */
// @ts-ignore
export const getFollows = (): GetUserFollow[] => {
    const data = getStorageData(FOLLOWS_KEY);
    return data ? JSON.parse(data) : [];
};

/**
 * Returns the timestamp of last follows list update
 */
// @ts-ignore
export const getLastFollowUpdateTimestamp = (): number => +getStorageData(LAST_FOLLOWS_UPDATE_KEY);

/**
 * Returns Twitch token
 */
export const getToken = (): string => getStorageData(TOKEN_KEY) || '';

/**
 * Saves the follows list
 * @param {GetUserFollow[]} follows - The follows list
 */
export const storeFollows = (follows: GetUserFollow[]) => setStorageData(FOLLOWS_KEY, JSON.stringify(follows));

/**
 * Saves the follows update timestamp
 * @param {number} timestamp - Timestamp of the last update
 */
export const storeLastFollowsUpdateTimestamp = (timestamp: number) =>
    setStorageData(LAST_FOLLOWS_UPDATE_KEY, timestamp + '');

/**
 * Saves the Twitch token
 * @param { string } token - Twitch authentication token
 */
export const storeToken = (token: string) => setStorageData(TOKEN_KEY, token);

/**
 * saves the current state of the notifcations
 * @param {boolean} state - Notifications flag
 */
export const storeNotificationsFlag = (state: boolean) => setStorageData(NOTIFICATIONS_ENABLE_KEY, state + '');

/**
 * Removes the token from local storage
 */
export const clearToken = () => removeStorageData(TOKEN_KEY);
