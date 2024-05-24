import React, { useEffect, useState, useMemo } from "react";
import { useTwitchStore } from "../../store/twitch";
import { CircularProgress } from "../../components/circularProgress/CircularProgress";
import { debounce, Typography } from "@mui/material";
import { ScrollableList } from "../../components/streamsList/ScrollableList";
import { SearchBar } from "../../components/searchBar/SearchBar";
import { FollowedStream } from "../../domain/twitch/service";
import { StreamListItem } from "../../components/streamsList/StreamListItem";

const FollowedStreams = () => {
	const [inputSearch, setInputSearch] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const [searchedLivestreams, setSearchedLivestreams] = useState([]);
	const [renderedStreams, setRenderedStreams] = useState([]);

	const getLivestreams = useTwitchStore((state) => state.getLivestreams);
	const resetLivestreams = useTwitchStore((state) => state.resetLivestreams);

	const { livestreams, loading } = useTwitchStore((state) => ({
		livestreams: state.livestreams,
		loading: state.loading,
	}));

	const debouncedSearch = useMemo(
		() =>
			debounce((query: string) => {
				setIsTyping(false);

				setSearchedLivestreams(
					livestreams.filter((stream: FollowedStream) =>
						stream.display_name.toLowerCase().includes(query.toLowerCase()),
					),
				);
			}, 500),
		[livestreams],
	);

	const searchLivestreamsHandler = (query: string) => {
		setIsTyping(true);
		setInputSearch(query);

		if (!query) {
			// If the input becomes empty
			// Set isTyping to false and clean the previous search results to not show them when user starts searching again
			// And, for a brief moment, sees the old search results
			setIsTyping(false);
			setSearchedLivestreams([]);
			return;
		}

		debouncedSearch(query);
	};

	const streamsFoundOnSearch = (): boolean =>
		inputSearch.length > 0 && searchedLivestreams.length > 0;

	const noStreamsFoundOnSearch = (): boolean =>
		!loading &&
		!isTyping &&
		inputSearch.length > 0 &&
		searchedLivestreams.length === 0;

	useEffect(() => {
		getLivestreams();
		return () => {
			resetLivestreams();
			debouncedSearch.clear();
		};
	}, []);

	useEffect(() => {
		setRenderedStreams(
			streamsFoundOnSearch()
				? searchedLivestreams
				: noStreamsFoundOnSearch()
					? []
					: livestreams,
		);
	}, [
		streamsFoundOnSearch(),
		searchedLivestreams,
		noStreamsFoundOnSearch(),
		livestreams,
	]);

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
				<ScrollableList>
					{renderedStreams.map((stream) => (
						<StreamListItem key={stream.id} stream={stream} />
					))}
				</ScrollableList>
			)}
		</>
	);
};

export default FollowedStreams;
