import { formatViewers } from "../utils/formatter";
import { getNumberOfLivestreams } from "../twitch/twitchService";
import { isBadgeIconFlagEnabled } from "../localStorage/localStorageService";

export const displayNumberOfLivestreams = async (nrStreams: number | null) => {
	const badgeIconFlag: boolean = await isBadgeIconFlagEnabled();

	if (badgeIconFlag && Number.isFinite(nrStreams)) {
		const formattedNumber: string = formatViewers(nrStreams || 0);
		await chrome.action.setBadgeBackgroundColor({
			color: [76, 76, 76, 255],
		});
		await chrome.action.setBadgeText({ text: formattedNumber });
	} else {
		await chrome.action.setBadgeText({ text: "" });
		return;
	}
};

export const processBadgeIconAlarm = async () => {
	const nrStreams: number | null = await getNumberOfLivestreams();

	await displayNumberOfLivestreams(nrStreams);
};
