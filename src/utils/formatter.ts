/**
 * Round the number of viewers if they are higher than 1000
 * @param {number} viewers - Number of viewers
 */
export const formatViewers = (viewers: number): string => {
    return viewers >= 1000 ? `${Math.round((viewers / 1000) * 10) / 10}k` : viewers.toString();
};

/**
 * Get the date and time from date with the YYYY-MM-DD HH:mm:SS
 * @param {Date} date - Date to be converted to string
 */
export const formatDate = (date: Date): string => {
    return date.toJSON().replace('T', ' ').split('.')[0];
};
