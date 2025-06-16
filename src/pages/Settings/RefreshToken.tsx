import React from "react";
import {
	IconButton,
	IconButtonProps,
	ListItem,
	ListItemIcon,
	ListItemIconProps,
	ListItemProps,
	ListItemSecondaryAction,
	ListItemText,
} from "@mui/material";
import Refresh from "@mui/icons-material/Refresh";
import ReportProblem from "@mui/icons-material/ReportProblem";
import { styled } from "@mui/material/styles";
import { useTwitchStore } from "../../store/twitch";
import { refreshToken } from "../../infrastructure/twitch/twitchHelpers";

const Wrapper = styled(ListItem)<ListItemProps>(() => ({
	height: 50,
	paddingRight: 45,
}));

const UserIcon = styled(ListItemIcon)<ListItemIconProps>(() => ({
	minWidth: 40,
}));

const RefreshTokenButton = styled(IconButton)<IconButtonProps>(() => ({
	textTransform: "none",
	backgroundColor: "rgba(169, 112, 255, 0.4)",
	"&:hover": {
		backgroundColor: "rgba(169, 112, 255, 0.6)",
	},
}));

export const RefreshToken = () => {
	const loading = useTwitchStore((state) => state.loading);

	return (
		<Wrapper dense>
			<UserIcon>
				<ReportProblem />
			</UserIcon>
			<ListItemText primary={<span>Re authenticate to Twitch</span>} />
			<ListItemSecondaryAction>
				<RefreshTokenButton
					edge="end"
					aria-label="delete"
					size={"small"}
					disabled={loading}
					onClick={async () => {
						await refreshToken(true);
					}}
				>
					<Refresh />
				</RefreshTokenButton>
			</ListItemSecondaryAction>
		</Wrapper>
	);
};
