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

	const { livestreams, loading, searchedLivestreams } = useTwitchStore(
		(state) => ({
			livestreams: state.livestreams,
			loading: state.loading,
			searchedLivestreams: state.searchedLivestreams,
		}),
	);

	const debouncedSearch = useMemo(
		() =>
			debounce(async (query: string) => {
				await searchLivestreams(query);
			}, 500),
		[],
	);

	const searchLivestreamsHandler = async (query: string) => {
		if (!query) {
			setInputSearch("");
			return;
		}

		setInputSearch(query);

		await debouncedSearch(query);
	};

	const shouldRenderSearchedStreams = (): boolean =>
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
			{!loading && livestreams.length === 0 && (
				<Typography align={"center"}>
					Your followed channels are all offline...
				</Typography>
			)}

			{livestreams.length > 0 && (
				<SearchBar
					onChangeHandler={async (e) =>
						await searchLivestreamsHandler(e.target.value)
					}
				/>
			)}
			{loading && <CircularProgress />}
			{!loading && (
				<StreamsList
					liveStreams={
						shouldRenderSearchedStreams() ? searchedLivestreams : livestreams
					}
				/>
			)}
		</>
	);
};

export default FollowedStreams;
