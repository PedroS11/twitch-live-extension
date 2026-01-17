import {
	BADGE_ICON_ALARM_NAME,
	MESSAGE_TYPES,
	POOLING_ALARM_NAME,
	POOLING_JUST_WENT_LIVE,
} from "../domain/background/constants";
import { BackgroundMessage } from "../domain/background/backgroundMessage";
import {
	displayNumberOfLivestreams,
	processBadgeIconAlarm,
} from "../infrastructure/background/badgeIcon";
import {
	processJustWentLiveNotificationsAlarm,
	processOnNotificationClick,
} from "../infrastructure/background/justWenLiveNotifications";
import { processOnInstallEvents } from "../infrastructure/background/onInstalled";
import { queryState } from "../infrastructure/chrome/idle";
import { fetchToken } from "../infrastructure/identityFlowAuth/identityFlowAuth";
import IdleState = chrome.idle.IdleState;
import InstalledDetails = chrome.runtime.InstalledDetails;

// Firefox MV3 requires using browser.runtime with Promise returns
// Chrome uses chrome.runtime with sendResponse callback
// Reference: https://bugzilla.mozilla.org/show_bug.cgi?id=1843898
declare const browser: typeof chrome | undefined;
const isFirefox = navigator.userAgent.includes("Firefox");

// Main token storage key (must match localStorageConstants.ts)
const TOKEN_KEY = "tle-token";

// Firefox message handler - stores token directly to storage since popup gets suspended during auth
const handleMessageFirefox = (
	msg: BackgroundMessage,
	_sender: chrome.runtime.MessageSender,
	sendResponse: (response?: unknown) => void,
): boolean => {
	if (msg.type === MESSAGE_TYPES.ENABLE_NOTIFICATIONS) {
		chrome.alarms
			.create(POOLING_ALARM_NAME, {
				periodInMinutes: POOLING_JUST_WENT_LIVE,
			} as chrome.alarms.AlarmCreateInfo)
			.then(sendResponse);
		return true;
	} else if (msg.type === MESSAGE_TYPES.DISABLE_NOTIFICATIONS) {
		chrome.alarms.clear(POOLING_ALARM_NAME).then(sendResponse);
		return true;
	} else if (msg.type === MESSAGE_TYPES.ENABLE_BADGE_ICON) {
		chrome.alarms
			.create(BADGE_ICON_ALARM_NAME, { periodInMinutes: 1 })
			.then(sendResponse);
		return true;
	} else if (msg.type === MESSAGE_TYPES.DISABLE_BADGE_ICON) {
		chrome.alarms.clear(BADGE_ICON_ALARM_NAME).then(sendResponse);
		return true;
	} else if (msg.type === MESSAGE_TYPES.UPDATE_BADGE_ICON) {
		displayNumberOfLivestreams(msg.data.nrStreams).then(sendResponse);
		return true;
	} else if (msg.type === MESSAGE_TYPES.FETCH_TOKEN) {
		const promptVerify = msg.data?.promptVerify ?? false;

		// Firefox MV3: popup gets suspended during OAuth, can't receive message response
		// Store token directly to main storage so popup finds it when reopened
		fetchToken(promptVerify)
			.then(async (token) => {
				await chrome.storage.local.set({ [TOKEN_KEY]: token });
			})
			.catch(() => {
				// Error handling - token fetch failed
			});

		// Return false - we're using storage, not sendResponse
		return false;
	}
	return false;
};

// Chrome message handler - uses sendResponse callback
const handleMessageChrome = (
	msg: BackgroundMessage,
	sendResponse: (response?: unknown) => void,
): boolean => {
	if (msg.type === MESSAGE_TYPES.ENABLE_NOTIFICATIONS) {
		chrome.alarms
			.create(POOLING_ALARM_NAME, {
				periodInMinutes: POOLING_JUST_WENT_LIVE,
			} as chrome.alarms.AlarmCreateInfo)
			.then(sendResponse);
		return true;
	} else if (msg.type === MESSAGE_TYPES.DISABLE_NOTIFICATIONS) {
		chrome.alarms.clear(POOLING_ALARM_NAME).then(sendResponse);
		return true;
	} else if (msg.type === MESSAGE_TYPES.ENABLE_BADGE_ICON) {
		chrome.alarms
			.create(BADGE_ICON_ALARM_NAME, { periodInMinutes: 1 })
			.then(sendResponse);
		return true;
	} else if (msg.type === MESSAGE_TYPES.DISABLE_BADGE_ICON) {
		chrome.alarms.clear(BADGE_ICON_ALARM_NAME).then(sendResponse);
		return true;
	} else if (msg.type === MESSAGE_TYPES.UPDATE_BADGE_ICON) {
		displayNumberOfLivestreams(msg.data.nrStreams).then(sendResponse);
		return true;
	} else if (msg.type === MESSAGE_TYPES.FETCH_TOKEN) {
		const promptVerify = msg.data?.promptVerify ?? false;
		fetchToken(promptVerify)
			.then((token) => {
				sendResponse({ success: true, token });
			})
			.catch((error) => {
				sendResponse({ success: false, error: error.message });
			});
		return true;
	}
	return false;
};

// Register the message listener
// Both Firefox and Chrome now use the same callback pattern, but Firefox uses storage workaround for FETCH_TOKEN
chrome.runtime.onMessage.addListener(
	(msg: BackgroundMessage, sender, sendResponse) => {
		if (isFirefox) {
			return handleMessageFirefox(msg, sender, sendResponse);
		} else {
			return handleMessageChrome(msg, sendResponse);
		}
	},
);

chrome.alarms.onAlarm.addListener(async (alarm: chrome.alarms.Alarm) => {
	const state: IdleState = await queryState(15);
	if (state === "locked") return;
	// With the move to MV3, the alarm running, while computer was sleeping, was
	// throwing errors getting the token so now I just poll the live streams when the computer is active
	if (alarm.name === POOLING_ALARM_NAME) {
		await processJustWentLiveNotificationsAlarm();
	} else if (alarm.name === BADGE_ICON_ALARM_NAME) {
		await processBadgeIconAlarm();
	}
});

chrome.notifications.onClicked.addListener(
	async (notificationId: string) =>
		await processOnNotificationClick(notificationId),
);

chrome.runtime.onInstalled.addListener(
	async (details: InstalledDetails) => await processOnInstallEvents(details),
);
