import { processOnInstallEvents } from "../onInstalled";

describe("onInstalled", () => {
	it("aaaasas", async () => {
		// @ts-ignore
		chrome.runtime.OnInstalledReason.INSTALL = "install";
		// @ts-ignore
		chrome.runtime.OnInstalledReason.UPDATE = "update";

		await processOnInstallEvents({
			reason: chrome.runtime.OnInstalledReason.INSTALL,
		});
	});
});
