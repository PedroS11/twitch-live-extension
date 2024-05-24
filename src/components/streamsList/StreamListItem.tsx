import React, { useEffect, useState } from "react";

import {
	Avatar,
	IconButton,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
	ListItemTextProps,
	Typography,
	TypographyProps,
} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";

import { FollowedStream } from "../../domain/twitch/service";
import styled from "@emotion/styled";
import {
	formatViewers,
	getElapsedTime,
} from "../../infrastructure/utils/formatter";
import { PopperTitle } from "./PopperTittle";
import { ViewerIcon } from "../svg/viewerIcon";

interface StreamListItemProps {
	stream: FollowedStream;
}

const StreamerWrapper = styled(ListItemText)<ListItemTextProps>(() => ({
	paddingRight: 5,
}));

const ViewersNumberText = styled(Typography)<TypographyProps>(() => ({
	fontSize: 13,
	paddingRight: 3,
}));

const ElapsedTimeText = styled(Typography)<TypographyProps>(() => ({
	fontSize: 11,
	textAlign: "right",
}));

export const StreamListItem = ({ stream }: StreamListItemProps) => {
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
	const handlePopoverOpen = (
		event: React.MouseEvent<HTMLElement, MouseEvent>,
	) => {
		setAnchorEl(event.currentTarget);
	};
	const [elapsedTime, setElapsedTime] = useState(
		getElapsedTime(stream.started_at),
	);

	useEffect(() => {
		const timer = setInterval(() => {
			setElapsedTime(getElapsedTime(stream.started_at));
		}, 1000);

		return () => clearInterval(timer);
	}, [stream.started_at]);

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);

	return (
		<>
			<ListItemButton
				component="a"
				target="_blank"
				rel="noopener noreferrer"
				href={stream.url}
				divider
				dense
				onMouseEnter={handlePopoverOpen}
				onMouseLeave={handlePopoverClose}
				sx={{
					backgroundColor: "#4c4c4c",
					height: 50,
				}}
			>
				<ListItemAvatar>
					<Avatar src={stream.profile_image_url} />
				</ListItemAvatar>
				<StreamerWrapper
					primary={stream.display_name}
					secondary={
						<Typography
							noWrap
							variant={"subtitle2"}
							color={"textSecondary"}
							sx={{
								fontSize: 11,
								marginRight: "42px",
							}}
						>
							{stream.game}
						</Typography>
					}
				/>
				<ListItemSecondaryAction>
					<IconButton
						edge="end"
						disabled
						size={"small"}
						sx={{ paddingTop: 0, paddingBottom: "2px" }}
					>
						<ViewersNumberText
							noWrap
							variant={"subtitle1"}
							color={"textSecondary"}
						>
							{formatViewers(stream.viewer_count)}
						</ViewersNumberText>
						<ViewerIcon />
					</IconButton>
					<ElapsedTimeText noWrap variant={"subtitle2"} color={"textSecondary"}>
						{elapsedTime}
					</ElapsedTimeText>
				</ListItemSecondaryAction>
			</ListItemButton>
			<PopperTitle title={stream.title} anchorEl={anchorEl} open={open} />
		</>
	);
};
