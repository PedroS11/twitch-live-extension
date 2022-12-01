import React from "react";

import { List, ListProps } from "@mui/material";
import { FollowedStream } from "../../domain/twitch/service";
import { CircularProgress } from "../../components/circularProgress/CircularProgress";
import styled from "@emotion/styled";
import { FollowedStreamsListItem } from "./FollowedStreamsListItem";

interface FollowsStreamListProps {
	liveStreams: FollowedStream[];
	onScroll?: (event: any) => void;
	loadingMore?: boolean;
}

export const MAX_HEIGHT = 400;

const StreamsList = styled(List)<ListProps>(() => ({
	maxHeight: MAX_HEIGHT,
	overflow: "auto",
	paddingTop: 0,
	paddingBottom: 0,
	"&::-webkit-scrollbar": {
		width: "0.6em",
	},
	"&::-webkit-scrollbar-track": {
		borderRadius: 10,
	},
	"&::-webkit-scrollbar-thumb": {
		backgroundColor: "grey",
		borderRadius: 10,
	},
}));

export const FollowedStreamsList = ({
	liveStreams,
	onScroll,
	loadingMore,
}: FollowsStreamListProps) => {
	return (
		<StreamsList onScroll={onScroll}>
			{liveStreams.map((elem: FollowedStream) => (
				<FollowedStreamsListItem key={elem.id} livestream={elem} />
				// <div key={elem.id}>{elem.id}</div>
			))}
			{loadingMore && <CircularProgress />}
		</StreamsList>
	);
};
