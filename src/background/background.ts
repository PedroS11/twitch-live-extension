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

chrome.alarms.create(BADGE_ICON_ALARM_NAME, { periodInMinutes: 1 });

chrome.runtime.onMessage.addListener(
	(msg: BackgroundMessage, _, sendResponse) => {
		if (msg.type === MESSAGE_TYPES.GET_TOKEN) {
			fetchToken(!!msg.data.prompt)
				.then((token) => {
					console.log("BACK", token);
					// Since on Firefox the onMessage listener doesn't return the response
					// I need to call storeToken here instead of in the method that requests the token
					return storeTokenOnStorage(token);
				})
				.then(() => sendResponse());
		} else if (msg.type === MESSAGE_TYPES.ENABLE_NOTIFICATIONS) {
			chrome.alarms.create(POOLING_ALARM_NAME, {
				periodInMinutes: POOLING_JUST_WENT_LIVE,
			} as chrome.alarms.AlarmCreateInfo);
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
	async () => await processOnInstallEvents(),
);
