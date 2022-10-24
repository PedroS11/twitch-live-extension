import { BackgroundMessage } from '../../domain/infrastructure/background/backgroundMessage';
import { MESSAGE_TYPES } from '../../domain/infrastructure/background/constants';
import { browser } from 'webextension-polyfill-ts';

export const sendEnableNotifMessage = async () =>
    await browser.runtime.sendMessage({
        type: MESSAGE_TYPES.ENABLE_NOTIFICATIONS,
    } as BackgroundMessage);

export const sendDisableNotifMessage = async () =>
    await browser.runtime.sendMessage({
        type: MESSAGE_TYPES.DISABLE_NOTIFICATIONS,
    } as BackgroundMessage);

export const sendGetTokenMessage = async (prompt = false): Promise<void> =>
    await browser.runtime.sendMessage({
        type: MESSAGE_TYPES.GET_TOKEN,
        data: { prompt },
    } as BackgroundMessage);

export const updateBadgeIcon = async (nrStreams: number) =>
    await browser.runtime.sendMessage({
        type: MESSAGE_TYPES.UPDATE_BADGE_ICON,
        data: { nrStreams },
    } as BackgroundMessage);