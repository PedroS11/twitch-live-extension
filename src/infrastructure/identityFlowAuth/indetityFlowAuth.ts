'use strict';
import { CLIENT_ID } from '../../config';
import { browser } from 'webextension-polyfill-ts';
import { OAUTH_BASE_URL } from '../twitch/twitchRepository';
import { v4 as uuidv4 } from 'uuid';

const RESPONSE_TYPE_TOKEN = 'token';

const getAuthURL = (securityToken: string, promptVerify = false): string => {
    let redirectUrl: string = browser.identity.getRedirectURL();
    if (redirectUrl.slice(-1) === '/') {
        redirectUrl = redirectUrl.slice(0, -1);
    }

    return `${OAUTH_BASE_URL}/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectUrl}&response_type=${RESPONSE_TYPE_TOKEN}&force_verify=${promptVerify}&state=${securityToken}`;
};

export const fetchToken = async (promptVerify = false): Promise<string> => {
    const securityToken: string = uuidv4();
    const redirectURL = await browser.identity.launchWebAuthFlow({
        url: getAuthURL(securityToken, promptVerify),
        interactive: promptVerify,
    });
    const url = new URL(redirectURL);
    const queryParams: URLSearchParams = new URLSearchParams(url.hash.substring(1));

    const token = queryParams.get('access_token');
    const state = queryParams.get('state');

    if (!token) {
        throw new Error('Error getting token from Twitch Api');
    }

    if (state !== securityToken) {
        throw new Error("The token wasn't requested by this extension");
    }

    return token;
};
