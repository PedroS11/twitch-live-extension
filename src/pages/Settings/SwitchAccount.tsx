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
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { ValidateTokenResponse } from "../../domain/twitch/api";
import { styled } from "@mui/material/styles";
import { useTwitchStore } from "../../store/twitch";

interface SwitchAccountProps {
	user: ValidateTokenResponse;
}

const Wrapper = styled(ListItem)<ListItemProps>(() => ({
	height: 50,
	paddingRight: 45,
}));

const UserIcon = styled(ListItemIcon)<ListItemIconProps>(() => ({
	minWidth: 40,
}));

const LoggedInUserText = styled("span")(() => ({
	fontWeight: "bold",
}));

const SwitchAccountButton = styled(IconButton)<IconButtonProps>(() => ({
	textTransform: "none",
	backgroundColor: "rgba(169, 112, 255, 0.4)",
	"&:hover": {
		backgroundColor: "rgba(169, 112, 255, 0.6)",
	},
}));

export const SwitchAccount = ({ user }: SwitchAccountProps) => {
	const loading = useTwitchStore((state) => state.loading);
	const switchAccount = useTwitchStore((state) => state.switchAccount);

	return (
		<Wrapper dense>
			<UserIcon>
				<PersonIcon />
			</UserIcon>
			<ListItemText
				primary={
					<span>
						Logged in as <LoggedInUserText>{user?.login}</LoggedInUserText>
					</span>
				}
			/>
			<ListItemSecondaryAction>
				<SwitchAccountButton
					edge="end"
					aria-label="delete"
					size={"small"}
					disabled={loading}
					onClick={async () => await switchAccount()}
				>
					<ExitToAppIcon />
				</SwitchAccountButton>
			</ListItemSecondaryAction>
		</Wrapper>
	);
};
