import { BackgroundMessage } from "../../domain/background/backgroundMessage";
import { MESSAGE_TYPES } from "../../domain/background/constants";

// Use browser.runtime for Firefox (native Promise support), chrome.runtime for Chrome
declare const browser: typeof chrome | undefined;
const isFirefox = navigator.userAgent.includes("Firefox");
const hasBrowserRuntime = typeof browser !== "undefined";
console.log("messageWrapper - isFirefox:", isFirefox, "hasBrowserRuntime:", hasBrowserRuntime);
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

// Storage key for main token (must match localStorageConstants.ts)
const TOKEN_KEY = "tle-token";

// Helper to wait briefly then check storage (Firefox workaround)
const waitAndCheckStorage = async (): Promise<string | null> => {
	// Wait a moment for the auth flow to potentially complete
	await new Promise((resolve) => setTimeout(resolve, 2000));

	// Check if token appeared in storage
	const result = await chrome.storage.local.get(TOKEN_KEY);
	return result[TOKEN_KEY] || null;
};

export const sendFetchTokenMessage = async (
	promptVerify = false,
): Promise<string> => {
	console.log("Sending FETCH_TOKEN message to background...");

	if (isFirefox) {
		// Firefox MV3: popup gets suspended during OAuth flow, can't receive response
		// Strategy: background stores token directly, popup checks on reopen

		// Send message to trigger the auth flow (fire and forget)
		runtime
			.sendMessage({
				type: MESSAGE_TYPES.FETCH_TOKEN,
				data: { promptVerify },
			} as BackgroundMessage)
			.catch(() => {
				// Ignore - we're using storage, not message response
			});

		console.log("Auth flow started, waiting briefly...");

		// Wait briefly and check if token appeared (in case auth was instant/cached)
		const token = await waitAndCheckStorage();
		if (token) {
			console.log("Token found in storage after brief wait!");
			return token;
		}

		// Token not ready yet - this is expected for Firefox
		// The background will store the token, and it will be found on next popup open
		console.log("Firefox: Auth in progress. Token will be available when you reopen the extension.");
		throw new Error("FIREFOX_AUTH_PENDING");
	} else {
		// Chrome: use normal message response
		const response = await runtime.sendMessage({
			type: MESSAGE_TYPES.FETCH_TOKEN,
			data: { promptVerify },
		} as BackgroundMessage);

		console.log("response", response);

		if (!response || !response.success) {
			throw new Error(response?.error || "No response from background");
		}

		return response.token;
	}
};
