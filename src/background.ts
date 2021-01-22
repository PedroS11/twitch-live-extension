'use strict';
import { browser, Notifications } from 'webextension-polyfill-ts';
import { fetchToken } from './infrastructure/identityFlowAuth/indetityFlowAuth';
import { getJustWentLive } from './infrastructure/twitch/twitchService';
import { FollowedLivestream } from './domain/infrastructure/twitch/twitch';
import { getStorageData } from './utils/localStorage';
import { NOTIFICATIONS_ENABLE } from './domain/store/twitchStore';

const linkMap: { [notification: string]: string } = {};
let justWentLiveStreams: FollowedLivestream[] = [];
const ALARM_NAME = 'JustWentLive';

browser.runtime.onMessage.addListener(async (msg: any, sender) => {
    if (msg.type === 'get-token') {
        return {
            token: await fetchToken(!!msg.prompt),
        };
    } else if (msg.type === 'enable-notifications') {
        browser.alarms.create(ALARM_NAME, { periodInMinutes: 3 });
    } else if (msg.type === 'disable-notifications') {
        await browser.alarms.clear(ALARM_NAME);
    }
});

browser.alarms.onAlarm.addListener(async (alarm) => {
    try {
        justWentLiveStreams = await getJustWentLive();

        justWentLiveStreams.map(async (stream: FollowedLivestream) => {
            const options: Notifications.CreateNotificationOptions = {
                type: 'basic',
                title: `${stream.display_name} just went live`,
                message: (stream.game && `Playing ${stream.game}`) || 'Game is not set',
                iconUrl: stream.profile_image_url || './assets/twitchLogo.png',
            };

            const notifId: string = await browser.notifications.create(options);
            linkMap[notifId] = stream.url;
        });
    } catch (e) {
        console.log(e);
    }
});

browser.notifications.onClicked.addListener(async (notifId: string) => {
    const url = linkMap[notifId];

    await browser.notifications.clear(notifId);
    await browser.tabs.create({ url });
});

browser.notifications.onClosed.addListener(async (notifId: string) => {
    delete linkMap[notifId];
});
