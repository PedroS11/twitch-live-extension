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
