import { AUTH_ERROR_BADGE_TEST } from "../../domain/background/constants";

export const setErrorBadgeText = async (text: string) => {
	await chrome.action.setBadgeBackgroundColor({
		color: "#f30000",
	});
	await chrome.action.setBadgeText({ text });
};

export const clearBadgeText = async () => {
	await chrome.action.setBadgeText({ text: "" });
};

export const setInfoBadgeText = async (text: string) => {
	await chrome.action.setBadgeBackgroundColor({
		color: [76, 76, 76, 255],
	});
	await chrome.action.setBadgeText({ text });
};

export const getBadgeText = async () => {
	return chrome.action.getBadgeText({});
};

export const authErrorBadgeDisplayed = async () => {
	const badgeText = await getBadgeText();
	return badgeText === AUTH_ERROR_BADGE_TEST;
};
