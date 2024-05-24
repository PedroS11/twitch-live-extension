// Official Documentation: https://developer.chrome.com/docs/extensions/reference/identity/

/**
 * Starts an auth flow at the specified URL.
 * @param {string} url - OAuth url
 * @param {boolean} interactive - Prompt the authentication window to open
 */
export const launchWebAuthFlow = async (url: string, interactive: boolean): Promise<string> =>
	new Promise((resolve, reject) =>
		chrome.identity.launchWebAuthFlow(
			{
				url,
				interactive,
			},
			(responseUrl) => {
				if (chrome.runtime.lastError) {
					reject(chrome.runtime.lastError);
				}
				resolve(responseUrl);
			},
		),
	);
