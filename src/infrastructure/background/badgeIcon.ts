import { formatViewers } from "../utils/formatter";
import { getNumberOfLivestreams } from "../twitch/twitchService";
import { isBadgeIconFlagEnabled } from "../localStorage/localStorageService";
import { clearBadgeText, setInfoBadgeText } from "../utils/setBadgeIcon";

export const displayNumberOfLivestreams = async (nrStreams: number | null) => {
	const badgeIconFlag: boolean = await isBadgeIconFlagEnabled();

	if (badgeIconFlag && Number.isFinite(nrStreams)) {
		const formattedNumber: string = formatViewers(nrStreams || 0);
		await setInfoBadgeText(formattedNumber);
	} else {
		await clearBadgeText();
		return;
	}
};

export const processBadgeIconAlarm = async () => {
	const nrStreams: number | null = await getNumberOfLivestreams();

	await displayNumberOfLivestreams(nrStreams);
};
