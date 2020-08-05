export const getStorageData = (key: string): any =>
    new Promise((resolve, reject) =>
        chrome.storage.sync.get(key, result =>
            chrome.runtime.lastError
                ? reject(Error(chrome.runtime.lastError.message))
                : resolve(result[key])
        )
    );

export const setStorageData = (key: string, data: string) =>
    new Promise((resolve, reject) =>
        chrome.storage.sync.set({key: data}, () =>
            chrome.runtime.lastError
                ? reject(Error(chrome.runtime.lastError.message))
                : resolve()
        )
    );