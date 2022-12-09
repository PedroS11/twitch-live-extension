import { BackgroundMessage } from "../../domain/background/backgroundMessage";
import { MESSAGE_TYPES } from "../../domain/background/constants";

const asPromised = (block) => {
	return new Promise((resolve, reject) => {
		block((...results) => {
			if (chrome.runtime.lastError) {
				console.log("ERROR", chrome.runtime.lastError);
				reject(chrome.runtime.lastError);
			} else {
				// @ts-ignore
				resolve(...results);
			}
		});
	});
};

export const sendEnableNotificationMessage = async () =>
	await chrome.runtime.sendMessage({
		type: MESSAGE_TYPES.ENABLE_NOTIFICATIONS,
	} as BackgroundMessage);

export const sendDisableNotificationMessage = async () =>
	await chrome.runtime.sendMessage({
		type: MESSAGE_TYPES.DISABLE_NOTIFICATIONS,
	} as BackgroundMessage);

export const sendGetTokenMessage = async (prompt = false): Promise<unknown> =>
	await asPromised((callback) => {
		chrome.runtime.sendMessage(
			{
				type: MESSAGE_TYPES.GET_TOKEN,
				data: { prompt },
			} as BackgroundMessage,
			callback,
		);
	});

export const updateBadgeIcon = async (nrStreams: number) =>
	await chrome.runtime.sendMessage({
		type: MESSAGE_TYPES.UPDATE_BADGE_ICON,
		data: { nrStreams },
	} as BackgroundMessage);
