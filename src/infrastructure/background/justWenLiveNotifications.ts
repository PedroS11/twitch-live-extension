import { FollowedLivestream } from '../../domain/infrastructure/twitch/twitch';
import { getJustWentLive } from '../twitch/twitchService';
import { browser, Notifications } from 'webextension-polyfill-ts';
import { isFirefox } from '../../utils/browserUtils';
import { isWindows } from '../../utils/operatingSystem';

let linkMap: { [notification: string]: string } = {};

export const processJustWentLiveNotificationsAlarm = async () => {
    try {
        linkMap = {};
        const justWentLiveStreams: FollowedLivestream[] = await getJustWentLive();

        justWentLiveStreams.map(async (stream: FollowedLivestream) => {
            const game: string =
                (stream.game && `Streaming ${stream.game}`) || 'Stream game is not set';
            const clickHereMessage = 'Click here to watch it';

            const options: Notifications.CreateNotificationOptions = {
                type: 'basic',
                title: `${stream.display_name} just went live`,
                // contextMessage is only supported by Chrome and Edge
                // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/notifications/NotificationOptions
                contextMessage: isWindows() ? clickHereMessage : game,
                iconUrl: stream.profile_image_url || './assets/twitchLogo.png',
                message: isWindows() || isFirefox() ? game : clickHereMessage,
            };

            const notifId: string = await browser.notifications.create(options);
            linkMap[notifId] = stream.url;
        });
    } catch (e) {
        console.log(e);
    }
};

export const processOnNotificationClick = async (notifId: string) => {
    await browser.notifications.clear(notifId);

    const url = linkMap[notifId];
    if (url) {
        await browser.tabs.create({ url });
    }
};
