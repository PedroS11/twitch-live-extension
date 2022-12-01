import React, { useEffect } from "react";
import { useTwitchStore } from "../../store/twitch";
import { CircularProgress } from "../../components/circularProgress/CircularProgress";
import { Typography } from "@mui/material";
import { FollowedStreamsList } from "./FollowedStreamsList";

const FollowedStreamsPage = () => {
	const getLivestreams = useTwitchStore((state) => state.getLivestreams);
	const resetLivestreams = useTwitchStore((state) => state.resetLivestreams);
	const { livestreams, loading } = useTwitchStore((state) => ({
		livestreams: state.livestreams,
		loading: state.loading,
	}));

	useEffect(() => {
		getLivestreams();
		return () => resetLivestreams();
	}, []);

	return (
		<>
			{!loading && livestreams.length === 0 && (
				<Typography align={"center"}>
					Your followed channels are all offline...
				</Typography>
			)}

			{loading && <CircularProgress />}
			{!loading && <FollowedStreamsList liveStreams={livestreams} />}
		</>
	);
};

export default FollowedStreamsPage;
