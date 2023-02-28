import React, { useEffect, useState, useMemo } from "react";
import { useTwitchStore } from "../../store/twitch";
import { CircularProgress } from "../../components/circularProgress/CircularProgress";
import { debounce, Typography } from "@mui/material";
import { StreamsList } from "../../components/streamsList/StreamsList";
import { SearchBar } from "../../components/searchBar/SearchBar";

const FollowedStreams = () => {
	const [inputSearch, setInputSearch] = useState("");
	const getLivestreams = useTwitchStore((state) => state.getLivestreams);
	const resetLivestreams = useTwitchStore((state) => state.resetLivestreams);
	const searchLivestreams = useTwitchStore((state) => state.searchLivestreams);
	const resetSearchedLivestreams = useTwitchStore(
		(state) => state.resetSearchedLivestreams,
	);
	const [isTyping, setIsTyping] = useState(false);

	const { livestreams, loading, searchedLivestreams } = useTwitchStore(
		(state) => ({
			livestreams: state.livestreams,
			loading: state.loading,
			searchedLivestreams: state.searchedLivestreams,
		}),
	);

	const debouncedSearch = useMemo(
		() =>
			debounce((query: string) => {
				setIsTyping(false);
				searchLivestreams(query).then();
			}, 500),
		[],
	);

	const searchLivestreamsHandler = async (query: string) => {
		setIsTyping(true);
		setInputSearch(query);

		if (!query) {
			// If the input becomes empty
			// Set isTyping to false and clean the previous search results to not show them when user starts searching again
			// And, for a brief momento, sees the old search results
			setIsTyping(false);
			resetSearchedLivestreams();
			return;
		}

		debouncedSearch(query);
	};

	const noStreamsFoundOnSearch = (): boolean =>
		!loading &&
		!isTyping &&
		inputSearch.length > 0 &&
		searchedLivestreams.length === 0;

	const streamsFoundOnSearch = (): boolean =>
		inputSearch.length > 0 && searchedLivestreams.length > 0;

	useEffect(() => {
		getLivestreams();
		return () => {
			resetLivestreams();
			resetSearchedLivestreams();
			debouncedSearch.clear();
		};
	}, []);

	return (
		<>
			{livestreams.length > 0 && (
				<SearchBar
					onChangeHandler={(e) => searchLivestreamsHandler(e.target.value)}
				/>
			)}

			{!loading && livestreams.length === 0 && (
				<Typography align={"center"}>
					Your followed channels are all offline...
				</Typography>
			)}

			{noStreamsFoundOnSearch() && (
				<Typography align={"center"}>
					Your search doesn't match any streams
				</Typography>
			)}

			{loading && <CircularProgress />}
			{!loading && (
				<StreamsList
					liveStreams={
						streamsFoundOnSearch()
							? searchedLivestreams
							: noStreamsFoundOnSearch()
								? []
								: livestreams
					}
				/>
			)}
		</>
	);
};

export default FollowedStreams;
