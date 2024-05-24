import { isFirefox } from "../utils/browserFinder";
import { isWindows } from "../utils/operatingSystemFinder";
import { getJustWentLive } from "../twitch/twitchService";
import { FollowedStream } from "../../domain/twitch/service";
import { clearNotification, createNotification } from "../chrome/notifications";
import { getTokenFromStorage } from "../localStorage/localStorageService";

let linkMap: { [notification: string]: string } = {};

const createNotificationOptions = (stream: FollowedStream): chrome.notifications.NotificationOptions<true> => {
	const game: string = (stream.game && `Streaming ${stream.game}`) || "Stream game is not set";
	const clickHereMessage = "Click here to watch it";

	return {
		type: "basic",
		title: `${stream.display_name} just went live`,
		// contextMessage is only supported by Chrome and Edge
		// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/notifications/NotificationOptions
		contextMessage: isWindows() ? clickHereMessage : game,
		iconUrl: stream.profile_image_url || "./assets/twitchLogo.png",
		message: isWindows() || isFirefox() ? game : clickHereMessage,
	};
};

export const processJustWentLiveNotificationsAlarm = async () => {
	try {
		linkMap = {};
		const token: string = await getTokenFromStorage();
		if (!token) {
			return;
		}
		const justWentLiveStreams: FollowedStream[] = await getJustWentLive();

		justWentLiveStreams.map(async (stream: FollowedStream) => {
			const options: chrome.notifications.NotificationOptions<true> = createNotificationOptions(stream);

			const notificationId: string = await createNotification(options);
			linkMap[notificationId] = stream.url;
		});
	} catch (e) {
		console.log(e);
	}
};

export const processOnNotificationClick = async (notificationId: string) => {
	await clearNotification(notificationId);

	const url = linkMap[notificationId];
	if (url) {
		await chrome.tabs.create({ url });
	}
};
