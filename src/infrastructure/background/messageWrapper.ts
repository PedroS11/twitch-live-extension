import { BackgroundMessage } from "../../domain/background/backgroundMessage";
import { MESSAGE_TYPES } from "../../domain/background/constants";

export const sendEnableNotificationMessage = async () =>
	await chrome.runtime.sendMessage({
		type: MESSAGE_TYPES.ENABLE_NOTIFICATIONS,
	} as BackgroundMessage);

export const sendDisableNotifMessage = async () =>
	await chrome.runtime.sendMessage({
		type: MESSAGE_TYPES.DISABLE_NOTIFICATIONS,
	} as BackgroundMessage);

export const sendGetTokenMessage = async (prompt = false): Promise<void> =>
	await chrome.runtime.sendMessage({
		type: MESSAGE_TYPES.GET_TOKEN,
		data: { prompt },
	} as BackgroundMessage);

export const updateBadgeIcon = async (nrStreams: number) =>
	await chrome.runtime.sendMessage({
		type: MESSAGE_TYPES.UPDATE_BADGE_ICON,
		data: { nrStreams },
	} as BackgroundMessage);
