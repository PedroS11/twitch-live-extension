import {
	CLIENT_ID,
	RESPONSE_TYPE_TOKEN,
	SCOPES,
	OAUTH_BASE_URL,
} from "../../config";
import { v4 as uuidv4 } from "uuid";

const getAuthURL = (securityToken: string, promptVerify = false): string => {
	let redirectUrl: string = chrome.identity.getRedirectURL();
	console.log("redirectUrl", redirectUrl);
	if (redirectUrl.slice(-1) === "/") {
		redirectUrl = redirectUrl.slice(0, -1);
	}

	return `${OAUTH_BASE_URL}/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectUrl}&response_type=${RESPONSE_TYPE_TOKEN}&force_verify=${promptVerify}&state=${securityToken}&scope=${SCOPES.join(
		"%20",
	)}`;
};

const launchWebAuthFlow = async (
	url: string,
	interactive: boolean,
): Promise<string> =>
	new Promise((resolve) => {
		chrome.identity.launchWebAuthFlow(
			{
				url,
				interactive,
			},
			(responseUrl) => resolve(responseUrl),
		);
	});

export const fetchToken = async (promptVerify = false): Promise<string> => {
	const securityToken: string = uuidv4();

	console.log("securityToken", securityToken);

	console.log("AUTH URL", getAuthURL(securityToken, promptVerify));

	const redirectURL = await launchWebAuthFlow(
		getAuthURL(securityToken, promptVerify),
		promptVerify,
	);

	console.log("redirectURL", redirectURL);

	const url = new URL(redirectURL);
	const queryParams: URLSearchParams = new URLSearchParams(
		url.hash.substring(1),
	);

	const token = queryParams.get("access_token");
	const state = queryParams.get("state");

	if (!token) {
		throw new Error("Error getting token from Twitch Api");
	}

	if (state !== securityToken) {
		throw new Error("The token wasn't requested by this extension");
	}

	return token;
};
