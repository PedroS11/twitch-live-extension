import React, { useEffect, useState, useMemo, useRef } from "react";
import { useTwitchStore } from "../../store/twitch";
import { CircularProgress } from "../../components/circularProgress/CircularProgress";
import { debounce, Typography } from "@mui/material";
import { StreamsList } from "../../components/streamsList/StreamsList";
import { SearchBar } from "../../components/searchBar/SearchBar";
import { FollowedStream } from "../../domain/twitch/service";
import { LoginToTwitch } from "./LoginToTwitch";
import { setupLocalStorageSettings } from "../../infrastructure/utils/setupLocalStorageSettings";
import { getTokenFromStorage } from "../../infrastructure/localStorage/localStorageService";

const FollowedStreams = () => {
	const [inputSearch, setInputSearch] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const [searchedLivestreams, setSearchedLivestreams] = useState([]);
	const [loggedIn, setLoggedIn] = useState(false);

	const inputRef = useRef<HTMLInputElement>();

	const getLivestreams = useTwitchStore((state) => state.getLivestreams);

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

	const noStreamsFoundOnSearch = (): boolean =>
		!loading &&
		!isTyping &&
		inputSearch.length > 0 &&
		searchedLivestreams.length === 0;

	const streamsFoundOnSearch = (): boolean =>
		inputSearch.length > 0 && searchedLivestreams.length > 0;

	useEffect(() => {
		inputRef.current?.focus();
	}, [inputRef.current]);

	useEffect(() => {
		(async () => {
			// Since the App launches from this component
			// Make it setup all the settings on load
			await setupLocalStorageSettings();
			const token = await getTokenFromStorage();
			setLoggedIn(!!token);
			// if (!token) {
			// 	setLoggedIn(false);
			// } else {
			// 	const user = await getCurrentUser();
			// 	setLoggedIn(!!user);
			// }

			if (loggedIn) {
				getLivestreams();
			}
		})();

		return () => {
			debouncedSearch.clear();
		};
	}, [loggedIn]);

	let livestreamsToRender = livestreams;
	if (streamsFoundOnSearch()) {
		livestreamsToRender = searchedLivestreams;
	} else if (noStreamsFoundOnSearch()) {
		livestreamsToRender = [];
	}

	if (!loggedIn) {
		return <LoginToTwitch />;
	}

	return (
		<>
			{livestreams.length > 0 && (
				<SearchBar
					onChangeHandler={(e) => searchLivestreamsHandler(e.target.value)}
					inputRef={(element: HTMLInputElement) => (inputRef.current = element)}
				/>
			)}

			{!loading && livestreams.length === 0 && (
				<Typography align={"center"}>
					Your followed channels are all offline...
				</Typography>
			)}

			{noStreamsFoundOnSearch() && (
				<Typography align={"center"}>
					{/* eslint-disable-next-line react/no-unescaped-entities */}
					Your search doesn't match any streams
				</Typography>
			)}

			{loading && <CircularProgress />}
			{!loading && <StreamsList liveStreams={livestreamsToRender} />}
		</>
	);
};

export default FollowedStreams;
