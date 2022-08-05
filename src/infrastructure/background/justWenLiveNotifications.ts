import { FollowedLivestream } from '../../domain/infrastructure/twitch/twitch';
import { getJustWentLive } from '../twitch/twitchService';
import { browser, Notifications } from 'webextension-polyfill-ts';
import { isFirefox } from '../../utils/browserUtils';
import { isWindows } from '../../utils/operatingSystem';
import CreateNotificationOptions = Notifications.CreateNotificationOptions;

const createNotificationOptions = (stream: FollowedLivestream): CreateNotificationOptions => {
    const game: string = (stream.game && `Streaming ${stream.game}`) || 'Stream game is not set';
    const clickHereMessage = 'Click here to watch it';

    return {
        type: 'basic',
        title: `${stream.display_name} just went live`,
        // contextMessage is only supported by Chrome and Edge
        // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/notifications/NotificationOptions
        contextMessage: isWindows() ? clickHereMessage : game,
        iconUrl: stream.profile_image_url || './assets/twitchLogo.png',
        message: isWindows() || isFirefox() ? game : clickHereMessage,
    };
};

let linkMap: { [notification: string]: string } = {};

export const processJustWentLiveNotificationsAlarm = async () => {
    try {
        linkMap = {};
        const justWentLiveStreams: FollowedLivestream[] = await getJustWentLive();

        justWentLiveStreams.map(async (stream: FollowedLivestream) => {
            const options: CreateNotificationOptions = createNotificationOptions(stream);
            const notificationId: string = await browser.notifications.create(options);
            linkMap[notificationId] = stream.url;
        });
    } catch (e) {
        console.log(e);
    }
};

export const processOnNotificationClick = async (notificationId: string) => {
    await browser.notifications.clear(notificationId);

    const url = linkMap[notificationId];
    if (url) {
        await browser.tabs.create({ url });
    }
};
