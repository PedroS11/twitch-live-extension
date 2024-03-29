/**
 * Round the number of viewers if they are higher than 1000
 * @param {number} viewers - Number of viewers
 */
export const formatViewers = (viewers: number): string =>
	viewers >= 1000
		? `${Math.round((viewers / 1000) * 10) / 10}k`
		: viewers.toString();

/**
 * Get the date and time from date with the YYYY-MM-DD HH:mm:SS
 * @param {Date} date - Date to be converted to string
 */
export const formatDate = (date: Date): string =>
	date.toJSON().replace("T", " ").split(".")[0];

export const getElapsedTime = (timestamp: string) => {
	const date = new Date(timestamp);

	const difference = Date.now() - date.getTime();

	const seconds = Math.floor((difference / 1000) % 60);
	const minutes = Math.floor((difference / (1000 * 60)) % 60);
	const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

	return `${hours.toString().padStart(2, "0")}:${minutes
		.toString()
		.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};
