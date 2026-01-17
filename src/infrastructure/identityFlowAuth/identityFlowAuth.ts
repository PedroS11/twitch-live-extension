import {
	CLIENT_ID,
	RESPONSE_TYPE_TOKEN,
	SCOPES,
	OAUTH_BASE_URL,
} from "../../config";
import { v4 as uuidv4 } from "uuid";
import { launchWebAuthFlow } from "../chrome/identity";

const getAuthURL = (securityToken: string, promptVerify = false): string => {
	let redirectUrl: string = chrome.identity.getRedirectURL();
	if (redirectUrl.slice(-1) === "/") {
		redirectUrl = redirectUrl.slice(0, -1);
	}

	return `${OAUTH_BASE_URL}/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectUrl}&response_type=${RESPONSE_TYPE_TOKEN}&force_verify=${promptVerify}&state=${securityToken}&scope=${SCOPES.join(
		"%20",
	)}`;
};

export const fetchToken = async (promptVerify = false): Promise<string> => {
	const securityToken: string = uuidv4();

	const redirectURL = await launchWebAuthFlow(
		getAuthURL(securityToken, promptVerify),
		promptVerify,
	);

	const url = new URL(redirectURL);
	const queryParams: URLSearchParams = new URLSearchParams(
		url.hash.substring(1),
	);

	const token = queryParams.get("access_token");
	console.log("token");

	const state = queryParams.get("state");

	if (!token) {
		throw new Error("Error getting token from Twitch Api");
	}

	if (state !== securityToken) {
		throw new Error("The token wasn't requested by this extension");
	}

	return token;
};
