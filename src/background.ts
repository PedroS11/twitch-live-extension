'use strict';
import { Alarms, browser } from 'webextension-polyfill-ts';
import { fetchToken } from './infrastructure/identityFlowAuth/indetityFlowAuth';
import {
    BADGE_ICON_ALARM_NAME,
    MESSAGE_TYPES,
    POOLING_ALARM_NAME,
    POOLING_JUST_WENT_LIVE,
} from './domain/infrastructure/background/constants';
import { BackgroundMessage } from './domain/infrastructure/background/backgroundMessage';
import {
    displayNumberOfLivestreams,
    processBadgeIconAlarm,
} from './infrastructure/background/badgeIcon';
import {
    processJustWentLiveNotificationsAlarm,
    processOnNotificationClick,
} from './infrastructure/background/justWenLiveNotifications';
import { processOnInstallEvents } from './infrastructure/background/onInstalled';

browser.alarms.create(BADGE_ICON_ALARM_NAME, { periodInMinutes: 1 });

browser.runtime.onMessage.addListener(async (msg: BackgroundMessage) => {
    if (msg.type === MESSAGE_TYPES.GET_TOKEN) {
        return await fetchToken(!!msg.data.prompt);
    } else if (msg.type === MESSAGE_TYPES.ENABLE_NOTIFICATIONS) {
        browser.alarms.create(POOLING_ALARM_NAME, { periodInMinutes: POOLING_JUST_WENT_LIVE });
    } else if (msg.type === MESSAGE_TYPES.DISABLE_NOTIFICATIONS) {
        await browser.alarms.clear(POOLING_ALARM_NAME);
    } else if (msg.type === MESSAGE_TYPES.UPDATE_BADGE_ICON) {
        await displayNumberOfLivestreams(msg.data.nrStreams);
    }
});

browser.alarms.onAlarm.addListener(async (alarm: Alarms.Alarm) => {
    if (alarm.name === POOLING_ALARM_NAME) {
        await processJustWentLiveNotificationsAlarm();
    } else if (alarm.name === BADGE_ICON_ALARM_NAME) {
        await processBadgeIconAlarm();
    }
});

browser.notifications.onClicked.addListener(
    async (notifId: string) => await processOnNotificationClick(notifId),
);

browser.runtime.onInstalled.addListener(async () => await processOnInstallEvents());
