import React, { ReactElement } from "react";

import { List, ListProps } from "@mui/material";
import { CircularProgress } from "../circularProgress/CircularProgress";
import styled from "@emotion/styled";

interface StreamListProps {
	children: ReactElement[];
	onScroll?: (event: any) => void;
	loadingMore?: boolean;
}

export const MAX_HEIGHT = 400;

const ListWrapper = styled(List)<ListProps>(() => ({
	maxHeight: MAX_HEIGHT,
	paddingTop: 0,
	overflowY: "auto",
	position: "relative",
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

export const ScrollableList = ({
	children,
	onScroll,
	loadingMore,
}: StreamListProps) => {
	return (
		<ListWrapper onScroll={onScroll}>
			{children}
			{loadingMore && <CircularProgress />}
		</ListWrapper>
	);
};
