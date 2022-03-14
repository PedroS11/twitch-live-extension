import { browser } from 'webextension-polyfill-ts';
import changelogs from '../../changelogsMapping.json';

export const processOnInstallEvents = async () => {
    const { installType } = await browser.management.getSelf();

    const { version } = browser.runtime.getManifest();

    // @ts-ignore
    const changelogUrl = changelogs[version];

    if (changelogUrl) {
        await browser.tabs.create({
            url: changelogUrl,
            active: true,
        });
    }
};
