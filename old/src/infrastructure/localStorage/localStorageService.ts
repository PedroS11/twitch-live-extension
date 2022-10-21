import { getStorageData, removeStorageData, setStorageData } from '../../utils/localStorage';
import { NOTIFICATIONS_ENABLE_KEY, TOKEN_KEY } from '../../domain/utils/localStorageContants';

/**
 * Returns if the notifications are enabled
 */
export const getNotificationFlag = (): boolean =>
    getStorageData(NOTIFICATIONS_ENABLE_KEY) == 'true';

/**
 * Returns Twitch token
 */
export const getToken = (): string => getStorageData(TOKEN_KEY) || '';

/**
 * Saves the Twitch token
 * @param { string } token - Twitch authentication token
 */
export const storeToken = (token: string) => setStorageData(TOKEN_KEY, token);

/**
 * saves the current state of the notifications
 * @param {boolean} state - Notifications flag
 */
export const storeNotificationsFlag = (state: boolean) =>
    setStorageData(NOTIFICATIONS_ENABLE_KEY, state + '');

/**
 * Removes the token from local storage
 */
export const clearToken = () => removeStorageData(TOKEN_KEY);
