export const getStorageData = (key: string): string | null  => localStorage.getItem(key);

export const setStorageData = (key: string, value: any) => localStorage.setItem(key, value);