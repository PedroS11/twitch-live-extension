import { formatViewers } from "../utils/formatter";
import { getNumberOfLivestreams } from "../twitch/twitchService";

export const displayNumberOfLivestreams = async (nrStreams: number | null) => {
	if (nrStreams === null) {
		await chrome.action.setBadgeText({ text: "" });
		return;
	}

	const formattedNumber: string = formatViewers(nrStreams || 0);
	await chrome.action.setBadgeBackgroundColor({
		color: [76, 76, 76, 255],
	});
	await chrome.action.setBadgeText({ text: formattedNumber });
};

export const processBadgeIconAlarm = async () => {
	const nrStreams: number | null = await getNumberOfLivestreams();

	await displayNumberOfLivestreams(nrStreams);
};
