import { browser } from 'webextension-polyfill-ts';
import { MESSAGE_TYPES } from '../../domain/infrastructure/background/constants';
import { BackgroundMessage } from '../../domain/infrastructure/background/backgroundMessage';

export const sendEnableNotifMessage = async () =>
    await browser.runtime.sendMessage({ type: MESSAGE_TYPES.ENABLE_NOTIFICATIONS } as BackgroundMessage);

export const sendDisableNotifMessage = async () =>
    await browser.runtime.sendMessage({ type: MESSAGE_TYPES.DISABLE_NOTIFICATIONS } as BackgroundMessage);

export const sendGetTokenMessage = async (prompt = false): Promise<string> =>
    await browser.runtime.sendMessage({ type: MESSAGE_TYPES.GET_TOKEN, data: { prompt } } as BackgroundMessage);
