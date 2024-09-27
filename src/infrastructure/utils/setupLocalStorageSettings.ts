import {
	isBadgeIconFlagStored,
	isNotificationFlagStored,
	storeBadgeIconFlagOnStorage,
	storeNotificationsFlagOnStorage,
} from "../localStorage/localStorageService";
import {
	sendDisableNotificationMessage,
	sendEnableBadgeIconMessage,
} from "../background/messageWrapper";

export const setupLocalStorageSettings = async () => {
	const isBadgeIconStored: string = await isBadgeIconFlagStored();

	if (!isBadgeIconStored) {
		await storeBadgeIconFlagOnStorage(true);
		await sendEnableBadgeIconMessage();
	}

	const isNotificationsFlagStored: string = await isNotificationFlagStored();

	if (!isNotificationsFlagStored) {
		await storeNotificationsFlagOnStorage(false);
		await sendDisableNotificationMessage();
	}
};
