/**
 * Get data from local storage
 * @param {string} key - Item key
 */
export const getStorageData = (key: string): string | null => localStorage.getItem(key);

/**
 * Save data in local storage
 * @param {string} key - Data key
 * @param {string} value - Data to be stored
 */
export const setStorageData = (key: string, value: string) => localStorage.setItem(key, value);

export const removeStorageData = (key: string) => localStorage.removeItem(key);
