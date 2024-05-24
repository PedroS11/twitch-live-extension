import { NOTIFICATIONS_ENABLE_KEY, TOKEN_KEY } from "../../domain/utils/localStorageContants";

/**
 * Returns if the notifications are enabled
 */
export const getNotificationFlagFromStorage = async (): Promise<boolean> =>
	(await chrome.storage.local.get(NOTIFICATIONS_ENABLE_KEY))[NOTIFICATIONS_ENABLE_KEY] === "true";

/**
 * Returns Twitch token
 */
export const getTokenFromStorage = async (): Promise<string> =>
	(await chrome.storage.local.get(TOKEN_KEY))[TOKEN_KEY] || "";

/**
 * Saves the Twitch token
 * @param { string } token - Twitch authentication token
 */
export const storeTokenOnStorage = async (token: string): Promise<void> =>
	await chrome.storage.local.set({ [TOKEN_KEY]: token });

/**
 * saves the current state of the notifications
 * @param {boolean} state - Notifications flag
 */
export const storeNotificationsFlagOnStorage = async (state: boolean) =>
	await chrome.storage.local.set({ [NOTIFICATIONS_ENABLE_KEY]: state + "" });

/**
 * Removes the token from local storage
 */
export const clearTokenFromStorage = async (): Promise<void> => await chrome.storage.local.remove(TOKEN_KEY);
