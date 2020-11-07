"use strict";
import {CLIENT_ID} from "../../config";
import {browser} from "webextension-polyfill-ts";

const RESPONSE_TYPE_TOKEN = "token";
const BASE_URL = "https://id.twitch.tv";

const getAuthURL = (promptVerify: boolean = false): string => {
    let redirectUrl: string = browser.identity.getRedirectURL();
    if(redirectUrl.slice(-1) === '/') {
        redirectUrl = redirectUrl.slice(0, -1);
    }

    return `${BASE_URL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectUrl}&response_type=${RESPONSE_TYPE_TOKEN}&force_verify=${promptVerify}`
};
//
// async function getTokenRequestURL(code) {
//     const base = await getBase();
//
//     const url = new URL('/login/oauth/access_token', base);
//     url.searchParams.append('client_id', CLIENT_ID);
//     url.searchParams.append('client_secret', CLIENT_SECRET);
//     url.searchParams.append('code', code);
//
//     return url.href;
// }

// async function getTokenFromCode(code) {
//     const tokenRequestURL = await getTokenRequestURL(code);
//     const response = await fetch(tokenRequestURL, {
//         method: 'post',
//         headers: {
//             Accept: 'application/json'
//         }
//     });
//
//     if (!response.ok) {
//         return false;
//     }
//
//     const data = await response.json();
//
//     if (data.error) {
//         return false;
//     }
//
//     return data['access_token'];
// }

async function fetchToken(promptVerify: boolean = false) {
    console.log(getAuthURL());
    const redirectURL = await browser.identity.launchWebAuthFlow({
        url: getAuthURL(promptVerify),
        interactive: promptVerify
    });

    console.log('redirect url', redirectURL);

    // return getTokenFromCode(url.searchParams.get('code'));
}

export {
    fetchToken
};