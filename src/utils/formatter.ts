export const formatViewers = (viewers: number): string => {
    return viewers >= 1000 ? `${Math.round(viewers / 1000 * 10) / 10}k`: viewers.toString();
}