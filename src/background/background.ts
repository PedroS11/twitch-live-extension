import { fetchToken } from "../infrastructure/identityFlowAuth/identityFlowAuth";
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
import { storeTokenOnStorage } from "../infrastructure/localStorage/localStorageService";
import {
	processJustWentLiveNotificationsAlarm,
	processOnNotificationClick,
} from "../infrastructure/background/justWenLiveNotifications";
import { processOnInstallEvents } from "../infrastructure/background/onInstalled";
import { queryState } from "../infrastructure/chrome/idle";
import IdleState = chrome.idle.IdleState;

chrome.alarms.create(BADGE_ICON_ALARM_NAME, { periodInMinutes: 1 });

// Chrome doesn't support promises on the OnMessage callback, so I had to use .then
// Reference: https://stackoverflow.com/questions/53024819/chrome-extension-sendresponse-not-waiting-for-async-function
// On Manifest V2 version of the extension, I was using a Mozilla polyfill that would make the promises work
chrome.runtime.onMessage.addListener(
	(msg: BackgroundMessage, _, sendResponse) => {
		if (msg.type === MESSAGE_TYPES.ENABLE_NOTIFICATIONS) {
			chrome.alarms.create(POOLING_ALARM_NAME, {
				periodInMinutes: POOLING_JUST_WENT_LIVE,
			} as chrome.alarms.AlarmCreateInfo);
			sendResponse();
		} else if (msg.type === MESSAGE_TYPES.DISABLE_NOTIFICATIONS) {
			chrome.alarms.clear(POOLING_ALARM_NAME).then(() => {
				sendResponse();
			});
		} else if (msg.type === MESSAGE_TYPES.UPDATE_BADGE_ICON) {
			displayNumberOfLivestreams(msg.data.nrStreams).then(() => {
				sendResponse();
			});
		}
		return true;
	},
);

chrome.alarms.onAlarm.addListener(async (alarm: chrome.alarms.Alarm) => {
	const state: IdleState = await queryState(15);
	// With the move to MV3, the alarm running, while computer was sleeping, was
	// throwing errors getting the token so now I just poll the live streams when the computer is active
	if (state === "active") {
		if (alarm.name === POOLING_ALARM_NAME) {
			await processJustWentLiveNotificationsAlarm();
		} else if (alarm.name === BADGE_ICON_ALARM_NAME) {
			await processBadgeIconAlarm();
		}
	}
});

chrome.notifications.onClicked.addListener(
	async (notificationId: string) =>
		await processOnNotificationClick(notificationId),
);

chrome.runtime.onInstalled.addListener(
	async () => await processOnInstallEvents(),
);
