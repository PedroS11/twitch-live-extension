import { browser } from 'webextension-polyfill-ts';
import { formatViewers } from '../../utils/formatter';
import { getNumberOfLivestreams } from '../twitch/twitchService';

export const displayNumberOfLivestreams = async (nrStreams: number | null) => {
    if (nrStreams === null) {
        return;
    }
    const formattedNumber: string = formatViewers(nrStreams || 0);
    await browser.browserAction.setBadgeBackgroundColor({ color: [76, 76, 76, 255] });
    await browser.browserAction.setBadgeText({ text: formattedNumber });
};

export const processBadgeIconAlarm = async () => {
    const nrStreams: number | null = await getNumberOfLivestreams();

    await displayNumberOfLivestreams(nrStreams);
};
