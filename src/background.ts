'use strict';
import { browser, Notifications } from 'webextension-polyfill-ts';
import { fetchToken } from './infrastructure/identityFlowAuth/indetityFlowAuth';
import { getJustWentLive } from './infrastructure/twitch/twitchService';
import { FollowedLivestream } from './domain/infrastructure/twitch/twitch';
import {
    MESSAGE_TYPES,
    POOLING_ALARM_NAME,
    POOLING_JUST_WENT_LIVE,
} from './domain/infrastructure/background/constants';
import { BackgroundMessage } from './domain/infrastructure/background/backgroundMessage';
import changelogs from './changelogsMapping.json';

let linkMap: { [notification: string]: string } = {};

browser.runtime.onMessage.addListener(async (msg: BackgroundMessage) => {
    if (msg.type === MESSAGE_TYPES.GET_TOKEN) {
        return await fetchToken(!!msg.data.prompt);
    } else if (msg.type === MESSAGE_TYPES.ENABLE_NOTIFICATIONS) {
        browser.alarms.create(POOLING_ALARM_NAME, { periodInMinutes: POOLING_JUST_WENT_LIVE });
    } else if (msg.type === MESSAGE_TYPES.DISABLE_NOTIFICATIONS) {
        await browser.alarms.clear(POOLING_ALARM_NAME);
    }
});

browser.alarms.onAlarm.addListener(async () => {
    try {
        linkMap = {};
        const justWentLiveStreams: FollowedLivestream[] = await getJustWentLive();

        justWentLiveStreams.map(async (stream: FollowedLivestream) => {
            const options: Notifications.CreateNotificationOptions = {
                type: 'basic',
                title: `${stream.display_name} just went live`,
                contextMessage: (stream.game && `Playing ${stream.game}`) || 'Game is not set',
                iconUrl: stream.profile_image_url || './assets/twitchLogo.png',
                message: 'Click here to watch it',
            };

            const notifId: string = await browser.notifications.create(options);
            linkMap[notifId] = stream.url;
        });
    } catch (e) {
        console.log(e);
    }
});

browser.notifications.onClicked.addListener(async (notifId: string) => {
    await browser.notifications.clear(notifId);

    const url = linkMap[notifId];
    if (url) {
        await browser.tabs.create({ url });
    }
});

browser.runtime.onInstalled.addListener(async () => {
    const { installType } = await browser.management.getSelf();

    if (installType === 'development') {
        return;
    }

    const { version } = browser.runtime.getManifest();

    // @ts-ignore
    const changelogUrl = changelogs[version];

    if (changelogUrl) {
        await browser.tabs.create({
            url: changelogUrl,
            active: true,
        });
    }
});
