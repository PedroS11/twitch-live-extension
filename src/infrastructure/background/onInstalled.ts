import changelogs from "../../changelogsMapping.json";

// Open a tab with the changelog for the installed version
export const processOnInstallEvents = async () => {
	const { installType } = await chrome.management.getSelf();

	if (installType === "development") {
		return;
	}

	const { version } = chrome.runtime.getManifest();

	// @ts-ignore
	const changelogUrl = changelogs[version];

	if (changelogUrl) {
		await chrome.tabs.create({
			url: changelogUrl,
			active: true,
		});
	}
};
