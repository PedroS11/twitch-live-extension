import { FollowedStream, TopStream } from "../../domain/twitch/service";

export const clearDuplicatedStreams = (
	streams: TopStream[] | FollowedStream[],
): TopStream[] | FollowedStream[] => {
	const uniqueIds = new Set();

	return streams.filter((element) => {
		const isDuplicate = uniqueIds.has(element.id);

		uniqueIds.add(element.id);

		return !isDuplicate;
	});
};
