import { BackgroundMessage } from "../../domain/background/backgroundMessage";
import { MESSAGE_TYPES } from "../../domain/background/constants";

// Use browser.runtime for Firefox (native Promise support), chrome.runtime for Chrome
declare const browser: typeof chrome | undefined;
const isFirefox = navigator.userAgent.includes("Firefox");
const hasBrowserRuntime = typeof browser !== "undefined";
const runtime =
	isFirefox && hasBrowserRuntime ? browser.runtime : chrome.runtime;

export const sendEnableNotificationMessage = async () =>
	runtime.sendMessage({
		type: MESSAGE_TYPES.ENABLE_NOTIFICATIONS,
	} as BackgroundMessage);

export const sendDisableNotificationMessage = async () =>
	runtime.sendMessage({
		type: MESSAGE_TYPES.DISABLE_NOTIFICATIONS,
	} as BackgroundMessage);

export const sendEnableBadgeIconMessage = async () =>
	runtime.sendMessage({
		type: MESSAGE_TYPES.ENABLE_BADGE_ICON,
	} as BackgroundMessage);

export const sendDisableBadgeIconMessage = async () =>
	runtime.sendMessage({
		type: MESSAGE_TYPES.DISABLE_BADGE_ICON,
	} as BackgroundMessage);

export const updateBadgeIcon = async (nrStreams: number) =>
	runtime.sendMessage({
		type: MESSAGE_TYPES.UPDATE_BADGE_ICON,
		data: { nrStreams },
	} as BackgroundMessage);

export const sendFetchTokenMessage = async (
	promptVerify = false,
): Promise<string> => {
	if (isFirefox) {
		// Firefox MV3: popup gets suspended during OAuth flow, can't receive response
		// Background stores token directly to storage, popup finds it on next open
		runtime
			.sendMessage({
				type: MESSAGE_TYPES.FETCH_TOKEN,
				data: { promptVerify },
			} as BackgroundMessage)
			.catch(() => {
				// Ignore - we're using storage, not message response
			});

		return "";
	}

	// Chrome: use normal message response
	const response = await runtime.sendMessage({
		type: MESSAGE_TYPES.FETCH_TOKEN,
		data: { promptVerify },
	} as BackgroundMessage);

	if (!response || !response.success) {
		throw new Error(response?.error || "No response from background");
	}

	return response.token;
};
