import changelogs from "../../changelogsMapping.json";
import InstalledDetails = chrome.runtime.InstalledDetails;
import OnInstalledReason = chrome.runtime.OnInstalledReason;

// Open a tab with the changelog for the installed version
export const processOnInstallEvents = async ({ reason }: InstalledDetails) => {
	// Guarantee that only on Twitch Live Extension installs/updates opens the change log tab
	if (reason === OnInstalledReason.UPDATE || reason === OnInstalledReason.INSTALL) {
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
	}
};
