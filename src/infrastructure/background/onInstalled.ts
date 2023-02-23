import changelogs from "../../changelogsMapping.json";
import InstalledDetails = chrome.runtime.InstalledDetails;
import OnInstalledReason = chrome.runtime.OnInstalledReason;

// Open a tab with the changelog for the installed version
export const processOnInstallEvents = async (details: InstalledDetails) => {
	// Ignore chrome update events so the chrome tab doesn't open unnecessarily
	if (details.reason === OnInstalledReason.CHROME_UPDATE) {
		return;
	}

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
