export const createNotification = (
	options: chrome.notifications.NotificationOptions<true>,
	notificationId = "",
): Promise<string> =>
	new Promise((resolve, reject) =>
		chrome.notifications.create(
			notificationId,
			options,
			(notificationId: string) => {
				if (chrome.runtime.lastError) {
					reject(chrome.runtime.lastError);
				}
				resolve(notificationId);
			},
		),
	);

export const clearNotification = (notificationId: string): Promise<boolean> =>
	new Promise((resolve, reject) =>
		chrome.notifications.clear(notificationId, (wasCleared: boolean) => {
			if (chrome.runtime.lastError) {
				reject(chrome.runtime.lastError);
			}
			resolve(wasCleared);
		}),
	);
