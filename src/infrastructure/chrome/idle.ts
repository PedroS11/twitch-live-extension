import IdleState = chrome.idle.IdleState;

export const queryState = (
	detectionIntervalInSeconds: number,
): Promise<IdleState> =>
	new Promise((resolve, reject) =>
		chrome.idle.queryState(
			detectionIntervalInSeconds,
			(newState: IdleState) => {
				if (chrome.runtime.lastError) {
					reject(chrome.runtime.lastError);
				}
				resolve(newState);
			},
		),
	);
