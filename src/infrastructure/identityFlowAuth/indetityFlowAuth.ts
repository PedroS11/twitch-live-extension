'use strict';
import { CLIENT_ID } from '../../config';
import { browser } from 'webextension-polyfill-ts';
import { OAUTH_BASE_URL } from '../twitch/twitchRepository';

const RESPONSE_TYPE_TOKEN = 'token';

const getAuthURL = (promptVerify = false): string => {
    let redirectUrl: string = browser.identity.getRedirectURL();
    if (redirectUrl.slice(-1) === '/') {
        redirectUrl = redirectUrl.slice(0, -1);
    }

    return `${OAUTH_BASE_URL}/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectUrl}&response_type=${RESPONSE_TYPE_TOKEN}&force_verify=${promptVerify}`;
};

export const fetchToken = async (promptVerify = false): Promise<string> => {
    const redirectURL = await browser.identity.launchWebAuthFlow({
        url: getAuthURL(promptVerify),
        interactive: promptVerify,
    });
    const url = new URL(redirectURL);

    const token = new URLSearchParams(url.hash.substring(1)).get('access_token');

    if (!token) {
        throw new Error('Error getting token from Twitch Api');
    }

    return token;
};
