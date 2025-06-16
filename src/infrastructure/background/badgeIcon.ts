import { formatViewers } from "../utils/formatter";
import { getNumberOfLivestreams } from "../twitch/twitchService";
import { isBadgeIconFlagEnabled } from "../localStorage/localStorageService";
import {
	authErrorBadgeDisplayed,
	clearBadgeText,
	setInfoBadgeText,
} from "../utils/setBadgeIcon";

export const displayNumberOfLivestreams = async (nrStreams: number | null) => {
	const badgeIconFlag: boolean = await isBadgeIconFlagEnabled();
	const authErrorTextDisplayed: boolean = await authErrorBadgeDisplayed();

	if (badgeIconFlag && Number.isFinite(nrStreams)) {
		const formattedNumber: string = formatViewers(nrStreams || 0);
		await setInfoBadgeText(formattedNumber);
	} else if (!authErrorTextDisplayed) {
		await clearBadgeText();
		return;
	}
};

export const processBadgeIconAlarm = async () => {
	const nrStreams: number | null = await getNumberOfLivestreams();

	await displayNumberOfLivestreams(nrStreams);
};
