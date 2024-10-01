import { BackgroundMessage } from "../../domain/background/backgroundMessage";
import { MESSAGE_TYPES } from "../../domain/background/constants";

export const sendEnableNotificationMessage = async () =>
	chrome.runtime.sendMessage({
		type: MESSAGE_TYPES.ENABLE_NOTIFICATIONS,
	} as BackgroundMessage);

export const sendDisableNotificationMessage = async () =>
	chrome.runtime.sendMessage({
		type: MESSAGE_TYPES.DISABLE_NOTIFICATIONS,
	} as BackgroundMessage);

export const sendEnableBadgeIconMessage = async () =>
	chrome.runtime.sendMessage({
		type: MESSAGE_TYPES.ENABLE_BADGE_ICON,
	} as BackgroundMessage);

export const sendDisableBadgeIconMessage = async () =>
	chrome.runtime.sendMessage({
		type: MESSAGE_TYPES.DISABLE_BADGE_ICON,
	} as BackgroundMessage);

export const updateBadgeIcon = async (nrStreams: number) =>
	chrome.runtime.sendMessage({
		type: MESSAGE_TYPES.UPDATE_BADGE_ICON,
		data: { nrStreams },
	} as BackgroundMessage);
