import React, { useEffect } from "react";
import { useTwitchStore } from "../../store/twitch";
import { Typography } from "@mui/material";
import { CircularProgress } from "../../components/circularProgress/CircularProgress";
import { MAX_HEIGHT, StreamsList } from "../../components/streamsList/StreamsList";

const isAtTheBottom = (event: any): boolean => {
	// The total height you can scroll
	const liveStreamListScrollHeight: number = event.target.scrollHeight;
	const scrollPosition: number = event.target.scrollTop;

	return scrollPosition + MAX_HEIGHT + 0.5 >= liveStreamListScrollHeight;
};

const Explore = () => {
	const { loadingMoreFinished, loadingMore, loading, topLivestreams } = useTwitchStore(
		({ loadingMoreFinished, loadingMore, loading, topLivestreams }) => ({
			loadingMoreFinished,
			loadingMore,
			loading,
			topLivestreams,
		}),
	);

	const fetchMoreTopLivestreams = useTwitchStore((state) => state.fetchMoreTopLivestreams);

	const getTopLivestreams = useTwitchStore((state) => state.getTopLivestreams);

	const resetTopLivestreams = useTwitchStore((state) => state.resetTopLivestreams);

	const loadMoreItems = async (event: any) => {
		if (isAtTheBottom(event) && !loadingMoreFinished && !loadingMore) {
			await fetchMoreTopLivestreams();
		}
	};

	useEffect(() => {
		getTopLivestreams();
		return () => resetTopLivestreams();
	}, []);

	return (
		<div>
			{!loading && topLivestreams.length === 0 && (
				<Typography align={"center"}>Your followed channels are all offline...</Typography>
			)}
			{!loading && topLivestreams.length > 0 && (
				<StreamsList
					liveStreams={topLivestreams}
					onScroll={async (e: any) => await loadMoreItems(e)}
					loadingMore={loadingMore}
				/>
			)}
			{loading && <CircularProgress />}
		</div>
	);
};

export default Explore;
